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

  const page: number = req.query.page || 1;
  let interactionList;
  if ( page ==  0 ) {
    interactionList = await interactionService.getInteractionByVerificationID(req.params.id);
  } else {
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    interactionList = await interactionService.getInteractionListByVerificationID(
      req.params.id,
      offset,
      pageSize
    );
  }

  console.log("interaction List:", interactionList)
  const interactionTotalNumber =
    await interactionService.getInteractionByVerificationID(req.params.id);

  res.status(httpStatus.OK).json({ interactionList: interactionList, interactionTotalNumber: interactionTotalNumber.length });
};

export const getInteractionList = errorHandlerWrapper(
  getInteractionListHandler
);
