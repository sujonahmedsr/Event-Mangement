import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { LoginSchema } from './auth.validation';

const router = express.Router();

router.post('/login', validateRequest(LoginSchema), AuthController.Login);

export const AuthRoutes = router;