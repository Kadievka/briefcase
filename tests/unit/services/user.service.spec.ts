import UserService from '../../../src/services/user.service';
import IPaginationOutput from '../../../src/interfaces/configurations/IPaginationOutput';
import IUserProfile from '../../../src/interfaces/IUserProfile';

const userService: UserService = UserService.getInstance();

describe('UserService Unit Tests', () => {
    describe('getInstance', () => {
        it('should return an instance of UserService', () => {
            expect(userService).toBeInstanceOf(UserService);
        });
    });

    describe('deleteUserByEmail', () => {
        it('should delete 8 users by email', async () => {
            for (let i = 0; i < 4; i++) {
                const result = await userService.deleteUserByEmail('test@email' + i + '.com');
                expect(result).toBeUndefined();
            }
            for (let i = 0; i < 4; i++) {
                const result = await userService.deleteUserByEmail('edited_test@email' + i + '.com');
                expect(result).toBeUndefined();
            }
        });
    });

    describe('getUsers', () => {
        it('should return users names', async () => {
            const result: IPaginationOutput = await userService.getUsers({
                page: 1,
                limit: 5,
            });
            expect(result).toHaveProperty('docs');
            expect(result).toHaveProperty('limit', 5);
            expect(result).toHaveProperty('skip', 0);
            expect(result).toHaveProperty('total', 12);
            expect(result).toHaveProperty('page', 1);
            expect(result).toHaveProperty('pages', 3);
        });
    });

    describe('createUser', () => {
        it('should create 4 users', async () => {
            for (let i = 0; i < 4; i++) {
                const userProfile: IUserProfile = await userService.createUser({
                    name: 'test name',
                    surname: 'test surname',
                    email: 'test@email' + i + '.com',
                    password: '123456',
                });
                expect(userProfile).toHaveProperty('name', 'test name');
                expect(userProfile).toHaveProperty('surname', 'test surname');
                expect(userProfile).toHaveProperty('email', 'test@email' + i + '.com');
            }
        });
    });

    describe('getDbUserByEmail', () => {
        it('should get one user by email 4 times', async () => {
            for (let i = 0; i < 4; i++) {
                const userProfile: IUserProfile = await userService.getDbUserByEmail('test@email' + i + '.com');
                expect(userProfile).toHaveProperty('name', 'test name');
                expect(userProfile).toHaveProperty('surname', 'test surname');
                expect(userProfile).toHaveProperty('email', 'test@email' + i + '.com');
            }
        });
    });

    describe('updateUserByEmail', () => {
        it('should update one user by email 4 times', async () => {
            for (let i = 0; i < 4; i++) {
                const userProfile: IUserProfile = await userService.updateUserByEmail('test@email' + i + '.com', {
                    name: 'Edited test name',
                    surname: 'Edited test surname',
                    email: 'edited_test@email' + i + '.com',
                    password: '123456789',
                });
                expect(userProfile).toHaveProperty('name', 'Edited test name');
                expect(userProfile).toHaveProperty('surname', 'Edited test surname');
                expect(userProfile).toHaveProperty('email', 'edited_test@email' + i + '.com');
            }
        });
    });
});
