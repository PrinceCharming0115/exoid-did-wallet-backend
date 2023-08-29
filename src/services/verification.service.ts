import { InteractionEntity, VerificationEntity } from 'entities';
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

export const getListByLimit = async (offset: number, pageSize: number, did: string) => {
  const verificatonRepository = await getVerificationRepository();

  const selectData = [
    'verification_flows.id as id',
    'verification_flows.did as did',
    'verification_flows.verification_flow_name as verificationFlowName',
    'verification_flows.verification_flow as verificationFlow',
    'verification_flows.created_at as createdAt',
    'verification_flows.updated_at as updatedAt',
    'verification_flows.deleted_at as deletedAt',
    'count(interaction.verification_id) as accessCount'
  ]


  const list: VerificationEntity[] = await verificatonRepository
    .createQueryBuilder('verification_flows')
    .select(selectData)
    .leftJoin(
      InteractionEntity,
      'interaction',
      'verification_flows.id = interaction.verification_id'
    )
    .groupBy('interaction.verification_id')
    .where({did: did})
    .offset(offset)
    .limit(pageSize)
    .execute();
  
  return list;
};

export const getAllList = async (did) => {
  const verificatonRepository = await getVerificationRepository();

  const list: VerificationEntity[] = await verificatonRepository.find({
    where: {
      did: did
    }
  });

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
