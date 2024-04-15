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
const user_1 = __importDefault(require("../../../src/services/user"));
const userMocks = __importStar(require("../../../src/resources/mocks/Users"));
const userService = user_1.default.getInstance();
describe('UserService Unit Tests', () => {
    describe('getInstance', () => {
        it('should return an instance of UserService', () => {
            expect(userService).toBeInstanceOf(user_1.default);
        });
    });
    describe('createUser', () => {
        it('should create 4 users', async () => {
            const userProfile1 = await userService.createUser(userMocks.user1);
            const userProfile2 = await userService.createUser(userMocks.user2);
            const userProfile3 = await userService.createUser(userMocks.user3);
            const userProfile4 = await userService.createUser(userMocks.user4);
            expect(userProfile1).toBeUndefined();
            expect(userProfile2).toBeUndefined();
            expect(userProfile3).toBeUndefined();
            expect(userProfile4).toBeUndefined();
        });
    });
    describe('getUsers', () => {
        it('should return users names', async () => {
            const userService = user_1.default.getInstance();
            const users = await userService.getUsers();
            expect(users.length).toBeGreaterThanOrEqual(4);
            expect(users).toStrictEqual(['Ana', 'Maria', 'Juan', 'Pedro']);
        });
    });
    describe('deleteUserByEmail', () => {
        it('should delete 4 users by email', async () => {
            await userService.deleteUserByEmail(userMocks.user1.email);
            await userService.deleteUserByEmail(userMocks.user2.email);
            await userService.deleteUserByEmail(userMocks.user3.email);
            await userService.deleteUserByEmail(userMocks.user4.email);
        });
    });
});
//# sourceMappingURL=user.spec.js.map