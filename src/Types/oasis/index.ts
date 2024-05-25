export interface IZOasisEntryForm {
  id?: string;

  // Property selection
  plotNumber?: string;
  registrationNumber?: string;
  serialNumber?: string;
  plotType?: string;
  plotSize?: string;
  extraPercentageForLocationCategory?: string;
  extraPercentageForLocationCategoryReason?: string;

  // Personal Information
  applicantName?: string;
  guardianName?: string;
  relationWithGuardian?: string;
  cnicNumber?: string;
  passportNumber?: string;
  mailAddress?: string;
  permanentAddress?: string;
  phoneNumber?: string;
  mobileNumber?: string;

  // Nominee Information
  nomineeName?: string;
  nomineeGuardianName?: string;
  nomineeRelationWithGuardian?: string;
  nomineeCnicNumber?: string;
  nomineeRelationWithApplicant?: string;
  nomineeAddress?: string;
  nomineePhoneNumber?: string;
  nomineeEmail?: string;
  nomineeMobileNumber?: string;

  // Payment Information
  paymentMethod?: string;

  // Default Fields
  isActive?: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
