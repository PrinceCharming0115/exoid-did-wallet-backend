import { REASON_CODES } from 'consts';
import 'dotenv/config';
import { CustomError } from 'errors';
import { Response } from 'express';
import httpStatus from 'http-status';
import { verificationService } from 'services';
import { AuthRequest } from 'types';
import { errorHandlerWrapper } from 'utils';

export const saveVerificatonFlowValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  verificationFlowName: string;
  verificationFlow: string;
};
type ReqQuery = unknown;

export const saveVerificationFlowHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { verificationFlow, verificationFlowName } = req.body;

  const did = req.account.identifier;

  const verification = await verificationService.saveVerification({
    did,
    verificationFlowName,
    verificationFlow,
  });

  if (!verification) {
    throw new CustomError(
      'Unknown Error',
      httpStatus.BAD_REQUEST,
      REASON_CODES.EMAIL.UNKNOW_ERROR
    );
  }

  res.status(httpStatus.CREATED).json('Success');
};

export const saveVerificationFlow = errorHandlerWrapper(
  saveVerificationFlowHandler
);
