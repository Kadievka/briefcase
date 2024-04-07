import UserService from '../services/user';

export default class UserController {
    userService: UserService = UserService.getInstance();

    static instance: UserController;

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserController();
        }
        return this.instance;
    }

    getUsers(): string[] {
        return this.userService.getUsers();
    }
}
