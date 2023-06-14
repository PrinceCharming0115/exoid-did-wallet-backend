import { VerifyEmailEntity, EmailCertificateEntity } from 'entities';

import { getVerifyEmailRepository, getEmailCertificateRepository } from 'utils';
import { SaveEmailType } from 'types';

export const getExistVerifyCode = async (
  email: string
): Promise<VerifyEmailEntity | null> => {
  const verifyEmailRepository = await getVerifyEmailRepository();

  const verifyCode: VerifyEmailEntity | null = await verifyEmailRepository.findOneBy({
    email: email
  });

  return verifyCode;
};


export const createVerifyCode = async (
  { type },
  data: Pick<
      VerifyEmailEntity,
      | 'email'
      | 'verifyCode'
      | 'expireAt'
  >    
): Promise<VerifyEmailEntity | null> => {
    const verifyEmailRepository = await getVerifyEmailRepository();

    let verifyEmail: VerifyEmailEntity;

    if (type === SaveEmailType.CREATE) {
      verifyEmail = new VerifyEmailEntity();
    } else {
      verifyEmail = await verifyEmailRepository.findOneBy({
        email: data.email,
        deletedAt: null
      });
    }

    verifyEmail.email = data.email;
    verifyEmail.verifyCode = data.verifyCode;
    verifyEmail.expireAt = data.expireAt;

    await verifyEmailRepository.save(verifyEmail);

    return verifyEmail;
}

export const certificateEmail = async (
  data: Pick<EmailCertificateEntity, | 'emailAddress' | 'accountID'>
): Promise<EmailCertificateEntity | null> => {

  const emailCertificateRepository = await getEmailCertificateRepository();

  const certifiedEmail = await emailCertificateRepository.findOneBy({
    accountID: data.accountID,
    deletedAt: null
  });

 
  certifiedEmail.emailAddress = data.emailAddress;

  await emailCertificateRepository.save(certifiedEmail);

  return certifiedEmail;
}