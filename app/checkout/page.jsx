'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function Checkout() {
  const { cart, setCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paying, setPaying] = useState(false);
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleOrder = async () => {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, address, cart, total }),
    });
    setCart([]);
    localStorage.removeItem('cart');
    router.push('/success');
  };

  const handlePayment = async () => {
    if (!name.trim() || !address.trim()) {
      alert('Please enter your name and delivery address.');
      return;
    }

    setPaying(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Failed to load payment gateway. Please check your internet connection and try again.');
      setPaying(false);
      return;
    }

    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total }),
    });
    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Konaseema Snacks',
      description: 'Authentic Andhra snacks',
      order_id: order.id,
      handler: async () => {
        await handleOrder();
      },
      modal: {
        ondismiss: () => setPaying(false),
      },
      prefill: { name },
      theme: { color: '#e65c00' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setPaying(false);
  };

  return (
    <div className="container py-4">
      <div className="page-container">
        <Link href="/cart" className="btn btn-outline-secondary btn-sm mb-4">
          ← Back to Cart
        </Link>

        <h2 className="section-title">Checkout</h2>

        <div className="row g-4">
          {/* Delivery Details */}
          <div className="col-12 col-md-6">
            <div className="p-4 rounded-3" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
              <h6 style={{ fontWeight: 700, marginBottom: '1rem' }}>📦 Delivery Details</h6>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: '0.9rem' }}>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: 10, borderColor: '#eedcbb' }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: '0.9rem' }}>Delivery Address</label>
                <textarea
                  className="form-control"
                  style={{ borderRadius: 10, borderColor: '#eedcbb', resize: 'none' }}
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House no., street, city, pincode"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-12 col-md-6">
            <div className="p-4 rounded-3" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
              <h6 style={{ fontWeight: 700, marginBottom: '1rem' }}>🧾 Order Summary</h6>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center py-2"
                  style={{ borderBottom: '1px solid #f5e8d0', fontSize: '0.9rem' }}
                >
                  <span>
                    {item.name}{' '}
                    {item.weight && (
                      <span style={{ fontSize: '0.72rem', background: '#f5f0e8', borderRadius: 10, padding: '1px 6px', marginRight: 4, color: '#888', fontWeight: 600 }}>
                        {item.weight}
                      </span>
                    )}
                    <span style={{ color: '#999' }}>× {item.quantity}</span>
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    ₹{(Number(item.price) * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}

              <div className="d-flex justify-content-between align-items-center mt-3 pt-2">
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--price-color)' }}>
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                className="w-100 mt-4 py-3 rounded-3"
                style={{
                  background: paying ? '#aaa' : 'var(--primary)',
                  border: 'none',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: paying ? 'not-allowed' : 'pointer',
                }}
                onClick={handlePayment}
                disabled={paying}
              >
                {paying ? 'Loading payment...' : `Pay ₹${total.toLocaleString('en-IN')} →`}
              </button>

              <p className="text-muted text-center mt-2" style={{ fontSize: '0.75rem' }}>
                🔒 Secured by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
