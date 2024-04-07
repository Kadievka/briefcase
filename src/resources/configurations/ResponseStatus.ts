import ResponseStatusInterface from '../../interfaces/configurations/ResponseStatus';

export enum StatusEnum {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    REQUEST_TIMEOUT = 408,
    INTERNAL_SERVER_ERROR = 500,
}

const responseStatus: Record<string, ResponseStatusInterface> = {
    OK: {
        statusCode: StatusEnum.OK,
        message: 'Ok',
    },
    CREATED: {
        statusCode: StatusEnum.CREATED,
        message: 'Created successfully',
    },
    ACCEPTED: {
        statusCode: StatusEnum.ACCEPTED,
        message: 'Accepted successfully',
    },
    NO_CONTENT: {
        statusCode: StatusEnum.NO_CONTENT,
        message: 'No content',
    },
    BAD_REQUEST: {
        statusCode: StatusEnum.BAD_REQUEST,
        message: 'Bad request',
    },
    UNAUTHORIZED: {
        statusCode: StatusEnum.UNAUTHORIZED,
        message: 'Unauthorized',
    },
    FORBIDDEN: {
        statusCode: StatusEnum.FORBIDDEN,
        message: 'Forbidden',
    },
    NOT_FOUND: {
        statusCode: StatusEnum.NOT_FOUND,
        message: 'Not Found',
    },
    REQUEST_TIMEOUT: {
        statusCode: StatusEnum.REQUEST_TIMEOUT,
        message: 'Request Timeout',
    },
    INTERNAL_SERVER_ERROR: {
        statusCode: StatusEnum.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
    },
};

export default responseStatus;
