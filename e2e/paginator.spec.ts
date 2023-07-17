import { chromium, Browser, Page } from 'playwright';
import { test, expect } from '@playwright/test';

let browser: Browser;
let page: Page;

test.beforeEach(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

test.afterEach(async () => {
  await browser.close();
});

test.describe('Main Page', () => {
  test.beforeEach(async () => {
    await page.goto('http://localhost:5173/');
  });

  test('should display search input', async () => {
    await page.waitForSelector('input[type="search"]');
  });

  test.describe('Paginator', () => {
    test.beforeEach(async () => {
      await page.fill('input[type="search"]', 'js');
      await page.click('button[type="submit"]');
      await page.waitForSelector('._name_15jxo_65');
    });

    test('should display the paginator', async () => {
      await page.waitForSelector('._li_108bx_21');
      const paginatorExists = await page.isVisible('._li_108bx_21');
      expect(paginatorExists).toBe(true);
    });

    test('should display the correct number of pages', async () => {
      await page.waitForSelector('._li_108bx_21');
      const pageCount = await page.$$eval('._li_108bx_21', (elements) => elements.length);
      expect(pageCount).toBe(10);
    });
  });
});