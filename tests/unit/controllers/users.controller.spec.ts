import core from 'express';
import UserController from '../../../src/controllers/users.controller';
import UserService from '../../../src/services/user.service';
import * as userMocks from '../../../src/resources/mocks/UsersMock';
import IUser from '../../../src/interfaces/IUser';

const usersMock: IUser[] = [
    userMocks.user1,
    userMocks.user2,
    userMocks.user3,
    userMocks.user4,
];

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
            const mockGetUsers = jest
                .spyOn(userService, 'getUsers')
                .mockImplementation(async () => [
                    userMocks.user1,
                    userMocks.user2,
                    userMocks.user3,
                    userMocks.user4,
                ]);

            const userController: UserController = UserController.getInstance();
            const users = await userController.getUsers({});

            expect(mockGetUsers).toHaveBeenCalledTimes(1);
            expect(users.length).toBe(4);
            expect(users).toStrictEqual(usersMock);
        });
    });

    describe('createUser', () => {
        it('should call UserService to create an user', async () => {
            const mockCreateUser = jest
                .spyOn(userService, 'createUser')
                .mockImplementation(async () => {});

            const userController: UserController = UserController.getInstance();
            const user = await userController.createUser({
                body: {
                    ...userMocks.user1,
                },
            } as core.Request);

            expect(mockCreateUser).toHaveBeenCalledTimes(1);
            expect(user).toBeUndefined();
        });
    });
});
