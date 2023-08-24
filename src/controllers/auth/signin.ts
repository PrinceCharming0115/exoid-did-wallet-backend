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


export const signInValidator = () => {
  return [
    body('did').notEmpty().withMessage('Did id required.'),
    body('socketID').notEmpty().withMessage('Socket ID is required.')
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  socketID: string;
  did: string;
};;
type ReqQuery = unknown;

  
export const signInHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { socketID, did } = req.body;
  const account = await accountService.getIdentifier(did);

  if (!account) {
    throw new NotFoundError('Did is not exist!');
  }

  const token = jwt.sign({
      did
    },
    JWT_TOKEN,
    {
      expiresIn: JWT_EXPIRATION_TIME,
    }
  );

  socketServer.sendToken(token, socketID);

  res.status(httpStatus.OK).json('Success!');
};

export const signIn = errorHandlerWrapper(signInHandler);
