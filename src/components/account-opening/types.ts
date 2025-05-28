
export interface FormData {
  // Investment Type
  investmentType: string;
  csdAccountNumber: string;
  csdNumber: string;
  categoryOfInvestment: string;
  
  // Personal Information
  title: string;
  surname: string;
  firstName: string;
  otherNames: string;
  maidenName: string;
  gender: string;
  maritalStatus: string;
  dateOfBirth: string;
  placeOfBirth: string;
  mothersMaidenName: string;
  tin: string;
  residentialStatus: string;
  countryOfOrigin: string;
  countryOfResidence: string;
  residentPermitNumber: string;
  permitIssueDate: string;
  permitExpiringDate: string;
  occupation: string;
  profession: string;
  
  // Contact Details
  residentialAddress: string;
  nearestLandmark: string;
  cityTown: string;
  digitalAddress: string;
  postalAddress: string;
  emailAddress: string;
  mobileNumber1: string;
  mobileNumber2: string;
  
  // Emergency Contacts
  emergencyContactName1: string;
  emergencyContactRelationship1: string;
  emergencyContactNumber1: string;
  emergencyContactName2: string;
  emergencyContactRelationship2: string;
  emergencyContactNumber2: string;
  
  // Proof of Identity
  passportPhoto?: File[];
  idType1: string;
  idNumber1: string;
  placeOfIssue1: string;
  issueDate1: string;
  expiringDate1: string;
  idDocument1?: File[];
  idType2: string;
  idNumber2: string;
  placeOfIssue2: string;
  issueDate2: string;
  expiringDate2: string;
  idDocument2?: File[];
  
  // Next of Kin
  nokTitle: string;
  nokSurname: string;
  nokFirstName: string;
  nokOtherNames: string;
  nokGender: string;
  nokMaritalStatus: string;
  nokRelationship: string;
  nokDateOfBirth: string;
  nokPlaceOfBirth: string;
  nokResidentialStatus: string;
  nokCountryOfOrigin: string;
  nokCountryOfResidence: string;
  nokContactNumber: string;
  nokEmailAddress: string;
  nokResidentPermitNumber: string;
  nokPermitIssueDate: string;
  nokPermitExpiryDate: string;
  nokOccupation: string;
  nokIdType: string;
  nokIdNumber: string;
  nokPlaceOfIssue: string;
  nokIssueDate: string;
  nokExpiringDate: string;
  
  // Employment Details
  employmentStatus: string;
  yearsOfEmployment: string;
  yearsOfCurrentEmployment: string;
  yearsOfPreviousEmployment: string;
  monthlyIncomeRange: string;
  employerName: string;
  employerAddress: string;
  employerLandmark: string;
  employerDigitalAddress: string;
  employerCityTown: string;
  natureOfBusiness: string;
  contactNumber1: string;
  contactNumber2: string;
  officeEmail: string;
  
  // Investment Profile
  investmentObjectives: string;
  riskTolerance: string;
  investmentHorizon: string;
  investmentKnowledge: string;
  lossReaction: string;
  sourceOfFunds: string;
  sourceOfFundsOther: string;
  initialInvestmentAmount: string;
  anticipatedInvestmentActivity: string;
  modeOfInstructions: string;
  modeOfStatementDelivery: string;
  statementFrequency: string;
  
  // FATCA Information
  citizenOfAnotherCountry: boolean;
  foreignPassport: boolean;
  greenCard: boolean;
  residentInForeignCountry: boolean;
  spentDaysInForeignCountry: boolean;
  foreignResidentialAddress: string;
  foreignMailingAddress: string;
  foreignTelephoneNumber: string;
  foreignTin: string;
  
  // Bank Information
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankBranch: string;
  
  // Declaration
  declarationAccepted: boolean;
  signatureDate: string;
  applicantSignature?: File[];
  witnessSignature?: File[];
}

export interface StepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}
