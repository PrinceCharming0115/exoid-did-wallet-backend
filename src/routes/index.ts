import express from 'express';

import kycRouter from './kyc.router';
import emailCertificationRouter from './email.router';
import identifierRouter from './identifier.router';

const appRoutes = express.Router();

appRoutes.use('/kyc', kycRouter);
appRoutes.use('/email-certification', emailCertificationRouter);
appRoutes.use('/identifier', identifierRouter);

export default appRoutes;
