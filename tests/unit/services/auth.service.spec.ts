import AuthService from '../../../src/services/auth.service';
import { ILoginInput, ILoginOutput } from '../../../src/interfaces/ILogin';
import INTERNAL_ERROR_CODES from '../../../src/resources/configurations/constants/InternalErrorCodes';

const authService: AuthService = AuthService.getInstance();

const mockLoginInput: ILoginInput = {
    email: 'antonio1@gmail.com',
    password: '123456',
};

let token: string = '';

const mockReq: any = {
    userSignature: {},
};

describe('AuthService Unit Tests', () => {
    describe('getInstance', () => {
        it('should return an instance of AuthService', () => {
            expect(authService).toBeInstanceOf(AuthService);
        });
    });

    describe('login', () => {
        it('should login an user', async () => {
            const result: ILoginOutput = await authService.login(mockLoginInput);

            token = result.token;

            expect(result).toHaveProperty('user');
            expect(result).toHaveProperty('token');
            expect(result.user).toHaveProperty('email', 'antonio1@gmail.com');
            expect(result.user).toHaveProperty('name', 'Antonio');
        });

        it('should throw error bad request', async () => {
            await expect(
                authService.login({
                    email: 'antonio_no_exists@gmail.com',
                    password: '123456',
                }),
            ).rejects.toMatchObject(INTERNAL_ERROR_CODES.BAD_REQUEST);
        });
    });

    describe('auth', () => {
        it('should throw error if there is not token', async () => {
            await expect(authService.auth(mockReq)).rejects.toMatchObject(INTERNAL_ERROR_CODES.BAD_REQUEST);
        });

        it('should authorize an user if logins', async () => {
            const result: void = await authService.auth(mockReq, token);
            expect(result).toBeUndefined();
        });
    });

    describe('logout', () => {
        it('should logout an user', async () => {
            const result: void = await authService.logout(token);
            expect(result).toBeUndefined();
        });
    });

    describe('auth after logout', () => {
        it('should throw error if the token is in the tokens black list', async () => {
            await expect(authService.auth(mockReq, token)).rejects.toMatchObject(INTERNAL_ERROR_CODES.UNAUTHORIZED);
        });
    });
});
