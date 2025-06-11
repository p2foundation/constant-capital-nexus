
import React from 'react';
import { Building, ArrowRight } from 'lucide-react';

const IndustryExpertiseSection = () => {
  const industries = [
    {
      title: "Financial Services",
      description: "Extensive experience advising banks, insurance companies, and fintech firms on strategic initiatives and transactions.",
      services: [
        "Bank mergers and acquisitions",
        "Insurance company restructuring",
        "Fintech growth strategies"
      ]
    },
    {
      title: "Energy & Resources",
      description: "Strategic advisory for traditional energy companies, renewable energy projects, and mining operations.",
      services: [
        "Oil and gas asset transactions",
        "Renewable energy market entry",
        "Mining company restructuring"
      ]
    },
    {
      title: "Consumer & Retail",
      description: "Advisory services for consumer goods companies, retailers, and e-commerce businesses.",
      services: [
        "Retail expansion strategies",
        "Consumer brand acquisitions",
        "E-commerce transformation"
      ]
    },
    {
      title: "Technology & Telecom",
      description: "Strategic guidance for technology companies, telecom operators, and media businesses.",
      services: [
        "Tech company growth strategies",
        "Telecom infrastructure transactions",
        "Digital media partnerships"
      ]
    },
    {
      title: "Healthcare & Pharma",
      description: "Advisory services for healthcare providers, pharmaceutical companies, and medical device manufacturers.",
      services: [
        "Hospital group consolidation",
        "Pharmaceutical market entry",
        "Healthcare innovation strategies"
      ]
    },
    {
      title: "Agriculture & Food",
      description: "Strategic guidance for agricultural businesses, food processors, and agtech companies.",
      services: [
        "Agribusiness expansion",
        "Food processing integration",
        "Sustainable agriculture ventures"
      ]
    }
  ];

  return (
    <div className="my-16 bg-gray-50 p-8 rounded-lg dark:bg-gray-800">
      <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Industry Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((industry, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center mb-4">
              <Building className="h-6 w-6 text-cc-gold mr-2" />
              <h3 className="text-lg font-bold text-cc-navy dark:text-white">{industry.title}</h3>
            </div>
            <p className="text-gray-600 mb-4 dark:text-gray-300">
              {industry.description}
            </p>
            <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
              {industry.services.map((service, serviceIndex) => (
                <li key={serviceIndex} className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryExpertiseSection;
