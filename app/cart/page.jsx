'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, setCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const remove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container py-4">
      <div className="page-container">
        <Link href="/" className="btn btn-outline-secondary btn-sm mb-4">
          ← Back to Products
        </Link>

        <h2 className="section-title">Your Cart 🛒</h2>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem' }}>🛒</div>
            <p className="text-muted mt-3 fs-5">Your cart is empty</p>
            <Link
              href="/"
              className="btn mt-2"
              style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: 10, fontWeight: 600 }}
            >
              Browse Snacks
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    style={{ width: 58, height: 58, borderRadius: 10, objectFit: 'cover', border: '1px solid #eedcbb' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.97rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                      {item.weight && <span style={{ background: '#f5f0e8', borderRadius: 10, padding: '1px 7px', marginRight: 6, fontWeight: 600 }}>{item.weight}</span>}
                      ₹{Number(item.price).toLocaleString('en-IN')} each
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button className="qty-btn" onClick={() => decrease(item.id)}>−</button>
                  <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => increase(item.id)}>+</button>
                  <span style={{ fontWeight: 700, color: 'var(--price-color)', minWidth: 64, textAlign: 'right' }}>
                    ₹{(Number(item.price) * item.quantity).toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => remove(item.id)}
                    style={{ background: 'none', border: 'none', color: '#e53935', fontSize: '1.1rem', cursor: 'pointer', padding: '4px 6px' }}
                    title="Remove"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}

            <div
              className="d-flex justify-content-between align-items-center mt-4 p-3 rounded-3"
              style={{ background: 'white', border: '1px solid var(--border-color)' }}
            >
              <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--price-color)' }}>
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              className="w-100 mt-3 py-3 rounded-3"
              style={{ background: 'var(--primary)', border: 'none', color: 'white', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
              onClick={() => router.push('/checkout')}
            >
              Proceed to Checkout →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
