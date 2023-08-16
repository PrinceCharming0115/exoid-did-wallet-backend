import { DBConnect } from '../dbConnector';

import { InteractionEntity } from 'entities';

export const getInteractionRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(InteractionEntity);
};
