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

export const createAccount = async (
  data: Pick<AccountEntity, | 'UUID' | 'identifier'>
): Promise<AccountEntity | null> => {
  const accountRepository = await getAccountRepository();

  const account: AccountEntity = new AccountEntity();
  account.UUID = data.UUID;
  account.identifier = data.identifier;

  await accountRepository.save(account);

  return account;
};
