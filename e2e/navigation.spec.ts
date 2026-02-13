import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to products page via shoes link', async ({ page }) => {
    await page.click('nav >> text=Men\'s Shoes');
    await page.waitForURL('**/products**');
    expect(page.url()).toContain('/products');
  });

  test('should navigate to cart page', async ({ page }) => {
    await page.click('a[href="/cart"]');
    await page.waitForURL('**/cart');
    expect(page.url()).toContain('/cart');
  });

  test('should navigate to sign-in page via user icon', async ({ page }) => {
    const signInLink = page.locator('a[href="/sign-in"]');
    if (await signInLink.isVisible()) {
      await signInLink.click();
      await page.waitForURL('**/sign-in**');
      expect(page.url()).toContain('/sign-in');
    }
  });

  test('header should be sticky on scroll', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toHaveCSS('position', 'sticky');
  });
});
