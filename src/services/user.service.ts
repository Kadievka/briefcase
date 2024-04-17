import IUser from '../interfaces/IUser';
import DatabaseService from './database.service';
import UserModel from '../models/UserModel';
import BaseErrorClass from '../resources/configurations/classes/BaseErrorClass';
import INTERNAL_ERROR_CODES from '../resources/configurations/constants/InternalErrorCodes';
import getLogger from '../utils/logger';
import IUserProfile from '../interfaces/IUserProfile';

const log = getLogger('user.service');

export default class UserService {
    public static instance: UserService;

    /**
     * Returns the single instance of UserService.
     * @returns {UserService} Singleton instance
     */
    public static getInstance(): UserService {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    public databaseService: DatabaseService;

    constructor() {
        this.databaseService = DatabaseService.getInstance();
    }

    /**
     * Maps Users to an array of users profiles.
     * @returns { Promise<IUserProfile[]>} Array of user's names
     */
    public async getUsers(): Promise<IUserProfile[]> {
        log.info('Start UserService@getUsers method');

        const users: IUserProfile[] = [];

        try {
            await this.databaseService.connect('users');
            const dbCollection = this.databaseService.collections.users;

            const dbUsers = (await dbCollection
                .find()
                .toArray()) as unknown as IUser[];

            dbUsers.map((user) => {
                const userModel: UserModel = new UserModel({
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    surname: user.surname,
                });
                const userProfile: IUserProfile = userModel.getUserProfile();
                users.push(userProfile);
            });

            await this.databaseService.disconnect();
        } catch (error) {
            log.error('Error getUsers method', error);
            throw new BaseErrorClass({
                ...INTERNAL_ERROR_CODES.GENERAL_UNKNOWN,
            });
        }

        log.info('Finish UserService@getUsers method');
        return users;
    }

    /**
     * Creates a new user.
     * @param {string} userDto User fields to create
     * @returns {Promise<void>} void
     */
    public async createUser(userDto: IUser): Promise<void> {
        log.info('Start UserService@createUser method');
        let user: IUserProfile;

        /* TODO:
            - add validation for required fields
            - add validation for unique email
            - encrypt password
        */

        try {
            await this.databaseService.connect('users');
            const dbCollection = this.databaseService.collections.users;

            await dbCollection.insertOne(userDto);
            const dbUser = (await dbCollection.findOne({
                email: userDto.email,
            })) as unknown as IUser;

            await this.databaseService.disconnect();

            if (dbUser) {
                const userModel: UserModel = new UserModel(dbUser);
                user = userModel.getUserProfile();
            } else {
                throw new BaseErrorClass({
                    ...INTERNAL_ERROR_CODES.USER_NOT_FOUND,
                });
            }
        } catch (error) {
            log.error('Error createUser method', error);
            throw new BaseErrorClass({
                ...INTERNAL_ERROR_CODES.GENERAL_UNKNOWN,
            });
        }
        log.info('Finish UserService@createUser method');
    }

    /**
     * Deletes an user by email.
     * @param {string} email The user email
     * @returns {Promise<void>} void
     */
    public async deleteUserByEmail(email: string): Promise<void> {
        log.info('Start UserService@deleteUserByEmail method');
        try {
            await this.databaseService.connect('users');
            const dbCollection = this.databaseService.collections.users;

            await dbCollection.deleteMany({ email });
            await this.databaseService.disconnect();
        } catch (error) {
            log.error('Error deleteUserByEmail method', error);
            throw new BaseErrorClass({
                ...INTERNAL_ERROR_CODES.GENERAL_UNKNOWN,
            });
        }
        log.info('Finish UserService@deleteUserByEmail method');
    }

    /**
     * Gets an user by email.
     * @param {string} email The user email
     * @returns {Promise<IUserProfile>} userProfile The user profile
     */
    public async getUserByEmail(email: string): Promise<IUserProfile> {
        log.info('Start UserService@getUserByEmail method with email: ', email);
        let user: IUserProfile;

        let dbUser: any;
        try {
            await this.databaseService.connect('users');
            const dbCollection = this.databaseService.collections.users;

            dbUser = await dbCollection.findOne({ email });

            await this.databaseService.disconnect();
        } catch (error) {
            log.error('Error getUserByEmail method', error);
            throw new BaseErrorClass({
                ...INTERNAL_ERROR_CODES.GENERAL_UNKNOWN,
            });
        }
        if (!dbUser) {
            throw new BaseErrorClass({
                ...INTERNAL_ERROR_CODES.USER_NOT_FOUND,
            });
        }
        const userModel: UserModel = new UserModel({
            ...dbUser,
        } as IUser);
        user = userModel.getUserProfile();
        log.info('Finish UserService@getUserByEmail method');
        return user;
    }
}
