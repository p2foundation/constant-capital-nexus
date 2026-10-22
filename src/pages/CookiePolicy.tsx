import React from 'react';
import LegalPage from '@/components/legal/LegalPage';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';

const CookiePolicy = () => {
  useAnalytics();
  const openPreferences = () => window.dispatchEvent(new Event('show-cookie-preferences'));

  return (
    <LegalPage title="Cookie Policy" description="How Constant Capital uses essential browser storage and consent-based Google Analytics.">
      <p>This Policy explains how Constant Capital (Ghana) Limited uses cookies and similar browser technologies on this website. Our onboarding and client services remain available when you decline optional analytics.</p>

      <h2>1. What cookies and similar technologies are</h2>
      <p>Cookies are small text files stored by a website in your browser. We may also use local storage and comparable technologies to remember settings or maintain service state. First-party technologies are set for our website; third-party technologies are provided by another service, such as Google Analytics.</p>

      <h2>2. Categories we use</h2>
      <h3>Essential storage</h3>
      <p>Essential technologies support account sign-in, authentication security, theme preferences, saved application state and your cookie choice. They are required to provide features you request and cannot be disabled through our consent notice. You can block them in your browser, but account opening, KYC tracking or other secure features may stop working.</p>

      <h3>Optional analytics</h3>
      <p>With your consent, we use Google Analytics (measurement ID G-61N6JDY12W) to understand visits, page use and interactions so we can improve the website. Google may receive device/browser information, truncated or derived location information, referring pages and interaction events. We do not intentionally send Ghana Card images, passports, signatures, bank details or completed KYC form contents to analytics.</p>
      <p>Google Analytics does not load until you select “Accept analytics”. If you select “Essential only”, optional analytics remains off.</p>

      <h3>Marketing cookies</h3>
      <p>We do not currently activate advertising or behavioural-marketing cookies through this website’s consent control. If this changes, we will update this Policy and request any consent required before activating them.</p>

      <h2>3. Your choice</h2>
      <p>You may accept or decline optional analytics. Your choice is stored in your browser until you clear site data or change it below. Declining does not prevent access to public pages or essential client services.</p>
      <Button type="button" onClick={openPreferences}>Review cookie choice</Button>

      <h2>4. Browser controls and retention</h2>
      <p>You can delete or block cookies through your browser settings. Browser controls vary by provider. Essential authentication storage generally lasts for the session or until sign-out/expiry; preference storage lasts until removed; analytics retention is governed by our Google Analytics configuration and applicable Google terms.</p>

      <h2>5. Third-party platforms</h2>
      <p>The Constrade secondary-market web app and Primary Dealership portal may use their own cookies and browser storage. Their notices and controls apply when you visit those platforms.</p>

      <h2>6. Updates and contact</h2>
      <p>We may update this Policy when technologies, vendors or legal requirements change. The effective date above identifies the current version.</p>
      <address className="not-italic">Constant Capital (Ghana) Limited<br />6 Tanbu Link, East Legon, Accra, Ghana<br />Email: <a href="mailto:info@constantcapital.com.gh">info@constantcapital.com.gh</a><br />Phone: <a href="tel:+233302500386">+233 302 500 386</a></address>
    </LegalPage>
  );
};

export default CookiePolicy;