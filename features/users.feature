@Users
Feature: Users

Background: 
Given background test

@CRUD
Scenario: A user should be able to retrieve all users
    Given I have valid credentials
    When I execute a GET request to users endpoint
    Then the status code should be 200 OK

@DataDriven
Scenario Outline: A user should be able to retrieve all users - Data Driven
    Given I have valid credentials
    When I execute a <verb> request to <endpoint> endpoint
    Then the status code should be <statusCode> <statusText>

    Examples:
    | verb | endpoint      | statusCode | statusText |
    | GET  | users         | 200        | OK         |
    | GET  | users/1       | 200        | OK         |

#@PUT
#Scenario: A admin user should be able to update a user
#    Given I have valid credentials
#        And I have a payload
#        | payload | PUT |
#    When I execute a PUT request to users/{id} endpoint
#    Then the user is updated
#        And the status code should be 200 OK

@PUT
Scenario Outline: A admin user should be able to update a user's nickname
    Given I have valid credentials
        And I have a <payload>
    When I execute a PUT request to users/{id} endpoint
    Then the user is updated
        And the status code should be 200 OK
    Examples:
        | payload      |
        | PUT          |
        | NEGATIVE_PUT |