import express from 'express';
import AuthController from '../controllers/auth.controller';
import ResponseStatus from '../resources/configurations/constants/ResponseStatusCodes';
import ResponseClass from '../resources/configurations/classes/ResponseClass';

const router = express.Router();

const authController: AuthController = AuthController.getInstance();

const response = new ResponseClass(authController);

router.post('/login', (req, res) => {
    // TODO add validator
    response.send(req, res, ResponseStatus.OK, 'login');
});

// router.logout('/logout', (req, res) => {
//     // TODO add validator
//     response.send(req, res, ResponseStatus.CREATED, 'logout');
// });


export default router;