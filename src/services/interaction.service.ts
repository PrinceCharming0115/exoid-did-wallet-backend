import { getInteractionRepository } from 'utils';

export const getInteractionListByVerificationID = async (
  verificationID,
  offset,
  pageSize
) => {
  const interactionRepository = await getInteractionRepository();

  const list = await interactionRepository.find({
    where: {
      verificationID: verificationID,
    },
    skip: offset,
    take: pageSize,
  });

  return list;
};

export const getInteractionCountByVerificationID = async (verificationID) => {
  const interactionRepository = await getInteractionRepository();

  const list = await interactionRepository.findBy({
    verificationID: verificationID,
  });

  return list.length;
};

export const getInteractionByID = async (ID) => {
  const interactionRepository = await getInteractionRepository();

  const interaction = await interactionRepository.findOneBy({
    id: ID,
  });

  return interaction;
};
