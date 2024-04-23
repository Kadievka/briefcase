import { APIRequestContext, APIResponse } from '@playwright/test';
import IUser from '../../../src/interfaces/IUser';

export async function deleteUser(
    req: Promise<APIRequestContext>,
    baseURL: string,
    email: string,
    token?: string,
): Promise<APIResponse> {
    return await (
        await req
    ).delete(`${baseURL}/users`, {
        data: {
            header: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            body: {
                email,
            },
        },
    });
}

export async function getUsers(
    req: Promise<APIRequestContext>,
    baseURL: string,
    token?: string,
): Promise<APIResponse> {
    return await (
        await req
    ).get(`${baseURL}/users`, {
        data: {
            header: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
        },
    });
}

export async function createUser(
    req: Promise<APIRequestContext>,
    baseURL: string,
    user: IUser,
    token?: string,
): Promise<APIResponse> {
    return await (
        await req
    ).post(`${baseURL}/users`, {
        data: {
            header: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            body: {
                ...user,
            },
        },
    });
}

export async function login(
    req: Promise<APIRequestContext>,
    baseURL: string,
    user: IUser,
): Promise<APIResponse> {
    return await (
        await req
    ).post(`${baseURL}/auth/login`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            body: {
                email: user.email,
                password: user.password,
            },
        },
    });
}
