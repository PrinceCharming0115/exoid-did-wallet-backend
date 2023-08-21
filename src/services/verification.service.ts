import { VerificationEntity } from 'entities';
import { getVerificationRepository } from 'utils';

export const saveVerification = async (
  data: Pick<
    VerificationEntity,
    'did' | 'verificationFlowName' | 'verificationFlow'
  >
): Promise<VerificationEntity | null> => {
  const verificatonRepository = await getVerificationRepository();

  const verificaton: VerificationEntity = new VerificationEntity();
  verificaton.did = data.did;
  verificaton.verificationFlowName = data.verificationFlowName;
  verificaton.verificationFlow = JSON.stringify(data.verificationFlow);

  await verificatonRepository.save(verificaton);

  return verificaton;
};

export const getListByLimit = async (offset: number, pageSize: number) => {
  const verificatonRepository = await getVerificationRepository();

  const list: VerificationEntity[] = await verificatonRepository.find();

  return list;
};

export const getAllList = async () => {
  const verificatonRepository = await getVerificationRepository();

  const list: VerificationEntity[] = await verificatonRepository.find();

  return list.length;
};

export const getVerification = async (
  data: Pick<VerificationEntity, 'id'>
): Promise<VerificationEntity | null> => {
  const verificatonRepository = await getVerificationRepository();

  const verification: VerificationEntity | null =
    await verificatonRepository.findOneBy({
      id: data.id,
    });

  return verification;
};
