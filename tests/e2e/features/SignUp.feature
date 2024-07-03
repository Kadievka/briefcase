Feature: SignUp

    Scenario: I try to login without send required parameters
        When I have not authorization headers
        When I send "/login" "post" request
        Then I should receive 400 statusCode
        Then I should receive "Bad request" message
        Then I should receive internal error with 1001 code
        Then I should receive internal error with "\"email\" is required" message

    Scenario: I try to login without credentials and an user that is not registered
        When I have not authorization headers
        When I send "antoniooo@gmail.com" email and "123456" password body
        When I send "/login" "post" request
        Then I should receive 404 statusCode
        Then I should receive "Not Found" message
        Then I should receive internal error with 4000 code
        Then I should receive internal error with "User Not Found error" message

    Scenario: I try to login without credentials and wrong password
        When I have not authorization headers
        When I send "antonio@gmail.com" email and "123456789" password body
        When I send "/login" "post" request
        Then I should receive 400 statusCode
        Then I should receive "Bad request" message
        Then I should receive internal error with 4001 code
        Then I should receive internal error with "Invalid password" message

    Scenario: I try to login without credentials and default user
        When I have not authorization headers
        When I send "antonio@gmail.com" email and "123456" password body
        When I send "/login" "post" request
        Then I should receive 200 statusCode
        Then I should receive "Ok" message
        Then I should receive "data" property in the response body
        Then The "data" property should have ["user", "token"] parameters
        Then I should save user and token in the context