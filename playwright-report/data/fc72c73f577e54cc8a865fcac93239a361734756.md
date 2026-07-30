# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portal.spec.ts >> login screen appears
- Location: tests\portal.spec.ts:10:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:3000/
Call log:
  - navigating to "http://127.0.0.1:3000/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('has title', async ({ page }) => {
  4  |     await page.goto('/');
  5  | 
  6  |     // Expect a title "to contain" a substring.
  7  |     await expect(page).toHaveTitle(/MFC Youth Tarlac \| Activity & Attendance Portal/);
  8  | });
  9  | 
  10 | test('login screen appears', async ({ page }) => {
> 11 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:3000/
  12 | 
  13 |     // Ensure the app initializes and shows the auth view
  14 |     const authView = page.locator('#auth-login-overlay');
  15 |     await expect(authView).toBeVisible();
  16 | 
  17 |     // Ensure the passcode input exists
  18 |     const passcodeInput = page.locator('#auth-login-password');
  19 |     await expect(passcodeInput).toBeVisible();
  20 | });
  21 | 
```