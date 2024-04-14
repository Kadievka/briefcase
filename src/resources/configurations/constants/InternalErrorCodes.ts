import BaseError from '../../../interfaces/configurations/BaseError';

const INTERNAL_ERROR_CODES: Record<string, BaseError> = {
    GENERAL_UNKNOWN: {
        code: 100,
        message: 'General unknown error',
        statusCode: 500,
    },
    USER_NOT_FOUND: {
        code: 200,
        message: 'User Not Found error',
        statusCode: 404,
    },
};

export default INTERNAL_ERROR_CODES;
