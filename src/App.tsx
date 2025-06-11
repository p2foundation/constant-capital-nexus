
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { MarketDataProvider } from "@/contexts/MarketDataContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { HelmetProvider } from 'react-helmet-async';
import { initGA } from "@/utils/analytics";

// Pages
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import SecuritiesTrading from "@/pages/SecuritiesTrading";
import PrivateEquity from "@/pages/PrivateEquity";
import StrategicAdvisory from "@/pages/StrategicAdvisory";
import FinancingsCapitalMarkets from "@/pages/FinancingsCapitalMarkets";
import InvestmentAdvisory from "@/pages/InvestmentAdvisory";
import InvestmentResearch from "@/pages/InvestmentResearch";
import Research from "@/pages/Research";
import ResearchDetail from "@/pages/ResearchDetail";
import ResearchServices from "@/pages/ResearchServices";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminDashboard from "@/pages/AdminDashboard";
import ResearchAdmin from "@/pages/ResearchAdmin";
import UserManagement from "@/pages/UserManagement";
import Settings from "@/pages/Settings";
import TBillCalculator from "@/pages/TBillCalculator";
import EquityCalculator from "@/pages/EquityCalculator";
import Leadership from "@/pages/Leadership";
import LeadershipDetail from "@/pages/LeadershipDetail";
import UserProfile from "@/pages/UserProfile";
import CapitalMarkets from "@/pages/CapitalMarkets";
import FullMarketReport from "@/pages/FullMarketReport";
import NotFound from "@/pages/NotFound";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import AccountOpening from "@/pages/AccountOpening";
import FAQs from "@/pages/FAQs";

// Components
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

function App() {
  useEffect(() => {
    // Initialize Google Analytics on app load
    initGA();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <HelmetProvider>
          <AuthProvider>
            <MarketDataProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faqs" element={<FAQs />} />
                
                {/* Account Opening Route */}
                <Route path="/account-opening" element={<AccountOpening />} />
                
                {/* Services Routes */}
                <Route path="/securities-trading" element={<SecuritiesTrading />} />
                <Route path="/private-equity" element={<PrivateEquity />} />
                <Route path="/strategic-advisory" element={<StrategicAdvisory />} />
                <Route path="/capital-markets" element={<CapitalMarkets />} />
                <Route path="/financings-capital-markets" element={<FinancingsCapitalMarkets />} />
                <Route path="/investment-advisory" element={<InvestmentAdvisory />} />
                <Route path="/investment-research" element={<InvestmentResearch />} />
                
                {/* Research Routes */}
                <Route path="/research" element={<Research />} />
                <Route path="/research/:id" element={<ResearchDetail />} />
                <Route path="/research-services" element={<ResearchServices />} />
                <Route path="/full-market-report" element={<FullMarketReport />} />
                
                {/* Legal Pages */}
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* User Routes */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />
                
                {/* Calculator Routes - Now Protected */}
                <Route path="/t-bill-calculator" element={
                  <ProtectedRoute>
                    <TBillCalculator />
                  </ProtectedRoute>
                } />
                <Route path="/equity-calculator" element={
                  <ProtectedRoute>
                    <EquityCalculator />
                  </ProtectedRoute>
                } />
                
                {/* About Routes */}
                <Route path="/leadership" element={<Leadership />} />
                <Route path="/leadership/:id" element={<LeadershipDetail />} />
                
                {/* Admin Routes */}
                <Route path="/admin/*" element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Research Admin Route - For Analysts, Admins, and Developers */}
                <Route path="/research-admin" element={
                  <ProtectedRoute requiredRole={['Analyst', 'Admin', 'Developer']}>
                    <ResearchAdmin />
                  </ProtectedRoute>
                } />
                
                {/* User Management Route - Admin Only */}
                <Route path="/user-management" element={
                  <ProtectedRoute adminOnly>
                    <UserManagement />
                  </ProtectedRoute>
                } />
                
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              <Toaster />
              <SonnerToaster />
            </MarketDataProvider>
          </AuthProvider>
        </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
