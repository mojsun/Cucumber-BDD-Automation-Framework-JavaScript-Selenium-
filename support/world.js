const { setWorldConstructor } = require('@cucumber/cucumber');
const { createDriver } = require('./driver');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

/**
 * Custom World object that holds driver and page instances.
 * Provides shared context across step definitions.
 */
class CustomWorld {
  constructor() {
    this.driver = null;
    this.homePage = null;
    this.loginPage = null;
    this.productPage = null;
    this.cartPage = null;
    this.checkoutPage = null;
  }

  async init() {
    this.driver = await createDriver();
    this.homePage = new HomePage(this.driver);
    this.loginPage = new LoginPage(this.driver);
    this.productPage = new ProductPage(this.driver);
    this.cartPage = new CartPage(this.driver);
    this.checkoutPage = new CheckoutPage(this.driver);
  }

  getDriver() {
    return this.driver;
  }
}

setWorldConstructor(CustomWorld);
