import usersResource from '../resources/Users';

export default class UserService {
    static instance: UserService;

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    getUsers() {
        return usersResource.users.map((user) => user.name);
    }
}
