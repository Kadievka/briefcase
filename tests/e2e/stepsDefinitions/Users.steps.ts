import 'dotenv/config';
import {
    APIRequestContext,
    Browser,
    expect,
    request,
    Response,
} from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page } from 'playwright';
import * as userMocks from '../../../src/resources/mocks/UsersMock';
import IUser from '../../../src/interfaces/IUser';
import { deleteUser, createUser, login, getUsers } from '../functions/user.functions';

const baseURL =
    process.env.PROTOCOL_URL! + process.env.BASE_URL! + process.env.PORT!;

let page: Page;
let browser: Browser;
let response: any;
const req: Promise<APIRequestContext> = request.newContext();
let jwt = '';

const usersMockArray: IUser[] = [
    userMocks.user1,
    userMocks.user2,
    userMocks.user3,
    userMocks.user4,
];

Given('my jwt', async () => {
    if(!jwt){
        response = await login(req, baseURL, userMocks.user5);
        console.log("BORRAME", response)
        const bodyJson = await response?.json();
        console.log("BORRAME", {bodyJson})
        // jwt = bodyJson.data.token;
    }
});

Given('I am on the home page', async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(`${baseURL}/`);
});

Given('I delete {int} users', async (numberOfUsers: number) => {
    const users: IUser[] = usersMockArray.slice(0, numberOfUsers - 1);
    users.forEach(async (user) => {
        await deleteUser(req, baseURL, user.email);
    });
});

Given('I create {int} users', async (numberOfUsers: number) => {
    const users: IUser[] = usersMockArray.slice(0, numberOfUsers - 1);
    users.forEach(async (user) => {
        await createUser(req, baseURL, user, jwt);
    });
});

Given('I delete user1', async () => {
    await deleteUser(req, baseURL, userMocks.user1.email);
});

When('I use the route get users', async () => {
    response = await getUsers(req, baseURL, jwt);
    console.log("BORRAME", response);
});

When('I use the route post users', async () => {
    response = await createUser(req, baseURL, userMocks.user1, jwt);
});

When('I use the route delete users', async () => {
    response = await deleteUser(req, baseURL, userMocks.user1.email, jwt);
});

When('I use the route get user by email', async () => {
    response = await (
        await req
    ).get(`${baseURL}/users/${userMocks.user1.email}`);
});

Then('I should see 4 users', async () => {
    const bodyJson = await response?.json();
    expect(bodyJson).toHaveProperty('data');
    expect(bodyJson.data.length).toBeGreaterThanOrEqual(4);
    await browser.close();
});

Then('I should see the user1 profile', async () => {
    const bodyJson = await response?.json();
    expect(bodyJson).toHaveProperty('data');
    expect(bodyJson.data).toStrictEqual({
        email: userMocks.user1.email,
        name: userMocks.user1.name,
        surname: userMocks.user1.surname,
    });
    await browser.close();
});

Then('I should receive {int} statusCode', async (statusCode: number) => {
    if (statusCode === 204) {
        const castedResponse = response as Response;
        expect(castedResponse.status()).toBe(statusCode);
    } else {
        const bodyJson = await response?.json();
        expect(bodyJson).toHaveProperty('statusCode', statusCode);
    }
});

Then('I should receive {string} message', async (message: string) => {
    if (message === 'No Content') {
        const castedResponse = response as Response;
        expect(castedResponse.statusText()).toBe(message);
    } else {
        const bodyJson = await response?.json();
        expect(bodyJson).toHaveProperty('message', message);
    }
});
