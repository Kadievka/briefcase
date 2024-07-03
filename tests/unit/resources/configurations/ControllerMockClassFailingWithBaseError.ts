import BaseErrorClass from '../../../../src/resources/configurations/classes/BaseErrorClass';
import IBaseError from '../../../../src/interfaces/configurations/IBaseError';
import RESPONSE_STATUS_CODES from '../../../../src/resources/configurations/constants/ResponseStatusCodes';

export default class ControllerMockClassFailingWithBaseError {
    public async methodThrowsBaseError() {
        const baseError: IBaseError = {
            code: 200,
            message: 'I am an internal custom error message',
            responseStatus: RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR,
        };
        throw new BaseErrorClass(baseError);
    }
}
