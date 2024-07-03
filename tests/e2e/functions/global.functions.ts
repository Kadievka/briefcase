import { APIRequestContext, APIResponse } from '@playwright/test';

export async function senRequest(req: Promise<APIRequestContext>, baseURL: string, token?: string): Promise<APIResponse> {
    return await (
        await req
    ).get(`${baseURL}/users`, {
        data: {
            header: {
                'Content-Type': 'application/json',
                /* tslint:disable */
                authorization: `Bearer ${token}`,
            },
        },
    });
}

interface ISendRequestInput {
    route: string;
    method: string;
    data: any;
}

export async function sendRequest(req: Promise<APIRequestContext>, { route, method, data }: ISendRequestInput): Promise<APIResponse | void> {
    const request: APIRequestContext = await req;

    switch (method) {
        case 'get':
            return await request.get(route, {
                data,
            });
        case 'post':
            return await request.post(route, {
                data,
            });
        case 'put':
            return await request.put(route, {
                data,
            });
        case 'delete':
            return await request.delete(route, {
                data,
            });
    }
}
