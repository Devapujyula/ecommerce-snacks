'use client';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="kona-nav d-flex justify-content-between align-items-center">
      <Link href="/" className="kona-brand">
        Konaseema <span>Snacks</span>
      </Link>
      <Link href="/cart">
        <button className="kona-cart-btn">
          🛒 Cart {itemCount > 0 && <span className="ms-1">({itemCount})</span>}
        </button>
      </Link>
    </nav>
  );
}
