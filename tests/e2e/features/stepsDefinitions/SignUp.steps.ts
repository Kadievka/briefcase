import { When } from '@cucumber/cucumber';
import { This } from './Global.steps';

When('I send {string} email and {string} password body', async (email: string, password: string) => {
    This.data = {
        email,
        password,
    };
});
