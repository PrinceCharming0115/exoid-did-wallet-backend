import { DBConnect } from '../dbConnector';

import { KYCInfoEntity } from 'entities';

export const getKYCInfoRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(KYCInfoEntity);
};
