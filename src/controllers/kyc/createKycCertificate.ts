import { Response } from 'express';
import httpStatus from 'http-status';
import { kycInfoService } from 'services';
import { AuthRequest } from 'types';
import { v4 } from 'uuid';
import { errorHandlerWrapper } from 'utils';

export const createKycCertificateValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const createKycCertificateHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const accountID = req.account.id;

  const newVendor = v4(); // generating uuid

  await kycInfoService.createKycCertificate({
    accountID: accountID,
    uuid: newVendor,
  });

  res.status(httpStatus.CREATED).json({ uuid: newVendor });
};

export const createKycCertificate = errorHandlerWrapper(
  createKycCertificateHandler
);
