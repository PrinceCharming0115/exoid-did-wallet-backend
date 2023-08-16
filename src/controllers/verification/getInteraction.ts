import { Request, Response, response } from 'express';
import httpStatus from 'http-status';

import 'dotenv/config';

import { interactionService } from 'services';
import { AuthRequest } from 'types';
import { errorHandlerWrapper } from 'utils';

export const getInteractionValidator = () => {
	return [];
}

type Params= {
  id: number;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getInteractionHandler = async (
	req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
	res: Response
) => {

	const interaction = await interactionService.getInteractionByID(req.params.id);

  res.status(httpStatus.OK).json({interaction: interaction});
}

export const getInteraction = errorHandlerWrapper(getInteractionHandler);