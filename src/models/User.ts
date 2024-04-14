import UserInterface from '../interfaces/User';

export type UserProfile = {
    name: string;
    surname: string;
    email: string;
};

export default class UserModel implements UserInterface {
    name: string;
    surname: string;
    email: string;
    password: string;

    constructor(user: UserInterface) {
        this.name = user.name;
        this.surname = user.surname;
        this.email = user.email;
        this.password = user.password;
    }

    /**
     * Returns user profile information only.
     * @returns UserProfile - the user profile data
     */
    getUserProfile(): UserProfile {
        return {
            name: this.name,
            surname: this.surname,
            email: this.email,
        } as UserProfile;
    }

}