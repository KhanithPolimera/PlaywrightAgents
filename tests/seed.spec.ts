import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto("https://itms.gctp.in/");
    await page.getByPlaceholder('example@gmail.com').fill('test_saikhanith@lnttest.com');
    await page.getByPlaceholder('*******').fill('Password@123');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await page.getByTestId('MenuIcon').click();
    await page.getByText('Incident Management').click();
    
  });
});
