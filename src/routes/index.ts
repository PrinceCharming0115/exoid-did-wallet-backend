import express from 'express';

import kycRouter from './kyc.router';

const appRoutes = express.Router();

appRoutes.use('/kyc', kycRouter);

export default appRoutes;
