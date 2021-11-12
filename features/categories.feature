@Categories
Feature: Categories

@RetrieveAll-Categories @Categories-CRUD
Scenario: A user should be able to retrieve all categories
    Given I have valid credentials
    When I execute a GET request to categories endpoint
    Then the status code should be 200 OK

@RetrieveById-Categories @Categories-CRUD
Scenario: A user should be able to retrieve a category
    Given I have valid credentials
    When I execute a GET request to categories/{id} endpoint
    Then the status code should be 200 OK

@Create-Categories @Categories-CRUD
Scenario Outline: A user should be able to create a category
    Given I have valid credentials
        And I have a <payload> payload and <feature> feature
    When I execute a POST request to categories endpoint
    Then the category is created
        And the status code should be 201 Created
    Examples:
        | payload | feature       |
        | POST    | Categories    |

@Update-Categories @Categories-CRUD
Scenario Outline: A user should be able to update a category
    Given I have valid credentials
        And I have a <payload> payload and <feature> feature
    When I execute a PUT request to categories/{id} endpoint
    Then the category is updated
        And the status code should be 200 OK
    Examples:
        | payload | feature       |
        | PUT     | Categories    |

#@Delete-Categories @Categories-CRUD
#Scenario Outline: A user should be able to delete a category
#    Given I have valid credentials
#        And I have a <payload> payload and <feature> feature
#    When I execute a DELETE_CATEGORY request to categories/{id} endpoint
#    Then the category is deleted
#       And the status code should be 200 OK
#    Examples:
#        | payload           | feature       |
#        | DELETE_CATEGORY   | Categories    |

@NegativeCategories @UpdateCategoriesNegative
Scenario Outline: A user shouldn't be able to update a category with invalid values
    Given I have valid credentials
        And I have a <payload> payload and <feature> feature
    When I execute a PUT request to categories/{id} endpoint
    Then the status code should be 500 Internal Server Error
    Examples:
    | payload        | feature      |
    | InvalidUpdate  | Categories   |

@NegativeCategoriesDD @RetrieveByIdNegativeCategories
Scenario Outline: A user shouldn't be able to retrieve a post with invalid values
    Given I have valid credentials
    When I execute a GET request to <endpoint> endpoint
    Then the status code should be <statusCode> <statusText>
        And the error code should be <errorMessage>
    Examples: 
    | endpoint          | statusCode |  statusText | errorMessage          |
    | categories/-1     | 404        |  Not Found  | rest_no_route         |
    | categories/1.1    | 404        |  Not Found  | rest_no_route         |
    | categories/a      | 404        |  Not Found  | rest_no_route         |
    | categories/0      | 404        |  Not Found  | rest_term_invalid     |
    | categories/""     | 404        |  Not Found  | rest_no_route         |
