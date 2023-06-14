import { DBConnect } from '../dbConnector';

import { EmailCertificateEntity } from 'entities';

export const getEmailCertificateRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(EmailCertificateEntity);
};
