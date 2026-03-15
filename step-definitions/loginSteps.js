const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

// Valid test credentials - automationexercise.com accepts any registered user
// For demo we use a known pattern; in real projects use test data or env vars
const VALID_EMAIL = process.env.TEST_LOGIN_EMAIL || 'qaautomation@test.com';
const VALID_PASSWORD = process.env.TEST_LOGIN_PASSWORD || 'Test123!';

When('the user enters valid credentials', async function () {
  await this.loginPage.enterLoginCredentials(VALID_EMAIL, VALID_PASSWORD);
});

When('the user enters email {string} and password {string}', async function (email, password) {
  this.lastEmail = email;
  this.lastPassword = password;
  await this.loginPage.enterLoginCredentials(email, password);
});

When('the user clicks login', async function () {
  await this.loginPage.clickLoginButton();
});

When('the user clicks logout', async function () {
  await this.homePage.clickLogout();
});

Given('the user is logged in', async function () {
  await this.homePage.open();
  await this.homePage.clickSignupLogin();
  await this.loginPage.login(VALID_EMAIL, VALID_PASSWORD);
  await this.driver.sleep(1000);
});

Then('the user should be redirected to the dashboard', async function () {
  await this.driver.sleep(1000);
  const url = await this.driver.getCurrentUrl();
  expect(url).to.not.include('/login');
  const loggedIn = await this.homePage.isLoggedIn();
  expect(loggedIn).to.be.true;
});

Then('the user should see {string} in the header', async function (text) {
  const loggedIn = await this.homePage.isLoggedIn();
  expect(loggedIn).to.be.true;
});

Then('the user should see an error message {string}', async function (expectedMessage) {
  await this.driver.sleep(500);
  const message = await this.loginPage.getLoginErrorMessage();
  expect(message).to.include(expectedMessage);
});

Then('the user should be on the login page', async function () {
  await this.driver.sleep(500);
  const url = await this.driver.getCurrentUrl();
  expect(url).to.include('login');
});
