import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('should load the products page', async ({ page }) => {
    await page.goto('/products');
    expect(page.url()).toContain('/products');
  });

  test('should display product content', async ({ page }) => {
    await page.goto('/products');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should navigate to shoes category', async ({ page }) => {
    await page.goto('/products/shoes');
    expect(page.url()).toContain('/products/shoes');
  });

  test('should navigate to clothing category', async ({ page }) => {
    await page.goto('/products/clothing');
    expect(page.url()).toContain('/products/clothing');
  });
});
