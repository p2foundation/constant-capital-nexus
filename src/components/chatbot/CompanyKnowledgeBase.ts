export interface CompanyKnowledge {
  category: string;
  keywords: string[];
  response: string;
  requiresHumanFollowup?: boolean;
}

export const constantCapitalKnowledge: CompanyKnowledge[] = [
  {
    category: "company_overview",
    keywords: ["about", "company", "who are you", "what do you do", "what does the company do", "constant capital", "overview", "history"],
    response: "Constant Capital is Ghana's premier SEC-licensed investment brokerage firm. We provide comprehensive financial services including:\n\n• Securities trading on the Ghana Stock Exchange (GSE)\n• Investment research and market analysis\n• Strategic advisory services\n• Capital markets solutions\n• Private equity investments\n• Investment advisory services\n\nWe serve institutional and corporate clients with expert financial guidance across Ghana and African markets, helping them achieve their investment objectives through our professional services.",
    requiresHumanFollowup: false
  },
  {
    category: "services_trading",
    keywords: ["trading", "securities", "gse", "ghana stock exchange", "stocks", "equities"],
    response: "Our Securities Trading services provide access to the Ghana Stock Exchange and other African markets with competitive commission rates. We serve institutional and corporate clients with professional trading execution, market making, and liquidity provision. Our trading desk operates during GSE hours and provides real-time market access.",
    requiresHumanFollowup: true
  },
  {
    category: "services_research",
    keywords: ["research", "analysis", "reports", "market intelligence", "insights"],
    response: "Our Investment Research team provides comprehensive market intelligence and analysis across Ghana and African markets. We publish regular equity research reports, sector analysis, macroeconomic insights, and investment recommendations. Our research covers GSE-listed companies, fixed income securities, and market trends.",
    requiresHumanFollowup: true
  },
  {
    category: "services_advisory",
    keywords: ["advisory", "investment advice", "portfolio", "wealth management", "financial planning"],
    response: "Our Investment Advisory services offer tailored investment strategies and portfolio management for institutional clients and high-net-worth individuals. We provide personalized financial planning, asset allocation guidance, and ongoing portfolio monitoring to help clients achieve their investment objectives.",
    requiresHumanFollowup: true
  },
  {
    category: "services_strategic",
    keywords: ["strategic advisory", "mergers", "acquisitions", "m&a", "corporate finance", "restructuring"],
    response: "Our Strategic Advisory team provides expert guidance on mergers & acquisitions, corporate restructuring, capital raising, and strategic business initiatives. We help companies navigate complex transactions and strategic decisions across various sectors in Ghana and Africa.",
    requiresHumanFollowup: true
  },
  {
    category: "services_capital_markets",
    keywords: ["capital markets", "debt", "equity", "fundraising", "ipo", "bond issuance"],
    response: "Our Capital Markets division provides comprehensive capital raising solutions through debt and equity offerings. We have specialized expertise in African capital markets and help companies access funding through IPOs, bond issuances, and private placements.",
    requiresHumanFollowup: true
  },
  {
    category: "services_private_equity",
    keywords: ["private equity", "growth capital", "alternative investments", "venture capital"],
    response: "Our Private Equity services focus on alternative investment solutions, providing growth capital for promising businesses across key sectors in Ghana and Africa. We identify and invest in high-potential companies while providing strategic guidance for growth.",
    requiresHumanFollowup: true
  },
  {
    category: "account_opening",
    keywords: ["account", "open account", "registration", "onboarding", "new client"],
    response: "Opening an account with Constant Capital is straightforward. You'll need to complete our application form, provide identification documents, and make an initial deposit. The process typically takes 3-5 business days once all documents are submitted. We have different account types for individual and institutional clients.",
    requiresHumanFollowup: true
  },
  {
    category: "fees_commissions",
    keywords: ["fees", "commission", "charges", "pricing", "costs", "rates"],
    response: "Our fee structure varies depending on the services you require. We offer competitive rates for trading (typically 0.5-1.5% for securities trading), advisory services (based on assets under management), and transaction-based fees for capital markets activities. For detailed fee information specific to your needs, I'd recommend speaking with our team.",
    requiresHumanFollowup: true
  },
  {
    category: "contact_info",
    keywords: ["contact", "phone", "email", "address", "location", "office"],
    response: "You can reach Constant Capital through multiple channels:\n📧 Email: info@constantcapital.com\n📞 Phone: +233 20 000 0000\n🏢 Office: Accra, Ghana\n⏰ Business Hours: Monday-Friday, 8:00 AM - 5:00 PM (GMT)\n\nFor investment-related inquiries, I can also connect you with our investment team.",
    requiresHumanFollowup: false
  },
  {
    category: "market_data",
    keywords: ["market", "gse index", "stock prices", "market data", "performance"],
    response: "I can provide general market information, but for real-time market data and specific stock prices, I recommend checking our market data section or speaking with our research team. We track GSE performance, sector indices, and provide regular market updates.",
    requiresHumanFollowup: true
  },
  {
    category: "regulatory",
    keywords: ["sec", "regulated", "license", "compliance", "regulatory"],
    response: "Constant Capital is fully licensed and regulated by the Securities and Exchange Commission (SEC) of Ghana. We maintain strict compliance with all regulatory requirements and follow international best practices in our operations. Our regulatory status ensures client protection and operational integrity.",
    requiresHumanFollowup: false
  }
];

export const findBestMatch = (userMessage: string): CompanyKnowledge | null => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Find the knowledge item with the most keyword matches
  let bestMatch: CompanyKnowledge | null = null;
  let maxMatches = 0;
  
  for (const knowledge of constantCapitalKnowledge) {
    const matches = knowledge.keywords.filter(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    ).length;
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = knowledge;
    }
  }
  
  // Require at least one keyword match
  return maxMatches > 0 ? bestMatch : null;
};
