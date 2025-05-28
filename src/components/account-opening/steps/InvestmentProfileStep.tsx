
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { StepProps } from '../types';

const InvestmentProfileStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Investment Objectives */}
      <div>
        <Label htmlFor="investmentObjectives">Investment Objectives</Label>
        <Textarea
          id="investmentObjectives"
          value={formData.investmentObjectives}
          onChange={(e) => handleChange('investmentObjectives', e.target.value)}
          placeholder="Describe your investment objectives"
          rows={3}
        />
      </div>

      {/* Risk Tolerance */}
      <div>
        <Label className="text-base font-medium">Risk Tolerance</Label>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {['Low', 'Medium', 'High'].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`risk-${level}`}
                checked={formData.riskTolerance === level}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleChange('riskTolerance', level);
                  }
                }}
              />
              <Label htmlFor={`risk-${level}`} className="text-sm font-normal">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Horizon */}
      <div>
        <Label className="text-base font-medium">Investment Horizon</Label>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {['Short Term', 'Medium Term', 'Long Term'].map((term) => (
            <div key={term} className="flex items-center space-x-2">
              <Checkbox
                id={`horizon-${term}`}
                checked={formData.investmentHorizon === term}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleChange('investmentHorizon', term);
                  }
                }}
              />
              <Label htmlFor={`horizon-${term}`} className="text-sm font-normal">
                {term}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Knowledge */}
      <div>
        <Label className="text-base font-medium">Investment Knowledge</Label>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {['Low', 'Medium', 'High'].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`knowledge-${level}`}
                checked={formData.investmentKnowledge === level}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleChange('investmentKnowledge', level);
                  }
                }}
              />
              <Label htmlFor={`knowledge-${level}`} className="text-sm font-normal">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Source of Funds */}
      <div>
        <Label className="text-base font-medium">Source of Funds</Label>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            'Salary',
            'Personal Savings', 
            'Proceeds from Business',
            'Inheritance/Gift',
            'Others'
          ].map((source) => (
            <div key={source} className="flex items-center space-x-2">
              <Checkbox
                id={`source-${source}`}
                checked={formData.sourceOfFunds === source}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleChange('sourceOfFunds', source);
                  }
                }}
              />
              <Label htmlFor={`source-${source}`} className="text-sm font-normal">
                {source}
              </Label>
            </div>
          ))}
        </div>
        
        {formData.sourceOfFunds === 'Others' && (
          <div className="mt-3">
            <Label htmlFor="sourceOfFundsOther">Please specify other source</Label>
            <Input
              id="sourceOfFundsOther"
              value={formData.sourceOfFundsOther}
              onChange={(e) => handleChange('sourceOfFundsOther', e.target.value)}
              placeholder="Specify other source of funds"
            />
          </div>
        )}
      </div>

      {/* Initial Investment Amount */}
      <div>
        <Label htmlFor="initialInvestmentAmount">Initial Investment Amount</Label>
        <Input
          id="initialInvestmentAmount"
          value={formData.initialInvestmentAmount}
          onChange={(e) => handleChange('initialInvestmentAmount', e.target.value)}
          placeholder="Enter initial investment amount"
        />
      </div>

      {/* FATCA Information */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          CLIENT ADDITIONAL INFORMATION
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          The following questions are designed to capture information for common reporting standards as well as FATCA (Foreign Account Tax Compliance Act)
        </p>
        
        <div className="space-y-4">
          {[
            { key: 'citizenOfAnotherCountry', label: 'Are you a citizen of another country (besides Ghana)?' },
            { key: 'foreignPassport', label: 'Do you hold a passport of any foreign country (besides Ghana)?' },
            { key: 'greenCard', label: 'Do you hold a Green Card of any country (besides Ghana)?' },
            { key: 'residentInForeignCountry', label: 'Are you resident in any foreign country?' },
            { key: 'spentDaysInForeignCountry', label: 'Have you spent more than 183 days in any foreign country?' }
          ].map((item) => (
            <div key={item.key} className="flex items-start space-x-3">
              <div className="flex items-center space-x-6 mt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${item.key}-yes`}
                    checked={formData[item.key as keyof FormData] === true}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleChange(item.key, true);
                      }
                    }}
                  />
                  <Label htmlFor={`${item.key}-yes`} className="text-sm font-normal">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${item.key}-no`}
                    checked={formData[item.key as keyof FormData] === false}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleChange(item.key, false);
                      }
                    }}
                  />
                  <Label htmlFor={`${item.key}-no`} className="text-sm font-normal">
                    No
                  </Label>
                </div>
              </div>
              <Label className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.label}
              </Label>
            </div>
          ))}
        </div>

        {/* Additional fields if any FATCA question is Yes */}
        {(formData.citizenOfAnotherCountry || formData.foreignPassport || formData.greenCard || 
          formData.residentInForeignCountry || formData.spentDaysInForeignCountry) && (
          <div className="mt-6 space-y-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              If the response to any of the above questions is Yes, please provide the following information:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="foreignResidentialAddress">Foreign Residential Address</Label>
                <Textarea
                  id="foreignResidentialAddress"
                  value={formData.foreignResidentialAddress}
                  onChange={(e) => handleChange('foreignResidentialAddress', e.target.value)}
                  placeholder="Enter foreign residential address"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="foreignMailingAddress">Foreign Mailing Address</Label>
                <Textarea
                  id="foreignMailingAddress"
                  value={formData.foreignMailingAddress}
                  onChange={(e) => handleChange('foreignMailingAddress', e.target.value)}
                  placeholder="Enter foreign mailing address"
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="foreignTelephoneNumber">Foreign Telephone Number</Label>
                <Input
                  id="foreignTelephoneNumber"
                  value={formData.foreignTelephoneNumber}
                  onChange={(e) => handleChange('foreignTelephoneNumber', e.target.value)}
                  placeholder="Enter foreign telephone number"
                />
              </div>

              <div>
                <Label htmlFor="foreignTin">Foreign Tax Identification Number (TIN) / Social Security Number (SSN) / National Identity Number</Label>
                <Input
                  id="foreignTin"
                  value={formData.foreignTin}
                  onChange={(e) => handleChange('foreignTin', e.target.value)}
                  placeholder="Enter foreign TIN/SSN/National ID"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentProfileStep;
