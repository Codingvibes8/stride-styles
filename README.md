# 🏃‍♀️ Stride & Style

**Version:** 0.1.0  
**Status:** 🚧 In Development  
**Framework:** [Next.js 16](https://nextjs.org/) with Turbopack  
**Styling:** Tailwind CSS v4 + Radix UI  
**Auth:** Email + password sessions (Neon-backed, JWT cookie)  
**Database:** [Neon Postgres](https://neon.tech) + [Drizzle ORM](https://orm.drizzle.team)  
**Payments:** Stripe

---

## 📦 Overview

Stride & Style is a modern e-commerce web application built with Next.js, designed for a sleek and performant shopping experience. It features product browsing, cart management, user authentication, and integrated payment processing.

---

## 🚀 Features

- 🛒 **E-commerce**: Browse products by category (shoes, clothing)
- 🔐 **Authentication**: Email + password sign-up/sign-in with hashed passwords and httpOnly session cookies
- 🛍️ **Shopping Cart**: Persistent cart with local storage
- 💳 **Payments**: Stripe integration for checkout
- 🧠 **State Management**: Zustand for global state
- 🎨 **UI Components**: Radix UI primitives (Dialog, Select, Label, etc.)
- 🖼️ **Icons**: Lucide React icon library
- 💨 **Styling**: Tailwind CSS v4 with animations
- 📱 **Responsive**: Mobile-first design
- 🧪 **TypeScript**: Full type safety
- 🗄️ **Typed SQL**: Drizzle schema, migrations and queries

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/         # sign-in, sign-up, sign-out, session
│   │   └── checkout/     # Stripe checkout
│   ├── cart/             # Cart page
│   ├── checkout/         # Checkout flow
│   ├── dashboard/        # User dashboard
│   ├── products/         # Product pages (shoes, clothing)
│   ├── sign-in/          # Authentication pages
│   ├── sign-up/
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Reusable UI components
├── constants/            # App constants and data
├── drizzle/              # Generated SQL migrations
├── hooks/                # Custom React hooks
├── lib/
│   ├── db/               # Drizzle schema, client and queries
│   ├── auth.ts           # Session + password helpers (server)
│   └── session.ts        # Edge-safe JWT verification
├── public/               # Static assets (images, icons)
├── scripts/seed.ts       # Demo product seed script
└── proxy.ts              # Route protection (Next.js 16 proxy convention)
```

---

## 🔧 Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://console.neon.tech) Postgres database (free tier is fine)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd strideandstyle

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill it in:

```env
# Neon Postgres — use the pooled connection string
DATABASE_URL="postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require"

# Signs session JWTs — generate with `openssl rand -hex 32`
AUTH_SECRET="a-long-random-string"

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Database

The schema lives in `lib/db/schema.ts`. Apply it with Drizzle Kit:

```bash
# Create + apply migrations (recommended)
npm run db:generate
npm run db:migrate

# or push the schema directly without migration files
npm run db:push

# load demo products (16 rows)
npm run db:seed

# optional: start Drizzle Studio
npm run db:studio
```

### Development

```bash
npm run dev
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
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI |
| Authentication | Neon sessions + bcrypt + JWT cookie |
| Database | Neon Postgres + Drizzle ORM |
| Payments | Stripe |
| State Management | Zustand |
| Icons | Lucide React |

---

## ✅ Current Features

- ✅ Homepage with hero section and featured products
- ✅ Product listing with category filtering (shoes, clothing)
- ✅ Individual product detail pages
- ✅ Shopping cart with quantity management
- ✅ User authentication (sign-in/sign-up) backed by Neon
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
| `npm run db:generate` | Generate a SQL migration from the Drizzle schema |
| `npm run db:migrate` | Apply pending migrations to the database |
| `npm run db:push` | Push the schema directly (no migration files) |
| `npm run db:seed` | Insert demo products (`-- --reset` to replace) |
| `npm run db:studio` | Open Drizzle Studio |

---

## 📄 License

This project is private and proprietary.
