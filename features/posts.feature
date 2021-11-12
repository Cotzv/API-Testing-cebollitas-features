@Posts
Feature: Posts

@RetrieveAll-Posts @Posts-CRUD
Scenario: A user should be able to retrieve all posts
    Given I have valid credentials
    When I execute a GET request to posts endpoint
    Then the status code should be 200 OK

@RetrieveById-Posts @Posts-CRUD
Scenario: A user should be able to retrieve a post
    Given I have valid credentials
    When I execute a GET request to posts/{id} endpoint
    Then the status code should be 200 OK

@Create-Posts @Posts-CRUD
Scenario Outline: A user should be able to create a post
    Given I have valid credentials
        And I have a <payload> payload and <feature> feature
    When I execute a POST request to posts endpoint
    Then the post is created
        And the status code should be 201 Created
    Examples:
        | payload | feature  |
        | POST    | Posts    |

@Update-Posts @Posts-CRUD
Scenario Outline: A user should be able to update a post
    Given I have valid credentials
        And I have a <payload> payload and <feature> feature
    When I execute a PUT request to posts/{id} endpoint
    Then the post is updated
        And the status code should be 200 OK
     Examples:
        | payload | feature  |
        | PUT    | Posts    |

@Delete-Posts @Posts-CRUD
Scenario: A user should be able to delete a post
    Given I have valid credentials
    When I execute a DELETE request to posts/{id} endpoint
    Then the post is deleted
        And the status code should be 200 OK

@NegativePosts @UpdatePostNegative
Scenario Outline: A user shouldn't be able to update a post with invalid values
    Given I have valid credentials
        And I have a <payload> payload and <feature> feature
    When I execute a PUT request to posts/{id} endpoint
    Then the status code should be 400 Bad Request
    Examples:
    | payload        | feature |
    | InvalidUpdate  | Posts   |

@RetrieveAll-Autosaves @Autosaves-CRUD
Scenario: A user should be able to retrieve all posts
    Given I have valid credentials
    When I execute a GET request to posts/{id}/autosaves endpoint
    Then the status code should be 200 OK

@Negative-Autosaves
Scenario: A user shouldn't be able to retrieve an autosave with invalid id
    Given I have valid credentials
    When I execute a GET request to posts/{id}/autosaves/0 endpoint
    Then the status code should be 404 Not Found
        And the error code should be rest_no_route

@NegativePostsDD @RetrieveByIdNegativePosts
Scenario Outline: A user shouldn't be able to retrieve a post with invalid values
    Given I have valid credentials
    When I execute a GET request to <endpoint> endpoint
    Then the status code should be <statusCode> <statusText>
        And the error code should be <errorMessage>
    Examples: 
    | endpoint     | statusCode |  statusText | errorMessage          |
    | posts/-1     | 404        |  Not Found  | rest_no_route         |
    | posts/2.3    | 404        |  Not Found  | rest_no_route         |
    | posts/fasd   | 404        |  Not Found  | rest_no_route         |
    | posts/0      | 404        |  Not Found  | rest_post_invalid_id  |
    | posts/""     | 404        |  Not Found  | rest_no_route         |
