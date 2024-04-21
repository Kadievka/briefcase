import { ILoginInput, ILoginOutput } from '../interfaces/ILogin';
import BaseErrorClass from '../resources/configurations/classes/BaseErrorClass';
import INTERNAL_ERROR_CODES from '../resources/configurations/constants/InternalErrorCodes';
import AuthService from '../services/auth.service';

export default class AuthController {
    public static instance: AuthController;

    /**
     * Returns the single instance of AuthController.
     * @returns AuthController - Singleton instance
     */
    public static getInstance() {
        if (!this.instance) {
            this.instance = new AuthController();
        }
        return this.instance;
    }

    private authService: AuthService = AuthService.getInstance();

    /**
     * Calls get users service.
     * @returns users - Array of user's names
     */
    public async login(req: any): Promise<any> {
        const request: ILoginInput = { ...req.body };
        return await this.authService.login(request);
    }

    /**
     * Calls get users service.
     * @returns users - Array of user's names
     */
    public async logout(req: any): Promise<any> {
        const token: string = req
            .header('Authorization')
            ?.replace('Bearer ', '');
        if (!token) {
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.UNAUTHORIZED);
        }
        return await this.authService.logout(token);
    }
}
