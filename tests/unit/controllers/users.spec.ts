import UserController from '../../../src/controllers/users';
import UserService from '../../../src/services/user';
import { usersNames } from '../mocks/users';

const userService = UserService.getInstance();

describe('UserController Unit Tests', () => {
    describe('getInstance', () => {
        it('should return an instance of UserController', () => {
            const userController: UserController = UserController.getInstance();
            expect(userController).toBeInstanceOf(UserController);
        });
    });

    describe('getUsers', () => {

        it('should call UserService to get users', () => {

            const mockGetUsers = jest.spyOn(userService, 'getUsers').mockReturnValue(usersNames);

            const userController: UserController = UserController.getInstance();
            const users = userController.getUsers();

            expect(mockGetUsers).toHaveBeenCalledTimes(1);
            expect(users.length).toBe(4);
            expect(users).toStrictEqual(usersNames);
        });
        
    });
});