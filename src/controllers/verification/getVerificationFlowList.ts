import 'dotenv/config';
import { Response } from 'express';
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
type ReqQuery = {
  page: number;
};

export const getVerificationFlowListHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const page = req.query.page || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const verificationList = await verificationService.getListByLimit(
    offset,
    pageSize
  );

  const verificationTotalNumber = await verificationService.getAllList();
  res.status(httpStatus.OK).json({ verificationList, verificationTotalNumber });
};

export const getVerificationFlowList = errorHandlerWrapper(
  getVerificationFlowListHandler
);
