import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import FileUpload from '../FileUpload';
import { StepProps } from '../types';
import { isNonResident } from '../requirements';

const Done: React.FC<{ show?: boolean }> = ({ show }) =>
  show ? <p className="text-xs text-primary mt-1">Already uploaded — upload again only to replace it.</p> : null;

const ProofOfIdentityStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const set = (field: string, value: unknown) => setFormData({ ...formData, idType1: 'Ghana Card', [field]: value } as any);
  const abroad = isNonResident(formData);
  const up = formData._uploaded || {};

  return (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground">
        Upload clear, readable photos or scans. Fields marked * are required.
      </p>

      <section className="p-4 bg-muted/40 rounded-lg space-y-4">
        <h3 className="text-lg font-medium text-foreground">Ghana Card *</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="idNumber1">Ghana Card number *</Label>
            <Input id="idNumber1" value={formData.idNumber1} placeholder="GHA-000000000-0"
              onChange={(e) => set('idNumber1', e.target.value.toUpperCase())} />
          </div>
          <div>
            <Label htmlFor="issueDate1">Issue date</Label>
            <Input id="issueDate1" type="date" value={formData.issueDate1} onChange={(e) => set('issueDate1', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="expiringDate1">Expiry date</Label>
            <Input id="expiringDate1" type="date" value={formData.expiringDate1} onChange={(e) => set('expiringDate1', e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FileUpload label="Ghana Card — front *" accept="image/*,.pdf"
              onFileSelect={(f) => set('ghanaCardFront', f)} selectedFiles={formData.ghanaCardFront || []}
              description="Photo of the front side" tips={["Lay the card flat on a dark surface", "All four corners visible, no glare or fingers", "Text must be readable"]} />
            <Done show={up.ghanaCardFront && !formData.ghanaCardFront?.length} />
          </div>
          <div>
            <FileUpload label="Ghana Card — back *" accept="image/*,.pdf"
              onFileSelect={(f) => set('ghanaCardBack', f)} selectedFiles={formData.ghanaCardBack || []}
              description="Photo of the back side" tips={["Lay the card flat on a dark surface", "All four corners visible, no glare or fingers", "Text must be readable"]} />
            <Done show={up.ghanaCardBack && !formData.ghanaCardBack?.length} />
          </div>
        </div>
      </section>

      <section className="p-4 bg-muted/40 rounded-lg space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          Passport {abroad ? '*' : '(only if you live abroad)'}
        </h3>
        {!abroad && (
          <p className="text-sm text-muted-foreground">
            You chose a resident status, so a passport isn't required. If you live outside Ghana, change your residential status on the Personal Information step.
          </p>
        )}
        {abroad && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="idNumber2">Passport number *</Label>
                <Input id="idNumber2" value={formData.idNumber2}
                  onChange={(e) => setFormData({ ...formData, idType2: 'Passport', idNumber2: e.target.value.toUpperCase() })} />
              </div>
              <div>
                <Label htmlFor="placeOfIssue2">Place of issue</Label>
                <Input id="placeOfIssue2" value={formData.placeOfIssue2} onChange={(e) => set('placeOfIssue2', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="expiringDate2">Expiry date</Label>
                <Input id="expiringDate2" type="date" value={formData.expiringDate2} onChange={(e) => set('expiringDate2', e.target.value)} />
              </div>
            </div>
            <FileUpload label="Passport bio-data page *" accept="image/*,.pdf"
              onFileSelect={(f) => set('passportDocument', f)} selectedFiles={formData.passportDocument || []}
              description="The page with your photo and details" tips={["Open the passport fully, photo page facing up", "Include the two code lines at the bottom"]} />
            <Done show={up.passportDocument && !formData.passportDocument?.length} />
          </>
        )}
      </section>

      <section className="p-4 bg-muted/40 rounded-lg space-y-3">
        <h3 className="text-lg font-medium text-foreground">Passport photo *</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Recent colour photo, head to chest, facing the camera</li>
          <li>Plain light background, good lighting, no hat or sunglasses</li>
          <li>On a phone you can take it now with your front camera</li>
        </ul>
        <FileUpload label="Upload or take passport photo" accept="image/*"
          onFileSelect={(f) => set('passportPhoto', f)} selectedFiles={formData.passportPhoto || []}
          description="JPG or PNG" tips={["Face the camera, head to chest in frame", "Plain light background, good light, no hat or sunglasses"]} />
        <Done show={up.passportPhoto && !formData.passportPhoto?.length} />
      </section>
    </div>
  );
};

export default ProofOfIdentityStep;
