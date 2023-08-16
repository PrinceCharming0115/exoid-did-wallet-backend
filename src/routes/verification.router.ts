import express from 'express';
import { checkIdentifier } from 'utils';

import { verificationController } from 'controllers';

const verificationRouter = express.Router();

verificationRouter.post(
  '/save-verification',
  checkIdentifier,
  verificationController.saveVerificatonFlowValidator(),
  verificationController.saveVerification
);

verificationRouter.get(
  '/get-verification-list',
  checkIdentifier,
  verificationController.getverificationFlowListValidator(),
  verificationController.getVerificationFlowList
);

verificationRouter.get(
  '/get-verification/:id',
  checkIdentifier,
  verificationController.getVerificationFlowValidator(),
  verificationController.getVerificationFlow
);

export default verificationRouter;
