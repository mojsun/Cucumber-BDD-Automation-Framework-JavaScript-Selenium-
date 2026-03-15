const { Before, After, Status } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');

/**
 * Before hook: Initialize WebDriver and page objects before each scenario.
 */
Before(async function () {
  await this.init();
});

/**
 * After hook: Quit driver and capture screenshot on failure.
 */
After(async function (result) {
  if (this.driver) {
    if (result.status === Status.FAILED) {
      try {
        const screenshot = await this.driver.takeScreenshot();
        const reportsDir = path.join(process.cwd(), 'reports', 'screenshots');
        if (!fs.existsSync(reportsDir)) {
          fs.mkdirSync(reportsDir, { recursive: true });
        }
        const filename = `failure_${Date.now()}.png`;
        fs.writeFileSync(path.join(reportsDir, filename), screenshot, 'base64');
        this.attach(screenshot, 'image/png');
      } catch (e) {
        // Ignore screenshot errors
      }
    }
    await this.driver.quit();
  }
});
