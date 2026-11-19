export default function Loading() {
  return (
    <div style={{ minHeight: "70vh", padding: "48px 0" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #D84315, #8D6E63, #D84315)",
          backgroundSize: "200% 100%",
          animation: "shimmerBar 1.1s infinite linear",
          zIndex: 9999,
        }}
      />
      <div className="container">
        <div
          style={{
            height: "320px",
            borderRadius: "20px",
            background: "linear-gradient(90deg, #EFEBE9 25%, #F5F0EB 50%, #EFEBE9 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmerBar 1.4s infinite linear",
            marginBottom: "32px",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              style={{
                height: "260px",
                borderRadius: "14px",
                background: "linear-gradient(90deg, #EFEBE9 25%, #F5F0EB 50%, #EFEBE9 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmerBar 1.4s infinite linear",
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes shimmerBar {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
