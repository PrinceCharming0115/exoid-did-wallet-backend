import express from 'express';
import { verificationController } from 'controllers';
import { checkIdentifier } from 'utils';

const interactionRouter = express.Router();

interactionRouter.get(
  '/get-interaction-list/:id',
  // checkIdentifier,
  verificationController.getInteractionListValidator(),
  verificationController.getInteractionList
);

interactionRouter.get(
  '/get-interaction/:id',
  // checkIdentifier,
  verificationController.getInteractionValidator(),
  verificationController.getInteraction
);

export default interactionRouter;
