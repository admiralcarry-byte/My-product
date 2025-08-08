import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users as UsersIcon,
  Search,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  Ban,
  Crown,
  Medal,
  Gem,
  Star,
  Phone,
  Mail,
  Calendar,
  Droplets,
  DollarSign,
  Eye,
  MoreHorizontal,
  Key,
  Settings,
  UserCog,
  Zap,
  Network,
  CheckCircle,
  XCircle,
  Target,
  ArrowLeft,
  TrendingUp,
  BarChart as BarChartIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const Users = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTier, setFilterTier] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>(null);
  const [showInfluencerNetwork, setShowInfluencerNetwork] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Mock data
  const users = [
    {
      id: 1,
      name: "Maria Silva",
      phone: "+244 923 456 789",
      email: "maria@email.com",
      type: "customer",
      tier: "Gold",
      liters: 245,
      cashback: 49.50,
      referrals: 0,
      joinDate: "2024-01-15",
      status: "active",
      influencer: "Pedro Influencer"
    },
    {
      id: 2,
      name: "Pedro Influencer",
      phone: "+244 912 345 678",
      email: "pedro@email.com",
      type: "influencer",
      tier: "Platinum",
      liters: 0,
      cashback: 0,
      referrals: 145,
      commission: 1250.00,
      joinDate: "2023-08-10",
      status: "active",
      influencer: null
    },
    {
      id: 3,
      name: "João Santos",
      phone: "+244 934 567 890",
      email: "joao@email.com",
      type: "customer",
      tier: "Silver",
      liters: 89,
      cashback: 17.80,
      referrals: 0,
      joinDate: "2024-02-20",
      status: "active",
      influencer: "Sofia Marketing"
    },
    {
      id: 4,
      name: "Ana Costa",
      phone: "+244 945 678 901",
      email: "ana@email.com",
      type: "customer",
      tier: "Platinum",
      liters: 450,
      cashback: 135.00,
      referrals: 0,
      joinDate: "2023-12-05",
      status: "blocked",
      influencer: "Pedro Influencer"
    },
    {
      id: 5,
      name: "Sofia Marketing",
      phone: "+244 956 789 012",
      email: "sofia@email.com",
      type: "influencer",
      tier: "Gold",
      liters: 0,
      cashback: 0,
      referrals: 47,
      commission: 890.00,
      joinDate: "2023-09-15",
      status: "active",
      influencer: null
    },
  ];

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Platinum": return <Crown className="w-4 h-4 text-loyalty-platinum" />;
      case "Gold": return <Medal className="w-4 h-4 text-loyalty-gold" />;
      case "Silver": return <Gem className="w-4 h-4 text-loyalty-silver" />;
      default: return <Star className="w-4 h-4 text-accent" />;
    }
  };

  const getTierBadgeVariant = (tier: string) => {
    switch (tier) {
      case "Platinum": return "default";
      case "Gold": return "secondary";
      case "Silver": return "outline";
      default: return "secondary";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "blocked": return "destructive";
      default: return "secondary";
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    return type === "influencer" ? "secondary" : "outline";
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === "all" || user.tier === filterTier;
    const matchesType = filterType === "all" || user.type === filterType;
    
    return matchesSearch && matchesTier && matchesType;
  });

  const customers = filteredUsers.filter(user => user.type === "customer");
  const influencers = filteredUsers.filter(user => user.type === "influencer");

  const handleEditUser = (user: any) => {
    setEditingUser(user);
  };

  const handleChangePassword = (user: any) => {
    if (!newPassword) {
      toast({
        title: "Error",
        description: "Please enter a new password",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: `Password changed successfully for ${user.name}`,
      variant: "success",
    });
    setNewPassword("");
    setEditingUser(null);
  };

  const handleUpdateUser = (updatedData: any) => {
    toast({
      title: "User Updated",
      description: `${updatedData.name}'s information has been updated`,
      variant: "success",
    });
    setEditingUser(null);
  };

  const handleBlockUser = (user: any) => {
    const action = user.status === "active" ? "blocked" : "unblocked";
    toast({
      title: `User ${action}`,
      description: `${user.name} has been ${action}`,
      variant: action === "blocked" ? "warning" : "success",
    });
  };

  const handleViewInfluencerNetwork = (influencer: any) => {
    setSelectedInfluencer(influencer);
    setShowInfluencerNetwork(true);
  };

  const handleInfluencerStatusChange = (influencer: any, newStatus: string) => {
    const action = newStatus === "active" ? "activated" : newStatus === "blocked" ? "blocked" : "deleted";
    toast({
      title: `Influencer ${action}`,
      description: `${influencer.name} has been ${action}`,
      variant: newStatus === "active" ? "success" : newStatus === "blocked" ? "warning" : "destructive",
    });
  };

  const getMonetizationStatus = (influencer: any) => {
    const minimumRequired = 50; // This should come from settings
    const activeClients = influencer.referrals || 0;
    return activeClients >= minimumRequired ? "Eligible" : "Not Eligible";
  };

  const getMonetizationBadgeVariant = (status: string) => {
    return status === "Eligible" ? "default" : "secondary";
  };

  const UserRow = ({ user }: { user: any }) => (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <UsersIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {user.phone}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getTypeBadgeVariant(user.type)}>
          {user.type === "influencer" ? "Influencer" : "Customer"}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={getTierBadgeVariant(user.tier)} className="flex items-center gap-1 w-fit">
          {getTierIcon(user.tier)}
          {user.tier}
        </Badge>
      </TableCell>
      <TableCell>
        {user.type === "customer" ? (
          <div className="flex items-center gap-1">
            <Droplets className="w-4 h-4 text-water-blue" />
            {user.liters}L
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <UsersIcon className="w-4 h-4 text-primary" />
            {user.referrals} users
          </div>
        )}
      </TableCell>
      <TableCell>
        {user.type === "customer" ? (
          <div className="flex items-center gap-1 text-success">
            <DollarSign className="w-4 h-4" />
            ${user.cashback}
          </div>
        ) : (
          <div className="flex items-center gap-1 text-success">
            <DollarSign className="w-4 h-4" />
            ${user.commission}
          </div>
        )}
      </TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(user.status)}>
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{user.joinDate}</span>
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
             <DropdownMenuLabel>Actions</DropdownMenuLabel>
             {user.type === "influencer" && (
               <DropdownMenuItem onClick={() => handleViewInfluencerNetwork(user)}>
                 <Network className="mr-2 h-4 w-4" />
                 View Network
               </DropdownMenuItem>
             )}
             <DropdownMenuItem>
               <Eye className="mr-2 h-4 w-4" />
               View Details
             </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditUser(user)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User Info
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingUser({ ...user, passwordMode: true })}>
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleBlockUser(user)} className="text-warning">
              <Ban className="mr-2 h-4 w-4" />
              {user.status === "active" ? "Block User" : "Unblock User"}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );

  // Influencer Network View
  if (showInfluencerNetwork && selectedInfluencer) {
    const monetizationStatus = getMonetizationStatus(selectedInfluencer);
    const minimumRequired = 50;
    const activeClients = selectedInfluencer.referrals || 0;
    const clientsNeeded = Math.max(0, minimumRequired - activeClients);

    // Generate dynamic chart data based on influencer characteristics
    const generateMonthlyFeesData = (influencer: any) => {
      const baseCommission = influencer.commission || 0;
      const networkSize = influencer.referrals || 0;
      const isEligible = networkSize >= 50;
      
      // Base monthly fee calculation based on network size and commission
      const baseMonthlyFee = isEligible ? baseCommission / 6 : baseCommission / 12;
      
      return [
        { month: "Jan", fees: Math.round(baseMonthlyFee * (0.8 + Math.random() * 0.4)) },
        { month: "Feb", fees: Math.round(baseMonthlyFee * (0.9 + Math.random() * 0.4)) },
        { month: "Mar", fees: Math.round(baseMonthlyFee * (0.85 + Math.random() * 0.4)) },
        { month: "Apr", fees: Math.round(baseMonthlyFee * (1.0 + Math.random() * 0.4)) },
        { month: "May", fees: Math.round(baseMonthlyFee * (1.1 + Math.random() * 0.4)) },
        { month: "Jun", fees: Math.round(baseMonthlyFee * (1.2 + Math.random() * 0.4)) },
      ];
    };

    const generateMonthlyPurchasesData = (influencer: any) => {
      const networkSize = influencer.referrals || 0;
      const isEligible = networkSize >= 50;
      
      // Base purchase calculation based on network size and eligibility
      const baseMonthlyPurchases = isEligible ? networkSize * 15 : networkSize * 8;
      
      return [
        { month: "Jan", purchases: Math.round(baseMonthlyPurchases * (0.7 + Math.random() * 0.6)) },
        { month: "Feb", purchases: Math.round(baseMonthlyPurchases * (0.8 + Math.random() * 0.6)) },
        { month: "Mar", purchases: Math.round(baseMonthlyPurchases * (0.75 + Math.random() * 0.6)) },
        { month: "Apr", purchases: Math.round(baseMonthlyPurchases * (0.9 + Math.random() * 0.6)) },
        { month: "May", purchases: Math.round(baseMonthlyPurchases * (1.0 + Math.random() * 0.6)) },
        { month: "Jun", purchases: Math.round(baseMonthlyPurchases * (1.1 + Math.random() * 0.6)) },
      ];
    };

    const monthlyFeesData = generateMonthlyFeesData(selectedInfluencer);
    const monthlyPurchasesData = generateMonthlyPurchasesData(selectedInfluencer);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-white to-water-mist border border-border shadow-sm">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-water-blue bg-clip-text text-transparent">
              {selectedInfluencer.name}'s Network
            </h1>
            <p className="text-muted-foreground mt-1">Influencer network overview and management</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowInfluencerNetwork(false);
              setActiveTab("influencers");
            }}
            className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md text-white border-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </div>

        {/* Network Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-white to-water-mist border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-water-blue">
                <UsersIcon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{selectedInfluencer.referrals || 0}</div>
              <div className="flex items-center text-xs text-success font-medium">
                <TrendingUp className="w-3 h-3 mr-1" />
                Users who joined via this influencer
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-water-light/20 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-br from-water-blue to-water-deep">
                <Network className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-water-blue">{activeClients}</div>
              <div className="flex items-center text-xs text-success font-medium">
                <TrendingUp className="w-3 h-3 mr-1" />
                Currently active in network
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-success/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monetization Status</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-br from-success to-success/80">
                <Zap className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                <Badge variant={getMonetizationBadgeVariant(monetizationStatus)}>
                  {monetizationStatus}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-success font-medium">
                <TrendingUp className="w-3 h-3 mr-1" />
                {monetizationStatus === "Eligible" 
                  ? "Earning commissions" 
                  : `${clientsNeeded} more active clients needed`
                }
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-accent/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-accent/80">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                ${selectedInfluencer.commission || 0}
              </div>
              <div className="flex items-center text-xs text-success font-medium">
                <TrendingUp className="w-3 h-3 mr-1" />
                Commission earned
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Single Large Card with All Content */}
        <Card className="bg-gradient-to-br from-white to-water-mist/20 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <UsersIcon className="h-6 w-6" />
              Network Management & Analytics
            </CardTitle>
            <CardDescription>Complete overview of influencer network and monthly performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
                         {/* Column Charts - Side by Side */}
             <div className="space-y-4">
               <h3 className="text-lg font-semibold">Performance Analytics</h3>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Monthly Service Fees Chart */}
                 <Card>
                   <CardHeader>
                     <CardTitle>Monthly Service Fees</CardTitle>
                     <CardDescription>Fees received from influencer network</CardDescription>
                   </CardHeader>
                   <CardContent>
                     <ResponsiveContainer width="100%" height={250}>
                       <RechartsBarChart data={monthlyFeesData}>
                         <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                         <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                         <YAxis stroke="hsl(var(--muted-foreground))" />
                         <RechartsTooltip 
                           contentStyle={{
                             backgroundColor: "hsl(var(--card))",
                             border: "1px solid hsl(var(--border))",
                             borderRadius: "8px"
                           }}
                         />
                         <Bar 
                           dataKey="fees" 
                           fill="hsl(var(--water-blue))" 
                           radius={[4, 4, 0, 0]}
                           name="Fees ($)"
                         />
                       </RechartsBarChart>
                     </ResponsiveContainer>
                   </CardContent>
                 </Card>

                 {/* Monthly Purchases Chart */}
                 <Card>
                   <CardHeader>
                     <CardTitle>Monthly Purchases</CardTitle>
                     <CardDescription>Purchases generated from influencer network</CardDescription>
                   </CardHeader>
                   <CardContent>
                     <ResponsiveContainer width="100%" height={250}>
                       <RechartsBarChart data={monthlyPurchasesData}>
                         <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                         <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                         <YAxis stroke="hsl(var(--muted-foreground))" />
                         <RechartsTooltip 
                           contentStyle={{
                             backgroundColor: "hsl(var(--card))",
                             border: "1px solid hsl(var(--border))",
                             borderRadius: "8px"
                           }}
                         />
                         <Bar 
                           dataKey="purchases" 
                           fill="hsl(var(--success))" 
                           radius={[4, 4, 0, 0]}
                           name="Purchases (L)"
                         />
                       </RechartsBarChart>
                     </ResponsiveContainer>
                   </CardContent>
                 </Card>
               </div>
             </div>

                         {/* Network Management Cards - Similar to Loyalty Tiers Style */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Influencer Profile Card */}
               <Card className="relative overflow-hidden bg-gradient-to-br from-white to-primary/5 border-0 shadow-md hover:shadow-lg transition-all duration-200">
                 <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                   <UsersIcon className="w-full h-full text-primary" />
                 </div>
                 <CardHeader>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-water-blue">
                         <UsersIcon className="w-5 h-5 text-white" />
                       </div>
                       <div>
                         <CardTitle className="text-primary">Influencer Profile</CardTitle>
                         <CardDescription>{selectedInfluencer.name}</CardDescription>
                       </div>
                     </div>
                     <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
                       Active
                     </Badge>
                   </div>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="space-y-3">
                     <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-water-blue flex items-center justify-center">
                         <Phone className="w-4 h-4 text-white" />
                       </div>
                       <div>
                         <div className="text-sm text-muted-foreground">Phone</div>
                         <div className="font-medium">{selectedInfluencer.phone}</div>
                       </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-3">
                       <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg text-center">
                         <div className="text-sm text-muted-foreground">Status</div>
                         <Badge variant={getStatusBadgeVariant(selectedInfluencer.status)} className="mt-1">
                           {selectedInfluencer.status}
                         </Badge>
                       </div>
                       <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg text-center">
                         <div className="text-sm text-muted-foreground">Tier</div>
                         <Badge variant={getTierBadgeVariant(selectedInfluencer.tier)} className="mt-1">
                           {selectedInfluencer.tier}
                         </Badge>
                       </div>
                     </div>
                     
                     <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                       <div className="flex justify-between items-center">
                         <span className="text-sm text-muted-foreground">Joined:</span>
                         <span className="font-medium">{selectedInfluencer.joinDate}</span>
                       </div>
                     </div>
                   </div>
                 </CardContent>
               </Card>

               {/* Monetization Requirements Card */}
               <Card className="relative overflow-hidden bg-gradient-to-br from-white to-success/5 border-0 shadow-md hover:shadow-lg transition-all duration-200">
                 <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                   <Target className="w-full h-full text-success" />
                 </div>
                 <CardHeader>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-gradient-to-br from-success to-success/80">
                         <Target className="w-5 h-5 text-white" />
                       </div>
                       <div>
                         <CardTitle className="text-success">Monetization</CardTitle>
                         <CardDescription>Requirements & Progress</CardDescription>
                       </div>
                     </div>
                     <Badge variant={getMonetizationBadgeVariant(monetizationStatus)}>
                       {monetizationStatus}
                     </Badge>
                   </div>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="space-y-3">
                     <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                       <div className="flex justify-between items-center">
                         <span className="text-sm font-medium">Required Clients:</span>
                         <span className="font-bold text-green-700">{minimumRequired}</span>
                       </div>
                     </div>
                     
                     <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                       <div className="flex justify-between items-center">
                         <span className="text-sm font-medium">Current Clients:</span>
                         <span className="font-bold text-blue-700">{activeClients}</span>
                       </div>
                     </div>
                     
                     <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                       <div className="flex justify-between items-center mb-2">
                         <span className="text-sm font-medium">Progress:</span>
                         <span className="font-bold text-purple-700">{Math.min(100, (activeClients / minimumRequired) * 100).toFixed(1)}%</span>
                       </div>
                       <div className="w-full bg-purple-200 rounded-full h-2">
                         <div 
                           className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                           style={{ width: `${Math.min(100, (activeClients / minimumRequired) * 100)}%` }}
                         ></div>
                       </div>
                     </div>
                     
                     {monetizationStatus === "Not Eligible" && (
                       <div className="p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg">
                         <div className="flex items-center gap-2 text-yellow-800">
                           <Target className="h-4 w-4" />
                           <span className="text-sm font-medium">
                             {clientsNeeded} more clients needed
                           </span>
                         </div>
                       </div>
                     )}
                   </div>
                 </CardContent>
               </Card>

               {/* Status Management Card */}
               <Card className="relative overflow-hidden bg-gradient-to-br from-white to-accent/5 border-0 shadow-md hover:shadow-lg transition-all duration-200">
                 <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                   <Settings className="w-full h-full text-accent" />
                 </div>
                 <CardHeader>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-accent/80">
                         <Settings className="w-5 h-5 text-white" />
                       </div>
                       <div>
                         <CardTitle className="text-accent">Status Management</CardTitle>
                         <CardDescription>Control & Actions</CardDescription>
                       </div>
                     </div>
                   </div>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="space-y-3">
                     <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                       <div className="flex justify-between items-center">
                         <span className="text-sm font-medium">Current Status:</span>
                         <Badge variant={getStatusBadgeVariant(selectedInfluencer.status)}>
                           {selectedInfluencer.status}
                         </Badge>
                       </div>
                     </div>
                     
                     <div className="space-y-2">
                       <span className="text-sm font-medium">Actions:</span>
                       <TooltipProvider>
                         <Tooltip>
                           <TooltipTrigger asChild>
                             <Button variant="outline" className="w-full bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:bg-blue-200">
                               <Settings className="h-4 w-4 mr-2" />
                               Change Status
                             </Button>
                           </TooltipTrigger>
                           <TooltipContent side="bottom" className="p-0">
                             <div className="flex flex-col gap-1 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                               <Button
                                 size="sm"
                                 variant="ghost"
                                 onClick={() => handleInfluencerStatusChange(selectedInfluencer, "active")}
                                 className="justify-start hover:bg-green-50"
                               >
                                 <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                 Activate
                               </Button>
                               <Button
                                 size="sm"
                                 variant="ghost"
                                 onClick={() => handleInfluencerStatusChange(selectedInfluencer, "blocked")}
                                 className="justify-start hover:bg-yellow-50"
                               >
                                 <Ban className="h-4 w-4 mr-2 text-yellow-600" />
                                 Block
                               </Button>
                               <Button
                                 size="sm"
                                 variant="ghost"
                                 onClick={() => handleInfluencerStatusChange(selectedInfluencer, "deleted")}
                                 className="justify-start hover:bg-red-50 text-red-600"
                               >
                                 <Trash2 className="h-4 w-4 mr-2" />
                                 Delete
                               </Button>
                             </div>
                           </TooltipContent>
                         </Tooltip>
                       </TooltipProvider>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-2">
                       <div className="p-2 bg-gradient-to-r from-green-50 to-green-100 rounded text-center">
                         <div className="text-xs text-muted-foreground">Total Earnings</div>
                         <div className="font-semibold text-green-700">${selectedInfluencer.commission || 0}</div>
                       </div>
                       <div className="p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded text-center">
                         <div className="text-xs text-muted-foreground">Network Size</div>
                         <div className="font-semibold text-blue-700">{selectedInfluencer.referrals || 0}</div>
                       </div>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage customers and influencers</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new customer or influencer account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="influencer">Influencer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {editingUser?.passwordMode ? (
                  <>
                    <Key className="w-5 h-5" />
                    Change Password for {editingUser?.name}
                  </>
                ) : (
                  <>
                    <UserCog className="w-5 h-5" />
                    Edit User Information
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                {editingUser?.passwordMode 
                  ? "Set a new password for this user account."
                  : "Update the user's personal information and settings."
                }
              </DialogDescription>
            </DialogHeader>
            
            {editingUser?.passwordMode ? (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="bg-info/10 text-info-foreground p-3 rounded-lg text-sm">
                  <strong>Note:</strong> The user will need to use this new password for their next login.
                </div>
              </div>
            ) : (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editName">Full Name</Label>
                    <Input
                      id="editName"
                      defaultValue={editingUser?.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editPhone">Phone</Label>
                    <Input
                      id="editPhone"
                      defaultValue={editingUser?.phone}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    defaultValue={editingUser?.email}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editTier">Loyalty Tier</Label>
                    <Select defaultValue={editingUser?.tier}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lead">Lead</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Platinum">Platinum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editStatus">Status</Label>
                    <Select defaultValue={editingUser?.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button 
                onClick={() => editingUser?.passwordMode 
                  ? handleChangePassword(editingUser) 
                  : handleUpdateUser(editingUser)
                }
              >
                {editingUser?.passwordMode ? "Change Password" : "Update User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-white to-water-mist border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-water-blue">
              <UsersIcon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{users.length}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              {customers.length} customers, {influencers.length} influencers
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-water-light/20 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-water-blue to-water-deep">
              <UsersIcon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-water-blue">
              {users.filter(u => u.status === "active").length}
            </div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              {Math.round((users.filter(u => u.status === "active").length / users.length) * 100)}% active rate
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-success/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platinum Users</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-success to-success/80">
              <Crown className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {users.filter(u => u.tier === "Platinum").length}
            </div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              Highest tier members
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-accent/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cashback</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-accent/80">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              ${customers.reduce((sum, user) => sum + user.cashback, 0).toFixed(2)}
            </div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              Rewards distributed
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Search and filter users by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="influencer">Influencer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Loyalty Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="Lead">Lead</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Users ({filteredUsers.length})</TabsTrigger>
              <TabsTrigger value="customers">Customers ({customers.length})</TabsTrigger>
              <TabsTrigger value="influencers">Influencers ({influencers.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="customers" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Liters</TableHead>
                    <TableHead>Cashback</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="influencers" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Influencer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {influencers.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;