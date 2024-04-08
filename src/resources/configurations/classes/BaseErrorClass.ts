import BaseError from "../../../interfaces/configurations/BaseError";

export default class BaseErrorClass extends Error implements BaseError {
    code: number;
    message: string;
    statusCode: number;

    constructor(code: number, message: string, statusCode: number){
        super();
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

}