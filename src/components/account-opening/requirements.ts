import type { FormData } from './types';

export interface Requirement { key: string; label: string; step: number; done: boolean }

const filled = (v: unknown) => typeof v === 'string' ? v.trim().length > 0 : !!v;
const hasFile = (v: unknown) => Array.isArray(v) && v.length > 0;

export const isNonResident = (fd: FormData) => /^Non-Resident/i.test(fd.residentialStatus || '');

/** Everything the back office needs before an application can be submitted. Step numbers match STEPS in AccountOpeningForm. */
export function getRequirements(fd: FormData): Requirement[] {
  const r: Requirement[] = [
    { key: 'investmentType', label: 'Investment type', step: 0, done: filled(fd.investmentType) },
    { key: 'title', label: 'Title', step: 1, done: filled(fd.title) },
    { key: 'surname', label: 'Surname', step: 1, done: filled(fd.surname) },
    { key: 'firstName', label: 'First name', step: 1, done: filled(fd.firstName) },
    { key: 'gender', label: 'Gender', step: 1, done: filled(fd.gender) },
    { key: 'dateOfBirth', label: 'Date of birth', step: 1, done: filled(fd.dateOfBirth) },
    { key: 'residentialStatus', label: 'Residential status', step: 1, done: filled(fd.residentialStatus) },
    { key: 'countryOfOrigin', label: 'Nationality', step: 1, done: filled(fd.countryOfOrigin) },
    { key: 'occupation', label: 'Occupation', step: 1, done: filled(fd.occupation) },
    { key: 'residentialAddress', label: 'Residential address', step: 2, done: filled(fd.residentialAddress) },
    { key: 'emailAddress', label: 'Email address', step: 2, done: filled(fd.emailAddress) },
    { key: 'mobileNumber1', label: 'Mobile number', step: 2, done: filled(fd.mobileNumber1) },
    { key: 'idNumber1', label: 'Ghana Card number', step: 3, done: filled(fd.idNumber1) },
    { key: 'ghanaCardFront', label: 'Ghana Card — front', step: 3, done: hasFile(fd.ghanaCardFront) || !!fd._uploaded?.ghanaCardFront },
    { key: 'ghanaCardBack', label: 'Ghana Card — back', step: 3, done: hasFile(fd.ghanaCardBack) || !!fd._uploaded?.ghanaCardBack },
    { key: 'passportPhoto', label: 'Passport photo (head to chest)', step: 3, done: hasFile(fd.passportPhoto) || !!fd._uploaded?.passportPhoto },
  ];
  if (isNonResident(fd)) {
    r.push(
      { key: 'idNumber2', label: 'Passport number', step: 3, done: filled(fd.idNumber2) },
      { key: 'passportDocument', label: 'Passport bio-data page', step: 3, done: hasFile(fd.passportDocument) || !!fd._uploaded?.passportDocument },
    );
  }
  r.push(
    { key: 'bankName', label: 'Bank name', step: 6, done: filled(fd.bankName) },
    { key: 'bankAccountName', label: 'Bank account name', step: 6, done: filled(fd.bankAccountName) },
    { key: 'bankAccountNumber', label: 'Bank account number', step: 6, done: filled(fd.bankAccountNumber) },
    { key: 'declarationAccepted', label: 'Declaration accepted', step: 7, done: !!fd.declarationAccepted },
    { key: 'applicantSignature', label: 'Signature', step: 7, done: hasFile(fd.applicantSignature) || !!fd._uploaded?.applicantSignature },
  );
  return r;
}

export function completion(fd: FormData) {
  const reqs = getRequirements(fd);
  const done = reqs.filter((x) => x.done).length;
  return { reqs, missing: reqs.filter((x) => !x.done), percent: Math.round((done / reqs.length) * 100) };
}
