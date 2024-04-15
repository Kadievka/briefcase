import 'dotenv/config';
import {
    APIRequestContext,
    Browser,
    Response,
    expect,
    request,
} from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page } from 'playwright';
import UserService from '../../../src/services/user';
import * as userMocks from '../../../src/resources/mocks/Users';

const baseURL =
    process.env.PROTOCOL_URL! + process.env.BASE_URL! + process.env.PORT!;

let page: Page;
let browser: Browser;
let response: any;
let req: Promise<APIRequestContext> = request.newContext();

const userService: UserService = UserService.getInstance();

Given('I am on the home page', async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(`${baseURL}/`);
});

Given('I delete 4 users with the service', async () => {
    await userService.deleteUserByEmail(userMocks.user1.email);
    await userService.deleteUserByEmail(userMocks.user2.email);
    await userService.deleteUserByEmail(userMocks.user3.email);
    await userService.deleteUserByEmail(userMocks.user4.email);
});

Given('I delete user1 with the service', async () => {
    await userService.deleteUserByEmail(userMocks.user1.email);
});

Given('I create 4 users with the service', async () => {
    await userService.createUser(userMocks.user1);
    await userService.createUser(userMocks.user2);
    await userService.createUser(userMocks.user3);
    await userService.createUser(userMocks.user4);
});

Given('I create user1 with the service', async () => {
    await userService.createUser(userMocks.user1);
});

When('I use the route get users', async () => {
    page = await browser.newPage();
    response = await page.goto(`${baseURL}/users`);
});

When('I use the route post users', async () => {
    response = await (
        await req
    ).post(`${baseURL}/users`, {
        data: {
            body: {
                ...userMocks.user1,
            },
        },
    });
});

When('I use the route delete users', async () => {
    response = await (
        await req
    ).delete(`${baseURL}/users`, {
        data: {
            body: {
                email: userMocks.user1.email,
            },
        },
    });
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

Then('I should receive 200 statusCode response', async () => {
    const bodyJson = await response?.json();
    expect(bodyJson).toHaveProperty('statusCode', 200);
    expect(bodyJson).toHaveProperty('message', 'Ok');
});

Then('I should receive 201 statusCode response', async () => {
    const bodyJson = await response?.json();
    expect(bodyJson).toHaveProperty('statusCode', 201);
    expect(bodyJson).toHaveProperty('message', 'Created successfully');
});

Then('I should receive 204 statusCode response', async () => {
    const castedResponse = response as Response;
    expect(castedResponse.status()).toBe(204);
    expect(castedResponse.statusText()).toBe('No Content');
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

Then('I should not see the user1 profile', async () => {
    const bodyJson = await response?.json();
    expect(bodyJson).toHaveProperty('statusCode', 200);
    expect(bodyJson).toHaveProperty('message', 'Ok');
    expect(bodyJson).toHaveProperty('data');
    expect(bodyJson.data).toStrictEqual({});
    await browser.close();
});
