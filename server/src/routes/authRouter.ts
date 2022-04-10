import { Router } from 'express'
import {signIn, signUp} from '../controllers/authController';

export const authRouter = Router();

authRouter.post('/login', signIn);
authRouter.post('/register', signUp);