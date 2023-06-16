import express from 'express';

import { identifierController } from 'controllers';

const identifierRouter = express.Router();

identifierRouter.post(
  '/create-identifier',
  identifierController.createIdentifierValidator(),
  identifierController.createIdentifier
);

export default identifierRouter;
