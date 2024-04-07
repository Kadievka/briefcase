import core from 'express';
import ResponseClass from '../../../../src/resources/configurations/ResponseClass';
import ResponseStatus from '../../../../src/resources/configurations/ResponseStatus';

class ControllerMockClass {
    async controllerClassMethod() {
        return {
            data: 'data'
        }
    }
}

const controllerMockClass = new ControllerMockClass();

const resMock = {
    status: ()=>({
        send: ()=>{}
    })
}

describe('ResponseClass Unit Tests', () => {

    describe('constructor', () => {
        it('should create a new ResponseClass', () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            expect(responseClass).toBeInstanceOf(ResponseClass);
            expect(responseClass).toHaveProperty('controllerInstance', controllerMockClass);
        });
    });

    describe('send', () => {

        it('should use the catch block if something wrong happens during the execution of the controller method', async () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            const result = await responseClass.send(resMock as unknown as core.Response, ResponseStatus.OK, 'controllerClassMethodDoesNotExist');
            expect(result).toBeUndefined();
        });

        it('should use send method with Response Status OK', async () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            const result = await responseClass.send(resMock as unknown as core.Response, ResponseStatus.OK, 'controllerClassMethod');
            expect(result).toBeUndefined();
        });

        it('should use send method with Response Status CREATED', async () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            const result = await responseClass.send(resMock as unknown as core.Response, ResponseStatus.CREATED, 'controllerClassMethod');
            expect(result).toBeUndefined()
        });

        it('should use send method with Response Status ACCEPTED', async () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            const result = await responseClass.send(resMock as unknown as core.Response, ResponseStatus.ACCEPTED, 'controllerClassMethod');
            expect(result).toBeUndefined()
        });

        it('should use send method with Response Status NO_CONTENT', async () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            const result = await responseClass.send(resMock as unknown as core.Response, ResponseStatus.NO_CONTENT, 'controllerClassMethod');
            expect(result).toBeUndefined()
        });

        it('should use send method with Response Status BAD_REQUEST', async () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            const result = await responseClass.send(resMock as unknown as core.Response, ResponseStatus.BAD_REQUEST, 'controllerClassMethod');
            expect(result).toBeUndefined()
        });

        it('should use send method with Response Status UNAUTHORIZED', async () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            const result = await responseClass.send(resMock as unknown as core.Response, ResponseStatus.UNAUTHORIZED, 'controllerClassMethod');
            expect(result).toBeUndefined()
        });

        it('should use send method with Response Status FORBIDDEN', async () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            const result = await responseClass.send(resMock as unknown as core.Response, ResponseStatus.FORBIDDEN, 'controllerClassMethod');
            expect(result).toBeUndefined()
        });

        it('should use send method with Response Status NOT_FOUND', async () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            const result = await responseClass.send(resMock as unknown as core.Response, ResponseStatus.NOT_FOUND, 'controllerClassMethod');
            expect(result).toBeUndefined()
        });
        
        it('should use send method with Response Status REQUEST_TIMEOUT', async () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            const result = await responseClass.send(resMock as unknown as core.Response, ResponseStatus.REQUEST_TIMEOUT, 'controllerClassMethod');
            expect(result).toBeUndefined()
        });

        it('should use send method with Response Status INTERNAL_SERVER_ERROR', async () => {
            const responseClass: ResponseClass = new ResponseClass(controllerMockClass);
            const result = await responseClass.send(resMock as unknown as core.Response, ResponseStatus.INTERNAL_SERVER_ERROR, 'controllerClassMethod');
            expect(result).toBeUndefined()
        });
        
    });
});