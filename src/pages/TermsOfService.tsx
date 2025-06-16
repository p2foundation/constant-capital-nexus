
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggler from '@/components/ThemeToggler';

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Navbar />
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggler />
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-12 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cc-navy dark:text-white">Terms of Service</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
              <p>Welcome to Constant Capital (Ghana) Limited. These Terms of Service govern your use of our website, services, and products. By accessing or using our services, you agree to be bound by these Terms.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">2. Definitions</h2>
              <p>"Constant Capital", "we", "us", or "our" refers to Constant Capital (Ghana) Limited, a company registered in Ghana and licensed by the Securities and Exchange Commission of Ghana (SEC License: SD-001/15).</p>
              <p>"Services" refers to any financial services, investment advice, brokerage services, research reports, or other services provided by Constant Capital.</p>
              <p>"Client" or "you" refers to any individual or entity that uses our services or visits our website.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">3. Services</h2>
              <p>Constant Capital provides investment brokerage services, including but not limited to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Securities trading (equities, fixed income, eurobonds)</li>
                <li>Investment advisory services</li>
                <li>Research and market analysis</li>
                <li>Wealth management</li>
              </ul>
              <p>All services are provided in accordance with the laws and regulations of Ghana and subject to oversight by the Securities and Exchange Commission of Ghana.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">4. Account Registration</h2>
              <p>To access certain services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
              <p>You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">5. Investment Risks</h2>
              <p>All investments involve risk, including the possible loss of principal. The value of investments may fluctuate and can go down as well as up. Past performance is not indicative of future results.</p>
              <p>Before making any investment, you should carefully consider your investment objectives, level of experience, and risk appetite. If necessary, seek professional advice.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">6. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Constant Capital shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, resulting from your use of our services.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">7. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website. Your continued use of our services after changes have been made constitutes your acceptance of the revised Terms.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">8. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of Ghana. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Ghana.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">9. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
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

export default TermsOfService;
