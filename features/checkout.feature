@checkout
Feature: Cart and checkout

  As a shopper
  I want to add products to cart and complete checkout
  So that I can purchase items

  Scenario: Add product to cart
    Given the user is on the home page
    When the user adds the first product to cart from home
    And the user clicks view cart in the modal
    Then the cart should contain at least 1 item

  Scenario: Remove product from cart
    Given the user is on the home page
    And the user adds the first product to cart from home
    And the user clicks view cart in the modal
    When the user removes the first item from the cart
    Then the cart should be empty

  Scenario: Proceed to checkout
    Given the user is on the home page
    And the user adds the first product to cart from home
    And the user clicks view cart in the modal
    When the user proceeds to checkout
    Then the user should be on the checkout page
    And the order summary should be displayed

  Scenario: Validate order summary
    Given the user has a product in the cart
    When the user navigates to checkout
    Then the order summary should be displayed
    And the delivery address section should be visible
