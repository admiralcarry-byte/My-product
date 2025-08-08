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
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
