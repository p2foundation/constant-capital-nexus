import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import FileUpload from '../FileUpload';
import { StepProps } from '../types';

const DeclarationStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFileUpload = (field: string, files: File[]) => {
    setFormData({
      ...formData,
      [field]: files,
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          DECLARATION
        </h3>
        
        <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
          <p>
            I/We hereby declare that all the information submitted by me/us on the form are 
            correct, true and valid, that by my/our request, to open and maintain securities 
            account(s) in my/our name and undertake to notify Constant Capital (Ghana) Limited 
            of any changes to my/our particulars or information as may be necessary.
          </p>
          
          <p>
            I/We also declare that, we have read thoroughly and understood the contents of this 
            application and have given my/our consent by virtue of my/our signature(s) on this 
            form. I/We consent that investment decision are my/our prerogative without sole 
            reliance on the investment advice received from Constant Capital (Ghana) Limited, 
            Constant Capital (Ghana) Limited accepts no liability for any direct or consequential 
            loss arising from my/our decision. I/We also declare that all debt incurred on my/our 
            securities account(s) by virtue of my/our trade orders shall be settled by me/us accordingly.
          </p>
        </div>

        <div className="mt-6 flex items-start space-x-3">
          <Checkbox
            id="declarationAccepted"
            checked={formData.declarationAccepted}
            onCheckedChange={(checked) => handleChange('declarationAccepted', checked as boolean)}
            required
          />
          <Label htmlFor="declarationAccepted" className="text-sm font-medium">
            I accept and agree to the above declaration
          </Label>
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          DIGITAL SIGNATURES
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FileUpload
              label="Applicant Signature"
              accept="image/*"
              onFileSelect={(files) => handleFileUpload('applicantSignature', files)}
              selectedFiles={formData.applicantSignature || []}
              description="Upload your signature image"
            />
          </div>

          <div>
            <FileUpload
              label="Witness Signature (Optional)"
              accept="image/*"
              onFileSelect={(files) => handleFileUpload('witnessSignature', files)}
              selectedFiles={formData.witnessSignature || []}
              description="Upload witness signature if available"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          ACCOUNT MANDATE
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="signatory1">Name of Signatory</Label>
            <Input
              id="signatory1"
              placeholder="Enter signatory name"
            />
          </div>

          <div>
            <Label>Signature Specimen</Label>
            <div className="h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              Signature Area
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label htmlFor="signatory2">Name of Signatory</Label>
            <Input
              id="signatory2"
              placeholder="Enter signatory name"
            />
          </div>

          <div>
            <Label>Signature Specimen</Label>
            <div className="h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              Signature Area
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-4">
            <Checkbox id="oneToSign" />
            <Label htmlFor="oneToSign" className="text-sm">One to sign</Label>
            
            <Checkbox id="eitherToSign" />
            <Label htmlFor="eitherToSign" className="text-sm">Either to sign</Label>
            
            <Checkbox id="bothToSign" />
            <Label htmlFor="bothToSign" className="text-sm">Both to sign</Label>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          Compliance Checklist
        </h3>
        
        <div className="space-y-3">
          {[
            'Passport-sized photographs (Account holders / Beneficiaries)',
            'Proof of identity (Account holder)',
            'Proof of identity (Account beneficiary/ ITF)',
            'Proof of address',
            'Signed CSD account opening form',
            'Resident permit (foreign residents)',
            'Proof of foreign address (non-resident clients)',
            'Email indemnity form'
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Checkbox id={`checklist-${index}`} />
              <Label htmlFor={`checklist-${index}`} className="text-sm">
                {index + 1}. {item}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="signatureDate">Date</Label>
        <Input
          id="signatureDate"
          type="date"
          value={formData.signatureDate}
          onChange={(e) => handleChange('signatureDate', e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default DeclarationStep;
