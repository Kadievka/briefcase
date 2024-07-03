Feature: Users

    Scenario: Bad Request Create User
        When I have not authorization headers
        When I send "/users" "post" request
        Then I should receive 400 statusCode
        Then I should receive "Bad request" message
        Then I should receive internal error with 1001 code
        Then I should receive internal error with "\"name\" is required" message

    Scenario: Successful Create User
        When I have not authorization headers
        When I set the create user body
        When I send "/users" "post" request
        Then I should receive 201 statusCode
        Then I should receive "Created successfully" message
        Then The "data" property should have [] parameters

    Scenario: Bad Request Create User that already exists
        When I have not authorization headers
        When I set the create user body
        When I send "/users" "post" request
        Then I should receive 400 statusCode
        Then I should receive "Bad request" message
        Then I should receive internal error with 4003 code
        Then I should receive internal error with "User email already exists, please enter a new email address" message

    Scenario: Unauthorized Get User profile
        When I have not authorization headers
        When I send "/users/profile" "get" request
        Then I should receive 401 statusCode
        Then I should receive "Unauthorized" message
        Then I should receive internal error with 4002 code
        Then I should receive internal error with "Please authenticate" message

    Scenario: Successful Get User profile
        When I have not authorization headers
        When I send login body
        When I send "/login" "post" request
        Then I should receive 200 statusCode
        Then I should receive "Ok" message
        Then I should receive "data" property in the response body
        Then The "data" property should have ["user", "token"] parameters
        Then I should save user and token in the context
        When I have authorization headers
        When I send "/users/profile" "get" request
        Then I should receive 200 statusCode
        Then I should receive "Ok" message
        Then I should receive "data" property in the response body
        Then The "data" property should have ["email", "name", "surname"] parameters

    Scenario: Unauthorized Get Users
        When I have not authorization headers
        When I send "/users" "get" request
        Then I should receive 401 statusCode
        Then I should receive "Unauthorized" message
        Then I should receive internal error with 4002 code
        Then I should receive internal error with "Please authenticate" message

    Scenario: Bad Request page is required Get Users
        When I have authorization headers
        When I send "/users" "get" request
        Then I should receive 400 statusCode
        Then I should receive "Bad request" message
        Then I should receive internal error with 1001 code
        Then I should receive internal error with "\"page\" is required" message

    Scenario: Bad Request limit is required Get Users
        When I have authorization headers
        When I send "/users?page=1" "get" request
        Then I should receive 400 statusCode
        Then I should receive "Bad request" message
        Then I should receive internal error with 1001 code
        Then I should receive internal error with "\"limit\" is required" message

    Scenario: Successful Get Users
        When I have authorization headers
        When I send "/users?page=1&limit=5" "get" request
        Then I should receive 200 statusCode
        Then I should receive "Ok" message
        Then I should receive "data" property in the response body
        Then The "data" property should have ["docs", "page", "pages", "limit", "skip", "total"] parameters
        Then The "docs" property should have 5 elements
        Then The data.docs[0] property should have ["email", "name", "surname"] parameters

    Scenario: Unauthorized Update User
        When I have not authorization headers
        When I send "/users" "put" request
        Then I should receive 401 statusCode
        Then I should receive "Unauthorized" message
        Then I should receive internal error with 4002 code
        Then I should receive internal error with "Please authenticate" message

    Scenario: Successful Update User
        When I have authorization headers
        When I set the update user body
        When I send "/users" "put" request
        Then I should receive 200 statusCode
        Then I should receive "Ok" message
        Then I should receive "data" property in the response body
        Then The "data" property should have ["email", "name", "surname"] parameters
        When I send login body with updated user
        When I send "/login" "post" request
        Then I should receive 200 statusCode
        Then I should receive "Ok" message
        Then I should receive "data" property in the response body
        Then The "data" property should have ["user", "token"] parameters
        Then I should save user and token in the context

    Scenario: Unauthorized Delete User
        When I have not authorization headers
        When I send "/users" "delete" request
        Then I should receive 401 statusCode
        Then I should receive "Unauthorized" message
        Then I should receive internal error with 4002 code
        Then I should receive internal error with "Please authenticate" message

    Scenario: Successful Delete User
        When I have authorization headers
        When I send "/users" "delete" request
        Then I should receive 204 statusCode
        Then I should receive "No Content" message
