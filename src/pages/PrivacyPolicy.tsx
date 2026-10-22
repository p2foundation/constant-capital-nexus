import React from 'react';
import LegalPage from '@/components/legal/LegalPage';
import { useAnalytics } from '@/hooks/useAnalytics';

const PrivacyPolicy = () => {
  useAnalytics();
  return (
    <LegalPage title="Privacy Policy" description="How Constant Capital collects, uses, protects and retains personal data during digital KYC, CSD onboarding and investment services.">
      <p>This Policy explains how Constant Capital (Ghana) Limited collects, uses, shares, stores and protects personal data when you visit our website, create an account, complete KYC/CSD onboarding, contact us, apply for a role or use our investment services.</p>

      <h2>1. Data controller and scope</h2>
      <p>Constant Capital is responsible for the personal data processed through this website and its onboarding services. This Policy applies to prospective and current individual clients, representatives, beneficial owners, institutional contacts, website visitors and job applicants.</p>

      <h2>2. Information we collect</h2>
      <h3>Account and contact data</h3>
      <p>Name, email, telephone number, address, digital address, profile information, account credentials and communications.</p>
      <h3>KYC, identity and CSD data</h3>
      <p>Date and place of birth, nationality and residency, occupation, tax and FATCA information, Ghana Card number and front/back images, passport details and passport bio-data page when resident abroad, chest-up photograph, drawn or uploaded signature, declarations, next-of-kin details and generated KYC/CSD forms.</p>
      <h3>Financial and suitability data</h3>
      <p>Bank account details, source of funds, investment objectives, experience, risk tolerance, investment horizon and intended activity. Please provide another person’s information, such as next-of-kin details, only where you are authorised to do so and have informed them.</p>
      <h3>Service and technical data</h3>
      <p>Application progress, status, submission and review timestamps, documents accessed, sign-in and security events, IP address, browser/device information, pages visited and cookie choices. We collect optional analytics only after consent.</p>

      <h2>3. Why we use personal data</h2>
      <ul>
        <li>To register users, save onboarding progress and provide secure client access.</li>
        <li>To verify identity, conduct KYC, anti-money-laundering, sanctions, fraud and suitability checks.</li>
        <li>To prepare CSD/KYC forms, assess and administer account applications, and show review status.</li>
        <li>To provide brokerage, Primary Dealer, research, advisory and related investment services.</li>
        <li>To communicate service, security, application and regulatory updates.</li>
        <li>To comply with Ghanaian financial-services, tax, data-protection, record-keeping and lawful reporting duties.</li>
        <li>To improve website performance and understand usage where you consent to analytics.</li>
      </ul>
      <p>We process data where necessary to take steps at your request, perform a contract, meet legal and regulatory obligations, protect legitimate business and security interests, or where you have given consent.</p>

      <h2>4. How onboarding information is handled</h2>
      <p>Draft answers and uploads are saved so you can return later. On submission, filled CSD and KYC PDFs and supporting files are stored in restricted storage and provided to authorised back-office personnel. The application package and timeline are sent to <a href="mailto:trading@constantcap.com.gh">trading@constantcap.com.gh</a> for manual processing on the relevant CSD or operating platform. Clients can securely view their own progress and documents; authorised administrators can review applications and update status.</p>

      <h2>5. Sharing and service providers</h2>
      <p>We may share relevant data with authorised Constant Capital staff; CSD, exchanges, issuers, banks, settlement and trading partners; identity, compliance and fraud-screening providers; professional advisers and auditors; technology, cloud-storage, authentication, email and analytics providers; and regulators, law-enforcement or public authorities where legally required.</p>
      <p>We do not sell personal data. Providers may process data only for authorised purposes and under appropriate confidentiality and security obligations.</p>

      <h2>6. Linked trading platforms</h2>
      <p>The Constrade secondary-market app and Primary Dealership portal are linked services. Information you submit directly on those platforms is also governed by the privacy notice shown there. We encourage you to review it before use.</p>

      <h2>7. International transfers</h2>
      <p>Some technology providers may process or store data outside Ghana. Where this occurs, we use contractual, organisational and technical safeguards appropriate to applicable law and the sensitivity of the information.</p>

      <h2>8. Retention</h2>
      <p>We retain information only as long as needed for onboarding, client service, security, dispute management and legal or regulatory record-keeping. KYC, transaction and account records may need to be retained after an application is withdrawn or an account closes. Deletion requests cannot override a lawful retention, reporting, investigation or legal-hold obligation.</p>

      <h2>9. Security</h2>
      <p>We use access controls, private file storage, time-limited document links, authentication, logging and other organisational and technical safeguards. No internet transmission or storage method is completely secure. Contact us immediately if you suspect unauthorised access.</p>

      <h2>10. Your rights</h2>
      <p>Subject to applicable law, you may ask to access, correct or update your data; object to or restrict certain processing; withdraw consent for future optional processing; request portability where applicable; or request deletion where no legal retention duty applies. We may need to verify your identity before acting.</p>

      <h2>11. Cookies and analytics</h2>
      <p>Essential browser storage supports sign-in, security, preferences and saved service state. Google Analytics is optional and is loaded only after you accept analytics cookies. See our <a href="/cookie-policy">Cookie Policy</a> for details and controls.</p>

      <h2>12. Updates and contact</h2>
      <p>We may update this Policy when our services or legal obligations change. The effective date above identifies the current version.</p>
      <address className="not-italic">Constant Capital (Ghana) Limited<br />6 Tanbu Link, East Legon, Accra, Ghana<br />Privacy enquiries: <a href="mailto:info@constantcapital.com.gh">info@constantcapital.com.gh</a><br />Phone: <a href="tel:+233302500386">+233 302 500 386</a></address>
      <p><strong>Compliance note:</strong> Constant Capital’s legal, compliance or data-protection adviser should confirm this notice against current registrations, retention schedules and vendor contracts.</p>
    </LegalPage>
  );
};

export default PrivacyPolicy;