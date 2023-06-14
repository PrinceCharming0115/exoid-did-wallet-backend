import express from 'express';

import { emailCertificationController } from 'controllers';
import { checkIdentifier } from 'utils';

const emailCertificationRouter = express.Router();

emailCertificationRouter.post(
  '/create-verification-code',
//   checkIdentifier,
  emailCertificationController.createVerificationCodeValidator(),
  emailCertificationController.createVerificationCode
);

emailCertificationRouter.post(
    '/verify-email',
    checkIdentifier,
    emailCertificationController.verifyEmailValidator(),
    emailCertificationController.verifyEmail
  );

export default emailCertificationRouter;
