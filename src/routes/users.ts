import express from 'express';
import UserController from '../controllers/users';
import ResponseStatus from '../resources/configurations/ResponseStatus';
import ResponseClass from '../resources/configurations/ResponseClass';
const router = express.Router();

const userController = UserController.getInstance();

const response = new ResponseClass(userController);

router.get('/', function (_req, res) {
    response.send(res, ResponseStatus.OK, 'getUsers');
});

module.exports = router;
