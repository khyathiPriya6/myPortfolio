const { test, expect } = require('@playwright/test');

for (const width of [320, 375, 768, 1440]) {
  test(`portfolio and Canvas playground work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page).toHaveTitle('Khyathi Priya | Software Engineer');
    await expect(page.locator('h1')).toContainText('Khyathi Priya');
    for (const id of ['about', 'skills', 'experience', 'practice', 'projects']) {
      await expect(page.locator(`section#${id}`)).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width < 861) await page.getByRole('button', { name: /Menu/ }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page).toHaveURL(/#projects$/);
    await page.getByRole('link', { name: 'Khyathi Priya — home' }).click();
    const trigger = page.getByRole('button', { name: 'Open Chaos Triangle playground' });
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    const progress = page.getByRole('progressbar');
    await expect.poll(async () => Number(await progress.getAttribute('aria-valuenow'))).toBeGreaterThan(0);
    // Read actual pixels, catching sizing/timing bugs that mocked Canvas tests cannot.
    expect(await page.locator('canvas').first().evaluate(canvas => {
      const { data } = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
      let painted = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i]) painted += 1;
      return painted;
    })).toBeGreaterThan(100);
    await page.getByRole('button', { name: /Pause/ }).click();
    const pausedCount = await progress.getAttribute('aria-valuenow');
    await page.waitForTimeout(200);
    await expect(progress).toHaveAttribute('aria-valuenow', pausedCount);
    await page.getByRole('button', { name: /Resume/ }).click();
    await page.getByRole('button', { name: 'Fast', exact: true }).click();
    await page.getByRole('button', { name: 'Original 75%' }).click();
    await expect(page.getByRole('button', { name: 'Original 75%' })).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: /Replay from start/ }).click();
    // Native modal focus must stay inside, even across repeated tab presses.
    for (let i = 0; i < 14; i += 1) {
      await page.keyboard.press('Tab');
      expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
    }
    await page.keyboard.press('Shift+Tab');
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    expect(errors).toEqual([]);
    await page.evaluate(() => { document.activeElement.blur(); window.scrollTo({ top: 0, behavior: 'instant' }); });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await page.screenshot({ path: `test-results/portfolio-${width}.png`, fullPage: true });
  });
}

test('reduced motion has static art and opt-in Canvas playback', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.triangle-points')).toHaveCSS('animation-name', 'none');
  await page.getByRole('button', { name: 'Open Chaos Triangle playground' }).click();
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1200');
  await page.getByRole('button', { name: /Resume/ }).click();
  await expect.poll(async () => Number(await page.getByRole('progressbar').getAttribute('aria-valuenow'))).toBeGreaterThan(1200);
  await page.getByRole('button', { name: 'Close playground' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});
