const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

/**
 * Page Object for Automation Exercise Login / Signup page.
 * Handles both login form and new user signup form.
 */
class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = '/login';
  }

  // Login form locators (compatible with automationexercise.com)
  get loginEmailInput() {
    return By.css('.login-form input[type="email"], form[action="/login"] input[type="email"]');
  }

  get loginPasswordInput() {
    return By.css('.login-form input[type="password"], form[action="/login"] input[type="password"]');
  }

  get loginButton() {
    return By.css('.login-form button[type="submit"], form[action="/login"] button[type="submit"]');
  }

  // Signup form locators
  get signupNameInput() {
    return By.css('input[data-qa="signup-name"]');
  }

  get signupEmailInput() {
    return By.css('input[data-qa="signup-email"]');
  }

  get signupButton() {
    return By.css('button[data-qa="signup-button"]');
  }

  // Messages
  get loginErrorMessage() {
    return By.css('.login-form p');
  }

  get signupSectionHeading() {
    return By.xpath("//h2[contains(text(),'New User Signup')]");
  }

  get loginSectionHeading() {
    return By.xpath("//h2[contains(text(),'Login to your account')]");
  }

  async open() {
    await this.navigate(this.url);
  }

  async login(email, password) {
    await this.enterLoginCredentials(email, password);
    await this.clickLoginButton();
  }

  async enterLoginCredentials(email, password) {
    await this.sendKeys(this.loginEmailInput, email);
    await this.sendKeys(this.loginPasswordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async enterSignupDetails(name, email) {
    await this.sendKeys(this.signupNameInput, name);
    await this.sendKeys(this.signupEmailInput, email);
  }

  async clickSignupButton() {
    await this.click(this.signupButton);
  }

  async getLoginErrorMessage() {
    return this.getText(this.loginErrorMessage);
  }

  async isLoginFormVisible() {
    return this.isDisplayed(this.loginSectionHeading);
  }

  async isSignupFormVisible() {
    return this.isDisplayed(this.signupSectionHeading);
  }
}

module.exports = LoginPage;
