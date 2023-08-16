import { InteractionEntity } from 'entities';
import { DBConnect } from '../dbConnector';

export const getInteractionRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(InteractionEntity);
};
