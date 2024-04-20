import express from 'express';
import UserController from '../controllers/users.controller';
import ResponseStatus from '../resources/configurations/constants/ResponseStatusCodes';
import ResponseClass from '../resources/configurations/classes/ResponseClass';

const router = express.Router();

const userController: UserController = UserController.getInstance();

const response = new ResponseClass(userController);

router.get('/', (req, res) => {
    response.send(req, res, ResponseStatus.OK, 'getUsers');
});

router.post('/', (req, res) => {
    // TODO add validator
    response.send(req, res, ResponseStatus.CREATED, 'createUser');
});

router.delete('/', (req, res) => {
    response.send(req, res, ResponseStatus.NOT_CONTENT, 'deleteUser');
});

router.get('/:email', (req, res) => {
    response.send(req, res, ResponseStatus.OK, 'getUserByEmail');
});

router.put('/', (req, res) => {
    // TODO add validator
    response.send(req, res, ResponseStatus.OK, 'updateUserByEmail');
});

export default router;
