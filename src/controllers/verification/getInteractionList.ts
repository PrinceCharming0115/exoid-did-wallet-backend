import { Request, Response, response } from 'express';
import httpStatus from 'http-status';

import 'dotenv/config';

import { interactionService } from 'services';
import { AuthRequest } from 'types';
import { errorHandlerWrapper } from 'utils';

export const getInteractionListValidator = () => {
	return [];
}

type Params= {
  id: number;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getInteractionListHandler = async (
	req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
	res: Response
) => {

	const interactionList = await interactionService.getInteractionListByVerificationID(req.params.id);

  res.status(httpStatus.OK).json({interactionList: interactionList});
}

export const getInteractionList = errorHandlerWrapper(getInteractionListHandler);