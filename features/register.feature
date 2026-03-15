@register
Feature: User registration

  As a new visitor
  I want to register for an account
  So that I can shop and manage my orders

  Scenario: Register new user
    Given the user navigates to the login page
    When the user enters signup name "Test User" and email "testuser@example.com"
    And the user clicks the signup button
    Then the user should be redirected to the signup details page

  Scenario: Validate required fields - signup form visible
    Given the user navigates to the login page
    Then the signup form with "New User Signup!" should be visible

  Scenario: Validate login form visible
    Given the user navigates to the login page
    Then the login form should be visible
