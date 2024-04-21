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

        // TODO: make pagination

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
        } catch (error) {
            log.error('Error UserService@getUsers method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
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

        /* TODO:
            - add validation for required fields and types
            - add validation for unique email
        */
        const userModel: UserModel = new UserModel(userDto);

        try {
            await this.databaseService.connect('users');
            const dbCollection = this.databaseService.collections.users;

            await dbCollection.insertOne(userModel.mapForDB());
        } catch (error) {
            log.error('Error UserService@createUser method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
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
        } catch (error) {
            log.error('Error UserService@deleteUserByEmail method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
        }
        log.info('Finish UserService@deleteUserByEmail method');
    }

    /**
     * Gets an user by email.
     * @param {string} email The user email
     * @returns {Promise<any>} user information comes from the database
     */
    public async getDbUserByEmail(email: string): Promise<any> {
        log.info(
            'Start UserService@getDbUserByEmail method with email: ',
            email,
        );
        let dbUser: any;
        try {
            await this.databaseService.connect('users');
            const dbCollection = this.databaseService.collections.users;
            dbUser = await dbCollection.findOne({ email });
        } catch (error) {
            log.error('Error UserService@getDbUserByEmail method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
        }
        log.info('Finish UserService@getDbUserByEmail method');
        return dbUser;
    }

    /**
     * Gets an user by email.
     * @param {string} email The user email
     * @returns {Promise<IUserProfile>} userProfile The user profile
     */
    public async getUserByEmail(email: string): Promise<IUserProfile> {
        log.info('Start UserService@getUserByEmail method with email: ', email);

        const dbUser = await this.getDbUserByEmail(email);

        const user: IUserProfile = this.getUserProfile(dbUser);

        log.info('Finish UserService@getUserByEmail method');
        return user;
    }

    /**
     * Updates an user by email.
     * @param {IUser} userDto The user object to update
     * @returns {Promise<IUserProfile>} userProfile The updated user profile
     */
    public async updateUserByEmail(
        userDto: IUserProfile,
    ): Promise<IUserProfile> {
        log.info(
            'Start UserService@updateUserByEmail method with email: ',
            userDto.email,
        );
        await this.getUserByEmail(userDto.email);

        // TODO add logic to update the email or the password

        let dbUser: any;
        try {
            await this.databaseService.connect('users');
            const dbCollection = this.databaseService.collections.users;

            dbUser = await dbCollection.updateOne(
                { email: userDto.email },
                {
                    name: userDto.name,
                    surname: userDto.surname,
                },
            );
        } catch (error) {
            log.error('Error UserService@updateUserByEmail method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
        }

        log.info('Finish UserService@updateUserByEmail method');
        return this.getUserProfile(dbUser);
    }

    /**
     * Casts a dbUser to a user profile
     * @param {any} dbUser The user object to update
     * @returns {Promise<IUserProfile>} user profile
     */
    private getUserProfile(dbUser: any): IUserProfile {
        log.info('Start UserService@getUserProfile method');
        if (!dbUser) {
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.USER_NOT_FOUND);
        }
        const userModel: UserModel = new UserModel({
            ...dbUser,
        } as IUser);
        log.info('Finish UserService@getUserProfile method');
        return userModel.getUserProfile();
    }
}
