const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

When('the user searches for {string}', async function (query) {
  await this.homePage.searchProduct(query);
  await this.driver.sleep(1000);
});

When('the user searches for {string} on products page', async function (query) {
  await this.productPage.searchProduct(query);
  await this.driver.sleep(1000);
});

Then('the search results should contain products', async function () {
  const count = await this.productPage.getProductCount();
  expect(count).to.be.at.least(1);
});

Then('the search results should include {string}', async function (productName) {
  const names = await this.productPage.getProductNames();
  const found = names.some((name) => name && name.includes(productName));
  expect(found).to.be.true;
});

Then('at least one product should match the search term {string}', async function (term) {
  const names = await this.productPage.getProductNames();
  const found = names.some((name) => name && name.toLowerCase().includes(term.toLowerCase()));
  expect(found).to.be.true;
});

Then('the products page should display search results', async function () {
  const count = await this.productPage.getProductCount();
  expect(count).to.be.at.least(1);
});
