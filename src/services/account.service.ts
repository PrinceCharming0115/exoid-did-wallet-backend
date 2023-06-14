import { AccountEntity } from 'entities';

import { getAccountRepository } from 'utils';

export const getIdentifier = async (
  identifier: string
): Promise<AccountEntity | null> => {
  const accountRepository = await getAccountRepository();

  const accountInfo: AccountEntity | null = await accountRepository.findOneBy({
    identifier: identifier
  });

  return accountInfo;
};

