import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type { CartItem } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { items } = (await request.json()) as { items: CartItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    const origin = request.nextUrl.origin;

    // Create line items for Stripe Checkout
    const lineItems = items.map((item) => {
      // Convert relative image paths to absolute URLs for Stripe
      const images = (item.product?.images || [])
        .slice(0, 1) // Stripe allows max 8 images, we use 1
        .map((img: string) => {
          // If already an absolute URL, use as-is
          if (img.startsWith("http://") || img.startsWith("https://")) {
            return img;
          }
          // Convert relative path to absolute URL
          return `${origin}${img.startsWith("/") ? "" : "/"}${img}`;
        })
        .filter((url: string) => {
          // Validate URL format
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        });

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product?.name || "Product",
            description: `Size: ${item.size}, Color: ${item.color}`,
            images,
          },
          unit_amount: Math.round((item.product?.price || 0) * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB"],
      },
      billing_address_collection: "required",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
