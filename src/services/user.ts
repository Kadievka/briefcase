import UserInterface from '../interfaces/User';
import usersResource from '../resources/Users';
import DatabaseService from './database';
import UserModel, { UserProfile } from "../models/User";
import BaseErrorClass from "../resources/configurations/classes/BaseErrorClass";
import INTERNAL_ERROR_CODES from "../resources/configurations/constants/InternalErrorCodes";

export default class UserService {

    databaseService: DatabaseService;

    static instance: UserService;

    /**
     * Returns the single instance of UserService.
     * @returns UserService - Singleton instance
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    constructor(){
        this.databaseService = DatabaseService.getInstance();
    }

    /**
     * Maps Users to an array of names.
     * @returns users - Array of user's names
     */
    async getUsers(): Promise<string[]> {
        let users: string[] = [];

        try {
            await this.databaseService.connect('users');
            const dbCollection = this.databaseService.collections.users;

            const dbUsers = await dbCollection.find().toArray() as unknown as UserModel[];

            users = dbUsers.map((user) => user.name);
        } catch (error) {
            throw new BaseErrorClass({...INTERNAL_ERROR_CODES.GENERAL_UNKNOWN});
        }
        
        return users;
    }

    /**
     * Creates a new user.
     * @returns Promise<UserInterface>
     */
    async createUser(userDto: UserInterface): Promise<UserProfile> {

        let user: UserProfile;

        /* TODO:
            - add validation for required fields
            - add validation for unique email
            - encrypt password
        */

        try {
            await this.databaseService.connect('users');
            const dbCollection = this.databaseService.collections.users;

            await dbCollection.insertOne(userDto);
            const dbUser = await dbCollection.findOne({email: userDto.email}) as unknown as UserInterface;

            const userModel: UserModel = new UserModel(dbUser);

            if(dbUser){

            }

            user = userModel.getUserProfile();

        } catch (error) {
            console.log(error)
            throw new BaseErrorClass({...INTERNAL_ERROR_CODES.GENERAL_UNKNOWN});
        }

        return user;
    }
}
