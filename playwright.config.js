const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:4173', channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' },
  webServer: { command: 'python3 -m http.server 4173 --bind 127.0.0.1 --directory build', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI },
});
