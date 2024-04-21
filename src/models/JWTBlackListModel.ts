import IJWTBlackList from '../interfaces/IJWTBlackList';
import { ISODate } from '../utils/dates';

export default class JWTBlackListModel {
    public jwt: string;
    public createdAt: string;

    constructor(jwt: string) {
        this.jwt = jwt;
        this.createdAt = ISODate(new Date());
    }

    /**
     * Map fields for database
     * @returns {IUser} User Interface object
     */
    public mapForDB(): IJWTBlackList {
        return {
            jwt: this.jwt,
            createdAt: this.createdAt,
        };
    }
}
