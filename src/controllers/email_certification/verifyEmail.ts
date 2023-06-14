import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';


import { AuthRequest } from 'types';

import { errorHandlerWrapper } from 'utils';

import { emailCertificationService } from 'services';
import { CustomError } from 'errors';

import { REASON_CODES } from 'consts';

export const verifyEmailValidator = () => {
  return [
    body('code')
      .exists()
      .withMessage('Verification code is missing.')
  ];
}

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  code: string;
  email: string
};
type ReqQuery = unknown;

export const verifyEmailHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { code, email } = req.body;

  const existCode = await emailCertificationService.getExistVerifyCode(email);

  if (!existCode) {
    throw new CustomError(
      "Invalid Email", 
      httpStatus.BAD_REQUEST, 
      REASON_CODES.EMAIL.INVALID_CODE
    );
  }
   
  if (existCode.verifyCode != code) {
    throw new CustomError(
      "Invalid Code", 
      httpStatus.BAD_REQUEST, 
      REASON_CODES.EMAIL.INVALID_CODE
    );
  } 

  if ( new Date() > new Date(existCode.expireAt )) {
    throw new CustomError(
      "Expired Code", 
      httpStatus.BAD_REQUEST, 
      REASON_CODES.EMAIL.EXPIRED_CODE
    );
  }

  const accountID = req.account.id;

  const emailCertificate = await emailCertificationService.certificateEmail({
    emailAddress: email,
    accountID
  });

  if (!emailCertificate) {
    throw new CustomError(
      "Unknown Error", 
      httpStatus.BAD_REQUEST, 
      REASON_CODES.EMAIL.UNKNOW_ERROR
    );
  }

  res.status(httpStatus.CREATED).json("Success");
}

export const verifyEmail = errorHandlerWrapper(verifyEmailHandler);