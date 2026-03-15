const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

/**
 * Page Object for Automation Exercise Checkout page.
 * Handles address details, order review, and place order.
 */
class CheckoutPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = '/checkout';
  }

  get addressDetailsSection() {
    return By.css('#address_delivery, .address_delivery');
  }

  get orderSummaryTable() {
    return By.css('#cart_info_table, .cart_info_table');
  }

  get placeOrderButton() {
    return By.css('a[href="/payment"]');
  }

  get orderItems() {
    return By.css('#cart_info_table tbody tr, .cart_info_table tbody tr');
  }

  get commentTextarea() {
    return By.css('textarea[name="message"]');
  }

  async open() {
    await this.navigate(this.url);
  }

  async isOrderSummaryDisplayed() {
    return this.isDisplayed(this.orderSummaryTable);
  }

  async isAddressDisplayed() {
    return this.isDisplayed(this.addressDetailsSection);
  }

  async getOrderItemCount() {
    const items = await this.driver.findElements(this.orderItems);
    return items.length;
  }

  async clickPlaceOrder() {
    await this.click(this.placeOrderButton);
  }

  async enterComment(text) {
    await this.sendKeys(this.commentTextarea, text);
  }
}

module.exports = CheckoutPage;
