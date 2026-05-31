import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Konaseema Snacks',
  description: 'Traditional Konaseema snacks online store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 140px)' }}>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
