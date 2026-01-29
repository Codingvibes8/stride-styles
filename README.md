# 🏃‍♀️ Stride & Style

**Version:** 0.1.0  
**Status:** 🚧 In Development  
**Framework:** [Next.js 15](https://nextjs.org/) with Turbopack  
**Styling:** Tailwind CSS v4 + Radix UI  
**Auth:** Clerk  
**Backend:** Supabase  
**Payments:** Stripe

---

## 📦 Overview

Stride & Style is a modern e-commerce web application built with Next.js 15, designed for a sleek and performant shopping experience. It features product browsing, cart management, user authentication, and integrated payment processing.

---

## 🚀 Features

- 🛒 **E-commerce**: Browse products by category (shoes, clothing, accessories)
- 🔐 **Authentication**: Secure sign-up/sign-in via Clerk
- 🛍️ **Shopping Cart**: Persistent cart with local storage
- 💳 **Payments**: Stripe integration for checkout
- 🧠 **State Management**: Zustand for global state
- 🎨 **UI Components**: Radix UI primitives (Dialog, Select, Label, etc.)
- 🖼️ **Icons**: Lucide React icon library
- 💨 **Styling**: Tailwind CSS v4 with animations
- 📱 **Responsive**: Mobile-first design
- 🧪 **TypeScript**: Full type safety

---

## 📁 Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── cart/             # Cart page
│   ├── checkout/         # Checkout flow
│   ├── dashboard/        # User dashboard
│   ├── products/         # Product pages (shoes, clothing, accessories)
│   ├── sign-in/          # Authentication pages
│   ├── sign-up/
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Reusable UI components
├── constants/            # App constants and data
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── public/               # Static assets (images, icons)
├── scripts/              # Database scripts
└── middleware.ts         # Auth middleware
```

---

## 🔧 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd strideandstyle

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file with the following:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Runtime | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI |
| Authentication | Clerk |
| Database | Supabase |
| Payments | Stripe |
| State Management | Zustand |
| Icons | Lucide React |

---

## ✅ Current Features

- ✅ Homepage with hero section and featured products
- ✅ Product listing with category filtering (shoes, clothing, accessories)
- ✅ Individual product detail pages
- ✅ Shopping cart with quantity management
- ✅ User authentication (sign-in/sign-up)
- ✅ Checkout flow with Stripe
- ✅ Responsive design across all devices
- ✅ Add to cart with size/color selection

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project is private and proprietary.
