import paginationValidator from '../../../src/validators/pagination.validator';

describe('paginationValidator Unit Tests', () => {
    it('should return "page" is required if receives nothing', () => {
        const result = paginationValidator({});
        expect(result).toStrictEqual({
            validatorFailed: true,
            message: '"page" is required',
        });
    });

    it('should return "page" must be a string if receives a number in page', () => {
        const result = paginationValidator({
            page: 1,
        });
        expect(result).toStrictEqual({
            validatorFailed: true,
            message: '"page" must be a string',
        });
    });

    it('should return "limit" is required if limit is undefined', () => {
        const result = paginationValidator({
            page: '1',
        });
        expect(result).toStrictEqual({
            validatorFailed: true,
            message: '"limit" is required',
        });
    });

    it('should return "limit" must be a string if limit is not an string', () => {
        const result = paginationValidator({
            page: '1',
            limit: 10,
        });
        expect(result).toStrictEqual({
            validatorFailed: true,
            message: '"limit" must be a string',
        });
    });

    it('should return validatorFailed: false and message: "validation passed"', () => {
        const result = paginationValidator({
            page: '1',
            limit: '10',
        });
        expect(result).toStrictEqual({
            validatorFailed: false,
            message: 'validation passed',
        });
    });
});
