import { test, expect } from '@playwright/test';
import { readFileSync, writeFileSync } from 'fs';

// function get_storage(): any {
//   const storage = readFileSync('storage.txt', 'utf8') || '';
//   return JSON.parse(storage);
// }

// const _storage = get_storage();


test('Comprobar que el usuario se autentica', async ({ page }) => {
  // const storage: any = _storage;
  // Get test name
  const testName = 'auto-login';
  await page.goto('http://localhost:4200/');
  await page.screenshot({ path: `screenshots/${testName}/auto-login.png` });
  // await page.evaluate((storage) => {
  //   Object.keys(storage).forEach((key) => {
  //     const value = storage[key];
  //     localStorage.setItem(key, value);
  //   });
  // }, storage);
  await page.waitForTimeout(4000);
  await page.goto('http://localhost:4200/authenticated');

  await page.locator('.user > i').first();
  await page.locator('b').filter({ hasText: 'd.romero@alicunde.com' });
  await page.screenshot();
  await page.screenshot({ path: `screenshots/${testName}/auto-login-2.png` });
  // SAve sotrage
  const storageState = await page.context().storageState();
  const storageJson = JSON.stringify(storageState, null, 2);
  writeFileSync('auth.json', storageJson);
});
