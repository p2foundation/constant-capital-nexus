
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { MarketDataProvider } from "@/contexts/MarketDataContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import SecuritiesTrading from "./pages/SecuritiesTrading";
import InvestmentAdvisory from "./pages/InvestmentAdvisory";
import CapitalMarkets from "./pages/CapitalMarkets";
import ResearchServices from "./pages/ResearchServices";
import FinancingsCapitalMarkets from "./pages/FinancingsCapitalMarkets";
import StrategicAdvisory from "./pages/StrategicAdvisory";
import PrivateEquity from "./pages/PrivateEquity";
import Leadership from "./pages/Leadership";
import LeadershipDetail from "./pages/LeadershipDetail";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Research from "./pages/Research";
import ResearchDetail from "./pages/ResearchDetail";
import Contact from "./pages/Contact";
import TBillCalculator from "./pages/TBillCalculator";
import EquityCalculator from "./pages/EquityCalculator";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || 
      (!savedTheme && 
       window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <AuthProvider>
            <MarketDataProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/securities-trading" element={<SecuritiesTrading />} />
                <Route path="/investment-advisory" element={<InvestmentAdvisory />} />
                <Route path="/capital-markets" element={<CapitalMarkets />} />
                <Route path="/financings-capital-markets" element={<FinancingsCapitalMarkets />} />
                <Route path="/research-services" element={<ResearchServices />} />
                <Route path="/strategic-advisory" element={<StrategicAdvisory />} />
                <Route path="/private-equity" element={<PrivateEquity />} />
                <Route path="/leadership" element={<Leadership />} />
                <Route path="/leadership/:id" element={<LeadershipDetail />} />
                <Route path="/research" element={<Research />} />
                <Route path="/research/:id" element={<ResearchDetail />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Protected routes */}
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole={['Admin', 'Developer', 'Analyst']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />
                
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                {/* Calculator routes */}
                <Route path="/t-bill-calculator" element={<TBillCalculator />} />
                <Route path="/equity-calculator" element={<EquityCalculator />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MarketDataProvider>
          </AuthProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
