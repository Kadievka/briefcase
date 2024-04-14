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
            const userProfile1: UserProfile = await userService.createUser(userMocks.user1);
            const userProfile2: UserProfile = await userService.createUser(userMocks.user2);
            const userProfile3: UserProfile = await userService.createUser(userMocks.user3);
            const userProfile4: UserProfile = await userService.createUser(userMocks.user4);
            expect(userProfile1).toStrictEqual({
                email: userMocks.user1.email,
                name: userMocks.user1.name,
                surname: userMocks.user1.surname
            });
            expect(userProfile2).toStrictEqual({
                email: userMocks.user2.email,
                name: userMocks.user2.name,
                surname: userMocks.user2.surname
            });
            expect(userProfile3).toStrictEqual({
                email: userMocks.user3.email,
                name: userMocks.user3.name,
                surname: userMocks.user3.surname
            });
            expect(userProfile4).toStrictEqual({
                email: userMocks.user4.email,
                name: userMocks.user4.name,
                surname: userMocks.user4.surname
            });
        });
        
    });

    describe('getUsers', () => {
        it('should return users names', async () => {
            const userService: UserService = UserService.getInstance();
            const users = await userService.getUsers();
            expect(users.length).toBeGreaterThanOrEqual(4);
            expect(users).toStrictEqual([
                "Ana",
                "Maria",
                "Juan",
                "Pedro"
            ]);
        });
        
    });

    describe('deleteUserByEmail', ()=>{
        it('should delete 4 users by email', async()=>{
            await userService.deleteUserByEmail(userMocks.user1.email);
            await userService.deleteUserByEmail(userMocks.user2.email);
            await userService.deleteUserByEmail(userMocks.user3.email);
            await userService.deleteUserByEmail(userMocks.user4.email);
        });
    })
});