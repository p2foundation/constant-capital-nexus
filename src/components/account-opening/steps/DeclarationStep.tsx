import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import FileUpload from '../FileUpload';
import { StepProps } from '../types';
import SignaturePad from '../SignaturePad';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  const sigFile = formData.applicantSignature?.[0];
  const sigUrl = React.useMemo(() => (sigFile ? URL.createObjectURL(sigFile) : ''), [sigFile]);
  React.useEffect(() => {
    if (!formData.signatureDate) handleChange('signatureDate', new Date().toISOString().slice(0, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 dark:bg-card rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          DECLARATION
        </h3>
        
        <div className="space-y-4 text-sm text-gray-700 dark:text-muted-foreground">
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

      <div className="p-4 bg-gray-50 dark:bg-card rounded-lg space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">YOUR SIGNATURE *</h3>
        <p className="text-sm text-muted-foreground">Sign with your finger or mouse, or upload a photo of your signature on white paper.</p>
        {sigFile ? (
          <div className="flex items-center gap-4">
            <img src={sigUrl} alt="Your signature" className="h-20 bg-white rounded border border-border p-2" />
            <Button type="button" variant="outline" size="sm" onClick={() => handleFileUpload('applicantSignature', [])}>Change signature</Button>
          </div>
        ) : formData._uploaded?.applicantSignature ? (
          <div className="flex items-center gap-4">
            <p className="text-sm text-primary">Signature already saved.</p>
            <Button type="button" variant="outline" size="sm" onClick={() => setFormData({ ...formData, _uploaded: { ...formData._uploaded, applicantSignature: '' } })}>Sign again</Button>
          </div>
        ) : (
          <Tabs defaultValue="draw">
            <TabsList>
              <TabsTrigger value="draw">Draw</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="draw"><SignaturePad onSave={(f) => handleFileUpload('applicantSignature', [f])} /></TabsContent>
            <TabsContent value="upload">
              <FileUpload label="Signature image" accept="image/*"
                onFileSelect={(files) => handleFileUpload('applicantSignature', files)}
                selectedFiles={[]} description="PNG or JPG" />
            </TabsContent>
          </Tabs>
        )}
        <div className="max-w-xs">
          <Label htmlFor="signatureDate">Date</Label>
          <Input id="signatureDate" type="date" value={formData.signatureDate} onChange={(e) => handleChange('signatureDate', e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default DeclarationStep;
