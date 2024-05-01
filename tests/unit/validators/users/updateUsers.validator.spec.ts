import updateUserValidator from '../../../../src/validators/users/updateUser.validator';

describe('updateUserValidator Unit Tests', () => {
    describe('optional fields', () => {
        it('should return validatorFailed: false and message: "validation passed" passing nothing', () => {
            const result = updateUserValidator({});
            expect(result).toStrictEqual({
                validatorFailed: false,
                message: 'validation passed',
            });
        });

        it('should return validatorFailed: false and message: "validation passed" with email', () => {
            const result = updateUserValidator({
                email: 'valid_email@mail.com',
            });
            expect(result).toStrictEqual({
                validatorFailed: false,
                message: 'validation passed',
            });
        });

        it('should return validatorFailed: false and message: "validation passed" with password', () => {
            const result = updateUserValidator({
                email: 'valid_email@mail.com',
                password: '123456asdf',
            });
            expect(result).toStrictEqual({
                validatorFailed: false,
                message: 'validation passed',
            });
        });

        it('should return validatorFailed: false and message: "validation passed" with name', () => {
            const result = updateUserValidator({
                email: 'valid_email@mail.com',
                password: '123456asdf',
                name: 'My Name',
            });
            expect(result).toStrictEqual({
                validatorFailed: false,
                message: 'validation passed',
            });
        });

        it('should return validatorFailed: false and message: "validation passed" with surname', () => {
            const result = updateUserValidator({
                email: 'valid_email@mail.com',
                password: '123456asdf',
                name: 'My Name',
                surname: 'My Surname',
            });
            expect(result).toStrictEqual({
                validatorFailed: false,
                message: 'validation passed',
            });
        });
    });

    describe('max and min fields', () => {
        it('should return "name" length must be at least 3 characters long', () => {
            const result = updateUserValidator({
                email: 'valid_email@mail.com',
                password: '123456asdf',
                name: 'My',
                surname: 'My Surname',
            });
            expect(result).toStrictEqual({
                validatorFailed: true,
                message: '"name" length must be at least 3 characters long',
            });
        });

        it('should return "name" length must be less than or equal to 30 characters long', () => {
            const result = updateUserValidator({
                email: 'valid_email@mail.com',
                password: '123456asdf',
                name: '1234567890123456789012345678901',
                surname: 'My Surname',
            });
            expect(result).toStrictEqual({
                validatorFailed: true,
                message: '"name" length must be less than or equal to 30 characters long',
            });
        });

        it('should return "surname" length must be at least 3 characters long', () => {
            const result = updateUserValidator({
                email: 'valid_email@mail.com',
                password: '123456asdf',
                name: 'My Name',
                surname: 'M',
            });
            expect(result).toStrictEqual({
                validatorFailed: true,
                message: '"surname" length must be at least 3 characters long',
            });
        });

        it('should return "surname" length must be less than or equal to 30 characters long', () => {
            const result = updateUserValidator({
                email: 'valid_email@mail.com',
                password: '123456asdf',
                name: 'My Name',
                surname: '1234567890123456789012345678901',
            });
            expect(result).toStrictEqual({
                validatorFailed: true,
                message: '"surname" length must be less than or equal to 30 characters long',
            });
        });

        it('should return validation failed when password is shorter than 3 characters', () => {
            const result = updateUserValidator({
                email: 'valid_email@mail.com',
                password: '12',
                name: 'My Name',
                surname: 'MY Surname',
            });
            expect(result).toStrictEqual({
                validatorFailed: true,
                message: '"password" with value "12" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/',
            });
        });

        it('should return validation failed when password is larger than 30 characters', () => {
            const result = updateUserValidator({
                email: 'valid_email@mail.com',
                password: '1234567890123456789012345678901',
                name: 'My Name',
                surname: 'MY Surname',
            });
            expect(result).toStrictEqual({
                validatorFailed: true,
                message: '"password" with value "1234567890123456789012345678901" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/',
            });
        });
    });

    it('should return validation failed when password has invalids character', () => {
        const result = updateUserValidator({
            email: 'valid_email@mail.com',
            password: '113asdf@#~~€€~€¬',
            name: 'My Name',
            surname: 'MY Surname',
        });
        expect(result).toStrictEqual({
            validatorFailed: true,
            message: '"password" with value "113asdf@#~~€€~€¬" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/',
        });
    });
});
