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

test('should search repositories for "js"', async () => {
await page.fill('input[type="search"]', 'js');
await page.click('button[type="submit"]');
await page.waitForSelector('._name_15jxo_65');
});
}); 