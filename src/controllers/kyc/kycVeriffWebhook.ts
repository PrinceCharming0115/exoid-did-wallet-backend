import axois from 'axios';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import moment from 'moment';


import { NotFoundError } from 'errors';

import {
  kycInfoService
} from 'services';
	
import {
  IDCardTypes,
  IVeriffResult,
  UserKYCStatus
} from 'types';

import { errorHandlerWrapper  } from 'utils';

export const kycVeriffWebhookValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = IVeriffResult;
type ReqQuery = unknown;

export const kycVeriffWebhookHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { verification } = req.body;

  
  const kycVeriffUuid = verification.vendorData;
  
  // get user by kycveriffUuid whom the veriff request is for
  const kycCheck = await kycInfoService.getKYC({
    uuid: kycVeriffUuid
  });


  if(!kycCheck) {
    throw new NotFoundError('User KYCVeriffUuid is not exist!');
  }

  const kycInfo = await kycInfoService.updateKYCInfo(
    {
      uuid: kycVeriffUuid
    }, {
    firstName: verification.person.firstName,
    middleName: verification.person.middleName,
    lastName: verification.person.lastName,
    birthday: moment(verification.person.dateOfBirth).toDate(),
    nationality: verification.person.nationality,
    kycStatus: 
    verification.status === 'approved'
      ? UserKYCStatus.APPROVED
      : UserKYCStatus.REJECTED,
    documentType:
      verification.document.type === 'ID_CARD'
        ? IDCardTypes.ID_CARD
        : verification.document.type === 'DRIVER_LICENSE'
        ? IDCardTypes.DRIVER_LICENSE
        : IDCardTypes.PASSPORT,
    documentNo: verification.document.number,
   
  });

  res.status(httpStatus.CREATED).json({});
}

export const kycVeriffWebhook = errorHandlerWrapper(kycVeriffWebhookHandler);