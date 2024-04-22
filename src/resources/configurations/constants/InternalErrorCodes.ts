import BaseError from '../../../interfaces/configurations/IBaseError';
import RESPONSE_STATUS_CODES from './ResponseStatusCodes';

const INTERNAL_ERROR_CODES: Record<string, BaseError> = {
    GENERAL_UNKNOWN: {
        code: 1000,
        message: 'General unknown error',
        statusCode: RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR.statusCode,
    },
    BAD_REQUEST: {
        code: 1001,
        message: 'Bad request',
        statusCode: RESPONSE_STATUS_CODES.BAD_REQUEST.statusCode,
    },
    USER_NOT_FOUND: {
        code: 4000,
        message: 'User Not Found error',
        statusCode: RESPONSE_STATUS_CODES.NOT_FOUND.statusCode,
    },
    PASSWORD_INVALID: {
        code: 4001,
        message: 'Invalid password',
        statusCode: RESPONSE_STATUS_CODES.BAD_REQUEST.statusCode,
    },
    UNAUTHORIZED: {
        code: 4002,
        message: 'Please authenticate',
        statusCode: RESPONSE_STATUS_CODES.UNAUTHORIZED.statusCode,
    },
    USER_ALREADY_EXISTS: {
        code: 4003,
        message: 'User email already exists, please enter a new email address',
        statusCode: RESPONSE_STATUS_CODES.BAD_REQUEST.statusCode,
    },
};

export default INTERNAL_ERROR_CODES;
