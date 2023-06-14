import { Column, Entity, Generated } from 'typeorm';

import { CoreEntity } from './Core.entity';

@Entity({
  name: 'email_certificate',
})
export class EmailCertificateEntity extends CoreEntity {
  @Column({ name: 'account_id' })
  accountID: number;

  @Column({ name: 'uuid' })
  UUID: string;

  @Column({ name: 'email_address', nullable: true })
  emailAddress?: string;
}
