import AuthController from '../../../src/controllers/auth.controller';
import AuthService from '../../../src/services/auth.service';
import { ILoginOutput } from '../../../src/interfaces/ILogin';

const mockEmail: string = 'user_controller@example.com';

const mockRequestLogin = {
    body: {
        email: mockEmail,
        password: '123456',
    },
};

const mockRequestLogout: any = {
    header: () => ' Bearer ifdshfñusadgfluasdg',
};

const loginOutput: ILoginOutput = {
    user: {
        email: mockEmail,
        name: 'My Name',
    },
    token: 'aslkfhasdhfgourehgo',
};

const authService = AuthService.getInstance();

describe('AuthController Unit Tests', () => {
    describe('getInstance', () => {
        it('should return an instance of AuthController', () => {
            const authController: AuthController = AuthController.getInstance();
            expect(authController).toBeInstanceOf(AuthController);
        });
    });

    describe('login', () => {
        it('should call AuthService to login', async () => {
            const mockLogin = jest.spyOn(authService, 'login').mockImplementation(async () => loginOutput);

            const authController: AuthController = AuthController.getInstance();
            const data = await authController.login(mockRequestLogin as any);

            expect(mockLogin).toHaveBeenCalledTimes(1);
            expect(data).toStrictEqual(loginOutput);
        });
    });

    describe('logout', () => {
        it('should call AuthService to logout', async () => {
            const mockLogout = jest.spyOn(authService, 'logout').mockImplementation(async () => {});

            const authController: AuthController = AuthController.getInstance();
            const result: void = await authController.logout(mockRequestLogout);

            expect(mockLogout).toHaveBeenCalledTimes(1);
            expect(result).toBeUndefined();
        });

        it('should throw error if authorization header does not returns a token', async () => {
            const authController: AuthController = AuthController.getInstance();

            await expect(
                authController.logout({
                    header: () => {},
                }),
            ).rejects.toMatchObject({
                code: 4002,
                message: 'Please authenticate',
                responseStatus: {
                    message: 'Unauthorized',
                    statusCode: 401,
                },
            });
        });
    });
});
