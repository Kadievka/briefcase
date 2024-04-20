import { ILoginInput } from '../interfaces/ILogin';
import AuthService from '../services/auth.service';

export default class AuthController {
    public static instance: AuthController;

    authService: AuthService = AuthService.getInstance();

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

    /**
     * Calls get users service.
     * @returns users - Array of user's names
     */
    public async login(req: any): Promise<any> {
        const request: ILoginInput = { ...req.body };
        return await this.authService.login(request);
    }
}
