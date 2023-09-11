import { VerificationEntity } from 'entities';
import { DBConnect } from '../dbConnector';

export const getVerificationRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(VerificationEntity);
};
