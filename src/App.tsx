import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { MarketDataProvider } from "@/contexts/MarketDataContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { initGA } from "@/utils/analytics";

// Landing page stays eagerly loaded for the fastest first paint
import Index from "@/pages/Index";

// Route-level code splitting — everything else loads on demand
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const SecuritiesTrading = lazy(() => import("@/pages/SecuritiesTrading"));
const FXTrading = lazy(() => import("@/pages/FXTrading"));
const PrivateEquity = lazy(() => import("@/pages/PrivateEquity"));
const StrategicAdvisory = lazy(() => import("@/pages/StrategicAdvisory"));
const FinancingsCapitalMarkets = lazy(() => import("@/pages/FinancingsCapitalMarkets"));
const InvestmentAdvisory = lazy(() => import("@/pages/InvestmentAdvisory"));
const InvestmentResearch = lazy(() => import("@/pages/InvestmentResearch"));
const Research = lazy(() => import("@/pages/Research"));
const ResearchDetail = lazy(() => import("@/pages/ResearchDetail"));
const ResearchServices = lazy(() => import("@/pages/ResearchServices"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const ResetPasswordConfirm = lazy(() => import("@/pages/ResetPasswordConfirm"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const ResearchAdmin = lazy(() => import("@/pages/ResearchAdmin"));
const UserManagement = lazy(() => import("@/pages/UserManagement"));
const Settings = lazy(() => import("@/pages/Settings"));
const TBillCalculator = lazy(() => import("@/pages/TBillCalculator"));
const EquityCalculator = lazy(() => import("@/pages/EquityCalculator"));
const Leadership = lazy(() => import("@/pages/Leadership"));
const LeadershipDetail = lazy(() => import("@/pages/LeadershipDetail"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const CapitalMarkets = lazy(() => import("@/pages/CapitalMarkets"));
const FullMarketReport = lazy(() => import("@/pages/FullMarketReport"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const AccountOpening = lazy(() => import("@/pages/AccountOpening"));
const FAQs = lazy(() => import("@/pages/FAQs"));
const EmailConfirm = lazy(() => import("@/pages/EmailConfirm"));
const Rewards = lazy(() => import("@/pages/Rewards"));
const Careers = lazy(() => import("@/pages/Careers"));
const CareerDetail = lazy(() => import("@/pages/CareerDetail"));

// Components
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CookieConsent from "@/components/CookieConsent";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div
      className="h-10 w-10 animate-spin rounded-full border-2 border-muted border-t-primary"
      role="status"
      aria-label="Loading page"
    />
  </div>
);

function App() {
  useEffect(() => {
    initGA();
    const handleConsent = () => initGA();
    window.addEventListener('cookie-consent-changed', handleConsent);
    return () => window.removeEventListener('cookie-consent-changed', handleConsent);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <HelmetProvider>
          <AuthProvider>
            <MarketDataProvider>
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faqs" element={<FAQs />} />

                  {/* Account Opening Route */}
                  <Route path="/account-opening" element={<AccountOpening />} />

                  {/* Services Routes */}
                  <Route path="/securities-trading" element={<SecuritiesTrading />} />
                  <Route path="/fx-trading" element={<FXTrading />} />
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

                  {/* Careers Routes */}
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/careers/:id" element={<CareerDetail />} />

                  {/* Legal Pages */}
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />

                  {/* Auth Routes - Multiple paths for password reset confirmation */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/auth/reset-password" element={<ResetPasswordConfirm />} />
                  <Route path="/auth/confirm" element={<EmailConfirm />} />
                  <Route path="/email-confirm" element={<EmailConfirm />} />
                  <Route path="/reset-password-confirm" element={<ResetPasswordConfirm />} />
                  <Route path="/reset-password-confirm/*" element={<ResetPasswordConfirm />} />

                  {/* User Routes */}
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } />
                  <Route path="/rewards" element={
                    <ProtectedRoute>
                      <Rewards />
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
              </Suspense>

              <CookieConsent />
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
