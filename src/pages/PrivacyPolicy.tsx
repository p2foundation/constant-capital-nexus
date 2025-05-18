
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggler from '@/components/ThemeToggler';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Navbar />
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggler />
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cc-navy dark:text-white">Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <p>Last Updated: {new Date().toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p>At Constant Capital (Ghana) Limited, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us, such as:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Personal identification information (name, address, email, phone number)</li>
                <li>Financial information (investment preferences, bank account details)</li>
                <li>Know Your Client (KYC) information as required by Ghanaian regulations</li>
                <li>Communications you send to us</li>
              </ul>
              <p>We also collect information automatically when you use our website, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information</li>
                <li>Cookie and tracking technology data</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">2. How We Use Your Information</h2>
              <p>We use your information for various purposes, including to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Verify your identity and prevent fraud</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Comply with legal obligations and regulatory requirements</li>
                <li>Analyze usage patterns and trends</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">3. Information Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Service providers who perform services on our behalf</li>
                <li>Financial institutions and trading partners to facilitate transactions</li>
                <li>Professional advisors (lawyers, accountants, auditors)</li>
                <li>Regulatory authorities, when required by law</li>
                <li>Third parties in connection with a business transfer (merger, acquisition)</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">4. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">5. Your Rights</h2>
              <p>Depending on applicable law, you may have rights regarding your personal data, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access to personal information we hold about you</li>
                <li>Correction of inaccurate or incomplete data</li>
                <li>Deletion of your data in certain circumstances</li>
                <li>Restriction of processing in certain circumstances</li>
                <li>Data portability</li>
                <li>Objection to processing based on legitimate interests</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">6. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">7. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <address className="not-italic">
                Constant Capital (Ghana) Limited<br />
                6 Tanbu Lane, East Legon<br />
                Accra, Ghana<br />
                Email: info@constantcapital.com.gh<br />
                Phone: +233 302 738 242
              </address>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
