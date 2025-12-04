// @ts-check
import { test, expect } from '@playwright/test';

test('teste de login com sucesso', async ({ page }) => {
  // Navegar para a página de login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
