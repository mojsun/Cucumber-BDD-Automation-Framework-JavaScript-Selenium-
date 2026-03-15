const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

const BASE_URL = 'https://automationexercise.com';
const DEFAULT_TIMEOUT = 15000;

/**
 * Creates and configures a Selenium WebDriver instance.
 * Supports Chrome (default) and Firefox with optional headless mode.
 */
async function createDriver() {
  const browser = process.env.BROWSER || 'chrome';
  const headless = process.env.BROWSER_HEADLESS !== 'false';

  let builder = new Builder();

  if (browser === 'firefox') {
    const options = new firefox.Options();
    if (headless) {
      options.headless();
    }
    builder = builder.forBrowser('firefox').setFirefoxOptions(options);
  } else {
    const options = new chrome.Options();
    if (headless) {
      options.addArguments('--headless=new');
    }
    options.addArguments('--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage');
    options.addArguments('--window-size=1920,1080');
    builder = builder.forBrowser('chrome').setChromeOptions(options);
  }

  const driver = await builder.build();
  await driver.manage().setTimeouts({ implicit: DEFAULT_TIMEOUT, pageLoad: 30000 });
  await driver.manage().window().maximize();

  return driver;
}

module.exports = {
  createDriver,
  BASE_URL,
  DEFAULT_TIMEOUT
};
