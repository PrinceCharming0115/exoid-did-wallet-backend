import { Column, Entity } from 'typeorm';

import { CoreEntity } from './Core.entity';

import { IDCardTypes, UserKYCStatus } from 'types';

@Entity({
  name: 'kyc_info',
})
export class KYCInfoEntity extends CoreEntity {
  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'middle_name' })
  middleName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'birthday' })
  birthday: Date;

  @Column({ name: 'nationality' })
  nationality: string;

  @Column({ name: 'user_id' })
  userID: number;

  @Column({ name: 'kyc_status' })
  kycStatus: UserKYCStatus;

  @Column({ name: 'document_type', nullable: true })
  documentType?: IDCardTypes;

  @Column({ name: 'document_no', nullable: true })
  documentNo?: string;

  @Column({ name: 'document_front_url', nullable: true })
  documentFrontUrl?: string;

  @Column({ name: 'document_back_url', nullable: true })
  documentBackUrl?: string;

  @Column({ name: 'document_handy_url', nullable: true })
  documentHandyUrl?: string;
}
