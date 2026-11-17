import { config } from "dotenv";
import { writeFileSync } from "node:fs";
import Stripe from "stripe";

import { catalogItemKey, catalogProducts } from "../constants/catalog";

config({ path: ".env.local" });
config();

const ACCOUNT_ID = process.env.STRIPE_ACCT_ID || "acct_1Uct7APnkwbIA9hV";
const API_KEY = process.env.STRIPE_SECRET_KEY;
const REPORT_PATH = "stripe-catalog.json";
const APP_TAG = "stride-and-style";

if (!API_KEY) {
  console.error(
    "STRIPE_SECRET_KEY is not set. Provide a test-mode secret key for " + ACCOUNT_ID + "."
  );
  process.exit(1);
}

const stripe = new Stripe(API_KEY, {
  apiVersion: "2026-01-28.clover",
  typescript: true,
});

type ReportRow = {
  itemKey: string;
  name: string;
  amount: number;
  productId: string;
  priceId: string;
  action: "created" | "updated" | "unchanged";
};

async function listAllProducts(): Promise<Stripe.Product[]> {
  const all: Stripe.Product[] = [];
  let startingAfter: string | undefined;

  do {
    const page = await stripe.products.list({ limit: 100, starting_after: startingAfter });
    all.push(...page.data);
    startingAfter = page.has_more ? page.data[page.data.length - 1]?.id : undefined;
  } while (startingAfter);

  return all;
}

function absoluteImages(images: string[]): string[] {
  return images
    .filter((img) => img.startsWith("http://") || img.startsWith("https://"))
    .slice(0, 8);
}

async function main() {
  // 1. Confirm the key really belongs to the requested account.
  const account = await stripe.accounts.retrieve();
  if (account.id !== ACCOUNT_ID) {
    console.error(
      `Connected account is ${account.id} (${account.settings?.dashboard?.display_name ?? "unknown"}), ` +
        `but ${ACCOUNT_ID} was requested. Refusing to provision into the wrong account.`
    );
    process.exit(1);
  }

  const mode = API_KEY!.startsWith("sk_live_") ? "LIVE" : "test";
  console.log(`Connected to ${account.id} in ${mode} mode.`);

  // 2. Index existing catalog products by their stable metadata key.
  const existingProducts = await listAllProducts();
  const byItemKey = new Map<string, Stripe.Product>();
  for (const product of existingProducts) {
    if (product.metadata?.app === APP_TAG && product.metadata?.item_key) {
      byItemKey.set(product.metadata.item_key, product);
    }
  }

  const report: ReportRow[] = [];

  // 3. Upsert products + one-time USD prices.
  for (const item of catalogProducts) {
    const itemKey = catalogItemKey(item.name);
    const amount = Math.round(item.price * 100);
    const metadata: Stripe.MetadataParam = {
      app: APP_TAG,
      item_key: itemKey,
      category: item.category,
      subcategory: item.subcategory,
    };

    let product = byItemKey.get(itemKey);
    let action: ReportRow["action"] = "unchanged";

    if (!product) {
      product = await stripe.products.create(
        {
          name: item.name,
          description: item.description || undefined,
          images: absoluteImages(item.images),
          metadata,
        },
        { idempotencyKey: `${APP_TAG}:product:${itemKey}` }
      );
      action = "created";
    } else {
      const needsUpdate =
        product.name !== item.name ||
        (product.description ?? "") !== (item.description ?? "") ||
        product.images.length !== absoluteImages(item.images).length;

      if (needsUpdate) {
        product = await stripe.products.update(product.id, {
          name: item.name,
          description: item.description || undefined,
          images: absoluteImages(item.images),
          metadata,
        });
        action = "updated";
      }
    }

    // Reuse a matching default price, otherwise create one and make it default.
    let priceId = typeof product.default_price === "string" ? product.default_price : product.default_price?.id;

    if (priceId) {
      const current = await stripe.prices.retrieve(priceId);
      const matches =
        current.currency === "usd" &&
        current.unit_amount === amount &&
        current.type === "one_time" &&
        current.active;
      if (!matches) priceId = undefined;
    }

    if (!priceId) {
      const price = await stripe.prices.create(
        {
          product: product.id,
          currency: "usd",
          unit_amount: amount,
          metadata: { app: APP_TAG, item_key: itemKey },
        },
        { idempotencyKey: `${APP_TAG}:price:${itemKey}:usd:${amount}` }
      );
      priceId = price.id;
      await stripe.products.update(product.id, { default_price: priceId });
      if (action === "unchanged") action = "updated";
    }

    report.push({
      itemKey,
      name: item.name,
      amount,
      productId: product.id,
      priceId: priceId!,
      action,
    });

    console.log(
      `  ${action.padEnd(9)} ${product.id}  ${priceId}  $${(amount / 100).toFixed(2).padStart(8)}  ${item.name}`
    );
  }

  writeFileSync(
    REPORT_PATH,
    JSON.stringify(
      {
        accountId: account.id,
        mode,
        generatedAt: new Date().toISOString(),
        products: report,
      },
      null,
      2
    ) + "\n"
  );

  const created = report.filter((r) => r.action === "created").length;
  const updated = report.filter((r) => r.action === "updated").length;
  console.log(
    `\nDone: ${created} created, ${updated} updated, ${report.length - created - updated} unchanged.`
  );
  console.log(`Wrote ${REPORT_PATH}.`);
}

main().catch((error) => {
  console.error("Stripe provisioning failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
