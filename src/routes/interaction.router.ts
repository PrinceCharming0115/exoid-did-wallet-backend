import express from 'express';
import { checkIdentifier } from 'utils';

import { verificationController } from 'controllers';

const interactionRouter = express.Router();

interactionRouter.get(
  '/get-interaction-list/:id',
  checkIdentifier,
  verificationController.getInteractionListValidator(),
  verificationController.getInteractionList
);


interactionRouter.get(
  '/get-interaction/:id',
  checkIdentifier,
  verificationController.getInteractionValidator(),
  verificationController.getInteraction
);

export default interactionRouter;