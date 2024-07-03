import loginValidator from '../../../../src/validators/auth/login.validator';

describe('loginValidator Unit Tests', () => {
    it('should return "email" is required if receives nothing', () => {
        const result = loginValidator({});
        expect(result).toStrictEqual({
            validatorFailed: true,
            message: '"email" is required',
        });
    });

    it('should return "email" must be a string if receives a wrong type', () => {
        const result = loginValidator({
            email: false,
        });
        expect(result).toStrictEqual({
            validatorFailed: true,
            message: '"email" must be a string',
        });
    });

    it('should return "email" must be a valid email if receives a string that is not email', () => {
        const result = loginValidator({
            email: 'asasd',
        });
        expect(result).toStrictEqual({
            validatorFailed: true,
            message: '"email" must be a valid email',
        });
    });

    it('should return "email" must be a valid email if receives a string that is not email', () => {
        const result = loginValidator({
            email: 'email@example',
        });
        expect(result).toStrictEqual({
            validatorFailed: true,
            message: '"email" must be a valid email',
        });
    });

    it('should return "password" is required if receives nothing in password', () => {
        const result = loginValidator({
            email: 'email@example.com',
        });
        expect(result).toStrictEqual({
            validatorFailed: true,
            message: '"password" is required',
        });
    });

    it('should return "password" must be a string if receives a different type', () => {
        const result = loginValidator({
            email: 'email@example.com',
            password: 123,
        });
        expect(result).toStrictEqual({
            validatorFailed: true,
            message: '"password" must be a string',
        });
    });

    it('should return validatorFailed: false and message: "validation passed"', () => {
        const result = loginValidator({
            email: 'email@example.com',
            password: '123456asdf',
        });
        expect(result).toStrictEqual({
            validatorFailed: false,
            message: 'validation passed',
        });
    });
});
