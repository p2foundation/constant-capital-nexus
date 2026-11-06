import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, FileText, Printer, Save, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useAccountOpeningPersistence } from '@/hooks/useAccountOpeningPersistence';
import { elementToPdf, StoredPdf } from '@/lib/accountDocuments';
import PDFGenerator from './PDFGenerator';
import SubmittedDocuments from './SubmittedDocuments';
import { completion } from './requirements';
import { Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const [renderForPdf, setRenderForPdf] = useState(false);
  const [submitted, setSubmitted] = useState<StoredPdf[] | null>(null);
  const csdRef = useRef<HTMLDivElement>(null);
  const kycRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    loadApplication,
    saveApplication,
    submitApplication,
    isLoading,
    isSaving,
    hasExistingApplication
  } = useAccountOpeningPersistence();

  // Load saved data on mount
  useEffect(() => {
    const loadSavedData = async () => {
      if (user) {
        const savedData = await loadApplication();
        if (savedData) {
          setFormData(savedData);
          if (savedData._progress?.currentStep) setCurrentStep(Math.min(savedData._progress.currentStep, STEPS.length - 1));
          toast({
            title: "Progress Restored",
            description: "Your previous form progress has been loaded.",
          });
        }
      }
    };

    loadSavedData();
  }, [user, loadApplication, toast]);

  // Auto-save on form data changes
  useEffect(() => {
    if (user && !isLoading && !submitted && !isSubmitting) {
      saveApplication(formData, currentStep);
    }
  }, [formData, currentStep, user, isLoading, saveApplication, submitted, isSubmitting]);

  const status = completion(formData);

  const progress = completion(formData).percent;
  const CurrentStepComponent = STEPS[currentStep].component;

  // Basics done = investment type + names; after that, applicants may leave and resume later.
  const canFinishLater = !!formData.investmentType && !!formData.firstName?.trim() && !!formData.surname?.trim();

  const handleFinishLater = () => {
    toast({
      title: "Progress saved",
      description: `You're ${Math.round(progress)}% done. Upload remaining documents any time from Profile → Onboarding.`,
    });
    // Pending debounced save is flushed on unmount.
    navigate('/profile?tab=onboarding');
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit your application.",
        variant: "destructive",
      });
      return;
    }
    if (status.missing.length) {
      toast({ title: "Application incomplete", description: `Still needed: ${status.missing.map((m) => m.label).join(', ')}`, variant: "destructive" });
      setCurrentStep(status.missing[0].step);
      return;
    }

    setIsSubmitting(true);
    setRenderForPdf(true);
    try {
      // let the hidden forms mount
      await new Promise((r) => setTimeout(r, 150));
      const result = await submitApplication(formData, async () => {
        const out: { type: 'CSD' | 'KYC'; blob: Blob }[] = [];
        if (csdRef.current) out.push({ type: 'CSD', blob: await elementToPdf(csdRef.current) });
        if (kycRef.current) out.push({ type: 'KYC', blob: await elementToPdf(kycRef.current) });
        return out;
      });
      if (result) setSubmitted(result.pdfs);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setRenderForPdf(false);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cc-navy mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-muted-foreground">Loading your application...</p>
        </div>
      </div>
    );
  }

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

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-semibold text-foreground">Application submitted</h2>
          <p className="text-muted-foreground mt-1">
            Your CSD and KYC forms and uploaded documents are saved securely and have been sent to our trading team. Track the review from the Onboarding tab in your profile.
          </p>
        </div>
        <SubmittedDocuments pdfs={submitted} />
        <Button asChild variant="outline">
          <a href="/profile">Track application status</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderForPdf && (
        <div aria-hidden style={{ position: 'fixed', left: -10000, top: 0, width: 900 }}>
          <div ref={csdRef}><PDFGenerator formData={formData} type="CSD" /></div>
          <div ref={kycRef}><PDFGenerator formData={formData} type="KYC" /></div>
        </div>
      )}
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-muted-foreground">
          <span>Step {currentStep + 1} of {STEPS.length} · {STEPS[currentStep].title}</span>
          <div className="flex items-center space-x-4">
            <span>{Math.round(progress)}% Complete</span>
            {isSaving && (
              <div className="flex items-center space-x-1 text-xs text-blue-600">
                <Save className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
            {hasExistingApplication && (
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <Clock className="h-3 w-3" />
                <span>Progress saved</span>
              </div>
            )}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Title */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-cc-navy dark:text-white">
          {STEPS[currentStep].title}
        </h2>
        {hasExistingApplication && (
          <p className="text-sm text-green-600 mt-1">
            Your progress is automatically saved as you fill out the form
          </p>
        )}
      </div>

      {!canFinishLater && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
          <strong>Just the basics for now.</strong> Choose your investment type and fill in your personal information, then you can
          continue exploring the site. ID photos, signature and other documents can be added later from{' '}
          <span className="font-medium">Profile → Onboarding</span>.
        </div>
      )}

      {/* Requirements tracker */}
      <details className="rounded-lg border border-border bg-muted/30 p-4" open={currentStep === STEPS.length - 1}>
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          Requirements checklist — {status.reqs.length - status.missing.length} of {status.reqs.length} done
        </summary>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
          {status.reqs.map((r) => (
            <li key={r.key}>
              <button type="button" onClick={() => setCurrentStep(r.step)}
                className={`flex items-center gap-2 text-left hover:underline ${r.done ? 'text-muted-foreground' : 'text-foreground'}`}>
                {r.done ? <CheckCircle className="h-4 w-4 text-primary shrink-0" /> : <Circle className="h-4 w-4 shrink-0" />}
                {r.label} <span className="text-xs text-muted-foreground">· {STEPS[r.step].title}</span>
              </button>
            </li>
          ))}
        </ul>
      </details>

      {/* Step Content */}
      <div className="min-h-[400px]">
        <CurrentStepComponent 
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-border">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        <div className="flex flex-wrap justify-end gap-2">
          {canFinishLater && currentStep < STEPS.length - 1 && (
            <Button type="button" variant="outline" onClick={handleFinishLater}>
              Save &amp; finish later
            </Button>
          )}
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
                disabled={isSubmitting || !user || status.missing.length > 0}
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
