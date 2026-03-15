const { By, until } = require('selenium-webdriver');

/**
 * Base Page Object - provides common WebDriver operations and explicit waits.
 * All page objects extend this for consistent behavior and maintainability.
 */
class BasePage {
  constructor(driver, baseUrl = 'https://automationexercise.com') {
    this.driver = driver;
    this.baseUrl = baseUrl;
    this.defaultTimeout = 15000;
  }

  async navigate(path = '') {
    const url = path ? `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}` : this.baseUrl;
    await this.driver.get(url);
  }

  async findElement(locator) {
    await this.driver.wait(until.elementLocated(locator), this.defaultTimeout);
    return this.driver.findElement(locator);
  }

  async findElements(locator) {
    await this.driver.wait(until.elementsLocated(locator), this.defaultTimeout);
    return this.driver.findElements(locator);
  }

  async click(locator) {
    const element = await this.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), this.defaultTimeout);
    await this.driver.executeScript('arguments[0].scrollIntoView({block: "center"});', element);
    await this.driver.sleep(300);
    await element.click();
  }

  async sendKeys(locator, text) {
    const element = await this.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), this.defaultTimeout);
    await element.clear();
    await element.sendKeys(text);
  }

  async getText(locator) {
    const element = await this.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), this.defaultTimeout);
    return element.getText();
  }

  async isDisplayed(locator) {
    try {
      const element = await this.findElement(locator);
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }

  async getCurrentUrl() {
    return this.driver.getCurrentUrl();
  }

  async waitForUrlContains(partialUrl, timeout = this.defaultTimeout) {
    await this.driver.wait(until.urlContains(partialUrl), timeout);
  }

  async sleep(ms) {
    await this.driver.sleep(ms);
  }
}

module.exports = BasePage;
