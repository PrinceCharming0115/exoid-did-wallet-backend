import { KYCInfoEntity } from 'entities';

import { getKYCInfoRepository } from 'utils';

export const updateKYCInfo = async (
  condition: Pick<KYCInfoEntity, 'uuid'>,
  data: Pick<
    KYCInfoEntity,
    'firstName' | 'middleName' | 'lastName' | 'birthday' | 'nationality' | 'kycStatus'
  > &
    Partial<
      Pick<
        KYCInfoEntity,
        | 'documentType'
        | 'documentNo'
        | 'documentFrontUrl'
        | 'documentBackUrl'
        | 'documentHandyUrl'
      >
    >
): Promise<KYCInfoEntity> => {
  const kycInfoRepository = await getKYCInfoRepository();

  const kycInfo: KYCInfoEntity | null = await kycInfoRepository.findOneBy({
    ...condition,
    deletedAt: null
  })
  kycInfo.firstName = data.firstName;
  kycInfo.middleName = data.middleName;
  kycInfo.lastName = data.lastName;
  kycInfo.birthday = data.birthday;
  kycInfo.birthday = data.birthday;
  kycInfo.kycStatus = data.kycStatus;
  kycInfo.documentType = data.documentType;
  kycInfo.documentNo = data.documentNo;
  kycInfo.documentFrontUrl = data.documentFrontUrl;
  kycInfo.documentBackUrl = data.documentBackUrl;
  kycInfo.documentHandyUrl = data.documentHandyUrl;

  await kycInfoRepository.save(kycInfo);

  return kycInfo;
};

export const getKYCInfo = async (
  id: number
): Promise<KYCInfoEntity | null> => {
  const kycInfoRepository = await getKYCInfoRepository();

  const kycInfo: KYCInfoEntity | null = await kycInfoRepository.findOneBy({
    id,
  });

  return kycInfo;
};

export const getKYC = async (
  data: Partial<Pick<KYCInfoEntity, 'uuid'>>
): Promise<KYCInfoEntity | null> => {
  const kycInfoRepository = await getKYCInfoRepository();

  const kyc: KYCInfoEntity | null = await kycInfoRepository.findOneBy({
    ...data,
    deletedAt: null
  });

  return kyc;
}