import { expect, request, Response } from '@playwright/test';
import { Then, When, Before } from '@cucumber/cucumber';
import { sendRequest } from '../../functions/global.functions';
import World from '../../classes/World';

/* tslint:disable */
const This = new World();

Before(() => {
    This.response = '';
});

When('I have not authorization headers', () => {
    This.request = request.newContext({
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            Authorization: '',
        },
    });
});

When('I have authorization headers', () => {
    This.request = request.newContext({
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${This.token}`,
        },
    });
});

When('I send {string} {string} request', async (route: string, method: string) => {
    This.response = await sendRequest(This.request, {
        route: This.getBaseURL() + route,
        method,
        data: This.data,
    });
});

Then('I should receive {int} statusCode', async (statusCode: number) => {
    if (statusCode === 204) {
        const castedResponse = This.response as Response;
        This.response = castedResponse;
        expect(This.response.status()).toBe(statusCode);
    } else {
        const bodyJson = await This.response?.json();
        This.response = bodyJson;
        expect(This.response).toHaveProperty('statusCode', statusCode);
    }
});

Then('I should receive {string} message', async (message: string) => {
    if (message === 'No Content') {
        expect(This.response.statusText()).toBe(message);
    } else {
        expect(This.response).toHaveProperty('message', message);
    }
});

Then('I should receive internal error with {int} code', async (code: number) => {
    expect(This.response.error).toHaveProperty('code', code);
});

Then('I should receive internal error with {string} message', async (message: string) => {
    expect(This.response.error).toHaveProperty('message', message);
});

Then('I should receive {string} property in the response body', async (property: string) => {
    expect(This.response).toHaveProperty(property);
});

Then('The {string} property should have {} parameters', async (property: string, parameters: any) => {
    const dataProperties: string[] = JSON.parse(parameters);
    dataProperties.forEach((param) => {
        expect(This.response[property]).toHaveProperty(param);
    });
});

Then('The data.docs[0] property should have {} parameters', async (parameters: any) => {
    const dataProperties: string[] = JSON.parse(parameters);
    dataProperties.forEach((param) => {
        expect(This.response.data.docs[0]).toHaveProperty(param);
    });
});

Then('I should save user and token in the context', async () => {
    This.token = This.response.data.token;
    This.user.email = This.response.data.user.email;
    This.user.name = This.response.data.user.name;
    This.user.password = This.data.password;

    expect(This.token).toBeDefined();
    expect(This.user.email).toBeDefined();
    expect(This.user.name).toBeDefined();
    expect(This.user.password).toBeDefined();
});

Then('The {string} property should have {int} elements', async (property: string, length: number) => {
    expect(This.response.data[property].length).toBe(length);
});

export { This };
