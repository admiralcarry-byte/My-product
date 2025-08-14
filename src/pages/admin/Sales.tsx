import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  ShoppingCart,
  Search,
  Plus,
  Check,
  X,
  Clock,
  Eye,
  Calendar,
  Droplets,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  TrendingUp,
  BarChart3,
  Activity,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for sales
  const sales = [
    {
      id: 1,
      customer: "Maria Silva",
      customerPhone: "+244 923 456 789",
      liters: 25,
      amount: 12.50,
      cashback: 2.50,
      date: "2024-08-05",
      time: "14:30",
      status: "verified",
      verifiedBy: "Admin",
      verifiedDate: "2024-08-05 15:00",
      location: "Luanda Centro",
      influencer: "Pedro Influencer",
      commission: 1.25
    },
    {
      id: 2,
      customer: "João Santos",
      customerPhone: "+244 934 567 890",
      liters: 15,
      amount: 7.50,
      cashback: 1.50,
      date: "2024-08-05",
      time: "12:15",
      status: "pending",
      verifiedBy: null,
      verifiedDate: null,
      location: "Talatona",
      influencer: "Sofia Marketing",
      commission: 0.75
    },
    {
      id: 3,
      customer: "Ana Costa",
      customerPhone: "+244 945 678 901",
      liters: 50,
      amount: 25.00,
      cashback: 7.50,
      date: "2024-08-04",
      time: "16:45",
      status: "verified",
      verifiedBy: "Admin",
      verifiedDate: "2024-08-04 17:30",
      location: "Viana",
      influencer: "Pedro Influencer",
      commission: 2.50
    },
    {
      id: 4,
      customer: "Carlos Lima",
      customerPhone: "+244 956 789 012",
      liters: 8,
      amount: 4.00,
      cashback: 0.80,
      date: "2024-08-04",
      time: "10:20",
      status: "rejected",
      verifiedBy: "Admin",
      verifiedDate: "2024-08-04 11:00",
      location: "Kilamba",
      influencer: null,
      commission: 0,
      rejectionReason: "Duplicate entry"
    },
    {
      id: 5,
      customer: "Luisa Ferreira",
      customerPhone: "+244 967 890 123",
      liters: 30,
      amount: 15.00,
      cashback: 4.50,
      date: "2024-08-03",
      time: "09:30",
      status: "pending",
      verifiedBy: null,
      verifiedDate: null,
      location: "Maianga",
      influencer: "Sofia Marketing",
      commission: 1.50
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="w-4 h-4 text-success" />;
      case "pending": return <Clock className="w-4 h-4 text-warning" />;
      case "rejected": return <XCircle className="w-4 h-4 text-destructive" />;
      default: return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "verified": return "default";
      case "pending": return "secondary";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.customerPhone.includes(searchTerm) ||
                         sale.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || sale.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const pendingSales = filteredSales.filter(sale => sale.status === "pending");
  const verifiedSales = filteredSales.filter(sale => sale.status === "verified");
  const rejectedSales = filteredSales.filter(sale => sale.status === "rejected");

  const totalLiters = sales.reduce((sum, sale) => sum + sale.liters, 0);
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalCashback = sales.reduce((sum, sale) => sum + sale.cashback, 0);
  const totalCommission = sales.reduce((sum, sale) => sum + sale.commission, 0);

  const SaleRow = ({ sale }: { sale: any }) => (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{sale.customer}</div>
            <div className="text-sm text-muted-foreground">{sale.customerPhone}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 font-medium">
          <Droplets className="w-4 h-4 text-water-blue" />
          {sale.liters}L
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 font-medium text-green-600">
          <DollarSign className="w-4 h-4" />
          {sale.amount.toFixed(2)}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-sm">
          <DollarSign className="w-4 h-4 text-primary" />
          {sale.cashback.toFixed(2)}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-sm">
          <DollarSign className="w-4 h-4 text-accent" />
          {sale.commission.toFixed(2)}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          {sale.date}
        </div>
        <div className="text-muted-foreground">{sale.time}</div>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div className="font-medium">{sale.location}</div>
          {sale.influencer && (
            <div className="text-muted-foreground">{sale.influencer}</div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(sale.status)} className="flex items-center gap-1">
          {getStatusIcon(sale.status)}
          {sale.status}
        </Badge>
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
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            {sale.status === "pending" && (
              <>
                <DropdownMenuItem>
                  <Check className="mr-2 h-4 w-4" />
                  Verify
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header Section */}
      <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-white to-slate-50 border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-water-blue bg-clip-text text-transparent">
            Sales Management
          </h1>
          <p className="text-muted-foreground mt-1">Monitor and manage all sales transactions and revenue</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-success to-success/80 text-white shadow-success animate-pulse-glow">
            <Activity className="w-4 h-4 mr-1" />
            Live Tracking
          </Badge>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% this month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Water Sold</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <Droplets className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalLiters}L</div>
            <div className="flex items-center text-xs text-success font-medium">
              <BarChart3 className="w-3 h-3 mr-1" />
              +8% this week
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cashback</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${totalCashback.toFixed(2)}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% this month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-orange-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalCommission.toFixed(2)}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +22% this month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Search & Filters
          </CardTitle>
          <CardDescription>Find specific sales transactions</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Sales</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search by customer, phone, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gradient-to-r from-slate-50 to-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status Filter</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="bg-gradient-to-r from-slate-50 to-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
                <Plus className="w-4 h-4 mr-2" />
                Add Sale
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Sales Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Sales Transactions
          </CardTitle>
          <CardDescription>All sales with detailed information and status</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Water</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Cashback</TableHead>
                <TableHead className="font-semibold">Commission</TableHead>
                <TableHead className="font-semibold">Date/Time</TableHead>
                <TableHead className="font-semibold">Location</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <SaleRow key={sale.id} sale={sale} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;