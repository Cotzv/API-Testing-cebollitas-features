@Users
Feature: Users

@GET @DataDriven
Scenario Outline: A user should be able to retrieve all users - Data Driven
    Given I have valid credentials
    When I execute a <verb> request to <endpoint> endpoint
    Then the status code should be <statusCode> <statusText>

    Examples:
    | verb | endpoint      | statusCode | statusText |
    | GET  | users         | 200        | OK         |
    | GET  | users/1       | 200        | OK         |


@PUT @DataDriven 
Scenario Outline: A admin user should be able to update a user's description
    Given I have valid credentials
        And I have a <payload> payload and <feature> feature
    When I execute a PUT request to users/{id} endpoint
    Then the user is updated
        And the status code should be 200 OK
    Examples:
        | payload                      | feature  |
        | PUT                          | Users    |
        | NegativeDescription          | Users    |
        | FloatingDescription          | Users    |
        | StringDescription            | Users    |
        | SpecialCharactersDescription | Users    |
        
@PUT @Negative @DataDriven 
Scenario Outline: A admin user shouldn't be able to update a user's nickname
    Given I have valid credentials
        And I have a <payload> payload and <feature> feature
    When I execute a PUT request to users/{id} endpoint
    Then the user is updated
        And the status code should be 200 OK
    Examples:
        | payload                 | feature  |
        | NegativeLocale          | Users    |
        | FloatingLocale          | Users    |
        | StringLocale            | Users    |
        | SpecialCharactersLocale | Users    |

@GET @Negative @DataDriven @RetrieveById @InvalidCredetials
Scenario Outline: A user shouldn't be able to retrieve any user - Data Driven
    Given I have invalid credentials
    When I execute a <verb> request to <endpoint> endpoint
    Then the status code should be <statusCode> <statusText>

    Examples:
    | verb | endpoint      | statusCode | statusText |
    | GET  | users         | 403        | Forbidden  |
    | GET  | users/1       | 403        | Forbidden  |

@GET @Negative @DataDriven @RetrieveById
Scenario Outline: A user shouldn't be able to retrieve a user with invalid values
   Given I have valid credentials
   When I execute a GET request to <endpoint> endpoint
   Then the status code should be <statusCode> <statusText>
   And the error code should be <errorMessage>
   Examples: 
    | endpoint     | statusCode |  statusText | errorMessage          |
    | users/-1     | 404        |  Not Found  | rest_no_route         |
    | users/2.3    | 404        |  Not Found  | rest_no_route         |
    | users/fasd   | 404        |  Not Found  | rest_no_route         |
    | users/0      | 404        |  Not Found  | rest_user_invalid_id  |
    | users/""     | 404        |  Not Found  | rest_no_route         |
