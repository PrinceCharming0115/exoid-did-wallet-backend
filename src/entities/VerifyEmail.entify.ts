import { Column, Entity } from 'typeorm';

import { CoreEntity } from './Core.entity';

@Entity({
  name: 'verify_email',
})
export class VerifyEmailEntity extends CoreEntity {
  @Column({ name: 'email_address' })
  email: string;

  @Column({ name: 'code' })
  verifyCode: string;

  @Column({ name: 'expire_at' })
  expireAt: string;
}
