import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

import {
  KYCInfoEntity
} from 'entities';

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
    KYCInfoEntity
  ],
  extra: {
    connectionLimit: 10,
  },
};
