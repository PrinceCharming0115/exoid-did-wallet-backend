import axios from 'axios';
import { REASON_CODES } from 'consts';
import 'dotenv/config';
import { CustomError } from 'errors';
import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import moment from 'moment';
import { emailCertificationService } from 'services';
import { SaveEmailType, EmailTypes } from 'types';
import { VERIFICATION_CODE_EXPIRATION_TIME } from 'config';
import { errorHandlerWrapper } from 'utils';

export const createVerificationCodeValidator = () => {
  return [
    body('email')
      .exists()
      .withMessage('Email Address is missing.')
      .isEmail()
      .withMessage('Invalid Email Address'),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email: string;
};
type ReqQuery = unknown;

export const createVerificationCodeHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email } = req.body;

  const tempDate = new Date();
  tempDate.setMinutes(
    tempDate.getMinutes() + VERIFICATION_CODE_EXPIRATION_TIME
  );
  const expireAt = moment(tempDate).format('YYYY-MM-DD H:m:s');

  const verifyCode = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

  const existVerifyCode = await emailCertificationService.getExistVerifyCode(
    email
  );

  const verifyEmail = await emailCertificationService.createVerifyCode(
    {
      type: !existVerifyCode ? SaveEmailType.CREATE : SaveEmailType.UPDATE,
    },
    {
      email,
      verifyCode,
      expireAt,
    }
  );

  if (!verifyEmail) {
    throw new CustomError(
      'Unknown Error',
      httpStatus.BAD_REQUEST,
      REASON_CODES.EMAIL.UNKNOW_ERROR
    );
  }

  axios
    .post(process.env.EMAIL_SERVICE_ENDPOINT, {
      emailAddress: email,
      emailType: EmailTypes.VERIFF_NOTIFICATION,
      code: verifyCode,
    })
    .then((response) => {
      res.status(httpStatus.CREATED).json('Success');
    })
    .catch((error) => {
      throw new CustomError(
        'An error occurred while sending mail via sendgrid',
        httpStatus.BAD_REQUEST,
        REASON_CODES.EMAIL.UNKNOW_ERROR
      );
    });
};

export const createVerificationCode = errorHandlerWrapper(
  createVerificationCodeHandler
);
