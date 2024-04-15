import core from 'express';
import UserService from '../services/user';
import { UserProfile } from '../models/User';

export default class UserController {
    userService: UserService = UserService.getInstance();

    static instance: UserController;

    /**
     * Returns the single instance of UserController.
     * @returns UserController - Singleton instance
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserController();
        }
        return this.instance;
    }

    /**
     * Calls get users service.
     * @returns users - Array of user's names
     */
    async getUsers(_req: any): Promise<string[]> {
        return await this.userService.getUsers();
    }

    /**
     * Calls create users service.
     * @returns user
     */
    async createUser(req: core.Request): Promise<void> {
        return await this.userService.createUser(req.body);
    }

    /**
     * Calls delete user by email service.
     * @returns Promise<void> - void
     */
    async deleteUser(req: core.Request): Promise<void> {
        return await this.userService.deleteUserByEmail(req.body.email);
    }

    /**
     * Calls get user by email service.
     * @returns Promise<UserProfile | undefined> - user profile or undefined
     */
    async getUserByEmail(req: core.Request): Promise<UserProfile | undefined> {
        return await this.userService.getUserByEmail(req.params.email);
    }
}
