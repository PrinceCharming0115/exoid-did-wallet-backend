import 'dotenv/config';
import { Request, Response, response } from 'express';
import httpStatus from 'http-status';
import { verificationService } from 'services';
import { AuthRequest } from 'types';
import { errorHandlerWrapper } from 'utils';

export const getverificationFlowListValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getVerificationFlowListHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const verificationList = await verificationService.getAllList();

  res.status(httpStatus.OK).json(verificationList);
};

export const getVerificationFlowList = errorHandlerWrapper(
  getVerificationFlowListHandler
);
