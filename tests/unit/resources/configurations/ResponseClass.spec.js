"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseClass_1 = __importDefault(require("../../../../src/resources/configurations/classes/ResponseClass"));
const ResponseStatusCodes_1 = __importDefault(require("../../../../src/resources/configurations/constants/ResponseStatusCodes"));
const BaseErrorClass_1 = __importDefault(require("../../../../src/resources/configurations/classes/BaseErrorClass"));
class ControllerMockClass {
    async controllerClassMethod() {
        return {
            data: 'data',
        };
    }
}
const controllerMockClass = new ControllerMockClass();
class ControllerMockClassFailing {
    async methodThrowsWeirdError() {
        throw new Error();
    }
}
const controllerMockClassFailing = new ControllerMockClassFailing();
class ControllerMockClassFailingWithBaseError {
    async methodThrowsBaseError() {
        throw new BaseErrorClass_1.default({
            code: 200,
            message: 'I am an internal custom error message',
            statusCode: 500,
        });
    }
}
const controllerMockClassFailingWithBaseError = new ControllerMockClassFailingWithBaseError();
const resMock = {
    status: () => ({
        send: () => { },
    }),
};
const reqMock = {};
describe('ResponseClass Unit Tests', () => {
    describe('constructor', () => {
        it('should create a new ResponseClass', () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            expect(responseClass).toBeInstanceOf(ResponseClass_1.default);
            expect(responseClass).toHaveProperty('controllerInstance', controllerMockClass);
        });
    });
    describe('send', () => {
        it('should use the catch block if something wrong happens during the execution of the controller method', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.OK, 'controllerClassMethodDoesNotExist');
            expect(result).toBeUndefined();
        });
        it('should use the catch block if something wrong happens during the execution of the controller method and assigns general unknown message', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClassFailing);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.OK, 'methodThrowsWeirdError');
            expect(result).toBeUndefined();
        });
        it('should use the catch block if a controlled error happens during the execution of the controller method and assigns base error message', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClassFailingWithBaseError);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.OK, 'methodThrowsBaseError');
            expect(result).toBeUndefined();
        });
        it('should use send method with Response Status OK', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.OK, 'controllerClassMethod');
            expect(result).toBeUndefined();
        });
        it('should use send method with Response Status CREATED', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.CREATED, 'controllerClassMethod');
            expect(result).toBeUndefined();
        });
        it('should use send method with Response Status ACCEPTED', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.ACCEPTED, 'controllerClassMethod');
            expect(result).toBeUndefined();
        });
        it('should use send method with Response Status NO_CONTENT', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.NO_CONTENT, 'controllerClassMethod');
            expect(result).toBeUndefined();
        });
        it('should use send method with Response Status BAD_REQUEST', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.BAD_REQUEST, 'controllerClassMethod');
            expect(result).toBeUndefined();
        });
        it('should use send method with Response Status UNAUTHORIZED', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.UNAUTHORIZED, 'controllerClassMethod');
            expect(result).toBeUndefined();
        });
        it('should use send method with Response Status FORBIDDEN', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.FORBIDDEN, 'controllerClassMethod');
            expect(result).toBeUndefined();
        });
        it('should use send method with Response Status NOT_FOUND', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.NOT_FOUND, 'controllerClassMethod');
            expect(result).toBeUndefined();
        });
        it('should use send method with Response Status REQUEST_TIMEOUT', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.REQUEST_TIMEOUT, 'controllerClassMethod');
            expect(result).toBeUndefined();
        });
        it('should use send method with Response Status INTERNAL_SERVER_ERROR', async () => {
            const responseClass = new ResponseClass_1.default(controllerMockClass);
            const result = await responseClass.send(reqMock, resMock, ResponseStatusCodes_1.default.INTERNAL_SERVER_ERROR, 'controllerClassMethod');
            expect(result).toBeUndefined();
        });
    });
});
//# sourceMappingURL=ResponseClass.spec.js.map