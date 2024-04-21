import express from 'express';
import AuthController from '../controllers/auth.controller';
import ResponseStatus from '../resources/configurations/constants/ResponseStatusCodes';
import ResponseClass from '../resources/configurations/classes/ResponseClass';
import getLogger from '../utils/logger';

const log = getLogger('auth.route');

const router = express.Router();

const authController: AuthController = AuthController.getInstance();

const response = new ResponseClass(authController);

router.post('/login', (req, res) => {
    // TODO add validator
    response.send(req, res, ResponseStatus.OK, 'login');
});

router.post('/logout', async (req, res) => {
    // TODO add validator
    response.send(req, res, ResponseStatus.OK, 'logout');
});

export default router;
