const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

When('the user adds the first product to cart from home', async function () {
  await this.homePage.addFirstProductToCart();
});

When('the user clicks view cart in the modal', async function () {
  await this.homePage.clickViewCartInModal();
});

Then('the cart should contain at least {int} item', async function (minItems) {
  await this.driver.sleep(500);
  const count = await this.cartPage.getCartItemCount();
  expect(count).to.be.at.least(minItems);
});

When('the user removes the first item from the cart', async function () {
  await this.cartPage.removeFirstItem();
  await this.driver.sleep(500);
});

Then('the cart should be empty', async function () {
  await this.driver.sleep(500);
  const empty = await this.cartPage.isCartEmpty();
  expect(empty).to.be.true;
});

When('the user proceeds to checkout', async function () {
  await this.cartPage.clickProceedToCheckout();
  await this.driver.sleep(500);
});

Then('the user should be on the checkout page', async function () {
  const url = await this.driver.getCurrentUrl();
  expect(url).to.include('checkout');
});

Then('the order summary should be displayed', async function () {
  const displayed = await this.checkoutPage.isOrderSummaryDisplayed();
  expect(displayed).to.be.true;
});

Given('the user has a product in the cart', async function () {
  await this.homePage.open();
  await this.homePage.addFirstProductToCart();
  await this.homePage.clickViewCartInModal();
  await this.driver.sleep(500);
});

When('the user navigates to checkout', async function () {
  await this.cartPage.clickProceedToCheckout();
  await this.driver.sleep(500);
});

Then('the delivery address section should be visible', async function () {
  const visible = await this.checkoutPage.isAddressDisplayed();
  expect(visible).to.be.true;
});
