import BaseError from '../../../interfaces/configurations/IBaseError';

const INTERNAL_ERROR_CODES: Record<string, BaseError> = {
    GENERAL_UNKNOWN: {
        code: 1000,
        message: 'General unknown error',
        statusCode: 500,
    },
    USER_NOT_FOUND: {
        code: 4000,
        message: 'User Not Found error',
        statusCode: 404,
    },
};

export default INTERNAL_ERROR_CODES;
