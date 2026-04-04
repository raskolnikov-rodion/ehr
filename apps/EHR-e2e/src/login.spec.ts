import { test, expect } from '@playwright/test';

test.describe('Login journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('unauthenticated user is redirected to /login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login/);
  });

  test('shows validation errors when both fields are blurred empty', async ({
    page,
  }) => {
    await page.getByTestId('email-input').click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(page.getByTestId('email-error')).toBeVisible();
    await expect(page.getByTestId('password-error')).toBeVisible();
  });

  test('shows email format error for invalid email', async ({ page }) => {
    await page.getByTestId('email-input').fill('notanemail');
    await page.keyboard.press('Tab');

    await expect(page.getByTestId('email-error')).toContainText(
      'Enter a valid email address.',
    );
  });

  test('shows error message for wrong credentials', async ({ page }) => {
    await page.getByTestId('email-input').fill('doctor@ehr.demo');
    await page.getByTestId('password-input').fill('wrongPassword');
    await page.getByTestId('submit-button').click();

    await expect(page.getByTestId('login-error')).toContainText(
      'Incorrect email or password.',
    );
  });

  test('successful login navigates to /dashboard', async ({ page }) => {
    await page.getByTestId('email-input').fill('doctor@ehr.demo');
    await page.getByTestId('password-input').fill('doctorPassword');
    await page.getByTestId('submit-button').click();

    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('logged-in user is redirected away from /login', async ({ page }) => {
    await page.getByTestId('email-input').fill('doctor@ehr.demo');
    await page.getByTestId('password-input').fill('doctorPassword');
    await page.getByTestId('submit-button').click();
    await expect(page).toHaveURL(/\/dashboard/);

    await page.goto('/login');
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
