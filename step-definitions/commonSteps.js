const { Given } = require('@cucumber/cucumber');

Given('the user navigates to the login page', async function () {
  await this.homePage.open();
  await this.homePage.clickSignupLogin();
  await this.driver.sleep(500);
});

Given('the user is on the home page', async function () {
  await this.homePage.open();
});

Given('the user navigates to the products page', async function () {
  await this.homePage.open();
  await this.homePage.goToProducts();
  await this.driver.sleep(500);
});
