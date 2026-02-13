import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should display the header with logo', async ({ page }) => {
    const logo = page.getByText('Stride & Style');
    await expect(logo).toBeVisible();
  });

  test('should display the hero section', async ({ page }) => {
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
  });

  test('should display "Shop by Category" section', async ({ page }) => {
    const categoryHeading = page.getByText('Shop by Category');
    await expect(categoryHeading).toBeVisible();
  });

  test('should display category cards for Shoes and Clothing', async ({ page }) => {
    const shoesCategory = page.getByRole('heading', { name: 'Premium Shoes' });
    const clothingCategory = page.getByRole('heading', { name: 'Mens Clothing' });

    await expect(shoesCategory).toBeVisible();
    await expect(clothingCategory).toBeVisible();
  });

  test('should have a working cart icon in the header', async ({ page }) => {
    const cartLink = page.locator('a[href="/cart"]');
    await expect(cartLink).toBeVisible();
  });
});
