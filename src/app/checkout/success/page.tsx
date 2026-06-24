"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="checkout-wrapper animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '600px', textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CheckCircle size={80} color="#4caf50" style={{ margin: '0 auto 24px' }} />
        
        <h1 style={{ color: 'var(--color-brown-dark)', marginBottom: '16px', fontSize: '2rem' }}>Order Received!</h1>
        
        <p style={{ color: 'var(--color-brown-light)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '24px' }}>
          Thank you for your order request. We have successfully received your details and are currently reviewing your order. 
        </p>
        
        {orderId && (
          <div style={{ backgroundColor: 'var(--color-cream)', padding: '16px', borderRadius: '8px', marginBottom: '32px' }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--color-brown-dark)' }}>Order Reference ID:</p>
            <p style={{ margin: '4px 0 0', fontFamily: 'monospace', fontSize: '1.1rem' }}>{orderId}</p>
          </div>
        )}

        <p style={{ color: 'var(--color-brown-dark)', marginBottom: '32px' }}>
          Our team will contact you shortly via phone or email to confirm delivery details and arrange payment.
        </p>

        <Link href="/shop" className="btn-primary" style={{ padding: '12px 32px' }}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<div className="checkout-wrapper animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
