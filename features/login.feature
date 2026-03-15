@login
Feature: User login

  As a registered user
  I want to log in to my account
  So that I can access my profile and make purchases

  Background:
    Given the user navigates to the login page

  Scenario: Successful login
    When the user enters valid credentials
    And the user clicks login
    Then the user should be redirected to the dashboard
    And the user should see "Logged in as" in the header

  Scenario: Login with invalid credentials
    When the user enters email "invalid@example.com" and password "wrongpassword"
    And the user clicks login
    Then the user should see an error message "Your email or password is incorrect!"

  Scenario: Logout functionality
    Given the user is logged in
    When the user clicks logout
    Then the user should be on the login page
