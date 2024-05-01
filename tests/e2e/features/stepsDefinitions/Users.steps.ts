import { When } from '@cucumber/cucumber';
import { This } from './Global.steps';

When('I set the create user body', async () => {
    This.data = This.newUser;
});

When('I set the update user body', async () => {
    This.data = This.updatedUser;
});

When('I send login body', async () => {
    This.data = {
        email: This.newUser.email,
        password: This.newUser.password,
    };
});

When('I send login body with updated user', async () => {
    This.data = {
        email: This.updatedUser.email,
        password: This.updatedUser.password,
    };
});
