export type IVeriffStatusType = 'approved' | 'declined';

export type IVeriffDocumentType = 'ID_CARD' | 'DRIVER_LICENSE';

export type IVeriffResult = {
  verification: {
    code: number;
    person: {
      firstName: string;
      middleName: string;
      lastName: string;
      dateOfBirth: string;
      idNumber: string | null;
      nationality: string | null;
    };
    reason: string | null;
    reasonCode: string | null;
    status: IVeriffStatusType;
    document: {
      type: IVeriffDocumentType;
      number: string;
      country: string;
    };
    vendorData: string;
  };
};
