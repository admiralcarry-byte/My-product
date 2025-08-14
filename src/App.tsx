import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Sales from "./pages/admin/Sales";
import Commission from "./pages/admin/Commission";
import Cashback from "./pages/admin/Cashback";
import Reports from "./pages/admin/Reports";
import Notifications from "./pages/admin/Notifications";
import Campaigns from "./pages/admin/Campaigns";
import AdminWelcome from "./pages/admin/Welcome";
import AdminLogin from "./pages/admin/Login";
import AdminProfile from "./pages/admin/Profile";
import AdminSettings from "./pages/admin/Settings";
import AIIntegration from "./pages/admin/AIIntegration";
import BillingIntegration from "./pages/admin/BillingIntegration";
import InfluencerLevels from "./pages/admin/InfluencerLevels";
import LoyaltyLevels from "./pages/admin/LoyaltyLevels";
import ClientPoints from "./pages/admin/ClientPoints";
import PurchaseHistory from "./pages/admin/PurchaseHistory";
import NetworkSwitching from "./pages/admin/NetworkSwitching";
import PurchaseEntry from "./pages/admin/PurchaseEntry";
import BankDetails from "./pages/admin/BankDetails";
import CommissionRequest from "./pages/admin/CommissionRequest";
import AIInsights from "./pages/admin/AIInsights";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin-welcome" element={<AdminWelcome />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><Users /></AdminLayout>} />
          <Route path="/admin/sales" element={<AdminLayout><Sales /></AdminLayout>} />
          <Route path="/admin/commission" element={<AdminLayout><Commission /></AdminLayout>} />
          <Route path="/admin/cashback" element={<AdminLayout><Cashback /></AdminLayout>} />
          <Route path="/admin/reports" element={<AdminLayout><Reports /></AdminLayout>} />
          <Route path="/admin/notifications" element={<AdminLayout><Notifications /></AdminLayout>} />
          <Route path="/admin/campaigns" element={<AdminLayout><Campaigns /></AdminLayout>} />
          <Route path="/admin/profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
          <Route path="/admin/ai-integration" element={<AdminLayout><AIIntegration /></AdminLayout>} />
          <Route path="/admin/billing-integration" element={<AdminLayout><BillingIntegration /></AdminLayout>} />
          <Route path="/admin/influencer-levels" element={<AdminLayout><InfluencerLevels /></AdminLayout>} />
          <Route path="/admin/loyalty-levels" element={<AdminLayout><LoyaltyLevels /></AdminLayout>} />
          <Route path="/admin/client-points" element={<AdminLayout><ClientPoints /></AdminLayout>} />
          <Route path="/admin/purchase-history" element={<AdminLayout><PurchaseHistory /></AdminLayout>} />
          <Route path="/admin/network-switching" element={<AdminLayout><NetworkSwitching /></AdminLayout>} />
          <Route path="/admin/purchase-entry" element={<AdminLayout><PurchaseEntry /></AdminLayout>} />
          <Route path="/admin/bank-details" element={<AdminLayout><BankDetails /></AdminLayout>} />
          <Route path="/admin/commission-request" element={<AdminLayout><CommissionRequest /></AdminLayout>} />
          <Route path="/admin/ai-insights" element={<AdminLayout><AIInsights /></AdminLayout>} />

          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
