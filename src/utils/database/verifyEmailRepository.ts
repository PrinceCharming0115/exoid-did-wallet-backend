import { DBConnect } from '../dbConnector';

import { VerifyEmailEntity } from 'entities';

export const getVerifyEmailRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(VerifyEmailEntity);
};
