
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { StepProps } from '../types';

const PersonalInfoStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Title and Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-base font-medium">Title</Label>
          <div className="mt-3 space-y-2">
            {['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.', 'Other'].map((title) => (
              <div key={title} className="flex items-center space-x-2">
                <Checkbox
                  id={title}
                  checked={formData.title === title}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleChange('title', title);
                    }
                  }}
                />
                <Label htmlFor={title} className="text-sm font-normal">
                  {title}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base font-medium">Gender</Label>
          <div className="mt-3 space-y-2">
            {['Male', 'Female'].map((gender) => (
              <div key={gender} className="flex items-center space-x-2">
                <Checkbox
                  id={gender}
                  checked={formData.gender === gender}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleChange('gender', gender);
                    }
                  }}
                />
                <Label htmlFor={gender} className="text-sm font-normal">
                  {gender}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="surname">Surname</Label>
          <Input
            id="surname"
            value={formData.surname}
            onChange={(e) => handleChange('surname', e.target.value)}
            placeholder="Enter surname"
            required
          />
        </div>

        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Enter first name"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="otherNames">Other Names</Label>
          <Input
            id="otherNames"
            value={formData.otherNames}
            onChange={(e) => handleChange('otherNames', e.target.value)}
            placeholder="Enter other names"
          />
        </div>

        <div>
          <Label htmlFor="maidenName">Maiden Name</Label>
          <Input
            id="maidenName"
            value={formData.maidenName}
            onChange={(e) => handleChange('maidenName', e.target.value)}
            placeholder="Enter maiden name"
          />
        </div>
      </div>

      {/* Marital Status */}
      <div>
        <Label className="text-base font-medium">Marital Status</Label>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-3">
          {['Single', 'Married', 'Divorced', 'Widowed', 'Separated'].map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={status}
                checked={formData.maritalStatus === status}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleChange('maritalStatus', status);
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

      {/* Birth Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="placeOfBirth">Place of Birth</Label>
          <Input
            id="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={(e) => handleChange('placeOfBirth', e.target.value)}
            placeholder="Enter place of birth"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="mothersMaidenName">Mother's Maiden Name</Label>
          <Input
            id="mothersMaidenName"
            value={formData.mothersMaidenName}
            onChange={(e) => handleChange('mothersMaidenName', e.target.value)}
            placeholder="Enter mother's maiden name"
          />
        </div>

        <div>
          <Label htmlFor="tin">TIN</Label>
          <Input
            id="tin"
            value={formData.tin}
            onChange={(e) => handleChange('tin', e.target.value)}
            placeholder="Enter TIN"
          />
        </div>
      </div>

      {/* Residential Status */}
      <div>
        <Label className="text-base font-medium">Residential Status</Label>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-2">
            {['Resident Ghanaian', 'Resident Foreigner'].map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={status}
                  checked={formData.residentialStatus === status}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleChange('residentialStatus', status);
                    }
                  }}
                />
                <Label htmlFor={status} className="text-sm font-normal">
                  {status}
                </Label>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {['Non-Resident Ghanaian', 'Non-Resident Foreigner'].map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={status}
                  checked={formData.residentialStatus === status}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleChange('residentialStatus', status);
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
      </div>

      {/* Country Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="countryOfOrigin">Country of Origin</Label>
          <Input
            id="countryOfOrigin"
            value={formData.countryOfOrigin}
            onChange={(e) => handleChange('countryOfOrigin', e.target.value)}
            placeholder="Enter country of origin"
          />
        </div>

        <div>
          <Label htmlFor="countryOfResidence">Country of Residence</Label>
          <Input
            id="countryOfResidence"
            value={formData.countryOfResidence}
            onChange={(e) => handleChange('countryOfResidence', e.target.value)}
            placeholder="Enter country of residence"
          />
        </div>
      </div>

      {/* Permit Information (for non-Ghanaians) */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">
          If the country of origin is not Ghana, please provide the following:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="residentPermitNumber">Resident Permit Number</Label>
            <Input
              id="residentPermitNumber"
              value={formData.residentPermitNumber}
              onChange={(e) => handleChange('residentPermitNumber', e.target.value)}
              placeholder="Enter permit number"
            />
          </div>

          <div>
            <Label htmlFor="permitIssueDate">Permit Issue Date</Label>
            <Input
              id="permitIssueDate"
              type="date"
              value={formData.permitIssueDate}
              onChange={(e) => handleChange('permitIssueDate', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="permitExpiringDate">Permit Expiring Date</Label>
            <Input
              id="permitExpiringDate"
              type="date"
              value={formData.permitExpiringDate}
              onChange={(e) => handleChange('permitExpiringDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            value={formData.occupation}
            onChange={(e) => handleChange('occupation', e.target.value)}
            placeholder="Enter occupation"
          />
        </div>

        <div>
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            value={formData.profession}
            onChange={(e) => handleChange('profession', e.target.value)}
            placeholder="Enter profession"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
