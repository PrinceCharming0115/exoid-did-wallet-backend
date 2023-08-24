import 'dotenv/config';
import { Request, Response, response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { accountService } from 'services';
import { errorHandlerWrapper } from 'utils';
import { NotFoundError } from 'errors';
import { JWT_TOKEN, JWT_EXPIRATION_TIME } from 'config';
import { socketServer } from 'utils/socket';
import { REASON_CODES } from 'consts';
import { AuthRequest } from 'types';


export const getMeValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

  
export const getMeHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  
  res.status(httpStatus.OK).json(req.account.identifier);
};

export const getMe = errorHandlerWrapper(getMeHandler);
