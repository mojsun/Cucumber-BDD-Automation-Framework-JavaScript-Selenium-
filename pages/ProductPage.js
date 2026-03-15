const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

/**
 * Page Object for Automation Exercise Products page and product listing.
 * Handles search results, product grid, and add to cart from products list.
 */
class ProductPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = '/products';
  }

  get searchInput() {
    return By.id('search_product');
  }

  get searchButton() {
    return By.id('submit_search');
  }

  get productItems() {
    return By.css('.productinfo');
  }

  get productNames() {
    return By.css('.productinfo p');
  }

  get addToCartButtons() {
    return By.css('.productinfo .add-to-cart');
  }

  get viewProductLinks() {
    return By.css('.productinfo a[href*="/product_details"]');
  }

  get viewCartLink() {
    return By.css('a[href="/view_cart"]');
  }

  async open() {
    await this.navigate(this.url);
  }

  async searchProduct(query) {
    await this.sendKeys(this.searchInput, query);
    await this.click(this.searchButton);
  }

  async getProductCount() {
    const items = await this.driver.findElements(this.productItems);
    return items.length;
  }

  async getProductNames() {
    const elements = await this.driver.findElements(this.productNames);
    return Promise.all(elements.map((el) => el.getText()));
  }

  async addFirstProductToCart() {
    const buttons = await this.driver.findElements(this.addToCartButtons);
    if (buttons.length === 0) throw new Error('No products to add');
    await this.driver.executeScript('arguments[0].scrollIntoView({block: "center"});', buttons[0]);
    await this.sleep(400);
    await buttons[0].click();
  }

  async addProductToCartByIndex(index) {
    const buttons = await this.driver.findElements(this.addToCartButtons);
    if (index >= buttons.length) throw new Error(`Product index ${index} not found`);
    await this.driver.executeScript('arguments[0].scrollIntoView({block: "center"});', buttons[index]);
    await this.sleep(400);
    await buttons[index].click();
  }

  async clickViewCart() {
    await this.sleep(500);
    await this.click(this.viewCartLink);
  }
}

module.exports = ProductPage;
