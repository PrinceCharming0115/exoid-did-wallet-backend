import 'dotenv/config';
import { Response } from 'express';
import httpStatus from 'http-status';
import { interactionService } from 'services';
import { AuthRequest } from 'types';
import { errorHandlerWrapper } from 'utils';

export const getInteractionListValidator = () => {
  return [];
};

type Params = {
  id: number;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = {
  page: number;
};

export const getInteractionListHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  console.log('page: ', req.query.page);
  const page = req.query.page || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const interactionList =
    await interactionService.getInteractionListByVerificationID(
      req.params.id,
      offset,
      pageSize
    );
  const interactionTotalNumber =
    await interactionService.getInteractionCountByVerificationID(req.params.id);

  res.status(httpStatus.OK).json({ interactionList, interactionTotalNumber });
};

export const getInteractionList = errorHandlerWrapper(
  getInteractionListHandler
);
