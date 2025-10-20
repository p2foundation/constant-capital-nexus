import { TeamMemberProps } from '@/components/private-equity/types';
import johnImage from '@/assets/team/john-ebow-gaisie.jpg';
import harrietImage from '@/assets/team/harriet-boadu.jpg';
import stephenImage from '@/assets/team/stephen-missah.jpg';

export const privateEquityTeam: TeamMemberProps[] = [
  {
    id: "john-ebow-gaisie",
    name: "John Ebow Gaisie",
    title: "Head of Private Equity",
    imageSrc: johnImage,
    bio: "John Ebow Gaisie brings over 15 years of distinguished experience in private equity and investment banking across African markets. As Head of Private Equity at Constant Capital, he leads the firm's investment strategy and portfolio management initiatives, focusing on identifying and nurturing high-potential businesses across key sectors in Ghana and broader African markets.",
    education: "MBA in Finance, London Business School; BSc. Economics, University of Ghana",
    experience: [
      "Head of Private Equity at Constant Capital Securities (2019-Present)",
      "Senior Investment Manager at Africa Capital Partners (2016-2019)",
      "Investment Analyst at Standard Bank Group (2013-2016)",
      "Associate at Barclays Investment Bank, London (2010-2013)",
      "Financial Analyst at Ghana Commercial Bank (2008-2010)"
    ],
    achievements: [
      "Led over $150 million in private equity investments across 12 portfolio companies",
      "Successfully exited 5 investments with average IRR of 28%",
      "Recipient of African Private Equity Excellence Award 2022",
      "Guest lecturer at University of Ghana Business School",
      "Board member of 8 portfolio companies across healthcare, fintech, and consumer sectors"
    ],
    specializations: [
      "Growth Capital Investments",
      "Cross-border Transactions",
      "Financial Services Sector",
      "Portfolio Company Management",
      "ESG Integration"
    ]
  },
  {
    id: "harriet-boadu",
    name: "Harriet Boadu",
    title: "Investment Trader",
    imageSrc: harrietImage,
    bio: "Harriet Boadu is a seasoned investment professional with deep expertise in financial services and consumer sectors. With a focus on operational improvements and value creation, she plays a pivotal role in identifying investment opportunities and supporting portfolio companies in achieving operational excellence and sustainable growth.",
    education: "MSc. Finance & Investment, University of Cape Coast; BSc. Business Administration, Kwame Nkrumah University of Science and Technology",
    experience: [
      "Investment Trader at Constant Capital Securities (2018-Present)",
      "Senior Investment Analyst at Cal Bank Investment Banking (2015-2018)",
      "Investment Associate at IC Securities (2012-2015)",
      "Research Analyst at Databank Financial Services (2010-2012)",
      "Junior Analyst at SIC Financial Services (2008-2010)"
    ],
    achievements: [
      "Managed investment portfolios worth over $75 million",
      "Led due diligence processes for 15+ investment opportunities",
      "Achieved 95% accuracy rate in investment recommendations over 5 years",
      "Certified Financial Risk Manager (FRM) designation",
      "Winner of Ghana Investment Excellence Award 2021"
    ],
    specializations: [
      "Financial Services Investments",
      "Consumer Sector Analysis",
      "Operational Due Diligence",
      "Risk Management",
      "Market Research & Analysis"
    ]
  },
  {
    id: "stephen-missah",
    name: "Stephen Missah",
    title: "Head of Trading",
    imageSrc: stephenImage,
    bio: "Stephen Missah specializes in healthcare investments and digital transformation strategies, bringing unique expertise in identifying and scaling technology-driven solutions in traditional sectors. His deep understanding of healthcare markets and digital innovation makes him instrumental in the firm's investment approach to transformative businesses.",
    education: "MSc. Healthcare Management, University of Ghana; BSc. Computer Science, University of Cape Coast; Executive Certificate in Digital Transformation, MIT Sloan",
    experience: [
      "Head of Trading at Constant Capital Securities (2020-Present)",
      "Senior Healthcare Investment Analyst at Helios Investment Partners (2017-2020)",
      "Investment Manager at Development Bank of Ghana (2014-2017)",
      "Technology Consultant at Deloitte Ghana (2011-2014)",
      "Software Developer at IBM Ghana (2009-2011)"
    ],
    achievements: [
      "Led investments in 3 healthcare companies with combined value of $45 million",
      "Spearheaded digital transformation initiatives across 6 portfolio companies",
      "Published 12 research papers on healthcare investment in Africa",
      "Mentor at Ghana Tech Entrepreneurship Program",
      "Board advisor to 4 healthcare technology startups"
    ],
    specializations: [
      "Healthcare Investments",
      "Digital Transformation",
      "Technology Integration",
      "Healthcare IT Systems",
      "Strategic Planning"
    ]
  }
];