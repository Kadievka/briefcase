import core from 'express';
import UserController from '../../../src/controllers/users.controller';
import { usersPagination } from '../../../src/resources/mocks/UsersMock';
import DatabaseService from '../../../src/services/database.service';
import UserService from '../../../src/services/user.service';
import * as userMocks from '../../../src/resources/mocks/UsersMock';
import IUserProfile from '../../../src/interfaces/IUserProfile';
import IAuthRequest from '../../../src/interfaces/IAuthRequest';

const mockEmail: string = 'user_controller@example.com';

const mockRequest = {
    query: {
        page: 1,
        limit: 10,
    },
};

const userService = UserService.getInstance();
const databaseService: DatabaseService = DatabaseService.getInstance();

describe('UserController Unit Tests', () => {
    afterAll(() => {
        databaseService.disconnect();
    });

    describe('getInstance', () => {
        it('should return an instance of UserController', () => {
            const userController: UserController = UserController.getInstance();
            expect(userController).toBeInstanceOf(UserController);
        });
    });

    describe('getUsers', () => {
        it('should call UserService to get users', async () => {
            const mockGetUsers = jest.spyOn(userService, 'getUsers').mockImplementation(async () => usersPagination);

            const userController: UserController = UserController.getInstance();
            const data = await userController.getUsers(mockRequest as any);

            expect(mockGetUsers).toHaveBeenCalledTimes(1);
            expect(data).toStrictEqual(usersPagination);
        });
    });

    describe('createUser', () => {
        it('should call UserService to create an user', async () => {
            const mockCreateUser = jest.spyOn(userService, 'createUser').mockImplementation(
                async () =>
                    ({
                        ...userMocks.user1,
                        email: mockEmail,
                    }) as IUserProfile,
            );

            const userController: UserController = UserController.getInstance();
            const user: IUserProfile = await userController.createUser({
                body: {
                    name: userMocks.user1.name,
                    surname: userMocks.user1.name,
                    email: mockEmail,
                },
            } as core.Request);

            expect(mockCreateUser).toHaveBeenCalledTimes(1);
            expect(user).toHaveProperty('name', userMocks.user1.name);
            expect(user).toHaveProperty('surname', userMocks.user1.surname);
            expect(user).toHaveProperty('email', mockEmail);
        });
    });

    describe('deleteUser', () => {
        it('should call UserService to delete an user', async () => {
            const mockDeleteUser = jest.spyOn(userService, 'deleteUserByEmail').mockImplementation(async () => {});

            const userController: UserController = UserController.getInstance();
            const result: void = await userController.deleteUser({
                userSignature: {
                    email: mockEmail,
                    name: 'any name, do not care',
                },
            } as unknown as IAuthRequest);

            expect(mockDeleteUser).toHaveBeenCalledTimes(1);
            expect(result).toBeUndefined();
        });
    });

    describe('getUserByEmail', () => {
        it('should call UserService to get an user by email', async () => {
            const mockGetUserByEmail = jest.spyOn(userService, 'getUserByEmail').mockImplementation(async () => ({
                name: userMocks.user1.name,
                surname: userMocks.user1.surname,
                email: mockEmail,
            }));

            const userController: UserController = UserController.getInstance();
            const user: IUserProfile = await userController.getUserByEmail({
                userSignature: {
                    email: mockEmail,
                    name: 'any name, do not care',
                },
            } as unknown as IAuthRequest);

            expect(mockGetUserByEmail).toHaveBeenCalledTimes(1);
            expect(user).toHaveProperty('name', userMocks.user1.name);
            expect(user).toHaveProperty('surname', userMocks.user1.surname);
            expect(user).toHaveProperty('email', mockEmail);
        });
    });

    describe('updateUserByEmail', () => {
        it('should call UserService to get an user by email', async () => {
            const mockUpdateUserByEmail = jest.spyOn(userService, 'updateUserByEmail').mockImplementation(async () => ({
                name: 'edited name',
                surname: 'edited surname',
                email: 'edited_email@mail.com',
            }));

            const userController: UserController = UserController.getInstance();
            const user: IUserProfile = await userController.updateUserByEmail({
                userSignature: {
                    email: mockEmail,
                    name: 'any name, do not care',
                },
                body: {
                    name: 'edited name',
                    surname: 'edited surname',
                    email: 'edited_email@mail.com',
                },
            } as unknown as IAuthRequest);

            expect(mockUpdateUserByEmail).toHaveBeenCalledTimes(1);
            expect(user).toHaveProperty('name', 'edited name');
            expect(user).toHaveProperty('surname', 'edited surname');
            expect(user).toHaveProperty('email', 'edited_email@mail.com');
        });
    });
});
