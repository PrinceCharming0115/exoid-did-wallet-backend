import { Column, Entity } from 'typeorm';

import { CoreEntity } from './Core.entity';

@Entity({
  name: 'account',
})

export class AccountEntity extends CoreEntity {
  @Column({ name: 'uuid' })
  UUID: string;

  @Column({ name: 'identifier' })
  identifier: string;
}
