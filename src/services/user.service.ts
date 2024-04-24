import IUser from '../interfaces/IUser';
import DatabaseService from './database.service';
import UserModel from '../models/UserModel';
import BaseErrorClass from '../resources/configurations/classes/BaseErrorClass';
import INTERNAL_ERROR_CODES from '../resources/configurations/constants/InternalErrorCodes';
import getLogger from '../utils/logger';
import IUserProfile from '../interfaces/IUserProfile';
import { ReturnDocument } from 'mongodb';
import IPaginationInput from '../interfaces/configurations/IPaginationInput';
import { calculatePages, calculateSkip } from '../utils/pagination';
import IPaginationOutput from '../interfaces/configurations/IPaginationOutput';

const log = getLogger('user.service');

const databaseService: DatabaseService = DatabaseService.getInstance();

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

    /**
     * Maps Users to an array of users profiles.
     * @returns { Promise<IUserProfile[]>} Array of user's names
     */
    public async getUsers({ page, limit }: IPaginationInput): Promise<IPaginationOutput> {
        log.info('Start UserService@getUsers method with queryParams:', page, limit);

        const offset: number = calculateSkip(page, limit);

        let docs: IUser[];
        let total: number;
        let pages: number;

        try {
            await databaseService.connect('users');
            const usersCollection = databaseService.collections.users;

            docs = (await usersCollection
                .find()
                .project({
                    _id: 0,
                    email: 1,
                    name: 1,
                    surname: 1,
                })
                .skip(offset)
                .limit(limit)
                .toArray()) as unknown as IUser[];

            total = await usersCollection.countDocuments();
            pages = calculatePages(limit, total);
        } catch (error) {
            log.error('Error UserService@getUsers method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
        } finally {
            await databaseService.disconnect();
        }
        log.info('Finish UserService@getUsers method');
        return {
            docs,
            page,
            pages,
            limit,
            skip: offset,
            total,
        };
    }

    /**
     * Creates a new user.
     * @param {string} userDto User fields to create
     * @returns {Promise<void>} void
     */
    public async createUser(userDto: IUser): Promise<IUserProfile> {
        log.info('Start UserService@createUser method');

        const dbUser = await this.getDbUserByEmail(userDto.email);
        if (dbUser) {
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.USER_ALREADY_EXISTS);
        }
        const userModel: UserModel = new UserModel({
            user: userDto,
            encryptPassword: true,
        });

        try {
            await databaseService.connect('users');
            const usersCollection = databaseService.collections.users;

            await usersCollection.insertOne(userModel.mapForDB());
        } catch (error) {
            log.error('Error UserService@createUser method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
        } finally {
            await databaseService.disconnect();
        }
        log.info('Finish UserService@createUser method');
        return userModel.getUserProfile();
    }

    /**
     * Deletes an user by email.
     * @param {string} email The user email
     * @returns {Promise<void>} void
     */
    public async deleteUserByEmail(email: string): Promise<void> {
        log.info('Start UserService@deleteUserByEmail method');
        try {
            await databaseService.connect('users');
            const usersCollection = databaseService.collections.users;

            await usersCollection.deleteMany({ email });
        } catch (error) {
            log.error('Error UserService@deleteUserByEmail method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
        } finally {
            await databaseService.disconnect();
        }
        log.info('Finish UserService@deleteUserByEmail method');
    }

    /**
     * Gets an user by email.
     * @param {string} email The user email
     * @returns {Promise<any>} user information comes from the database
     */
    public async getDbUserByEmail(email: string): Promise<any> {
        log.info('Start UserService@getDbUserByEmail method with email: ', email);
        let dbUser: any;
        try {
            await databaseService.connect('users');
            const usersCollection = databaseService.collections.users;

            dbUser = await usersCollection.findOne({ email });
        } catch (error) {
            log.error('Error UserService@getDbUserByEmail method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
        } finally {
            await databaseService.disconnect();
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
     * @param {string} email the current user email
     * @param {IUser} userDto The user object to update
     * @returns {Promise<IUserProfile>} userProfile The updated user profile
     */
    public async updateUserByEmail(email: string, userDto: IUser): Promise<IUserProfile> {
        log.info('Start UserService@updateUserByEmail method with email: ', email);

        const dbUser = await this.getDbUserByEmail(email);

        const isEmailUpdated = Boolean(userDto.email);
        const isPasswordUpdated = Boolean(userDto.password);

        const updateData: UserModel = new UserModel({
            user: {
                name: userDto.name ? userDto.name : dbUser.name,
                surname: userDto.surname ? userDto.surname : dbUser.surname,
                email: isEmailUpdated ? await this.validateEmail(email, dbUser as IUser, userDto.email) : dbUser.email,
                password: isPasswordUpdated ? userDto.password : dbUser.password,
            },
            encryptPassword: isPasswordUpdated,
        });

        let dbUpdatedResult;
        try {
            await databaseService.connect('users');
            const usersCollection = databaseService.collections.users;

            dbUpdatedResult = await usersCollection.findOneAndUpdate({ email }, { $set: { ...updateData.mapForDB() } }, { returnDocument: ReturnDocument.AFTER });
        } catch (error) {
            log.error('Error UserService@updateUserByEmail method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
        } finally {
            await databaseService.disconnect();
        }

        const userProfile: IUserProfile = new UserModel({
            user: dbUpdatedResult as unknown as IUser,
            encryptPassword: false,
        }).getUserProfile();

        log.info('Finish UserService@updateUserByEmail method');
        return userProfile;
    }

    private async validateEmail(jwtEmail: string, foundUserByJwtEmail: IUser, userDtoEmail: string): Promise<string> {
        if (jwtEmail !== userDtoEmail) {
            const dBUser = (await this.getDbUserByEmail(userDtoEmail)) as IUser;

            if (!dBUser) {
                return userDtoEmail;
            }

            if (dBUser.name === foundUserByJwtEmail.name && dBUser.surname === foundUserByJwtEmail.surname && dBUser.password === foundUserByJwtEmail.password) {
                return userDtoEmail;
            }

            throw new BaseErrorClass(INTERNAL_ERROR_CODES.USER_ALREADY_EXISTS);
        }

        return userDtoEmail;
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
            user: { ...dbUser } as IUser,
            encryptPassword: false,
        });
        log.info('Finish UserService@getUserProfile method');
        return userModel.getUserProfile();
    }
}
