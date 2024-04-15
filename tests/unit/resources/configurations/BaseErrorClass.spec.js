"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InternalErrorCodes_1 = __importDefault(require("../../../../src/resources/configurations/constants/InternalErrorCodes"));
const BaseErrorClass_1 = __importDefault(require("../../../../src/resources/configurations/classes/BaseErrorClass"));
describe('BaseErrorClass Unit Tests', () => {
    describe('constructor', () => {
        it('should create a new ResponseClass', () => {
            const baseErrorInterface = {
                ...InternalErrorCodes_1.default.GENERAL_UNKNOWN,
            };
            const baseErrorClass = new BaseErrorClass_1.default(baseErrorInterface);
            expect(baseErrorClass).toBeInstanceOf(BaseErrorClass_1.default);
            expect(baseErrorClass).toHaveProperty('code', 100);
            expect(baseErrorClass).toHaveProperty('message', 'General unknown error');
            expect(baseErrorClass).toHaveProperty('statusCode', 500);
        });
    });
});
//# sourceMappingURL=BaseErrorClass.spec.js.map