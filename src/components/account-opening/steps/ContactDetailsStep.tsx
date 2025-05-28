
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StepProps } from '../types';

const ContactDetailsStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Residential Address */}
      <div>
        <Label htmlFor="residentialAddress">Residential Address</Label>
        <Textarea
          id="residentialAddress"
          value={formData.residentialAddress}
          onChange={(e) => handleChange('residentialAddress', e.target.value)}
          placeholder="Enter residential address"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="nearestLandmark">Nearest Landmark</Label>
          <Input
            id="nearestLandmark"
            value={formData.nearestLandmark}
            onChange={(e) => handleChange('nearestLandmark', e.target.value)}
            placeholder="Enter nearest landmark"
          />
        </div>

        <div>
          <Label htmlFor="cityTown">City/Town</Label>
          <Input
            id="cityTown"
            value={formData.cityTown}
            onChange={(e) => handleChange('cityTown', e.target.value)}
            placeholder="Enter city/town"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="digitalAddress">Digital Address</Label>
          <Input
            id="digitalAddress"
            value={formData.digitalAddress}
            onChange={(e) => handleChange('digitalAddress', e.target.value)}
            placeholder="Enter digital address (Ghana Post GPS)"
          />
        </div>

        <div>
          <Label htmlFor="postalAddress">Postal Address</Label>
          <Input
            id="postalAddress"
            value={formData.postalAddress}
            onChange={(e) => handleChange('postalAddress', e.target.value)}
            placeholder="Enter postal address"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="emailAddress">Email Address</Label>
        <Input
          id="emailAddress"
          type="email"
          value={formData.emailAddress}
          onChange={(e) => handleChange('emailAddress', e.target.value)}
          placeholder="Enter email address"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="mobileNumber1">Mobile Number 1</Label>
          <Input
            id="mobileNumber1"
            type="tel"
            value={formData.mobileNumber1}
            onChange={(e) => handleChange('mobileNumber1', e.target.value)}
            placeholder="Enter mobile number"
            required
          />
        </div>

        <div>
          <Label htmlFor="mobileNumber2">Mobile Number 2</Label>
          <Input
            id="mobileNumber2"
            type="tel"
            value={formData.mobileNumber2}
            onChange={(e) => handleChange('mobileNumber2', e.target.value)}
            placeholder="Enter second mobile number"
          />
        </div>
      </div>

      {/* Emergency Contact Details */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          Contact Details (in case of emergency)
        </h3>
        
        <h4 className="text-md font-medium mb-3 text-gray-800 dark:text-gray-200">
          Contact 1
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="emergencyContactName1">Contact Name</Label>
            <Input
              id="emergencyContactName1"
              value={formData.emergencyContactName1}
              onChange={(e) => handleChange('emergencyContactName1', e.target.value)}
              placeholder="Enter contact name"
            />
          </div>

          <div>
            <Label htmlFor="emergencyContactRelationship1">Relationship to client</Label>
            <Input
              id="emergencyContactRelationship1"
              value={formData.emergencyContactRelationship1}
              onChange={(e) => handleChange('emergencyContactRelationship1', e.target.value)}
              placeholder="Enter relationship"
            />
          </div>

          <div>
            <Label htmlFor="emergencyContactNumber1">Contact Number</Label>
            <Input
              id="emergencyContactNumber1"
              type="tel"
              value={formData.emergencyContactNumber1}
              onChange={(e) => handleChange('emergencyContactNumber1', e.target.value)}
              placeholder="Enter contact number"
            />
          </div>
        </div>

        <h4 className="text-md font-medium mb-3 text-gray-800 dark:text-gray-200">
          Contact 2
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="emergencyContactName2">Contact Name</Label>
            <Input
              id="emergencyContactName2"
              value={formData.emergencyContactName2}
              onChange={(e) => handleChange('emergencyContactName2', e.target.value)}
              placeholder="Enter contact name"
            />
          </div>

          <div>
            <Label htmlFor="emergencyContactRelationship2">Relationship to client</Label>
            <Input
              id="emergencyContactRelationship2"
              value={formData.emergencyContactRelationship2}
              onChange={(e) => handleChange('emergencyContactRelationship2', e.target.value)}
              placeholder="Enter relationship"
            />
          </div>

          <div>
            <Label htmlFor="emergencyContactNumber2">Contact Number</Label>
            <Input
              id="emergencyContactNumber2"
              type="tel"
              value={formData.emergencyContactNumber2}
              onChange={(e) => handleChange('emergencyContactNumber2', e.target.value)}
              placeholder="Enter contact number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsStep;
