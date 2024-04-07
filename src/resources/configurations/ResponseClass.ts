import core from 'express';
import ResponseStatus from './ResponseStatus';
import Response from '../../interfaces/configurations/Response';
import ResponseStatusInterface from '../../interfaces/configurations/ResponseStatus';

export default class ResponseClass {
    controllerInstance: any;

    constructor(controllerInstance: any) {
        this.controllerInstance = controllerInstance;
    }

    async send(
        res: core.Response,
        responseStatus: ResponseStatusInterface,
        method: string,
        message?: string,
        error?: Error,
    ): Promise<void> {
        let response: Response = {
            statusCode: responseStatus.statusCode,
            message: message || responseStatus.message,
            error,
        };

        try {
            response.data = await this.controllerInstance[method]();
        } catch (err: any) {
            console.error(err);
            response.statusCode =
                ResponseStatus.INTERNAL_SERVER_ERROR.statusCode;
            response.message = ResponseStatus.INTERNAL_SERVER_ERROR.message;
            response.error = err.message;
        }

        res.status(response.statusCode).send(response);
    }
}
