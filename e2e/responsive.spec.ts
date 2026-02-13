import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should show mobile menu button on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();
  });

  test('should hide desktop nav on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const desktopNav = page.locator('nav.hidden.md\\:flex');
    await expect(desktopNav).toBeHidden();
  });

  test('should show desktop nav on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const desktopNav = page.locator('nav.hidden.md\\:flex');
    await expect(desktopNav).toBeVisible();
  });

  test('should display correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const logo = page.getByText('Stride & Style');
    await expect(logo).toBeVisible();
  });
});
