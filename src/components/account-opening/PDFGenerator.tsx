
import React from 'react';
import { FormData } from './types';

interface PDFGeneratorProps {
  formData: FormData;
  type: 'CSD' | 'KYC';
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ formData, type }) => {
  const renderCSDForm = () => (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black print:p-4">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold">CONSTANT CAPITAL (GHANA) LIMITED</h1>
        <p className="text-sm">CSD ACCOUNT OPENING FORM</p>
      </div>

      {/* Passport Photo Placeholder */}
      <div className="float-right mb-4 border-2 border-dashed border-gray-400 w-32 h-40 flex items-center justify-center text-xs">
        {formData.passportPhoto && formData.passportPhoto.length > 0 ? (
          <img 
            src={URL.createObjectURL(formData.passportPhoto[0])} 
            alt="Passport" 
            className="w-full h-full object-cover"
          />
        ) : (
          <span>PASSPORT<br/>PHOTO</span>
        )}
      </div>

      {/* Personal Information */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 border-b border-black">PERSONAL INFORMATION</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex">
            <span className="font-medium w-32">Title:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.title}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Surname:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.surname}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">First Name:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.firstName}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Other Names:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.otherNames}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Gender:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.gender}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Date of Birth:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.dateOfBirth}</span>
          </div>
        </div>
      </div>

      {/* Investment Type */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 border-b border-black">INVESTMENT INFORMATION</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex">
            <span className="font-medium w-32">CSD Account:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.csdAccountNumber}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Investment Type:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.investmentType}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Category:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.categoryOfInvestment}</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 border-b border-black">CONTACT INFORMATION</h2>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex">
            <span className="font-medium w-32">Address:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.residentialAddress}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Email:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.emailAddress}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Mobile:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.mobileNumber1}</span>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="mt-12 grid grid-cols-2 gap-8">
        <div>
          <div className="border-b border-black h-16 mb-2 flex items-end justify-center">
            {formData.applicantSignature && formData.applicantSignature.length > 0 ? (
              <img 
                src={URL.createObjectURL(formData.applicantSignature[0])} 
                alt="Applicant Signature" 
                className="max-h-12"
              />
            ) : (
              <span className="text-gray-400 text-xs">Applicant Signature</span>
            )}
          </div>
          <p className="text-center text-sm">Applicant Signature</p>
          <p className="text-center text-xs">Date: {formData.signatureDate}</p>
        </div>
        <div>
          <div className="border-b border-black h-16 mb-2 flex items-end justify-center">
            {formData.witnessSignature && formData.witnessSignature.length > 0 ? (
              <img 
                src={URL.createObjectURL(formData.witnessSignature[0])} 
                alt="Witness Signature" 
                className="max-h-12"
              />
            ) : (
              <span className="text-gray-400 text-xs">Witness Signature</span>
            )}
          </div>
          <p className="text-center text-sm">Witness Signature</p>
          <p className="text-center text-xs">Date: _____________</p>
        </div>
      </div>
    </div>
  );

  const renderKYCForm = () => (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black print:p-4">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold">CONSTANT CAPITAL (GHANA) LIMITED</h1>
        <p className="text-sm">KNOW YOUR CUSTOMER (KYC) FORM</p>
      </div>

      {/* Personal Information */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 border-b border-black">PERSONAL INFORMATION</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex">
            <span className="font-medium w-32">Full Name:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">
              {`${formData.title} ${formData.firstName} ${formData.otherNames} ${formData.surname}`}
            </span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">TIN:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.tin}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Nationality:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.countryOfOrigin}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Occupation:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.occupation}</span>
          </div>
        </div>
      </div>

      {/* Employment Details */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 border-b border-black">EMPLOYMENT INFORMATION</h2>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex">
            <span className="font-medium w-32">Employer:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.employerName}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Position:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.profession}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Monthly Income:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.monthlyIncomeRange}</span>
          </div>
        </div>
      </div>

      {/* Identity Documents */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 border-b border-black">IDENTITY VERIFICATION</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Primary ID:</p>
            <div className="flex">
              <span className="w-20">Type:</span>
              <span className="border-b border-dotted border-black flex-1 px-1">{formData.idType1}</span>
            </div>
            <div className="flex">
              <span className="w-20">Number:</span>
              <span className="border-b border-dotted border-black flex-1 px-1">{formData.idNumber1}</span>
            </div>
          </div>
          <div>
            <p className="font-medium">Secondary ID:</p>
            <div className="flex">
              <span className="w-20">Type:</span>
              <span className="border-b border-dotted border-black flex-1 px-1">{formData.idType2}</span>
            </div>
            <div className="flex">
              <span className="w-20">Number:</span>
              <span className="border-b border-dotted border-black flex-1 px-1">{formData.idNumber2}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Profile */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 border-b border-black">INVESTMENT PROFILE</h2>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex">
            <span className="font-medium w-32">Objectives:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.investmentObjectives}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Risk Tolerance:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.riskTolerance}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Source of Funds:</span>
            <span className="border-b border-dotted border-black flex-1 px-1">{formData.sourceOfFunds}</span>
          </div>
        </div>
      </div>

      {/* Declaration */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 border-b border-black">DECLARATION</h2>
        <p className="text-xs leading-relaxed">
          I hereby declare that all the information provided in this form is true and accurate to the best of my knowledge. 
          I understand that providing false information may result in the rejection of my application or termination of services.
        </p>
      </div>

      {/* Signature Section */}
      <div className="mt-12 grid grid-cols-2 gap-8">
        <div>
          <div className="border-b border-black h-16 mb-2 flex items-end justify-center">
            {formData.applicantSignature && formData.applicantSignature.length > 0 ? (
              <img 
                src={URL.createObjectURL(formData.applicantSignature[0])} 
                alt="Applicant Signature" 
                className="max-h-12"
              />
            ) : (
              <span className="text-gray-400 text-xs">Applicant Signature</span>
            )}
          </div>
          <p className="text-center text-sm">Customer Signature</p>
          <p className="text-center text-xs">Date: {formData.signatureDate}</p>
        </div>
        <div>
          <div className="border-b border-black h-16 mb-2 flex items-end justify-center">
            <span className="text-gray-400 text-xs">Officer Signature</span>
          </div>
          <p className="text-center text-sm">Authorized Officer</p>
          <p className="text-center text-xs">Date: _____________</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="print:shadow-none print:border-none">
      {type === 'CSD' ? renderCSDForm() : renderKYCForm()}
    </div>
  );
};

export default PDFGenerator;
