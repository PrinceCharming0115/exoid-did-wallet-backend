import { DBConnect } from '../dbConnector';

import { AccountEntity } from 'entities';

export const getAccountRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(AccountEntity);
};
