@Blocks
Feature: Blocks

@RetrieveAll-Blocks @Blocks-CRUD
Scenario: A user should be able to retrieve all blocks
    Given I have valid credentials
    When I execute a GET request to blocks endpoint
    Then the status code should be 200 OK

@Create-Blocks @Blocks-CRUD
Scenario Outline: A user should be able to create a block
    Given I have valid credentials
        And I have a <payload> payload and <feature> feature
    When I execute a POST request to blocks endpoint
    Then the block is created
        And the status code should be 201 Created
    Examples:
        | payload | feature   |
        | POST    | BlocksById|

@Update-Blocks @Blocks-CRUD
Scenario Outline: A user should be able to update a block
    Given I have valid credentials
        And I have a <payload> payload and <feature> feature
    When I execute a POST request to blocks/{id} endpoint
    Then the block is updated
        And the status code should be 200 OK
     Examples:
        | payload | feature   |
        | POST    | BlocksById|

@Delete-Blocks @Blocks-CRUD
Scenario: A user should be able to delete a block
    Given I have valid credentials
    When I execute a DELETE request to blocks/{id} endpoint
    Then the block is deleted
        And the status code should be 200 OK

@NegativePosts-Blocks @UpdateBlockNegative
Scenario Outline: A user shouldn't be able to retrieve a post with invalid values
    Given I have valid credentials
    When I execute a GET request to <endpoint> endpoint
    Then the status code should be <statusCode> <statusText>
        And the error code should be <errorMessage>

    Examples:
    | endpoint      | statusCode | statusText | errorMessage         |
    | blocks/-6     | 404        | Not Found  | rest_no_route        |
    | blocks/0      | 404        | Not Found  | rest_post_invalid_id |
    | blocks/"""    | 404        | Not Found  | rest_no_route        |
    | blocks/2.3    |  404       | Not Found  | rest_no_route        |
    | blocks/fasd   |  404       | Not Found  | rest_no_route        |

