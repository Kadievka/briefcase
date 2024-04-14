import { Browser, expect } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page } from 'playwright';

const baseURL = process.env.PROTOCOL_URL! + process.env.BASE_URL! + process.env.PORT!;

let page: Page;
let browser: Browser;
let response: any;

Given('I am on the home page', async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(`${baseURL}/`);
});

When('I am on the users page', async () => {
    page = await browser.newPage();
    response = await page.goto(`${baseURL}/users`);
});

Then('I should see 4 users', async () => {
    const bodyJson = await response.json();
    expect(bodyJson).toHaveProperty('statusCode', 200)
    expect(bodyJson).toHaveProperty('message', 'Ok')
    expect(bodyJson).toHaveProperty('data')
    expect(bodyJson.data.length).toBeGreaterThanOrEqual(4);
    await browser.close();
});