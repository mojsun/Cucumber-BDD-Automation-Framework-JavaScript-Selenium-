@search
Feature: Product search

  As a shopper
  I want to search for products
  So that I can find items I am interested in

  Scenario: Search product
    Given the user is on the home page
    When the user searches for "Blue Top"
    Then the search results should contain products
    And the search results should include "Blue Top"

  Scenario: Validate search results
    Given the user is on the home page
    When the user searches for "Dress"
    Then the search results should contain products
    And at least one product should match the search term "Dress"

  Scenario: Search from products page
    Given the user navigates to the products page
    When the user searches for "Tshirt" on products page
    Then the products page should display search results
