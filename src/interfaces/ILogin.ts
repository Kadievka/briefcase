import IUserSignature from './IUserSignature';

export interface ILoginInput {
    email: string;
    password: string;
}

export interface ILoginOutput {
    user: IUserSignature;
    token: string;
}
