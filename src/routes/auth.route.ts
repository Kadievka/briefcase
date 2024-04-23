import express from 'express';
import AuthController from '../controllers/auth.controller';
import ResponseStatus from '../resources/configurations/constants/ResponseStatusCodes';
import ResponseClass from '../resources/configurations/classes/ResponseClass';
import loginValidator from '../validators/auth/login';

const router = express.Router();

const authController: AuthController = AuthController.getInstance();

const response = new ResponseClass(authController);

router.post('/login', (req, res) => {
    const { validatorFailed, message } = loginValidator(req.body);
    validatorFailed
        ? response.sendBadRequest(res, message)
        : response.send(req, res, ResponseStatus.OK, 'login');
});

router.post('/logout', async (req, res) => {
    response.send(req, res, ResponseStatus.NO_CONTENT, 'logout');
});

export default router;
