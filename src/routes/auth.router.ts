import express from 'express';
import { authController } from 'controllers';
import { checkIdentifier } from 'utils';

const authRouter = express.Router();

authRouter.post(
  '/signin',
  authController.signInValidator(),
  authController.signIn
);

authRouter.get(
  '/me',
  checkIdentifier,
  authController.getMeValidator(),
  authController.getMe
);

export default authRouter;
