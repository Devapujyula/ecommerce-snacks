export default function Success() {
  return (
    <div className="container py-5">
      <div
        className="text-center p-5 rounded-4 mx-auto"
        style={{ maxWidth: 480, background: 'white', border: '1px solid #eedcbb', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ fontWeight: 800, color: '#2e7d32', marginBottom: '0.5rem' }}>Order Placed!</h2>
        <p style={{ color: '#555', marginBottom: '1.5rem' }}>
          Thank you for your order. Your authentic Konaseema snacks are on their way — we will deliver them soon! 😋
        </p>
        <a
          href="/"
          className="btn py-2 px-4"
          style={{ background: 'var(--primary)', color: 'white', borderRadius: 10, fontWeight: 700, textDecoration: 'none' }}
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
