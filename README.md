# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# 🏃‍♀️ Stride & Style

**Version:** 0.1.0  
**Status:** 🚧 In Development  
**Framework:** [Next.js](https://nextjs.org/) with Turbopack  
**Styling:** Tailwind CSS + Radix UI  
**Auth & Backend:** Clerk + Supabase

## 📦 Overview

Stride & Style is a modern web application built with Next.js 15, designed to deliver a sleek and performant user experience. It leverages cutting-edge tools like Turbopack, Radix UI components, and Clerk for authentication, with Supabase as the backend.

## 🚀 Features

- 🔐 Authentication via Clerk
- 🧠 State management with Zustand
- 🎨 UI components powered by Radix UI
- 🖼️ Iconography with Lucide React
- 💨 Tailwind CSS with animation support
- 🧩 Utility-first styling with `clsx` and `class-variance-authority`
- 🧪 Type-safe development with TypeScript

## 📁 Project Structure

```bash
.
├── public/           # Static assets
├── src/              # Application source code
│   ├── components/   # Reusable UI components
│   ├── pages/        # Next.js pages
│   ├── styles/       # Tailwind and global styles
│   └── utils/        # Helper functions
├── .eslintrc.js      # ESLint configuration
├── tailwind.config.js
├── tsconfig.json     # TypeScript configuration
└── package.json


## 🔧 **Error Resolution**

### **1. Downgraded Next.js Version**

- Changed from Next.js 15 to **Next.js 14.2.0** for better stability
- Updated ESLint config to match

### **2. Simplified Cart Hook**

- Removed complex async operations that were causing issues
- Simplified to use local storage only for now
- Removed Supabase integration from cart (can be added back later)
- Made cart operations synchronous

### **3. Removed Complex Dependencies**

- Simplified the authentication flow
- Removed problematic async cart sync operations
- Used mock data instead of Supabase queries for now

### **4. Fixed Component Issues**

- Simplified header component
- Removed complex useEffect hooks that were causing problems
- Made navigation more straightforward

## ✅ **What's Working Now**

- ✅ **Homepage** with hero section and featured products
- ✅ **Product listing** with filtering and sorting
- ✅ **Shopping cart** with local storage persistence
- ✅ **Authentication** with Clerk (sign-in/sign-up)
- ✅ **Responsive design** across all devices
- ✅ **Product cards** with add to cart functionality

## 🚀 **Current Features**

1. **Browse Products**: View all products with category filtering
2. **Add to Cart**: Add items with size/color selection
3. **Cart Management**: View, update quantities, remove items
4. **User Authentication**: Sign up/sign in with Clerk
5. **Responsive Design**: Works on mobile, tablet, and desktop
