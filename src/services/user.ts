import usersResource from '../resources/Users';

export default class UserService {
    static instance: UserService;

    /**
     * Returns the single instance of UserService.
     * @returns UserService - Singleton instance
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    /**
     * Maps Users to an array of names.
     * @returns users - Array of user's names
     */
    getUsers() {
        return usersResource.users.map((user) => user.name);
    }
}
