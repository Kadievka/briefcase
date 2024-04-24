import DatabaseService from './database.service';
import BaseErrorClass from '../resources/configurations/classes/BaseErrorClass';
import INTERNAL_ERROR_CODES from '../resources/configurations/constants/InternalErrorCodes';
import getLogger from '../utils/logger';
import JWTBlackListModel from '../models/JWTBlackListModel';
import { ISODate } from '../utils/dates';

const log = getLogger('JWTBlackList.service');

const databaseService = DatabaseService.getInstance();

export default class JWTBlackListService {
    public static instance: JWTBlackListService;

    /**
     * Returns the single instance of JWTBlackListService.
     * @returns {JWTBlackListService} Singleton instance
     */
    public static getInstance(): JWTBlackListService {
        if (!this.instance) {
            this.instance = new JWTBlackListService();
        }
        return this.instance;
    }

    private JWT_BLACK_LIST_LIFETIME: number = Number(process.env.JWT_BLACK_LIST_LIFETIME!);

    /**
     * Creates a new user.
     * @param {string} userDto User fields to create
     * @returns {Promise<void>} void
     */
    public async registerJWT(jwt: string): Promise<void> {
        log.info('Start JWTBlackListService@registerJWT method');

        const isBlackListed = await this.isBlackListed(jwt);

        if (isBlackListed) {
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.UNAUTHORIZED);
        }

        const jwtBlackListModel: JWTBlackListModel = new JWTBlackListModel(jwt);
        try {
            await databaseService.connect('jwt_black_list');
            const dbCollection = databaseService.collections.jwt_black_list;

            await dbCollection.insertOne(jwtBlackListModel.mapForDB());
        } catch (error) {
            log.error('Error JWTBlackListService@registerJWT method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
        } finally {
            await databaseService.disconnect();
        }
        log.info('Finish JWTBlackListService@registerJWT method');
    }

    /**
     * Gets a jwt black listed.
     * @param {string} token The user email
     * @returns {Promise<any>} jwt black listed information comes from the database
     */
    public async isBlackListed(token: string): Promise<boolean> {
        log.info('Start JWTBlackListService@token method with token:', token);
        let dbToken: any;
        try {
            await databaseService.connect('jwt_black_list');
            const dbCollection = databaseService.collections.jwt_black_list;
            dbToken = await dbCollection.findOne({ jwt: token });
        } catch (error) {
            log.error('Error JWTBlackListService@token method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
        } finally {
            await databaseService.disconnect();
        }
        log.info('Finish JWTBlackListService@token method');
        return Boolean(dbToken);
    }

    public async deleteManyJWT(): Promise<void> {
        log.info('Start JWTBlackListService@deleteManyJWT method');
        try {
            await databaseService.connect('jwt_black_list');
            const dbCollection = databaseService.collections.jwt_black_list;

            // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
            const daysAgoMilliseconds = Date.now() - 1000 * 60 * 60 * 24 * this.JWT_BLACK_LIST_LIFETIME;
            const daysAgo: string = ISODate(new Date(daysAgoMilliseconds));

            log.info('JWTBlackListService@deleteManyJWT daysAgo:', daysAgo);
            await dbCollection.deleteMany({
                createdAt: {
                    // Dates in mongodb need to be in Y-M-D format
                    $lt: daysAgo,
                },
            });
        } catch (error) {
            log.error('Error JWTBlackListService@deleteManyJWT method', error);
            throw new BaseErrorClass(INTERNAL_ERROR_CODES.GENERAL_UNKNOWN);
        } finally {
            await databaseService.disconnect();
        }
        log.info('Finish JWTBlackListService@deleteManyJWT method');
    }
}
