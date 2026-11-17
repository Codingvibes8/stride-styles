import Stripe from "stripe";

let client: Stripe | null = null;

/**
 * Lazily create the Stripe client so importing this module does not require
 * STRIPE_SECRET_KEY at build time (only when a checkout is actually created).
 */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
  }

  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    });
  }

  return client;
}
