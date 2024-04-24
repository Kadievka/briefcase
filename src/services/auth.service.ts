import jwt from 'jsonwebtoken';
import { ILoginInput, ILoginOutput } from '../interfaces/ILogin';
import UserModel from '../models/UserModel';
import getLogger from '../utils/logger';
import UserService from './user.service';
import IUserSignature from '../interfaces/IUserSignature';
import BaseErrorClass from '../resources/configurations/classes/BaseErrorClass';
import INTERNAL_ERROR_CODES from '../resources/configurations/constants/InternalErrorCodes';
import { Request } from 'express';
import IAuthRequest from '../interfaces/IAuthRequest';
import JWTBlackListService from './JWTBlackList.service';

const log = getLogger('auth.service');

export default class AuthService {
    public static instance: AuthService;

    /**
     * Returns the single instance of AuthService.
     * @returns {AuthService} Singleton instance
     */
    public static getInstance(): AuthService {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }

    private JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
    private JWT_USER_EXPIRE_TIME = process.env.JWT_USER_EXPIRE_TIME!;

    private userService: UserService = UserService.getInstance();

    /**
     * Returns the user signature and json web token
     * @param {ILoginInput} user - email and password
     * @returns {Promise<ILoginOutput>} Async user signature and token
     */
    public async login(user: ILoginInput): Promise<ILoginOutput> {
        log.info('Start AuthService@login method with email: ', user.email);

        const dbUser = await this.userService.getDbUserByEmail(user.email);

        if (!dbUser) {
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.BAD_REQUEST);
        }

        const userModel: UserModel = new UserModel({
            user: { ...dbUser },
            encryptPassword: false,
        });

        userModel.validatePassword(user.password);
        const userSignature: IUserSignature = userModel.getUserSignature();

        const token: string = jwt.sign(userSignature, this.JWT_SECRET_KEY, {
            expiresIn: this.JWT_USER_EXPIRE_TIME,
        });

        log.info('Finish AuthService@login method');
        return { user: userSignature, token } as ILoginOutput;
    }

    /**
     * Logouts the user making the jwt black listed
     * @param {string} token - user token
     * @returns {Promise<void>} async function returns nothing
     */
    public async logout(token: string): Promise<void> {
        log.info('Start AuthService@logout method with logoutInput: ', token);
        const jwtBlackListService: JWTBlackListService = JWTBlackListService.getInstance();
        await jwtBlackListService.registerJWT(token);
        log.info('Finish AuthService@logout method');
    }

    /**
     * Authenticates the user
     * @param {Request} req - request
     * @param {string} token - json web token
     * @returns {void} validates jwt
     */
    public async auth(req: Request, token?: string): Promise<void> {
        log.info('Start AuthService@auth method');

        if (!token) {
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.BAD_REQUEST);
        }

        try {
            const decoded: string | jwt.JwtPayload = jwt.verify(token, this.JWT_SECRET_KEY);
            (req as IAuthRequest).userSignature = decoded;

            // It must not be in the JWT Black List
            const jwtBlackListService: JWTBlackListService = JWTBlackListService.getInstance();
            const isBlackListed: boolean = await jwtBlackListService.isBlackListed(token);

            if (isBlackListed) {
                throw new BaseErrorClass(INTERNAL_ERROR_CODES.UNAUTHORIZED);
            }
        } catch (error) {
            log.error('Error AuthService@auth error: ', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.UNAUTHORIZED);
        }
        log.info('Finish AuthService@auth method');
    }
}
