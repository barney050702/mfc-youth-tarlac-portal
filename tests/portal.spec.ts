import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/MFC Youth Tarlac \| Activity & Attendance Portal/);
});

test('login screen appears', async ({ page }) => {
  await page.goto('/');

  // Ensure the app initializes and shows the auth view
  const authView = page.locator('#auth-login-overlay');
  await expect(authView).toBeVisible();

  // Ensure the passcode input exists
  const passcodeInput = page.locator('#auth-login-password');
  await expect(passcodeInput).toBeVisible();
});
