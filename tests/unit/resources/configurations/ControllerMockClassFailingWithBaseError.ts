import BaseErrorClass from '../../../../src/resources/configurations/classes/BaseErrorClass';

export default class ControllerMockClassFailingWithBaseError {
    public async methodThrowsBaseError() {
        throw new BaseErrorClass({
            code: 200,
            message: 'I am an internal custom error message',
            statusCode: 500,
        });
    }
}
