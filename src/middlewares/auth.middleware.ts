import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';
import { handleErrorResponse } from '../resources/configurations/classes/ResponseClass';
import IResponse from '../interfaces/configurations/IResponse';

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authService: AuthService = AuthService.getInstance();

    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        await authService.auth(req, token);
        next();
    } catch (error) {
        const response: IResponse = {
            statusCode: 500,
        };
        handleErrorResponse(error, response);
        res.status(response.statusCode).send(response);
    }
};
