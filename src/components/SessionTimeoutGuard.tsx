"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { ShieldAlert, Clock, LogOut } from "lucide-react";
import "./SessionTimeoutGuard.css";

const ADMIN_IDLE_MS = 15 * 60 * 1000; // 15 minutes
const USER_IDLE_MS = 30 * 60 * 1000;  // 30 minutes
const WARNING_BEFORE_MS = 60 * 1000;  // Show 60s countdown warning
const ACTIVITY_THROTTLE_MS = 15 * 1000;
const LAST_ACTIVITY_KEY = "tfs_last_activity_ts";
const FORCE_LOGOUT_KEY = "tfs_force_logout_ts";

export function SessionTimeoutGuard() {
  const { data: session, status, update } = useSession();
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const lastActivityRef = useRef<number>(Date.now());
  const lastWriteRef = useRef<number>(0);
  const loggingOutRef = useRef<boolean>(false);

  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "ADMIN";
  const idleLimitMs = isAdmin ? ADMIN_IDLE_MS : USER_IDLE_MS;

  const triggerLogout = useCallback(async (reason: "timeout" | "manual") => {
    if (loggingOutRef.current) return;
    loggingOutRef.current = true;
    try {
      localStorage.setItem(FORCE_LOGOUT_KEY, String(Date.now()));
    } catch {
      // ignore storage errors
    }
    setShowWarning(false);
    await signOut({ callbackUrl: `/login?reason=${reason}` });
  }, []);

  const recordActivity = useCallback((force = false) => {
    const now = Date.now();
    if (!force && now - lastWriteRef.current < ACTIVITY_THROTTLE_MS) return;
    lastActivityRef.current = now;
    lastWriteRef.current = now;
    try {
      localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleStaySignedIn = useCallback(async () => {
    setShowWarning(false);
    recordActivity(true);
    try {
      await update();
    } catch {
      // ignore network errors
    }
  }, [recordActivity, update]);

  // Immediately sign out if server flagged session as expired
  useEffect(() => {
    const err = (session as { error?: string } | null)?.error;
    if (status === "authenticated" && err === "SessionExpired") {
      triggerLogout("timeout");
    }
  }, [session, status, triggerLogout]);

  // Main inactivity tracker + cross-tab sync
  useEffect(() => {
    if (status !== "authenticated") {
      setShowWarning(false);
      loggingOutRef.current = false;
      return;
    }

    // Initialize activity timestamp on mount
    recordActivity(true);

    const onUserActivity = () => {
      // If the warning modal is open, require explicit "Stay Signed In" click
      if (!showWarning) {
        recordActivity(false);
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === LAST_ACTIVITY_KEY && e.newValue) {
        const ts = Number(e.newValue);
        if (!Number.isNaN(ts) && ts > lastActivityRef.current) {
          lastActivityRef.current = ts;
          setShowWarning(false);
        }
      }
      if (e.key === FORCE_LOGOUT_KEY && e.newValue) {
        triggerLogout("timeout");
      }
    };

    const events: (keyof WindowEventMap)[] = [
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];
    events.forEach((evt) => window.addEventListener(evt, onUserActivity, { passive: true }));
    window.addEventListener("storage", onStorage);

    const interval = window.setInterval(() => {
      if (loggingOutRef.current) return;

      let latest = lastActivityRef.current;
      try {
        const stored = Number(localStorage.getItem(LAST_ACTIVITY_KEY) || "0");
        if (stored > latest) latest = stored;
      } catch {
        // ignore
      }

      const elapsed = Date.now() - latest;
      const remaining = idleLimitMs - elapsed;

      if (remaining <= 0) {
        triggerLogout("timeout");
      } else if (remaining <= WARNING_BEFORE_MS) {
        setSecondsLeft(Math.max(1, Math.ceil(remaining / 1000)));
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    }, 1000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, onUserActivity));
      window.removeEventListener("storage", onStorage);
      window.clearInterval(interval);
    };
  }, [status, idleLimitMs, showWarning, recordActivity, triggerLogout]);

  if (!showWarning || status !== "authenticated") return null;

  return (
    <div className="session-timeout-backdrop" role="dialog" aria-modal="true" aria-labelledby="session-timeout-title">
      <div className="session-timeout-modal">
        <div className="session-timeout-icon">
          <ShieldAlert size={28} />
        </div>
        <h2 id="session-timeout-title">Session Expiring Soon</h2>
        <p className="session-timeout-text">
          For your security, you will be automatically signed out due to inactivity in:
        </p>
        <div className="session-timeout-countdown">
          <Clock size={20} />
          <span>{secondsLeft}s</span>
        </div>
        <div className="session-timeout-actions">
          <button
            type="button"
            className="session-btn-stay"
            onClick={handleStaySignedIn}
          >
            Stay Signed In
          </button>
          <button
            type="button"
            className="session-btn-logout"
            onClick={() => triggerLogout("manual")}
          >
            <LogOut size={16} />
            Sign Out Now
          </button>
        </div>
      </div>
    </div>
  );
}
