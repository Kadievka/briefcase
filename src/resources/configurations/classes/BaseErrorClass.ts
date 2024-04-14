import BaseError from "../../../interfaces/configurations/BaseError";

export default class BaseErrorClass extends Error implements BaseError {
    code: number;
    message: string;
    statusCode: number;

    constructor(baseError: BaseError){
        super();
        this.code = baseError.code;
        this.message = baseError.message;
        this.statusCode = baseError.statusCode;
    }

}