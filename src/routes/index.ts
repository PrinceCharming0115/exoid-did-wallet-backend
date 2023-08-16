import express from 'express';

import kycRouter from './kyc.router';
import emailCertificationRouter from './email.router';
import identifierRouter from './identifier.router';
import verificationRouter from './verification.router';
import interactionRouter from './interaction.router';

const appRoutes = express.Router();

appRoutes.use('/kyc', kycRouter);
appRoutes.use('/email-certification', emailCertificationRouter);
appRoutes.use('/identifier', identifierRouter);
appRoutes.use('/verification', verificationRouter);
appRoutes.use('/interaction', interactionRouter);

export default appRoutes;
