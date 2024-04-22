import express from 'express';
import UserController from '../controllers/users.controller';
import ResponseStatus from '../resources/configurations/constants/ResponseStatusCodes';
import ResponseClass from '../resources/configurations/classes/ResponseClass';
import createUserValidator from '../validators/users/createUser.validator';
import updateUserValidator from '../validators/users/updateUser.validator';
import paginationValidator from '../validators/paginationValidator';

const userController: UserController = UserController.getInstance();
const response = new ResponseClass(userController);

const publicUserRouter = express.Router();

publicUserRouter.post('/', (req, res) => {
    const { validatorFailed, message } = createUserValidator(req.body);
    validatorFailed ? response.sendBadRequest(res, message) : response.send(req, res, ResponseStatus.CREATED, 'createUser');
});

const privateUserRouter = express.Router();

privateUserRouter.get('/', (req, res) => {
    const { validatorFailed, message } = paginationValidator(req.query);
    validatorFailed ? response.sendBadRequest(res, message) : response.send(req, res, ResponseStatus.OK, 'getUsers');
});

privateUserRouter.delete('/', (req, res) => {
    response.send(req, res, ResponseStatus.NO_CONTENT, 'deleteUser');
});

privateUserRouter.get('/profile', (req, res) => {
    response.send(req, res, ResponseStatus.OK, 'getUserByEmail');
});

privateUserRouter.put('/', (req, res) => {
    const { validatorFailed, message } = updateUserValidator(req.body);
    validatorFailed ? response.sendBadRequest(res, message) : response.send(req, res, ResponseStatus.OK, 'updateUserByEmail');
});

export { publicUserRouter, privateUserRouter};

