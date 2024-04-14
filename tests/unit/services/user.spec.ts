import UserService from '../../../src/services/user';

describe('UserService Unit Tests', () => {

    describe('getInstance', () => {

        it('should return an instance of UserService', () => {
            const userService: UserService = UserService.getInstance();
            expect(userService).toBeInstanceOf(UserService);
        });

    });

    describe('getUsers', () => {

        it('should return users names', async () => {
            const userService: UserService = UserService.getInstance();
            const users = await userService.getUsers();
            expect(users.length).toBe(4);
            expect(users).toStrictEqual([
                "Ana",
                "Maria",
                "Juan",
                "Pedro"
            ]);
        });
        
    });
});