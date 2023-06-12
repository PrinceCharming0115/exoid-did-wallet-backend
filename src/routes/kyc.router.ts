import express from 'express';

import { kycController } from 'controllers';

const kycRouter = express.Router();

// User KYC Veriff Webhook
kycRouter.post(
  '/veriff',
  kycController.kycVeriffWebhookValidator(),
  kycController.kycVeriffWebhook
);

export default kycRouter;
