import AuthService from '../../../src/services/auth.service';
import { authMiddleware } from '../../../src/middlewares/auth.middleware';
import BaseErrorClass from '../../../src/resources/configurations/classes/BaseErrorClass';
import INTERNAL_ERROR_CODES from '../../../src/resources/configurations/constants/InternalErrorCodes';

const mockReq: any = {
    header: () => ' Bearer hsthrtyjhrtjhsnstrfhnstfr',
};
const mockRes: any = {
    status: () => ({
        send: () => {},
    }),
    statusCode: 0,
    message: '',
    error: {
        code: 0,
        message: '',
    },
};
const mockNext: any = () => {};

const authService = AuthService.getInstance();

describe('AuthMiddleware Unit Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('auth', () => {
        it('should call AuthService to authenticate the user', async () => {
            const mockAuth = jest.spyOn(authService, 'auth').mockImplementation(async () => {});

            const data: void = await authMiddleware(mockReq, mockRes, mockNext);

            expect(mockAuth).toHaveBeenCalledTimes(1);
            expect(data).toBeUndefined();
        });

        it('should call AuthService to authenticate the user but throws a base error', async () => {
            const mockAuth = jest.spyOn(authService, 'auth').mockImplementation(async () => {
                throw new BaseErrorClass(INTERNAL_ERROR_CODES.UNAUTHORIZED);
            });

            const data: void = await authMiddleware(mockReq, mockRes, mockNext);

            expect(mockAuth).toHaveBeenCalledTimes(1);
            expect(data).toBeUndefined();
        });

        it('should call AuthService to authenticate the user but throws an random error', async () => {
            const mockAuth = jest.spyOn(authService, 'auth').mockImplementation(async () => {
                throw new Error('random error');
            });

            const data: void = await authMiddleware(mockReq, mockRes, mockNext);

            expect(mockAuth).toHaveBeenCalledTimes(1);
            expect(data).toBeUndefined();
        });
    });
});
