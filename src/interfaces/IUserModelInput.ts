import IUser from "./IUser";

export default interface IUserModelInput {
    user: IUser,
    encryptPassword: boolean,
}