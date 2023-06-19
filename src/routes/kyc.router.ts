import express from 'express';

import { kycController } from 'controllers';
import { checkIdentifier } from 'utils';

const kycRouter = express.Router();

kycRouter.post(
  '/create-kyc-certificate',
  checkIdentifier,
  kycController.createKycCertificateValidator(),
  kycController.createKycCertificate
);

// User KYC Veriff Webhook
kycRouter.post(
  '/veriff',
  checkIdentifier,
  kycController.kycVeriffWebhookValidator(),
  kycController.kycVeriffWebhook
);

export default kycRouter;
