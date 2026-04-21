import { test, expect } from '@playwright/test';

test('capture google jules screenshot', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForSelector('#home-screen');

  // Take screenshot of the initial state
  await page.screenshot({ path: 'screenshots/initial.png' });

  // Open Edge Panel
  await page.click('#edge-handle');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/edge-panel-open.png' });

  // Open Jules Overlay
  await page.click('#jules-trigger');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/jules-overlay-open.png' });

  // Trigger SmartThings response
  await page.click('#smart-things-btn');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/jules-response.png' });
});
