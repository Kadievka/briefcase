import core from 'express';
import Response from '../../../interfaces/configurations/Response';
import ResponseStatusInterface from '../../../interfaces/configurations/ResponseStatus';
import BaseErrorClass from './BaseErrorClass';
import INTERNAL_ERROR_CODES from '../constants/InternalErrorCodes';

export default class ResponseClass {
    controllerInstance: any;

    constructor(controllerInstance: any) {
        this.controllerInstance = controllerInstance;
    }

    async send(
        res: core.Response,
        responseStatus: ResponseStatusInterface,
        method: string,
        message?: string
    ): Promise<void> {

        let response: Response = {
            statusCode: responseStatus.statusCode,
            message: message || responseStatus.message,
        };

        try {
            response.data = await this.controllerInstance[method]();
        } catch (err) {
            const e = err as unknown as Error;

            console.error(err);

            if(err instanceof BaseErrorClass) {
                response.statusCode = err.statusCode;
                response.message = err.message;
                response.error = {
                    code: err.code,
                    message: err.message
                };
            } else {
                response.statusCode = INTERNAL_ERROR_CODES.GENERAL_UNKNOWN.statusCode;
                response.message = e.message ? e.message : INTERNAL_ERROR_CODES.GENERAL_UNKNOWN.message;
                response.error = {
                    code: INTERNAL_ERROR_CODES.GENERAL_UNKNOWN.code,
                    message: INTERNAL_ERROR_CODES.GENERAL_UNKNOWN.message
                };
            }
        }

        res.status(response.statusCode).send(response);
    }
}
