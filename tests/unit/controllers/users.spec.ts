import core from 'express';
import UserController from '../../../src/controllers/users';
import UserService from '../../../src/services/user';
import * as userMocks from '../../../src/resources/mocks/Users';

const usersNames = [
    userMocks.user1.name,
    userMocks.user2.name,
    userMocks.user3.name,
    userMocks.user4.name,
]

jest.mock('mongodb');

const userService = UserService.getInstance();

describe('UserController Unit Tests', () => {
    describe('getInstance', () => {
        it('should return an instance of UserController', () => {
            const userController: UserController = UserController.getInstance();
            expect(userController).toBeInstanceOf(UserController);
        });
    });

    describe('getUsers', () => {
        it('should call UserService to get users', async () => {
            const mockGetUsers = jest.spyOn(userService, 'getUsers').mockImplementation(async () => usersNames);

            const userController: UserController = UserController.getInstance();
            const users = await userController.getUsers({});

            expect(mockGetUsers).toHaveBeenCalledTimes(1);
            expect(users.length).toBe(4);
            expect(users).toStrictEqual(usersNames);
        });
    });

    describe('createUser', () => {
        it('should call UserService to create an user', async () => {
            const mockCreateUser = jest.spyOn(userService, 'createUser').mockImplementation(async () => userMocks.user1);

            const userController: UserController = UserController.getInstance();
            const user = await userController.createUser({
                body: {
                    ...userMocks.user1
                }
            } as core.Request);

            expect(mockCreateUser).toHaveBeenCalledTimes(1);
            expect(user).toHaveProperty("name", userMocks.user1.name);
            expect(user).toHaveProperty("surname", userMocks.user1.surname);
            expect(user).toHaveProperty("email", userMocks.user1.email);
        });
    });
});