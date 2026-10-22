import React, { useEffect, useState } from 'react';
import { FormData } from './types';
import { getSignedUrl } from '@/lib/accountDocuments';

interface PDFGeneratorProps { formData: FormData; type: 'CSD' | 'KYC' }

/** Image source from a freshly picked File, or from the file already saved during drafting. */
function useImage(fd: FormData, field: keyof FormData): string {
  const file = (fd[field] as File[] | undefined)?.[0];
  const saved = fd._uploaded?.[field as string];
  const [src, setSrc] = useState('');
  useEffect(() => {
    if (file instanceof File && file.type.startsWith('image/')) {
      const u = URL.createObjectURL(file); setSrc(u); return () => URL.revokeObjectURL(u);
    }
    if (saved && !/\.pdf$/i.test(saved)) { getSignedUrl(saved).then(setSrc).catch(() => setSrc('')); return; }
    setSrc('');
  }, [file, saved]);
  return src;
}

// Print form — intentionally black on white regardless of site theme.
const Row: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <div style={{ display: 'flex', fontSize: 12, padding: '3px 0' }}>
    <span style={{ width: 170, fontWeight: 600, flexShrink: 0 }}>{label}:</span>
    <span style={{ flex: 1, borderBottom: '1px dotted #000', paddingLeft: 4, minHeight: 16 }}>{value || ''}</span>
  </div>
);
const Section: React.FC<{ title: string; children: React.ReactNode; cols?: number }> = ({ title, children, cols = 2 }) => (
  <div style={{ marginBottom: 18 }}>
    <h2 style={{ fontSize: 13, fontWeight: 700, borderBottom: '1px solid #000', marginBottom: 6, paddingBottom: 2 }}>{title}</h2>
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, columnGap: 20 }}>{children}</div>
  </div>
);
const yes = (b: boolean) => (b ? 'Yes' : 'No');

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ formData: f, type }) => {
  const photo = useImage(f, 'passportPhoto');
  const sig = useImage(f, 'applicantSignature');
  const fullName = [f.title, f.firstName, f.otherNames, f.surname].filter(Boolean).join(' ');

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: 32, background: '#fff', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: 10, marginBottom: 18 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>CONSTANT CAPITAL (GHANA) LIMITED</h1>
        <p style={{ fontSize: 12, margin: '4px 0 0' }}>
          {type === 'CSD' ? 'CSD ACCOUNT OPENING FORM' : 'KNOW YOUR CUSTOMER (KYC) FORM'} · Generated {new Date().toLocaleDateString('en-GB')}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 20, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <Section title="PERSONAL INFORMATION" cols={1}>
            <Row label="Full name" value={fullName} />
            <Row label="Maiden name" value={f.maidenName} />
            <Row label="Gender" value={f.gender} />
            <Row label="Marital status" value={f.maritalStatus} />
            <Row label="Date of birth" value={f.dateOfBirth} />
            <Row label="Place of birth" value={f.placeOfBirth} />
            <Row label="Mother's maiden name" value={f.mothersMaidenName} />
            <Row label="TIN" value={f.tin || f.idNumber1} />
          </Section>
        </div>
        <div style={{ width: 130, height: 165, border: '1px dashed #888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
          {photo ? <img src={photo} crossOrigin="anonymous" alt="Passport" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'PASSPORT PHOTO'}
        </div>
      </div>

      <Section title="RESIDENCY & OCCUPATION">
        <Row label="Residential status" value={f.residentialStatus} />
        <Row label="Nationality" value={f.countryOfOrigin} />
        <Row label="Country of residence" value={f.countryOfResidence} />
        <Row label="Resident permit no." value={f.residentPermitNumber} />
        <Row label="Occupation" value={f.occupation} />
        <Row label="Profession" value={f.profession} />
      </Section>

      <Section title="IDENTIFICATION">
        <Row label="Ghana Card no." value={f.idNumber1} />
        <Row label="Ghana Card issue / expiry" value={[f.issueDate1, f.expiringDate1].filter(Boolean).join(' / ')} />
        <Row label="Passport no." value={f.idNumber2} />
        <Row label="Passport place / expiry" value={[f.placeOfIssue2, f.expiringDate2].filter(Boolean).join(' / ')} />
      </Section>

      <Section title="CONTACT DETAILS">
        <Row label="Residential address" value={f.residentialAddress} />
        <Row label="Nearest landmark" value={f.nearestLandmark} />
        <Row label="City / town" value={f.cityTown} />
        <Row label="Digital address" value={f.digitalAddress} />
        <Row label="Postal address" value={f.postalAddress} />
        <Row label="Email" value={f.emailAddress} />
        <Row label="Mobile 1" value={f.mobileNumber1} />
        <Row label="Mobile 2" value={f.mobileNumber2} />
        <Row label="Emergency contact 1" value={[f.emergencyContactName1, f.emergencyContactRelationship1, f.emergencyContactNumber1].filter(Boolean).join(' · ')} />
        <Row label="Emergency contact 2" value={[f.emergencyContactName2, f.emergencyContactRelationship2, f.emergencyContactNumber2].filter(Boolean).join(' · ')} />
      </Section>

      {type === 'CSD' && (
        <Section title="INVESTMENT ACCOUNT">
          <Row label="Investment type" value={f.investmentType} />
          <Row label="Category" value={f.categoryOfInvestment} />
          <Row label="Existing CSD account" value={f.csdAccountNumber || f.csdNumber} />
        </Section>
      )}

      <Section title="BANK DETAILS">
        <Row label="Bank" value={f.bankName} />
        <Row label="Branch" value={f.bankBranch} />
        <Row label="Account name" value={f.bankAccountName} />
        <Row label="Account number" value={f.bankAccountNumber} />
      </Section>

      {type === 'KYC' && (
        <>
          <Section title="EMPLOYMENT">
            <Row label="Status" value={f.employmentStatus} />
            <Row label="Employer" value={f.employerName} />
            <Row label="Employer address" value={f.employerAddress} />
            <Row label="Nature of business" value={f.natureOfBusiness} />
            <Row label="Years employed" value={f.yearsOfEmployment} />
            <Row label="Monthly income" value={f.monthlyIncomeRange} />
            <Row label="Office email" value={f.officeEmail} />
            <Row label="Office phone" value={f.contactNumber1} />
          </Section>
          <Section title="INVESTMENT PROFILE">
            <Row label="Objectives" value={f.investmentObjectives} />
            <Row label="Risk tolerance" value={f.riskTolerance} />
            <Row label="Horizon" value={f.investmentHorizon} />
            <Row label="Knowledge" value={f.investmentKnowledge} />
            <Row label="Reaction to loss" value={f.lossReaction} />
            <Row label="Source of funds" value={[f.sourceOfFunds, f.sourceOfFundsOther].filter(Boolean).join(' – ')} />
            <Row label="Initial investment" value={f.initialInvestmentAmount} />
            <Row label="Expected activity" value={f.anticipatedInvestmentActivity} />
            <Row label="Instructions via" value={f.modeOfInstructions} />
            <Row label="Statements" value={[f.modeOfStatementDelivery, f.statementFrequency].filter(Boolean).join(' · ')} />
          </Section>
          <Section title="FATCA">
            <Row label="Citizen of another country" value={yes(f.citizenOfAnotherCountry)} />
            <Row label="Foreign passport" value={yes(f.foreignPassport)} />
            <Row label="US green card" value={yes(f.greenCard)} />
            <Row label="Resident abroad" value={yes(f.residentInForeignCountry)} />
            <Row label="Foreign TIN" value={f.foreignTin} />
            <Row label="Foreign address" value={f.foreignResidentialAddress} />
          </Section>
        </>
      )}

      <Section title="NEXT OF KIN">
        <Row label="Name" value={[f.nokTitle, f.nokFirstName, f.nokOtherNames, f.nokSurname].filter(Boolean).join(' ')} />
        <Row label="Relationship" value={f.nokRelationship} />
        <Row label="Phone" value={f.nokContactNumber} />
        <Row label="Email" value={f.nokEmailAddress} />
      </Section>

      <div style={{ fontSize: 10, lineHeight: 1.5, marginBottom: 20 }}>
        <strong>DECLARATION:</strong> I/We declare that all information submitted on this form is correct, true and valid, and undertake to notify
        Constant Capital (Ghana) Limited of any changes. Accepted: <strong>{yes(f.declarationAccepted)}</strong>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 24 }}>
        <div>
          <div style={{ borderBottom: '1px solid #000', height: 64, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            {sig && <img src={sig} crossOrigin="anonymous" alt="Signature" style={{ maxHeight: 58 }} />}
          </div>
          <p style={{ textAlign: 'center', fontSize: 11, margin: '4px 0 0' }}>Applicant signature · Date: {f.signatureDate}</p>
        </div>
        <div>
          <div style={{ borderBottom: '1px solid #000', height: 64 }} />
          <p style={{ textAlign: 'center', fontSize: 11, margin: '4px 0 0' }}>Authorised officer · Date: ________</p>
        </div>
      </div>
    </div>
  );
};

export default PDFGenerator;
