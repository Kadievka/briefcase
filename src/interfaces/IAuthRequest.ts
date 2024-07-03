import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default interface IAuthRequest extends Request {
    userSignature: string | JwtPayload;
}
