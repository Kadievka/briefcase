import IUser from '../interfaces/IUser';
import IUserModelInput from '../interfaces/IUserModelInput';
import IUserProfile from '../interfaces/IUserProfile';
import IUserSignature from '../interfaces/IUserSignature';
import BaseErrorClass from '../resources/configurations/classes/BaseErrorClass';
import INTERNAL_ERROR_CODES from '../resources/configurations/constants/InternalErrorCodes';
import { encrypt, isMatching } from '../utils/encrypt';

export default class UserModel implements IUser {
    public name: string;
    public surname: string;
    public email: string;
    public password: string;

    private SALT_ROUNDS: number = Number(process.env.PASSWD_SALT_ROUNDS!);

    constructor({ user, encryptPassword }: IUserModelInput) {
        this.name = user.name;
        this.surname = user.surname;
        this.email = user.email;
        this.password = encryptPassword ? this.encryptedPassword(user.password) : user.password;
    }

    /**
     * Map user's fields for database
     * @param {string} enteredPassword The password entered by the user
     * @returns {void} it could throw invalid password error
     */
    public validatePassword(enteredPassword: string): void {
        if (!isMatching(enteredPassword, this.password)) {
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.PASSWORD_INVALID);
        }
    }

    /**
     * Map user's fields for database
     * @returns {IUser} User Interface object
     */
    public mapForDB(): IUser {
        return {
            email: this.email,
            name: this.name,
            password: this.password,
            surname: this.surname,
        };
    }

    /**
     * Returns user profile information only.
     * @returns {UserProfile} - the user profile data
     */
    public getUserProfile(): IUserProfile {
        return {
            email: this.email,
            name: this.name,
            surname: this.surname,
        } as IUserProfile;
    }

    /**
     * Returns user signature for jwt
     * @returns {IUserSignature} - the user signature
     */
    public getUserSignature(): IUserSignature {
        return {
            email: this.email,
            name: this.name,
        } as IUserSignature;
    }

    /**
     * Encrypts user's password
     * @param {string} pass
     * @returns {string} encrypted password
     */
    private encryptedPassword(pass: string): string {
        return encrypt(this.SALT_ROUNDS, pass);
    }
}
