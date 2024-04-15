Feature: Users
    Scenario: Successful Get Users
        Given I delete 4 users with the service
        Given I create 4 users with the service
        Given I am on the home page
        When I use the route get users
        Then I should see 4 users
        And I delete 4 users with the service