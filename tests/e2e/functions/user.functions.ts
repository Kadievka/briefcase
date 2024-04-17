import { APIRequestContext } from '@playwright/test';
import IUser from '../../../src/interfaces/IUser';

export async function deleteUser(
    req: Promise<APIRequestContext>,
    baseURL: string,
    email: string,
) {
    return await (
        await req
    ).delete(`${baseURL}/users`, {
        data: {
            body: {
                email: email,
            },
        },
    });
}

export async function createUser(
    req: Promise<APIRequestContext>,
    baseURL: string,
    user: IUser,
) {
    return await (
        await req
    ).post(`${baseURL}/users`, {
        data: {
            body: {
                ...user,
            },
        },
    });
}
