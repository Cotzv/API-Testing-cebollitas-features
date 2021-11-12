@Pages
Feature: Pages

      Background:
        Given I have valid credentials

    @RetrieveAll-Pages @Pages-CRUD
    Scenario: Verify that all published pages are shown
        When I execute a GET request to pages endpoint
        Then the status code should be 200 OK
        And the response should be an array
        And a page has publish status

    @RetrieveById-Pages @Pages-CRUD
    Scenario: Verify that a page is shown
        When I execute a GET request to pages/{id} endpoint
        Then the status code should be 200 OK
        And the response should be an object

    @Create-Pages @Pages-CRUD
    Scenario Outline: Verify that a page is created
        And I have a <payload> payload and <feature> feature
        When I execute a POST request to pages endpoint
        Then the status code should be 201 Created
        And the page is created
        And the response should be an object
        And the page is deleted
        Examples:
            | payload | feature |
            | POST    | Pages   |

    @Update-Pages @Pages-CRUD
    Scenario Outline: Verify that a page is updated with a PUT request
        And I have a <payload> payload and <feature> feature
        When I execute a PUT request to pages/{id} endpoint
        Then the status code should be 200 OK
        And the page is updated
        And the response should be an object
        Examples:
            | payload | feature |
            | PUT     | Pages   |

    @Update-Pages @Pages-CRUD
    Scenario Outline: Verify that a page is updated with a POST request
        And I have a <payload> payload and <feature> feature
        When I execute a POST request to pages/{id} endpoint
        Then the status code should be 200 OK
        And the page is updated
        And the response should be an object
        Examples:
            | payload | feature |
            | PUT     | Pages   |

    @Delete-Pages @Pages-CRUD
    Scenario: Verify that a page is deleted
        When I execute a DELETE request to pages/{id} endpoint
        Then the status code should be 200 OK
        And the response should be an object
        And the page is deleted
