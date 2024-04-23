import core from 'express';
import IUserProfile from '../interfaces/IUserProfile';
import UserService from '../services/user.service';
import IAuthRequest from '../interfaces/IAuthRequest';
import IUserSignature from '../interfaces/IUserSignature';
import IPaginationOutput from '../interfaces/configurations/IPaginationOutput';

export default class UserController {
    public static instance: UserController;

    /**
     * Returns the single instance of UserController.
     * @returns UserController - Singleton instance
     */
    public static getInstance() {
        if (!this.instance) {
            this.instance = new UserController();
        }
        return this.instance;
    }

    private userService: UserService = UserService.getInstance();

    /**
     * Calls get users service.
     * @returns users - Array of user's names
     */
    public async getUsers(req: core.Request): Promise<IPaginationOutput> {
        const page: number = Number(req.query.page);
        const limit: number = Number(req.query.limit);

        return await this.userService.getUsers({ page, limit });
    }

    /**
     * Calls create users service.
     * @returns user
     */
    public async createUser(req: core.Request): Promise<IUserProfile> {
        return await this.userService.createUser(req.body);
    }

    /**
     * Calls delete user by email service.
     * @param {core.Request} req - Request
     * @returns Promise<void> - void
     */
    public async deleteUser(req: core.Request): Promise<void> {
        const jwtPayload: IUserSignature = (req as IAuthRequest)
            .userSignature as IUserSignature;
        return await this.userService.deleteUserByEmail(jwtPayload.email);
    }

    /**
     * Calls get user by email service.
     * @returns Promise<UserProfile | undefined> - user profile or undefined
     */
    public async getUserByEmail(req: core.Request): Promise<IUserProfile> {
        const jwtPayload: IUserSignature = (req as IAuthRequest)
            .userSignature as IUserSignature;
        return await this.userService.getUserByEmail(jwtPayload.email);
    }

    /**
     * Calls update user by email service.
     * @returns Promise<UserProfile | undefined> - user profile or undefined
     */
    public async updateUserByEmail(req: core.Request): Promise<IUserProfile> {
        const jwtPayload: IUserSignature = (req as IAuthRequest)
            .userSignature as IUserSignature;
        return await this.userService.updateUserByEmail(
            jwtPayload.email,
            req.body,
        );
    }
}
