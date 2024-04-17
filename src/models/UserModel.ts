import IUser from '../interfaces/IUser';
import IUserProfile from '../interfaces/IUserProfile';

export default class UserModel implements IUser {
    public name: string;
    public surname: string;
    public email: string;
    public password: string;

    constructor(user: IUser) {
        this.name = user.name;
        this.surname = user.surname;
        this.email = user.email;
        this.password = user.password;
    }

    /**
     * Returns user profile information only.
     * @returns UserProfile - the user profile data
     */
    public getUserProfile(): IUserProfile {
        return {
            email: this.email,
            name: this.name,
            surname: this.surname,
        } as IUserProfile;
    }
}
