import 'dotenv/config';
import { Request, Response, response } from 'express';
import httpStatus from 'http-status';
import { verificationService } from 'services';
import { AuthRequest } from 'types';
import { errorHandlerWrapper } from 'utils';

export const getVerificationFlowValidator = () => {
  return [];
};

type Params = {
  id: number;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getVerificationFlowHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const verification = await verificationService.getVerification({
    id: req.params.id,
  });

  res.status(httpStatus.OK).json(verification);
};

export const getVerificationFlow = errorHandlerWrapper(
  getVerificationFlowHandler
);
