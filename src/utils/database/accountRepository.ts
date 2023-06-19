import { AccountEntity } from 'entities';
import { DBConnect } from '../dbConnector';

export const getAccountRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(AccountEntity);
};
