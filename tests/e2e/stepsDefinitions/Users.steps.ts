import 'dotenv/config'
import { Browser, Response, expect } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page } from 'playwright';
import UserService from '../../../src/services/user';
import * as userMocks from '../../../src/resources/mocks/Users';

const baseURL = process.env.PROTOCOL_URL! + process.env.BASE_URL! + process.env.PORT!;

let page: Page;
let browser: Browser;
let response: Response | null;

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

Given('I create 4 users with the service', async () => {
    await userService.createUser(userMocks.user1);
    await userService.createUser(userMocks.user2);
    await userService.createUser(userMocks.user3);
    await userService.createUser(userMocks.user4);
});

When('I use the route get users', async () => {
    page = await browser.newPage();
    response = await page.goto(`${baseURL}/users`);
});

Then('I should see 4 users', async () => {
    const bodyJson = await response?.json();
    expect(bodyJson).toHaveProperty('statusCode', 200)
    expect(bodyJson).toHaveProperty('message', 'Ok')
    expect(bodyJson).toHaveProperty('data')
    expect(bodyJson.data.length).toBeGreaterThanOrEqual(4);
    await browser.close();
});