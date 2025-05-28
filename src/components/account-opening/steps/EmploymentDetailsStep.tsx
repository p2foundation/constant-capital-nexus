
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { StepProps } from '../types';

const EmploymentDetailsStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Employment Status */}
      <div>
        <Label className="text-base font-medium">Employment Status</Label>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-3">
          {['Employed', 'Self-employed', 'Retired', 'Student', 'Unemployed'].map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={status}
                checked={formData.employmentStatus === status}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleChange('employmentStatus', status);
                  }
                }}
              />
              <Label htmlFor={status} className="text-sm font-normal">
                {status}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Years of Employment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="yearsOfEmployment">Years of Employment</Label>
          <Input
            id="yearsOfEmployment"
            value={formData.yearsOfEmployment}
            onChange={(e) => handleChange('yearsOfEmployment', e.target.value)}
            placeholder="Enter years"
          />
        </div>

        <div>
          <Label htmlFor="yearsOfCurrentEmployment">Years of Current Employment</Label>
          <Input
            id="yearsOfCurrentEmployment"
            value={formData.yearsOfCurrentEmployment}
            onChange={(e) => handleChange('yearsOfCurrentEmployment', e.target.value)}
            placeholder="Enter years"
          />
        </div>

        <div>
          <Label htmlFor="yearsOfPreviousEmployment">Years of Previous Employment</Label>
          <Input
            id="yearsOfPreviousEmployment"
            value={formData.yearsOfPreviousEmployment}
            onChange={(e) => handleChange('yearsOfPreviousEmployment', e.target.value)}
            placeholder="Enter years"
          />
        </div>
      </div>

      {/* Monthly Income Range */}
      <div>
        <Label className="text-base font-medium">Total Monthly Income Range</Label>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          NB: Income includes salary and other income/cash inflows
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            'Below 1,000',
            '1,001-5,000',
            'Above 5,000-10,000',
            'Above 10,000'
          ].map((range) => (
            <div key={range} className="flex items-center space-x-2">
              <Checkbox
                id={range}
                checked={formData.monthlyIncomeRange === range}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleChange('monthlyIncomeRange', range);
                  }
                }}
              />
              <Label htmlFor={range} className="text-sm font-normal">
                {range}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Employer Information */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          Employer/Business/School Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="employerName">Employer/Business/School Name</Label>
            <Input
              id="employerName"
              value={formData.employerName}
              onChange={(e) => handleChange('employerName', e.target.value)}
              placeholder="Enter employer name"
            />
          </div>

          <div>
            <Label htmlFor="employerAddress">Employer/Business/School Address</Label>
            <Textarea
              id="employerAddress"
              value={formData.employerAddress}
              onChange={(e) => handleChange('employerAddress', e.target.value)}
              placeholder="Enter employer address"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employerLandmark">Nearest Landmark</Label>
              <Input
                id="employerLandmark"
                value={formData.employerLandmark}
                onChange={(e) => handleChange('employerLandmark', e.target.value)}
                placeholder="Enter nearest landmark"
              />
            </div>

            <div>
              <Label htmlFor="employerDigitalAddress">Digital Address</Label>
              <Input
                id="employerDigitalAddress"
                value={formData.employerDigitalAddress}
                onChange={(e) => handleChange('employerDigitalAddress', e.target.value)}
                placeholder="Enter digital address"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="employerCityTown">City/Town</Label>
            <Input
              id="employerCityTown"
              value={formData.employerCityTown}
              onChange={(e) => handleChange('employerCityTown', e.target.value)}
              placeholder="Enter city/town"
            />
          </div>

          <div>
            <Label htmlFor="natureOfBusiness">Nature of Business</Label>
            <Input
              id="natureOfBusiness"
              value={formData.natureOfBusiness}
              onChange={(e) => handleChange('natureOfBusiness', e.target.value)}
              placeholder="Enter nature of business"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="contactNumber1">Contact Number 1</Label>
              <Input
                id="contactNumber1"
                type="tel"
                value={formData.contactNumber1}
                onChange={(e) => handleChange('contactNumber1', e.target.value)}
                placeholder="Enter contact number"
              />
            </div>

            <div>
              <Label htmlFor="contactNumber2">Contact Number 2</Label>
              <Input
                id="contactNumber2"
                type="tel"
                value={formData.contactNumber2}
                onChange={(e) => handleChange('contactNumber2', e.target.value)}
                placeholder="Enter contact number"
              />
            </div>

            <div>
              <Label htmlFor="officeEmail">Office Email</Label>
              <Input
                id="officeEmail"
                type="email"
                value={formData.officeEmail}
                onChange={(e) => handleChange('officeEmail', e.target.value)}
                placeholder="Enter office email"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentDetailsStep;
