
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, FileText, Download, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PDFGenerator from './PDFGenerator';

// Step components
import InvestmentTypeStep from './steps/InvestmentTypeStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ContactDetailsStep from './steps/ContactDetailsStep';
import ProofOfIdentityStep from './steps/ProofOfIdentityStep';
import EmploymentDetailsStep from './steps/EmploymentDetailsStep';
import InvestmentProfileStep from './steps/InvestmentProfileStep';
import BankInformationStep from './steps/BankInformationStep';
import DeclarationStep from './steps/DeclarationStep';
import { FormData } from './types';

const STEPS = [
  { title: 'Investment Type', component: InvestmentTypeStep },
  { title: 'Personal Information', component: PersonalInfoStep },
  { title: 'Contact Details', component: ContactDetailsStep },
  { title: 'Proof of Identity', component: ProofOfIdentityStep },
  { title: 'Employment Details', component: EmploymentDetailsStep },
  { title: 'Investment Profile', component: InvestmentProfileStep },
  { title: 'Bank Information', component: BankInformationStep },
  { title: 'Declaration', component: DeclarationStep },
];

const AccountOpeningForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    // Investment Type
    investmentType: '',
    csdAccountNumber: '',
    csdNumber: '',
    categoryOfInvestment: '',
    
    // Personal Information
    title: '',
    surname: '',
    firstName: '',
    otherNames: '',
    maidenName: '',
    gender: '',
    maritalStatus: '',
    dateOfBirth: '',
    placeOfBirth: '',
    mothersMaidenName: '',
    tin: '',
    residentialStatus: '',
    countryOfOrigin: '',
    countryOfResidence: '',
    residentPermitNumber: '',
    permitIssueDate: '',
    permitExpiringDate: '',
    occupation: '',
    profession: '',
    
    // Contact Details
    residentialAddress: '',
    nearestLandmark: '',
    cityTown: '',
    digitalAddress: '',
    postalAddress: '',
    emailAddress: '',
    mobileNumber1: '',
    mobileNumber2: '',
    
    // Emergency Contact 1
    emergencyContactName1: '',
    emergencyContactRelationship1: '',
    emergencyContactNumber1: '',
    
    // Emergency Contact 2
    emergencyContactName2: '',
    emergencyContactRelationship2: '',
    emergencyContactNumber2: '',
    
    // Proof of Identity
    idType1: '',
    idNumber1: '',
    placeOfIssue1: '',
    issueDate1: '',
    expiringDate1: '',
    
    idType2: '',
    idNumber2: '',
    placeOfIssue2: '',
    issueDate2: '',
    expiringDate2: '',
    
    // Next of Kin
    nokTitle: '',
    nokSurname: '',
    nokFirstName: '',
    nokOtherNames: '',
    nokGender: '',
    nokMaritalStatus: '',
    nokRelationship: '',
    nokDateOfBirth: '',
    nokPlaceOfBirth: '',
    nokResidentialStatus: '',
    nokCountryOfOrigin: '',
    nokCountryOfResidence: '',
    nokContactNumber: '',
    nokEmailAddress: '',
    nokResidentPermitNumber: '',
    nokPermitIssueDate: '',
    nokPermitExpiryDate: '',
    nokOccupation: '',
    nokIdType: '',
    nokIdNumber: '',
    nokPlaceOfIssue: '',
    nokIssueDate: '',
    nokExpiringDate: '',
    
    // Employment Details
    employmentStatus: '',
    yearsOfEmployment: '',
    yearsOfCurrentEmployment: '',
    yearsOfPreviousEmployment: '',
    monthlyIncomeRange: '',
    employerName: '',
    employerAddress: '',
    employerLandmark: '',
    employerDigitalAddress: '',
    employerCityTown: '',
    natureOfBusiness: '',
    contactNumber1: '',
    contactNumber2: '',
    officeEmail: '',
    
    // Investment Profile
    investmentObjectives: '',
    riskTolerance: '',
    investmentHorizon: '',
    investmentKnowledge: '',
    lossReaction: '',
    sourceOfFunds: '',
    sourceOfFundsOther: '',
    initialInvestmentAmount: '',
    anticipatedInvestmentActivity: '',
    modeOfInstructions: '',
    modeOfStatementDelivery: '',
    statementFrequency: '',
    
    // FATCA Information
    citizenOfAnotherCountry: false,
    foreignPassport: false,
    greenCard: false,
    residentInForeignCountry: false,
    spentDaysInForeignCountry: false,
    foreignResidentialAddress: '',
    foreignMailingAddress: '',
    foreignTelephoneNumber: '',
    foreignTin: '',
    
    // Bank Information
    bankName: '',
    bankAccountName: '',
    bankAccountNumber: '',
    bankBranch: '',
    
    // Declaration
    declarationAccepted: false,
    signatureDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState<'CSD' | 'KYC' | null>(null);
  const { toast } = useToast();

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const CurrentStepComponent = STEPS[currentStep].component;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log('Form Data:', formData);
      
      toast({
        title: "Application Submitted",
        description: "Your account opening application has been submitted successfully.",
      });
      
      // Move to completion step or redirect
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateCSDPDF = () => {
    setShowPDFPreview('CSD');
    toast({
      title: "CSD PDF Preview",
      description: "CSD form is ready for review and printing.",
    });
  };

  const generateKYCPDF = () => {
    setShowPDFPreview('KYC');
    toast({
      title: "KYC PDF Preview",
      description: "KYC form is ready for review and printing.",
    });
  };

  const printPDF = () => {
    window.print();
  };

  const closePDFPreview = () => {
    setShowPDFPreview(null);
  };

  if (showPDFPreview) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-cc-navy dark:text-white">
            {showPDFPreview} Form Preview
          </h2>
          <div className="flex space-x-2">
            <Button onClick={printPDF} variant="outline" className="flex items-center space-x-2">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button onClick={closePDFPreview} variant="outline">
              Back to Form
            </Button>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-auto max-h-[80vh]">
          <PDFGenerator formData={formData} type={showPDFPreview} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Step {currentStep + 1} of {STEPS.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Title */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-cc-navy dark:text-white">
          {STEPS[currentStep].title}
        </h2>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        <CurrentStepComponent 
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        <div className="flex space-x-2">
          {currentStep === STEPS.length - 1 ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={generateCSDPDF}
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Preview CSD Form</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={generateKYCPDF}
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Preview KYC Form</span>
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-cc-navy hover:bg-cc-blue text-white"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-cc-navy hover:bg-cc-blue text-white"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountOpeningForm;
