import { Request } from 'express';

import { AccountEntity } from 'entities';

export interface AuthRequest<Param, ResBody, ReqBody, ReqQuery>
  extends Request<Param, ResBody, ReqBody, ReqQuery> {
  account?: AccountEntity;
}
