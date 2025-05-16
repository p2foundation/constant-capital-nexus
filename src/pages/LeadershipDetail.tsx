
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface LeaderDetail {
  id: string;
  name: string;
  title: string;
  imageSrc: string;
  bio: string;
  education?: string;
  experience?: string[];
  achievements?: string[];
}

const LeadershipDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // This would ideally come from an API or database
  const leaderData: Record<string, LeaderDetail> = {
    "ekua-hayfron-benjamin": {
      id: "ekua-hayfron-benjamin",
      name: "Ekua Hayfron-Benjamin",
      title: "Chairperson",
      imageSrc: "/lovable-uploads/59ba9224-f341-46e3-94c7-e53605f6be68.png",
      bio: "Ekua is a Senior Partner at Ashong Benjamin & Associates, a leading Ghanaian law firm. Prior to participating in the establishment of Ashong Benjamin & Associates, she was a partner in Reindorf Chambers where she participated in numerous projects involving equity and loan investment transactions in, inter alia, the banking, energy and mining sectors. She regularly supervised the conduct of legal due diligence exercises and the preparation of due diligence reports.\n\nShe has extensive experience in project finance transactions, banking, power, and natural resources law providing legal support to a number of banks, mining companies, and other entities in their operations and transactions. She has provided advice to major consumers of power in relation to their power purchase and transmission agreements and recently advised a major African bank in their financing of a Ghana power producer.\n\nShe played a major role in the provision of advice to the lenders to Kosmos Energy on Ghanaian law matters in relation to the financing of the development of the Jubilee Oil Fields as well as to a major international bank in respect of the financing of the construction and development of a seawater desalination plant in Accra. Her work has taken her into a variety of other areas including sports law and real estate law.",
      education: "LLB, University of Ghana; BL, Ghana School of Law; LLM, Harvard Law School",
      experience: [
        "Senior Partner at Ashong Benjamin & Associates",
        "Partner at Reindorf Chambers",
        "Legal Advisor to multiple financial institutions and energy companies"
      ],
      achievements: [
        "Advised on the financing of the development of the Jubilee Oil Fields",
        "Advised on the financing of a seawater desalination plant in Accra",
        "Expertise in project finance, banking, power, and natural resources law"
      ]
    },
    "ben-ahiaglo": {
      id: "ben-ahiaglo",
      name: "Ben Ahiaglo",
      title: "Managing Director",
      imageSrc: "/lovable-uploads/d6c6d4c9-dd0e-488b-a267-64e2fe8ca8a6.png",
      bio: "Ben has extensive experience in investment banking and capital markets across Africa. He previously led the Securities Trading division at a major regional financial institution and holds a Masters in Finance from London Business School.",
      education: "Masters in Finance, London Business School; BA Economics, University of Cape Town",
      experience: [
        "Head of Securities Trading, Regional Financial Services Group (2014-2021)",
        "Vice President, Investment Banking at African Development Bank (2010-2014)",
        "Associate, Goldman Sachs International (2007-2010)"
      ],
      achievements: [
        "Led over $500 million in capital raising transactions across Africa",
        "Developed innovative trading platforms for frontier markets",
        "Advisor to multiple African governments on capital markets development"
      ]
    },
    "kofi-apenteng": {
      id: "kofi-apenteng",
      name: "Kofi Apenteng",
      title: "Director",
      imageSrc: "/lovable-uploads/d6c6d4c9-dd0e-488b-a267-64e2fe8ca8a6.png",
      bio: "Kofi brings deep expertise in risk management and corporate governance. He serves on multiple boards across the financial services industry and is a Chartered Financial Analyst with over 20 years of industry experience.",
      education: "CFA Charterholder; MSc Risk Management, NYU; BSc Accounting, University of Ghana",
      experience: [
        "Chief Risk Officer, Premier Commercial Bank (2012-2021)",
        "Risk Advisory Partner, Big Four Consulting (2008-2012)",
        "Senior Manager, Central Bank of Ghana (2002-2008)"
      ],
      achievements: [
        "Developed risk frameworks adopted by multiple financial institutions",
        "Advisor to the African Union on financial stability measures",
        "Member of International Risk Management Association"
      ]
    },
    "ike-echeruo": {
      id: "ike-echeruo",
      name: "Ike Echeruo",
      title: "Director",
      imageSrc: "/lovable-uploads/d6c6d4c9-dd0e-488b-a267-64e2fe8ca8a6.png",
      bio: "A seasoned investment professional with expertise in private equity and venture capital. Ike previously founded a successful fintech company and holds degrees in Economics and Computer Science from MIT.",
      education: "BSc Economics and Computer Science, MIT; MBA, Harvard Business School",
      experience: [
        "Founder & CEO, FinTech Solutions Ltd (2013-2020)",
        "Managing Director, African Venture Capital Partners (2009-2013)",
        "Investment Associate, Morgan Stanley (2006-2009)"
      ],
      achievements: [
        "Successfully exited fintech startup with 10x return to investors",
        "Named in Forbes 40 under 40 Africa list",
        "Raised over $100 million for African tech startups"
      ]
    },
    "kwame-agyire-tettey": {
      id: "kwame-agyire-tettey",
      name: "Kwame Agyire-Tettey",
      title: "Director",
      imageSrc: "/lovable-uploads/d6c6d4c9-dd0e-488b-a267-64e2fe8ca8a6.png",
      bio: "Kwame specializes in financial regulation and compliance across African markets. He previously worked at the Central Bank and brings valuable regulatory insight to the board. He holds a PhD in Economics from the University of Ghana.",
      education: "PhD Economics, University of Ghana; MSc Financial Regulation, London School of Economics",
      experience: [
        "Director of Regulatory Affairs, Central Bank of Ghana (2010-2019)",
        "Economic Advisor, Ministry of Finance (2007-2010)",
        "Assistant Professor, University of Ghana Business School (2005-2007)"
      ],
      achievements: [
        "Authored key financial regulations adopted by multiple West African nations",
        "Represented Ghana in international financial regulatory forums",
        "Published researcher with focus on developing market financial systems"
      ]
    }
  };

  const leader = id ? leaderData[id] : null;

  if (!leader) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 flex-grow">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Leader not found</h2>
            <Button asChild>
              <Link to="/leadership">Back to Leadership</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-16 flex-grow">
        <div className="container mx-auto px-4 py-12">
          <Link to="/leadership" className="inline-flex items-center text-cc-navy hover:text-cc-gold mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leadership
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-lg shadow-lg mb-6">
                <img 
                  src={leader.imageSrc} 
                  alt={leader.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-cc-navy mb-2">{leader.name}</h1>
              <p className="text-cc-gold font-medium text-xl mb-6">{leader.title}</p>
              
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold text-cc-navy mb-3">Biography</h2>
                {leader.bio.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-6 text-gray-700">{paragraph}</p>
                ))}
                
                {leader.education && (
                  <>
                    <h2 className="text-2xl font-semibold text-cc-navy mb-3">Education</h2>
                    <p className="mb-6 text-gray-700">{leader.education}</p>
                  </>
                )}
                
                {leader.experience && leader.experience.length > 0 && (
                  <>
                    <h2 className="text-2xl font-semibold text-cc-navy mb-3">Professional Experience</h2>
                    <ul className="list-disc pl-5 mb-6">
                      {leader.experience.map((exp, idx) => (
                        <li key={idx} className="mb-2 text-gray-700">{exp}</li>
                      ))}
                    </ul>
                  </>
                )}
                
                {leader.achievements && leader.achievements.length > 0 && (
                  <>
                    <h2 className="text-2xl font-semibold text-cc-navy mb-3">Key Achievements</h2>
                    <ul className="list-disc pl-5">
                      {leader.achievements.map((achievement, idx) => (
                        <li key={idx} className="mb-2 text-gray-700">{achievement}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <Separator className="my-12" />
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cc-navy mb-6">Contact Information</h2>
            <p className="text-gray-700">To contact {leader.name}, please reach out to our corporate office.</p>
            <Button asChild className="mt-6">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LeadershipDetail;
