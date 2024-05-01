import { request } from '@playwright/test';
import 'dotenv/config';

export default class World {
    public token: string = '';

    public user = {
        name: '',
        surname: '',
        email: '',
        password: '',
    };

    public newUser = {
        name: 'Antonio',
        surname: 'López',
        email: 'antonio14@gmail.com',
        password: '123456',
    };

    public updatedUser = {
        name: 'José Antonio',
        surname: 'López Martinez',
        email: 'antonio_jose@gmail.com',
        password: '123456789',
    };

    public data: any = {
        header: {
            'Content-Type': 'application/json',
            /* tslint:disable */
            authorization: '',
        },
        body: {},
    };

    public response: any = '';

    public request: any = request.newContext();

    private readonly baseURL: string = process.env.PROTOCOL_URL! + process.env.BASE_URL! + process.env.PORT!;

    public getBaseURL(): string {
        return this.baseURL;
    }
}
