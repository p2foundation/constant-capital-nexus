
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResearchDetailComponent from '@/components/ResearchDetail';
import ResearchDetailLoading from '@/components/research/ResearchDetailLoading';
import ResearchDetailError from '@/components/research/ResearchDetailError';
import ResearchDetailSidebar from '@/components/research/ResearchDetailSidebar';
import ResearchDetailNavigation from '@/components/research/ResearchDetailNavigation';
import { getReportById } from '@/hooks/research/reportFetching';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Book, AlertCircle } from 'lucide-react';

// Sample research data as fallback
const researchData = {
  'equity-analysis': {
    title: "Ghana Banking Sector Outlook 2025",
    type: "Equity Research",
    date: "April 22, 2025",
    preview: "This comprehensive report examines the outlook for Ghana's banking sector, analyzing regulatory changes, competitive dynamics, and growth opportunities in the post-pandemic era...",
    author: "Michael Osei, CFA",
    content: `
      <h2>Executive Summary</h2>
      <p>Ghana's banking sector has demonstrated remarkable resilience following the financial sector cleanup and subsequent COVID-19 pandemic. This report provides an in-depth analysis of the sector's current state and outlook for 2025.</p>
      
      <h2>Key Findings</h2>
      <ul>
        <li>Profitability metrics show improvement across major banks with Return on Equity (ROE) averaging 21.3% in Q1 2025</li>
        <li>Asset quality continues to improve with industry NPL ratio declining to 12.3% from 15.7% in 2024</li>
        <li>Digital transformation investments are yielding results with mobile banking transactions up 43% year-over-year</li>
        <li>Regulatory compliance costs remain elevated, creating competitive advantages for larger institutions</li>
      </ul>
      
      <h2>Sector Outlook</h2>
      <p>We maintain a positive outlook on Ghana's banking sector for 2025, driven by improving macroeconomic indicators, stabilized currency performance, and continuing digital transformation initiatives. The sector is expected to grow loans by 16.7% year-over-year, with deposit growth projected at 19.2%.</p>
      
      <h2>Investment Recommendations</h2>
      <p>Based on our analysis, we recommend OVERWEIGHT positions in the banking sector, with top picks including:</p>
      <ul>
        <li>GCB Bank - Target price: GHS 7.85 (22% upside)</li>
        <li>Ecobank Ghana - Target price: GHS 9.25 (17% upside)</li>
        <li>Standard Chartered Bank Ghana - Target price: GHS 28.50 (14% upside)</li>
      </ul>
    `,
    imageUrl: "/lovable-uploads/e22d9dd4-080e-4282-9260-ef03e98b4cb5.png"
  },
  'fixed-income-weekly': {
    title: "West African Fixed Income Weekly",
    type: "Fixed Income",
    date: "April 20, 2025",
    preview: "Our weekly fixed income report covers yield movements across West African sovereign bonds, highlighting investment opportunities in Ghana, Nigeria, and Côte d'Ivoire...",
    author: "Sarah Darko, Fixed Income Analyst",
    content: `
      <h2>Market Summary</h2>
      <p>West African sovereign bond yields showed mixed performance this week with Ghana's yields tightening while Nigerian yields widened slightly. Côte d'Ivoire's bonds remained relatively stable.</p>
      
      <h2>Ghana</h2>
      <p>Ghana's 2025 Eurobond yields compressed by 45bps to 7.25% following the announcement of the IMF's positive review of the country's economic reform program. Local currency treasury yields also declined across the curve with the 91-day bill dropping 15bps to 24.35%.</p>
      
      <h2>Nigeria</h2>
      <p>Nigerian sovereign yields increased by 22bps on average as investors reacted to the latest inflation data, which came in higher than consensus estimates. The 2029 Eurobond now yields 8.75%, up from 8.53% last week.</p>
      
      <h2>Côte d'Ivoire</h2>
      <p>Côte d'Ivoire bonds traded sideways with minimal yield movement. The 2032 Eurobond currently yields 5.62%, marginally lower than last week's 5.65%.</p>
      
      <h2>Investment Strategy</h2>
      <p>We maintain our overweight position on Ghanaian sovereign debt, particularly the mid-duration issues, as we expect continued yield compression supported by improving macroeconomic fundamentals and the successful IMF program implementation.</p>
    `,
    imageUrl: "/lovable-uploads/c6aad7a5-3482-484a-91dc-b2b0dadbb844.png",
    pdfUrl: "#"
  },
  'ghana-cedi-outlook': {
    title: "Ghana Cedi Outlook: Q2 2025",
    type: "FX Analysis",
    date: "April 15, 2025",
    preview: "An analysis of Ghana's currency performance, examining macroeconomic factors, central bank policies, and forecasting exchange rate movements against major currencies...",
    author: "Daniel Kwame, FX Strategist",
    content: `
      <h2>Executive Summary</h2>
      <p>The Ghana Cedi has demonstrated remarkable stability against major currencies during Q1 2025, appreciating 2.3% against the USD year-to-date. This report examines key drivers of recent performance and provides our outlook for Q2 2025.</p>
      
      <h2>Recent Performance</h2>
      <p>The GHS/USD exchange rate has moved from 15.25 at the beginning of the year to 14.90 as of March 31, 2025. This stability has been supported by:</p>
      <ul>
        <li>Improved foreign exchange reserves, currently standing at USD 7.2 billion (3.7 months of import cover)</li>
        <li>Strong cocoa export revenues due to favorable global prices</li>
        <li>Continued disbursements from the IMF Extended Credit Facility</li>
        <li>Proactive monetary policy management by the Bank of Ghana</li>
      </ul>
      
      <h2>Q2 2025 Outlook</h2>
      <p>We project the GHS/USD exchange rate to trade within a range of 14.75-15.10 during Q2 2025. Key factors that will influence performance include:</p>
      <ul>
        <li>Seasonal import demand patterns</li>
        <li>Oil price movements and implications for import bills</li>
        <li>Potential foreign investor interest in local currency debt</li>
        <li>Central bank intervention strategy</li>
      </ul>
      
      <h2>Risk Factors</h2>
      <p>Despite our stable outlook, several risk factors could drive increased volatility:</p>
      <ul>
        <li>Unexpected shifts in U.S. Federal Reserve policy</li>
        <li>Widening of Ghana's current account deficit</li>
        <li>Political developments ahead of the 2026 general elections</li>
      </ul>
    `,
    imageUrl: "/lovable-uploads/3a7cddc9-edaa-4b1b-8f89-abed53c11c48.png",
    pdfUrl: "#"
  },
  'macroeconomic-analysis': {
    title: "Ghana Inflation Outlook 2025",
    type: "Economic Analysis",
    date: "April 16, 2025",
    preview: "Our economists analyze inflation trends in Ghana, examining factors driving price increases and forecasting the impact on monetary policy decisions...",
    author: "Emmanuel Agyei, Chief Economist",
    content: `
      <h2>Executive Summary</h2>
      <p>After peaking at 54.1% in December 2022, Ghana's inflation has been on a steady downward trajectory, reaching 21.3% as of March 2025. This report analyzes the current inflationary environment and provides our outlook for the remainder of 2025.</p>
      
      <h2>Key Drivers</h2>
      <p>The recent moderation in inflation can be attributed to several factors:</p>
      <ul>
        <li>Relative stability of the Ghanaian Cedi against major trading currencies</li>
        <li>Improved domestic food production following government agricultural initiatives</li>
        <li>Base effects from the high inflation recorded in 2023-24</li>
        <li>Tight monetary policy stance maintained by the Bank of Ghana</li>
      </ul>
      
      <h2>Inflation Forecast</h2>
      <p>We project headline inflation to continue its downward trend, reaching 15.8% by December 2025. This forecast is based on:</p>
      <ul>
        <li>Anticipated stability in global commodity prices</li>
        <li>Continued fiscal consolidation under the IMF program</li>
        <li>Improved domestic food supply chains</li>
        <li>Gradual reduction in monetary policy rate by the Bank of Ghana</li>
      </ul>
      
      <h2>Sectoral Analysis</h2>
      <p>Food inflation is expected to decelerate more quickly than non-food inflation, with projections of 14.2% and 17.1% respectively by year-end. Transport inflation remains vulnerable to global oil price movements and domestic fuel price adjustments.</p>
    `,
    pdfUrl: "#"
  }
};

const ResearchDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [research, setResearch] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchReport = async () => {
      if (!id) {
        setError("No report ID provided");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Try to fetch from the database first
        const result = await getReportById(id);
        
        if (result.report) {
          setResearch(result.report);
          setFiles(result.files || []);
        } else {
          // Fall back to static data
          const fallbackData = researchData[id as keyof typeof researchData];
          if (fallbackData) {
            setResearch(fallbackData);
          } else {
            setError("Report not found");
          }
        }
      } catch (err) {
        console.error("Error fetching report:", err);
        
        // Check if we have fallback data
        const fallbackData = researchData[id as keyof typeof researchData];
        if (fallbackData) {
          setResearch(fallbackData);
        } else {
          setError("Failed to load research report");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchReport();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <ResearchDetailLoading />
        <Footer />
      </div>
    );
  }
  
  if (error || !research) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <ResearchDetailError error={error} />
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ResearchDetailNavigation />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <ResearchDetailComponent 
                id={id}
                title={research.title}
                type={research.type.replace('-', ' ')}
                date={research.date}
                preview={research.preview}
                content={research.content}
                author={research.author}
                pdfUrl={research.pdfUrl}
                imageUrl={research.imageUrl}
                isPremium={research.is_premium || research.isPremium}
                files={files}
              />
            </div>
            
            <ResearchDetailSidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResearchDetailPage;
