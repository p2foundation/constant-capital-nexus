
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { StepProps } from '../types';

const InvestmentTypeStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="csdAccountNumber">Account Number</Label>
          <Input
            id="csdAccountNumber"
            value={formData.csdAccountNumber}
            onChange={(e) => handleChange('csdAccountNumber', e.target.value)}
            placeholder="Enter account number"
          />
        </div>
        
        <div>
          <Label htmlFor="csdNumber">CSD Number</Label>
          <Input
            id="csdNumber"
            value={formData.csdNumber}
            onChange={(e) => handleChange('csdNumber', e.target.value)}
            placeholder="Enter CSD number"
          />
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Investment Type</Label>
        <div className="mt-3 space-y-3">
          {['Treasury Bills/Notes/Bonds', 'Equities'].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={formData.investmentType === type}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleChange('investmentType', type);
                  }
                }}
              />
              <Label htmlFor={type} className="text-sm font-normal">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Category of Investment</Label>
        <div className="mt-3 space-y-3">
          {['Individual', 'Joint', 'ITF'].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={formData.categoryOfInvestment === category}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleChange('categoryOfInvestment', category);
                  }
                }}
              />
              <Label htmlFor={category} className="text-sm font-normal">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentTypeStep;
