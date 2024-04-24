import INTERNAL_ERROR_CODES from '../../../../src/resources/configurations/constants/InternalErrorCodes';
import BaseErrorClass from '../../../../src/resources/configurations/classes/BaseErrorClass';

describe('BaseErrorClass Unit Tests', () => {
    describe('constructor', () => {
        it('should create a new ResponseClass', () => {
            const baseErrorClass: BaseErrorClass = new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);

            expect(baseErrorClass).toBeInstanceOf(BaseErrorClass);
            expect(baseErrorClass).toHaveProperty('code', 1000);
            expect(baseErrorClass).toHaveProperty('message', 'General unknown error');
            expect(baseErrorClass).toHaveProperty('statusCode', 500);
        });
    });
});
