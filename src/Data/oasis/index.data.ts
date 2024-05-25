import { IZOasisEntryForm } from '@/Types/oasis';

export const oasisDummyEntryData: IZOasisEntryForm = {
  id: 'id',

  qrCodeNumber: 'qrCodeNumber',

  // Property selection
  plotNumber: 'plotNumber',
  registrationNumber: 'registrationNumber',
  serialNumber: 'serialNumber',
  plotType: 'plotType',
  plotSize: 'plotSize',
  extraPercentageForLocationCategory: 'extraPercentageForLocationCategory',
  extraPercentageForLocationCategoryReason:
    'extraPercentageForLocationCategoryReason',

  // Personal Information
  applicantName: 'applicantName',
  guardianName: 'guardianName',
  relationWithGuardian: 'relationWithGuardian',
  cnicNumber: 'cnicNumber',
  passportNumber: 'passportNumber',
  mailAddress: 'mailAddress',
  permanentAddress: 'permanentAddress',
  phoneNumber: 'phoneNumber',
  mobileNumber: 'mobileNumber',

  // Nominee Information
  nomineeName: 'nomineeName',
  nomineeGuardianName: 'nomineeGuardianName',
  nomineeRelationWithGuardian: 'nomineeRelationWithGuardian',
  nomineeCnicNumber: 'nomineeCnicNumber',
  nomineeRelationWithApplicant: 'nomineeRelationWithApplicant',
  nomineeAddress: 'nomineeAddress',
  nomineePhoneNumber: 'nomineePhoneNumber',
  nomineeEmail: 'nomineeEmail',
  nomineeMobileNumber: 'nomineeMobileNumber',

  // Payment Information
  paymentMethod: 'paymentMethod',

  // Default Fields
  isActive: true,
  sortOrder: 0,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};
