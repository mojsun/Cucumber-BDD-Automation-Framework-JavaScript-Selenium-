const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

/**
 * Page Object for Automation Exercise home page.
 * Handles navigation, login/signup link, and product actions.
 */
class HomePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = '/';
  }

  // Locators
  get signupLoginLink() {
    return By.css('a[href="/login"]');
  }

  get logoutLink() {
    return By.css('a[href="/logout"]');
  }

  get loggedInAs() {
    return By.xpath("//a[contains(text(),'Logged in as')]");
  }

  get productsLink() {
    return By.css('a[href="/products"]');
  }

  get cartLink() {
    return By.css('a[href="/view_cart"]');
  }

  get searchInput() {
    return By.id('search_product');
  }

  get searchButton() {
    return By.id('submit_search');
  }

  get firstProductAddToCart() {
    return By.css('.productinfo .add-to-cart');
  }

  get viewCartModalButton() {
    return By.css('.modal-footer a[href="/view_cart"]');
  }

  get continueShoppingModalButton() {
    return By.css('.modal-footer .btn-success');
  }

  get productNames() {
    return By.css('.productinfo p');
  }

  async open() {
    await this.navigate(this.url);
  }

  async clickSignupLogin() {
    await this.click(this.signupLoginLink);
  }

  async clickLogout() {
    await this.click(this.logoutLink);
  }

  async isLoggedIn() {
    return this.isDisplayed(By.xpath("//a[contains(text(),'Logged in as')]"));
  }

  async goToProducts() {
    await this.click(this.productsLink);
  }

  async goToCart() {
    await this.click(this.cartLink);
  }

  async searchProduct(query) {
    await this.sendKeys(this.searchInput, query);
    await this.click(this.searchButton);
  }

  async addFirstProductToCart() {
    const addButtons = await this.driver.findElements(By.css('.productinfo .add-to-cart'));
    if (addButtons.length === 0) {
      throw new Error('No add-to-cart buttons found on home page');
    }
    await this.driver.executeScript('arguments[0].scrollIntoView({block: "center"});', addButtons[0]);
    await this.sleep(400);
    await addButtons[0].click();
  }

  async clickViewCartInModal() {
    await this.driver.sleep(500);
    await this.click(this.viewCartModalButton);
  }

  async getSearchResultProductNames() {
    const elements = await this.driver.findElements(this.productNames);
    return Promise.all(elements.map((el) => el.getText()));
  }
}

module.exports = HomePage;
