# 🌶️ Konaseema Snacks

> **Portfolio Notice:** This is a client project built by [Prakash Devapujyula](https://github.com/prakashdsp7777) as a freelance/professional engagement. The repository is shared here solely as a portfolio reference to demonstrate the work done. This project has been delivered to the client and is **not intended for live deployment** by anyone other than the original client.

A full-stack e-commerce web application for showcasing and selling traditional Konaseema snacks, sweets, pickles, and karampodisonline — built with **Next.js 14**.

---

## ✨ Features

- 🛍️ Product catalog with **search** and **category filtering** (Sweets, Hot, Pickles, Karampodi)
- ➕ Inline **quantity stepper** on each product card (Swiggy-style)
- 🛒 **Persistent cart** using localStorage
- 💳 **Razorpay** payment gateway integration (test mode)
- 📦 Order saving to **MySQL** database
- 📱 Fully **mobile responsive** with Bootstrap 5
- 🌿 **Our Story** section in Telugu
- 🔒 Sticky navbar with live cart count

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18 |
| Styling | Bootstrap 5, Custom CSS |
| Backend | Next.js API Routes (replaces Express) |
| Database | MySQL 2 |
| Payments | Razorpay |

---

## 📁 Project Structure

```
konaseema-snacks/
├── app/
│   ├── layout.jsx              # Root layout — Navbar + CartProvider
│   ├── globals.css             # Custom styles & color palette
│   ├── page.jsx                # Home — product grid, search, filters
│   ├── cart/page.jsx           # Cart page
│   ├── checkout/page.jsx       # Checkout + Razorpay payment
│   ├── success/page.jsx        # Order success
│   └── api/
│       ├── products/route.js   # GET  /api/products
│       ├── orders/route.js     # POST /api/orders
│       └── create-order/route.js # POST /api/create-order
├── components/
│   ├── Navbar.jsx              # Sticky navbar with cart count
│   └── Footer.jsx              # Footer with developer credit
├── context/
│   └── CartContext.jsx         # Global cart state
├── lib/
│   └── db.js                   # MySQL singleton connection
├── public/
│   └── images/                 # Product images (.jpg)
└── .env.local                  # Environment variables
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/konaseema-snacks.git
cd konaseema-snacks
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=konaseema_db

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 4. Set up MySQL database

```sql
CREATE DATABASE konaseema_db;

USE konaseema_db;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  sub_category VARCHAR(50),
  price DECIMAL(10,2),
  image VARCHAR(100),
  description TEXT
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(100),
  total DECIMAL(10,2),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

### 5. Add product images

Place all product `.jpg` images inside:

```
public/images/
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💳 Razorpay Test Credentials

Use the following test card for payments:

| Field | Value |
|---|---|
| Card Number | `4111 1111 1111 1111` |
| Expiry | Any future date |
| CVV | Any 3 digits |
| OTP | `1234` |

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repo at [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.local` in Vercel dashboard
4. Use a cloud MySQL provider (e.g., [Railway](https://railway.app) or [PlanetScale](https://planetscale.com)) and update `DB_*` variables

---

## 👨‍💻 Developer

**Prakash Devapujyula**

---

## 🏪 Proprietor

**Santhosh** — Konaseema Snacks
📞 +91 77319 11229
