import { Column, Entity } from 'typeorm';

import { CoreEntity } from './Core.entity';

@Entity({
  name: 'verification_flows',
})
export class VerificationEntity extends CoreEntity {
  @Column({ name: 'did' })
  did: string;

  @Column({ name: 'verification_flow_name' })
  verificationFlowName: string;

  @Column({ name: 'verification_flow' })
  verificationFlow: string;
}
