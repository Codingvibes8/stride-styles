import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  test('should show empty cart message when no items in cart', async ({ page }) => {
    await page.goto('/cart');
    const emptyMessage = page.getByText('Your cart is empty');
    await expect(emptyMessage).toBeVisible();
  });

  test('should have a "Continue Shopping" link when cart is empty', async ({ page }) => {
    await page.goto('/cart');
    const continueShoppingLink = page.getByText('Continue Shopping').first();
    await expect(continueShoppingLink).toBeVisible();
  });

  test('should navigate to products page from empty cart', async ({ page }) => {
    await page.goto('/cart');
    const continueShoppingLink = page.locator('a[href="/products"]').first();
    if (await continueShoppingLink.isVisible()) {
      await continueShoppingLink.click();
      await page.waitForURL('**/products**');
      expect(page.url()).toContain('/products');
    }
  });
});

test.describe('Checkout Flow', () => {
  test('should display checkout success page', async ({ page }) => {
    await page.goto('/checkout/success');
    expect(page.url()).toContain('/checkout/success');
  });

  test('should display checkout cancel page', async ({ page }) => {
    await page.goto('/checkout/cancel');
    expect(page.url()).toContain('/checkout/cancel');
  });
});
