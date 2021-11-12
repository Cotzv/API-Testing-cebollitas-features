@Autosaves
Feature: Autosaves

@RetrieveAll-Autosaves @Autosaves-CRUD
Scenario: A user should be able to retrieve all autosaves
    Given I have valid credentials
    When I execute a GET request to posts/{id}/autosaves endpoint
    Then the status code should be 200 OK

@Negative-Autosaves @RetrieveAutosave
Scenario: A user shouldn't be able to retrieve an autosave with invalid id
    Given I have valid credentials
    When I execute a GET request to posts/{id}/autosaves/0 endpoint
    Then the status code should be 404 Not Found
        And the error code should be rest_no_route
        