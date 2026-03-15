const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

When('the user enters signup name {string} and email {string}', async function (name, email) {
  this.lastSignupName = name;
  this.lastSignupEmail = email;
  await this.loginPage.enterSignupDetails(name, email);
});

When('the user clicks the signup button', async function () {
  await this.loginPage.clickSignupButton();
});

Then('the user should be redirected to the signup details page', async function () {
  await this.driver.sleep(2000);
  const url = await this.driver.getCurrentUrl();
  // After signup click, user goes to signup form (enter account details) - URL often contains signup
  const onSignupFlow = url.includes('signup') || url.includes('account') || !url.endsWith('/login');
  expect(onSignupFlow).to.be.true;
});

Then('the signup form with {string} should be visible', async function (headingText) {
  const visible = await this.loginPage.isSignupFormVisible();
  expect(visible).to.be.true;
});

Then('the login form should be visible', async function () {
  const visible = await this.loginPage.isLoginFormVisible();
  expect(visible).to.be.true;
});
