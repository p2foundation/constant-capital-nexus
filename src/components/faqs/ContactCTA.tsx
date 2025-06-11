
import React from 'react';

const ContactCTA = () => {
  return (
    <div className="mt-12 bg-cc-navy text-white p-8 rounded-lg text-center">
      <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
      <p className="mb-6">
        Can't find the answer you're looking for? Our team is here to help.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <a
          href="tel:+233302500386"
          className="bg-cc-gold hover:bg-yellow-600 text-cc-navy font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Call Us: +233 302 500 386
        </a>
        <a
          href="mailto:info@constantcapital.com.gh"
          className="border border-white text-white hover:bg-white hover:text-cc-navy font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Email: info@constantcapital.com.gh
        </a>
      </div>
    </div>
  );
};

export default ContactCTA;
