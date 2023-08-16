import express from 'express';
import { verificationController } from 'controllers';
import { checkIdentifier } from 'utils';

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
