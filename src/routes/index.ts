import express from 'express';

import kycRouter from './kyc.router';
import emailCertificationRouter from './email.router';

const appRoutes = express.Router();

appRoutes.use('/kyc', kycRouter);
appRoutes.use('/email-certification', emailCertificationRouter);

export default appRoutes;
