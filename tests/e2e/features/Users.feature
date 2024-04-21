Feature: Users
Scenario: Unauthorized Get Users
        Given I delete 4 users
        Given I create 4 users
        Given I am on the home page
        When I use the route get users
        Then I should receive 401 statusCode
        Then I should receive "Please authenticate" message

    Scenario: Unauthorized Create User
        Given I delete user1
        When I use the route post users
        Then I should receive 401 statusCode
        Then I should receive "Please authenticate" message

    Scenario: Unauthorized Get User
        Given I delete 1 users
        Given I create 1 users
        Given I use the route get user by email
        Then I should receive 401 statusCode
        Then I should receive "Please authenticate" message

    Scenario: Unauthorized Delete User
        Given I delete 1 users
        Given I create 1 users
        When I use the route delete users
        Then I should receive 401 statusCode
        Then I should receive "Please authenticate" message

    # Scenario: Successful Get Users
    #     Given I delete 4 users
    #     Given I create 4 users
    #     Given I am on the home page
    #     When I use the route get users
    #     Then I should receive 200 statusCode
    #     Then I should receive "Ok" message
    #     # Then I should see 4 users
    #     # And I delete 4 users

    # Scenario: Successful Create User
    #     Given I delete user1
    #     When I use the route post users
    #     Then I should receive 201 statusCode
    #     Then I should receive "Created successfully" message
    #     And I delete 1 users

    # Scenario: Successful Get User
    #     Given I delete 1 users
    #     Given I create 1 users
    #     Given I use the route get user by email
    #     Then I should receive 200 statusCode
    #     Then I should receive "Ok" message
    #     Then I should see the user1 profile

    # Scenario: Successful Delete User
    #     Given I delete 1 users
    #     Given I create 1 users
    #     When I use the route delete users
    #     Then I should receive 204 statusCode
    #     Then I should receive "No Content" message
