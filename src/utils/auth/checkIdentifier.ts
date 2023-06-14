import { Response } from 'express';
import httpStatus from 'http-status';

import { MESSAGES, REASON_CODES } from 'consts';

import { NotFoundError } from 'errors';

import { accountService } from 'services';

export const checkIdentifier = async (req: any, res: Response, next: Function) => {
  try {
    const data = req.header('Authorization').replace('Bearer ', '');
   

    const identifier = await accountService.getIdentifier(data);

    if (!identifier) {
      throw new NotFoundError(
        'Identifier is not exist!',
        REASON_CODES.AUTH.IDENTIFIER_IS_NOT_EXIST
      );
    }
    req.account = identifier;

    next();
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.errorCode).json({
        message: error.message,
        reason: error.reasonCode,
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: MESSAGES.UNAUTHORIZED,
        reason: REASON_CODES.AUTH.UNAUTHORIZED,
      });
    }
  }
};
