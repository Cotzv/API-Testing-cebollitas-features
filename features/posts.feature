@Posts
Feature: Posts

@RetrieveAll @Posts-CRUD
Scenario: A user should be able to retrieve all posts
    Given I have valid credentials
    When I execute a GET request to wp/v2/posts endpoint
    Then the status code should be 200 OK

@RetrieveById @Posts-CRUD
Scenario: A user should be able to retrieve all posts
    Given I have valid credentials
    When I execute a GET request to wp/v2/posts/{id} endpoint
    Then the status code should be 200 OK

@Create @Posts-CRUD
Scenario Outline: A user should be able to create a post
    Given I have valid credentials
        And I have a <payload> And <feature>
    When I execute a POST request to posts endpoint
    Then the post is created
        And the status code should be 201 Created
    Examples:
        | payload | feature  |
        | POST    | PostsById|

@Update @Posts-CRUD
Scenario Outline: A user should be able to update a post
    Given I have valid credentials
        And I have a <payload> And <feature>
    When I execute a POST request to posts/{id} endpoint
    Then the post is updated
        And the status code should be 200 OK
     Examples:
        | payload | feature  |
        | POST    | PostsById|

@Delete @Posts-CRUD
Scenario: A user should be able to delete a post
    Given I have valid credentials
    When I execute a DELETE request to posts/{id} endpoint
    Then the post is deleted
        And the status code should be 200 OK

@NegativePosts @UpdatePostNegative
Scenario Outline: A user shouldn't be able to update a post with invalid values
    Given I have valid credentials
        And I have a <payload> And <feature>
    When I execute a POST request to posts/{id} endpoint
    Then the status code should be 200 OK

    Examples:
    | payload             | feature   |
    | InvalidUpdate       | PostsById |
    | InvalidUpdateNumber | PostsById |

@Negative-Autosaves
Scenario: A user shouldn't be able to retrieve an autosave with invalid id
    Given I have valid credentials
    When I execute a GET request to posts/{id}/autosaves/0 endpoint
    Then the status code should not be 200 OK
        And the payload should be NoRouteWasFound

@NegativePostsDD @RetrieveByIdNegative
Scenario Outline: A user shouldn't be able to retrieve a post with invalid values
    Given I have valid credentials
    When I execute a GET request to <endpoint> endpoint
    Then the status code should be 404 Not Found
    Examples: 
    | endpoint     | 
    | posts/-1     | 
    | posts/2.3    | 
    | posts/fasd   | 
    | posts/0      | 
    | posts/""     | 
