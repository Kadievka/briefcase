Feature: Users
    Scenario: Successful Get Users
        Given I delete 4 users with the service
        Given I create 4 users with the service
        Given I am on the home page
        When I use the route get users
        Then I should receive 200 statusCode response
        Then I should see 4 users
        And I delete 4 users with the service

    Scenario: Successful Create User
        Given I delete user1 with the service
        When I use the route post users
        Then I should receive 201 statusCode response
        And I delete user1 with the service

    Scenario: Successful Get User
        Given I delete user1 with the service
        Given I create user1 with the service
        Given I use the route get user by email
        Then I should receive 200 statusCode response
        Then I should see the user1 profile

    Scenario: Successful Delete User
        Given I delete user1 with the service
        Given I create user1 with the service
        When I use the route delete users
        Then I should receive 204 statusCode response
