
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggler from '@/components/ThemeToggler';

const CookiePolicy = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Navbar />
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggler />
      </div>
      
      <main className="flex-1 container mx-auto px-6 py-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cc-navy dark:text-white">Cookie Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <p>Last Updated: {new Date().toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p>This Cookie Policy explains how Constant Capital (Ghana) Limited uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">1. What Are Cookies?</h2>
              <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
              <p>Cookies set by the website owner (in this case, Constant Capital) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">2. Types of Cookies We Use</h2>
              <p>We use several types of cookies for different purposes:</p>
              
              <h3 className="text-lg font-bold mt-4 mb-2">Essential Cookies</h3>
              <p>These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You may disable these by changing your browser settings, but this may affect how the website functions.</p>
              
              <h3 className="text-lg font-bold mt-4 mb-2">Performance and Analytics Cookies</h3>
              <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve the way our website works.</p>
              
              <h3 className="text-lg font-bold mt-4 mb-2">Functionality Cookies</h3>
              <p>These cookies enable enhanced functionality and personalization, such as remembering your preferences. They may be set by us or third-party providers whose services we have added to our pages.</p>
              
              <h3 className="text-lg font-bold mt-4 mb-2">Marketing Cookies</h3>
              <p>These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other websites.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">3. How to Control Cookies</h2>
              <p>You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">4. Changes to This Cookie Policy</h2>
              <p>We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">5. Contact Us</h2>
              <p>If you have any questions about our use of cookies or other technologies, please contact us at:</p>
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

export default CookiePolicy;
