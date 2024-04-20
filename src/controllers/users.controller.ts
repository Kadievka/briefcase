import core from 'express';
import IUserProfile from '../interfaces/IUserProfile';
import UserService from '../services/user.service';

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
    public async getUsers(_req: any): Promise<IUserProfile[]> {
        return await this.userService.getUsers();
    }

    /**
     * Calls create users service.
     * @returns user
     */
    public async createUser(req: core.Request): Promise<void> {
        return await this.userService.createUser(req.body);
    }

    /**
     * Calls delete user by email service.
     * @returns Promise<void> - void
     */
    public async deleteUser(req: core.Request): Promise<void> {
        return await this.userService.deleteUserByEmail(req.body.email);
    }

    /**
     * Calls get user by email service.
     * @returns Promise<UserProfile | undefined> - user profile or undefined
     */
    public async getUserByEmail(
        req: core.Request,
    ): Promise<IUserProfile | undefined> {
        return await this.userService.getUserByEmail(req.params.email);
    }

    /**
     * Calls update user by email service.
     * @returns Promise<UserProfile | undefined> - user profile or undefined
     */
    public async updateUserByEmail(
        req: core.Request,
    ): Promise<IUserProfile | undefined> {
        return await this.userService.updateUserByEmail(req.body);
    }
}
