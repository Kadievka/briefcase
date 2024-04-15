// External Dependencies
import * as mongoDB from 'mongodb';

export default class DatabaseService {
    static instance: DatabaseService;

    /**
     * Returns the single instance of DatabaseService.
     * @returns DatabaseService - Singleton instance
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new DatabaseService();
        }
        return this.instance;
    }

    mongodbClient: mongoDB.MongoClient;
    db?: mongoDB.Db;

    constructor() {
        this.mongodbClient = new mongoDB.MongoClient(
            process.env.MONGODB_CONNECTION_STRING!,
        );
    }

    collections: Record<string, mongoDB.Collection<mongoDB.BSON.Document>> = {};

    /**
     * Opens a connection to the database and collection
     * @param collection: string - Needs a collection name to connect to de database
     * @returns Promise - void
     */
    async connect(collection: string): Promise<void> {
        await this.mongodbClient.connect();
        this.db = this.mongodbClient.db(process.env.MONGODB_DB_NAME!);

        const dbCollection: mongoDB.Collection<mongoDB.BSON.Document> =
            this.db.collection(collection);
        this.collections[collection] = dbCollection;
    }

    /**
     * Closes a connection to the database
     * @returns Promise - void
     */
    async disconnect(): Promise<void> {
        await this.mongodbClient.close();
    }
}
