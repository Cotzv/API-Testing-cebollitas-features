@Pages
Feature: Pages

#   Background:
#     Given I have a payload for POST
#     And I have a payload for PUT


  @CRUD
  Scenario: A user should be able to retrieve all pages
    Given I have valid credentials
    When I execute a GET request to pages endpoint
    Then the status code should be 200 OK

  @DataDriven
  Scenario: A user should be able to make CRUD requests
    Given I have valid credentials
    # Given I have a payload for <payload>
    # Examples:
    #   | payload |
    #   | POST    |
    #   | PUT     |
    When I execute a <verb> request to <endpoint> endpoint
    Then the status code should be <statusCode> <statusText>
    Examples:
      | verb   | endpoint   | statusCode | statusText |
      | GET    | pages      | 200        | OK         |
      | POST   | pages      | 201        | Created    |
      | GET    | pages/{id} | 200        | OK         |
      | PUT    | pages/{id} | 200        | OK         |
      | DELETE | pages/{id} | 200        | OK         |

  @POST
  Scenario: A User should be able to create a project
    Given I have valid credentials
    And I have a payload
      | payload | POST |
    When I execute a POST request to pages endpoint
    Then the project is created
    And the status code should be 201 Created

#   @PUT @GETDATA
#   Scenario: A User should be able to update a project
#     Given I have valid credentials
#     And I have a payload
#       | payload | PUT |
#     When I execute a PUT request to pages/{id} endpoint
#     Then the page is updated
#     And the status code should be 200 OK

  @SCHEMA @GETDATA
  Scenario: The Get request should return a valid schema
    Given I have valid credentials
    When I execute a GET request to pages/{id} endpoint
    Then the page is validated
    And the status code should be 200 OK