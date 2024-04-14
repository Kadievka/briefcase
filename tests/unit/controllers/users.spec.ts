import UserController from '../../../src/controllers/users';
import UserService from '../../../src/services/user';
import { usersNames } from '../mocks/users';

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
            const mockGetUsers = jest.spyOn(userService, 'getUsers').mockImplementation(async()=>usersNames);

            const userController: UserController = UserController.getInstance();
            const users = await userController.getUsers({});

            expect(mockGetUsers).toHaveBeenCalledTimes(1);
            expect(users.length).toBe(4);
            expect(users).toStrictEqual(usersNames);
        });
        
    });
});