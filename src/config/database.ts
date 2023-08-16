import 'dotenv/config';
import {
  EmailCertificateEntity,
  AccountEntity,
  KYCInfoEntity,
  VerifyEmailEntity,
  VerificationEntity,
  InteractionEntity,
} from 'entities';
import { DataSourceOptions } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

export const dbOptions: DataSourceOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false,
  synchronize: false,
  entities: [
    KYCInfoEntity,
    VerifyEmailEntity,
    EmailCertificateEntity,
    AccountEntity,
    VerificationEntity,
    InteractionEntity,
  ],
  extra: {
    connectionLimit: 10,
  },
};
