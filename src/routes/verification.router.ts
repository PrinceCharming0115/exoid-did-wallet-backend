import express from 'express';
import { verificationController } from 'controllers';
import { checkIdentifier } from 'utils';

const verificationRouter = express.Router();

verificationRouter.post(
  '/save-verification-flow',
  checkIdentifier,
  verificationController.saveVerificatonFlowValidator(),
  verificationController.saveVerificationFlow
);

verificationRouter.get(
  '/get-verification-flow-list',
  checkIdentifier,
  verificationController.getverificationFlowListValidator(),
  verificationController.getVerificationFlowList
);

verificationRouter.get(
  '/get-verification-flow/:id',
  checkIdentifier,
  verificationController.getVerificationFlowValidator(),
  verificationController.getVerificationFlow
);

export default verificationRouter;
