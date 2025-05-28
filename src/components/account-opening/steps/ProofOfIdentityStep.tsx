
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import FileUpload from '../FileUpload';
import { StepProps } from '../types';

const ProofOfIdentityStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handleChange = (field: string, value: string) => {
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
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Must be completed by the applicant. Please provide two forms of identification and a passport photo.
        </p>
      </div>

      {/* Passport Photo */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          Passport Photo
        </h3>
        <FileUpload
          label="Upload Passport Photo"
          accept="image/*"
          onFileSelect={(files) => handleFileUpload('passportPhoto', files)}
          selectedFiles={formData.passportPhoto || []}
          description="Upload a clear passport-sized photograph"
        />
      </div>

      {/* Proof of Identity 1 */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          Proof of Identity 1
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">ID Type</Label>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {['Passport', 'National ID'].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`idType1-${type}`}
                    checked={formData.idType1 === type}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleChange('idType1', type);
                      }
                    }}
                  />
                  <Label htmlFor={`idType1-${type}`} className="text-sm font-normal">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="idNumber1">ID Number</Label>
              <Input
                id="idNumber1"
                value={formData.idNumber1}
                onChange={(e) => handleChange('idNumber1', e.target.value)}
                placeholder="Enter ID number"
                required
              />
            </div>

            <div>
              <Label htmlFor="placeOfIssue1">Place of Issue</Label>
              <Input
                id="placeOfIssue1"
                value={formData.placeOfIssue1}
                onChange={(e) => handleChange('placeOfIssue1', e.target.value)}
                placeholder="Enter place of issue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="issueDate1">Issue Date</Label>
              <Input
                id="issueDate1"
                type="date"
                value={formData.issueDate1}
                onChange={(e) => handleChange('issueDate1', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="expiringDate1">Expiring Date</Label>
              <Input
                id="expiringDate1"
                type="date"
                value={formData.expiringDate1}
                onChange={(e) => handleChange('expiringDate1', e.target.value)}
              />
            </div>
          </div>

          <FileUpload
            label="Upload ID Document Copy"
            accept=".pdf,.jpg,.jpeg,.png"
            onFileSelect={(files) => handleFileUpload('idDocument1', files)}
            selectedFiles={formData.idDocument1 || []}
            description="Upload a clear copy of your ID document"
          />
        </div>
      </div>

      {/* Proof of Identity 2 */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          Proof of Identity 2
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">ID Type</Label>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {['Passport', 'National ID'].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`idType2-${type}`}
                    checked={formData.idType2 === type}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleChange('idType2', type);
                      }
                    }}
                  />
                  <Label htmlFor={`idType2-${type}`} className="text-sm font-normal">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="idNumber2">ID Number</Label>
              <Input
                id="idNumber2"
                value={formData.idNumber2}
                onChange={(e) => handleChange('idNumber2', e.target.value)}
                placeholder="Enter ID number"
              />
            </div>

            <div>
              <Label htmlFor="placeOfIssue2">Place of Issue</Label>
              <Input
                id="placeOfIssue2"
                value={formData.placeOfIssue2}
                onChange={(e) => handleChange('placeOfIssue2', e.target.value)}
                placeholder="Enter place of issue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="issueDate2">Issue Date</Label>
              <Input
                id="issueDate2"
                type="date"
                value={formData.issueDate2}
                onChange={(e) => handleChange('issueDate2', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="expiringDate2">Expiring Date</Label>
              <Input
                id="expiringDate2"
                type="date"
                value={formData.expiringDate2}
                onChange={(e) => handleChange('expiringDate2', e.target.value)}
              />
            </div>
          </div>

          <FileUpload
            label="Upload ID Document Copy"
            accept=".pdf,.jpg,.jpeg,.png"
            onFileSelect={(files) => handleFileUpload('idDocument2', files)}
            selectedFiles={formData.idDocument2 || []}
            description="Upload a clear copy of your second ID document"
          />
        </div>
      </div>
    </div>
  );
};

export default ProofOfIdentityStep;
