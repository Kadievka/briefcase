import UserService from '../services/user';

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
    getUsers(): string[] {
        return this.userService.getUsers();
    }
}
