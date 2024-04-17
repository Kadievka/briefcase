import BaseError from '../../../interfaces/configurations/IBaseError';

export default class BaseErrorClass extends Error implements BaseError {
    public code: number;
    public message: string;
    public statusCode: number;

    constructor(baseError: BaseError) {
        super();
        this.code = baseError.code;
        this.message = baseError.message;
        this.statusCode = baseError.statusCode;
    }
}
