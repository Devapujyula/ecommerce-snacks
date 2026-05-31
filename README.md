# 🌶️ Konaseema Snacks

> **Portfolio Notice:** This is a client project built by [Prakash Devapujyula](https://github.com/Devapujyula) as a freelance/professional engagement. The repository is shared here solely as a portfolio reference to demonstrate the work done.

A full-stack e-commerce web application for showcasing and selling traditional Konaseema snacks, sweets, pickles, and karampodis online — built with **Next.js 14**.

## 🔗 Live Demo

**[👉 Click here to view the live app](https://ecommerce-snacks-git-main-devapujyulas-projects.vercel.app)**

---

## ✨ Features

- 🛍️ Product catalog with **search** and **category filtering** (Sweets, Hot, Pickles, Karampodi)
- ➕ Inline **quantity stepper** on each product card (Swiggy-style)
- 🛒 **Persistent cart** using localStorage
- 💳 **Razorpay** payment gateway integration (test mode)
- 📦 Order saving to **PostgreSQL** database (Supabase)
- 📱 Fully **mobile responsive** with Bootstrap 5
- 🌿 **Our Story** section in Telugu
- 🔒 Sticky navbar with live cart count

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18 |
| Styling | Bootstrap 5, Custom CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL (Supabase) |
| Payments | Razorpay |
| Hosting | Vercel |

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
│   └── db.js                   # PostgreSQL connection (Supabase)
├── public/
│   └── images/                 # Product images (.jpg)
└── .env.local                  # Environment variables (not committed)
```

---

## ⚙️ Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/Devapujyula/ecommerce-snacks.git
cd ecommerce-snacks
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
DATABASE_URL=your_supabase_postgresql_connection_string

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 4. Run the development server

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

## 👨‍💻 Developer

**Prakash Devapujyula**

---

## 🏪 Proprietor

**Santhosh** — Konaseema Snacks
📞 +91 77319 11229
