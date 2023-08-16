import { Column, Entity } from 'typeorm';

import { CoreEntity } from './Core.entity';

@Entity({
  name: 'interaction',
})
export class InteractionEntity extends CoreEntity {
  @Column({ name: 'verification_id' })
  verificationID: number;

  @Column({ name: 'user_did' })
  userDID: string;

  @Column({ name: 'verification_data' })
  verificationData: string;

  @Column({ name: 'result' })
  result: string; 
}
