
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { StepProps } from '../types';

const BankInformationStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Bank Information of the Investor for Dividend, Interest and Maturity Disposal Instructions
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          (For equity or shares the Bank information is optional)
        </p>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="bankName">Bank</Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={(e) => handleChange('bankName', e.target.value)}
              placeholder="Enter bank name"
            />
          </div>

          <div>
            <Label htmlFor="bankAccountName">Account Name</Label>
            <Input
              id="bankAccountName"
              value={formData.bankAccountName}
              onChange={(e) => handleChange('bankAccountName', e.target.value)}
              placeholder="Enter account name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label htmlFor="bankAccountNumber">Account Number</Label>
            <Input
              id="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={(e) => handleChange('bankAccountNumber', e.target.value)}
              placeholder="Enter account number"
            />
          </div>

          <div>
            <Label htmlFor="bankBranch">Bank Branch</Label>
            <Input
              id="bankBranch"
              value={formData.bankBranch}
              onChange={(e) => handleChange('bankBranch', e.target.value)}
              placeholder="Enter bank branch"
            />
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 dark:text-gray-300">
        This information will be used for processing dividend payments, interest payments, 
        and maturity proceeds for your investments.
      </div>
    </div>
  );
};

export default BankInformationStep;
