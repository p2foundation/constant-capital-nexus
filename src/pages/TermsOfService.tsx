import React from 'react';
import LegalPage from '@/components/legal/LegalPage';
import { useAnalytics } from '@/hooks/useAnalytics';

const TermsOfService = () => {
  useAnalytics();
  return (
    <LegalPage title="Terms of Service" description="Terms governing Constant Capital's website, digital onboarding, securities trading and Primary Dealer services.">
      <p>These Terms govern your use of Constant Capital (Ghana) Limited’s website, online account-opening services, research, calculators, client account and links to our trading platforms. By using these services, you agree to these Terms.</p>

      <h2>1. About Constant Capital</h2>
      <p>“Constant Capital”, “we”, “us” and “our” mean Constant Capital (Ghana) Limited, a company registered in Ghana and licensed by the Securities and Exchange Commission of Ghana. “You” means an individual, institution or representative using our services.</p>

      <h2>2. Our services</h2>
      <p>Our services include securities brokerage, licensed Primary Dealer services, fixed-income and equity market access, foreign exchange, investment research, investment and strategic advisory, capital-markets services, calculators and digital client onboarding.</p>
      <p>Eligible individuals and institutions may participate in relevant Government of Ghana securities through our Primary Dealer service. Access remains subject to completed onboarding, applicable market rules, product eligibility, available offerings and our acceptance of your instructions.</p>

      <h2>3. Registration, KYC and CSD onboarding</h2>
      <p>You must provide accurate, current and complete information. The digital process may require personal, contact, employment, investment-profile, tax-residency and bank information; Ghana Card details and front/back images; a chest-up photograph; a passport and passport bio-data page for applicants resident abroad; and a drawn or uploaded signature.</p>
      <p>Your progress may be saved before submission. Once complete, the service generates KYC and CSD documents, sends the application and attachments to our authorised back-office team, and allows you to track whether it is in progress, submitted, under review, approved or requires attention. Digital submission does not guarantee account approval or CSD creation. We may request clarification, additional documents or original copies.</p>

      <h2>4. Your account and security</h2>
      <p>You are responsible for protecting your sign-in credentials, keeping your contact information current and promptly reporting suspected unauthorised access. You must not impersonate another person, upload unlawful or malicious material, interfere with the service, or attempt to access another client’s information.</p>

      <h2>5. Trading platforms and external services</h2>
      <p>After successful onboarding, we may direct you to the Constant Capital secondary-market web app at <a href="https://trading.constantcap.com.gh" target="_blank" rel="noreferrer">trading.constantcap.com.gh</a> and the Primary Dealership portal at <a href="https://auction.constantcap.com.gh" target="_blank" rel="noreferrer">auction.constantcap.com.gh</a>.</p>
      <p>Linked platforms may have additional terms, privacy notices, operating hours and transaction rules. A link does not guarantee availability, execution, allocation or price. If a linked platform’s terms conflict with these website Terms for a transaction, the transaction-specific terms apply.</p>

      <h2>6. Instructions, market data and calculators</h2>
      <p>You are responsible for reviewing transaction details before submitting instructions. Market data may be delayed, corrected, unavailable or supplied by third parties. Calculators and research are for information only; outputs depend on the inputs and assumptions used and are not a quotation, guarantee or personal recommendation.</p>

      <h2>7. Investment risk and no guarantee</h2>
      <p>Investments involve risk, including loss of capital, price volatility, liquidity risk, issuer or sovereign risk, currency risk and settlement risk. Past performance is not a reliable indicator of future results. Primary-market participation and allocations are not guaranteed. Consider your objectives, financial circumstances and risk tolerance, and obtain independent advice where appropriate.</p>

      <h2>8. Fees, taxes and third-party charges</h2>
      <p>Transactions may attract brokerage, exchange, CSD, regulatory, banking, tax or other charges. Applicable charges will be governed by the relevant mandate, tariff, transaction confirmation or law. You remain responsible for your tax obligations.</p>

      <h2>9. Intellectual property and acceptable use</h2>
      <p>Our website, branding, research and content are protected by intellectual-property laws. You may use them for personal or internal business purposes only, unless we give written permission. You may not scrape, resell, republish or use automated means to disrupt or commercially exploit the service.</p>

      <h2>10. Availability and liability</h2>
      <p>We aim to provide reliable services but do not promise uninterrupted or error-free access. To the extent permitted by Ghanaian law, we are not liable for indirect, incidental or consequential loss arising from outages, third-party systems, inaccurate user inputs, market events or unauthorised account use. Nothing in these Terms excludes liability that cannot lawfully be excluded.</p>

      <h2>11. Suspension and termination</h2>
      <p>We may restrict or suspend access to protect clients, comply with law, investigate misuse, address security threats or manage operational risk. Regulatory record-keeping duties may continue after an account closes.</p>

      <h2>12. Changes, law and complaints</h2>
      <p>We may update these Terms as services, technology or legal requirements change. Material changes will be posted here with a revised effective date. These Terms are governed by Ghanaian law and disputes are subject to the courts of Ghana, without limiting any complaint right available under applicable financial-services law.</p>

      <h2>13. Contact</h2>
      <address className="not-italic">Constant Capital (Ghana) Limited<br />6 Tanbu Link, East Legon, Accra, Ghana<br />Email: <a href="mailto:info@constantcapital.com.gh">info@constantcapital.com.gh</a><br />Account opening: <a href="mailto:trading@constantcap.com.gh">trading@constantcap.com.gh</a><br />Phone: <a href="tel:+233302500386">+233 302 500 386</a></address>
      <p><strong>Compliance note:</strong> These website Terms should be reviewed alongside Constant Capital’s client agreements, mandates and regulatory disclosures.</p>
    </LegalPage>
  );
};

export default TermsOfService;