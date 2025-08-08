import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Percent,
  DollarSign,
  BarChart3,
  Bell,
  Megaphone,
  Menu,
  LogOut,
  Settings,
  User,
  Droplets,
  Crown,
  Medal,
  Gem,
  Star,
  Database,
  TrendingUp,
  UserCheck,
  Wallet,
  Gift,
  FileText,
  MessageSquare,
  Zap,
  X,
  Network
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: Database,
  },
  {
    name: "User Management",
    href: "/admin/users",
    icon: UserCheck,
  },
  {
    name: "Sales Management",
    href: "/admin/sales",
    icon: TrendingUp,
  },
  {
    name: "Commission Settings",
    href: "/admin/commission",
    icon: Wallet,
  },
  {
    name: "Cashback Settings",
    href: "/admin/cashback",
    icon: Gift,
  },
  {
    name: "Reports & Analytics",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    name: "Notifications",
    href: "/admin/notifications",
    icon: MessageSquare,
  },
  {
    name: "Campaigns",
    href: "/admin/campaigns",
    icon: Megaphone,
  },
  
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auto-hide sidebar when clicking on main content
  const handleMainContentClick = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 ease-in-out lg:translate-x-0",
          "bg-gradient-to-b from-water-mist to-card border-r border-border shadow-lg",
          sidebarOpen ? "translate-x-0 animate-slide-in-left" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-water-blue to-water-deep shadow-water">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">ÁGUA TWEZAH</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary to-water-blue text-white shadow-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-water-mist hover:shadow-md hover:scale-105"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* AI Integration Button */}
        <div className="p-4 border-t border-border">
          <Link
            to="/admin/ai-integration"
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 mb-4",
              location.pathname === "/admin/ai-integration"
                ? "bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/10 hover:shadow-md hover:scale-105"
            )}
            onClick={() => setSidebarOpen(false)}
          >
            <Zap className="w-5 h-5" />
            AI Integration
          </Link>
          <div className="border-t border-border"></div>
        </div>

        {/* Loyalty tier legend */}
        <div className="px-4 pb-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Loyalty Tiers</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1.5 p-2 rounded-md bg-muted/30">
              <Crown className="w-3 h-3 text-loyalty-platinum" />
              <span className="text-xs font-medium text-muted-foreground">Platinum</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-md bg-muted/30">
              <Medal className="w-3 h-3 text-loyalty-gold" />
              <span className="text-xs font-medium text-muted-foreground">Gold</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-md bg-muted/30">
              <Gem className="w-3 h-3 text-loyalty-silver" />
              <span className="text-xs font-medium text-muted-foreground">Silver</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-md bg-muted/30">
              <Star className="w-3 h-3 text-accent" />
              <span className="text-xs font-medium text-muted-foreground">Lead</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-gradient-to-r from-card to-water-mist border-b border-border px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden hover:bg-water-light/20"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {navigation.find(item => item.href === location.pathname)?.name || "Dashboard"}
                    </h2>
                  </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-success to-success/80 text-white shadow-success animate-pulse-glow">
                🟢 Live System
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main 
          className="p-6 min-h-screen bg-gradient-to-br from-background to-water-mist/20 animate-fade-in"
          onClick={handleMainContentClick}
        >
          {children}
        </main>
      </div>
    </div>
  );
}