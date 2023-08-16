import { DBConnect } from '../dbConnector';

import { VerificationEntity } from 'entities';

export const getVerificationRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(VerificationEntity);
};
