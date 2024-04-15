"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../../../src/controllers/users"));
const user_1 = __importDefault(require("../../../src/services/user"));
const userMocks = __importStar(require("../../../src/resources/mocks/Users"));
const usersNames = [
    userMocks.user1.name,
    userMocks.user2.name,
    userMocks.user3.name,
    userMocks.user4.name,
];
jest.mock('mongodb');
const userService = user_1.default.getInstance();
describe('UserController Unit Tests', () => {
    describe('getInstance', () => {
        it('should return an instance of UserController', () => {
            const userController = users_1.default.getInstance();
            expect(userController).toBeInstanceOf(users_1.default);
        });
    });
    describe('getUsers', () => {
        it('should call UserService to get users', async () => {
            const mockGetUsers = jest
                .spyOn(userService, 'getUsers')
                .mockImplementation(async () => usersNames);
            const userController = users_1.default.getInstance();
            const users = await userController.getUsers({});
            expect(mockGetUsers).toHaveBeenCalledTimes(1);
            expect(users.length).toBe(4);
            expect(users).toStrictEqual(usersNames);
        });
    });
    describe('createUser', () => {
        it('should call UserService to create an user', async () => {
            const mockCreateUser = jest
                .spyOn(userService, 'createUser')
                .mockImplementation(async () => { });
            const userController = users_1.default.getInstance();
            const user = await userController.createUser({
                body: {
                    ...userMocks.user1,
                },
            });
            expect(mockCreateUser).toHaveBeenCalledTimes(1);
            expect(user).toBeUndefined();
        });
    });
});
//# sourceMappingURL=users.spec.js.map