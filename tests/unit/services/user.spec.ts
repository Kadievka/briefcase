import UserService from '../../../src/services/user';
import * as userMocks from '../../../src/resources/mocks/Users';
import { UserProfile } from '../../../src/models/User';

const userService: UserService = UserService.getInstance();

describe('UserService Unit Tests', () => {
    describe('getInstance', () => {
        it('should return an instance of UserService', () => {
            expect(userService).toBeInstanceOf(UserService);
        });
    });

    describe('createUser', () => {
        it('should create 4 users', async () => {
            const userProfile1 = await userService.createUser(userMocks.user1);
            const userProfile2 = await userService.createUser(userMocks.user2);
            const userProfile3 = await userService.createUser(userMocks.user3);
            const userProfile4 = await userService.createUser(userMocks.user4);
            expect(userProfile1).toBeUndefined();
            expect(userProfile2).toBeUndefined();
            expect(userProfile3).toBeUndefined();
            expect(userProfile4).toBeUndefined();
        });
    });

    describe('getUsers', () => {
        it('should return users names', async () => {
            const userService: UserService = UserService.getInstance();
            const users = await userService.getUsers();
            expect(users.length).toBeGreaterThanOrEqual(4);
            expect(users).toContain('Ana');
            expect(users).toContain('Maria');
            expect(users).toContain('Juan');
            expect(users).toContain('Pedro');
        });
    });

    describe('deleteUserByEmail', () => {
        it('should delete 4 users by email', async () => {
            await userService.deleteUserByEmail(userMocks.user1.email);
            await userService.deleteUserByEmail(userMocks.user2.email);
            await userService.deleteUserByEmail(userMocks.user3.email);
            await userService.deleteUserByEmail(userMocks.user4.email);
        });
    });
});
