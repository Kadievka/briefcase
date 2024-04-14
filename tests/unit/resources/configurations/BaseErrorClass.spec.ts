import INTERNAL_ERROR_CODES from '../../../../src/resources/configurations/constants/InternalErrorCodes';
import BaseError from '../../../../src/interfaces/configurations/BaseError';
import BaseErrorClass from '../../../../src/resources/configurations/classes/BaseErrorClass';

describe('BaseErrorClass Unit Tests', () => {

    describe('constructor', () => {
        it('should create a new ResponseClass', () => {
            const baseErrorInterface: BaseError = {...INTERNAL_ERROR_CODES.GENERAL_UNKNOWN};
            const baseErrorClass: BaseErrorClass = new BaseErrorClass(baseErrorInterface);

            expect(baseErrorClass).toBeInstanceOf(BaseErrorClass);
            expect(baseErrorClass).toHaveProperty('code', 100);
            expect(baseErrorClass).toHaveProperty('message', "General unknown error");
            expect(baseErrorClass).toHaveProperty('statusCode', 500);
        });
    });

});