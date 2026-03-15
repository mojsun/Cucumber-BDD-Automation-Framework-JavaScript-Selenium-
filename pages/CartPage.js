const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

/**
 * Page Object for Automation Exercise Cart page (view_cart).
 * Handles cart contents, remove item, and proceed to checkout.
 */
class CartPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = '/view_cart';
  }

  get cartItems() {
    return By.css('#cart_info_table tbody tr');
  }

  get removeItemButtons() {
    return By.css('.cart_quantity_delete');
  }

  get emptyCartMessage() {
    return By.xpath("//p[contains(text(),'Cart is empty')]");
  }

  get checkoutButton() {
    return By.css('a.check_out');
  }

  get proceedToCheckoutButton() {
    return By.css('a[href="/checkout"]');
  }

  async open() {
    await this.navigate(this.url);
  }

  async getCartItemCount() {
    const rows = await this.driver.findElements(this.cartItems);
    return rows.length;
  }

  async removeFirstItem() {
    const buttons = await this.driver.findElements(this.removeItemButtons);
    if (buttons.length > 0) {
      await this.click(this.removeItemButtons);
    }
  }

  async isCartEmpty() {
    return this.isDisplayed(this.emptyCartMessage);
  }

  async clickProceedToCheckout() {
    await this.click(this.checkoutButton);
  }
}

module.exports = CartPage;
