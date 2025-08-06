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
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          ${sale.amount.toFixed(2)}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-success">
          <DollarSign className="w-4 h-4" />
          ${sale.cashback.toFixed(2)}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            {sale.date}
          </div>
          <div className="text-muted-foreground">{sale.time}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm text-muted-foreground">{sale.location}</div>
      </TableCell>
      <TableCell>
        <Badge 
          variant={getStatusBadgeVariant(sale.status)} 
          className={`flex items-center gap-1 w-fit ${
            sale.status === 'verified' ? 'bg-success text-success-foreground' :
            sale.status === 'rejected' ? 'bg-destructive text-destructive-foreground' : 
            'bg-warning text-warning-foreground'
          }`}
        >
          {getStatusIcon(sale.status)}
          {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
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
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-success">
                  <Check className="mr-2 h-4 w-4" />
                  Verify Sale
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <X className="mr-2 h-4 w-4" />
                  Reject Sale
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales Management</h1>
          <p className="text-muted-foreground">Track and verify water purchases</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Sale
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-card to-water-mist/30 border-0 shadow-xl">
            <DialogHeader>
              <DialogTitle>Record New Sale</DialogTitle>
              <DialogDescription>
                Manually add a water purchase transaction.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">Customer</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maria">Maria Silva (+244 923 456 789)</SelectItem>
                    <SelectItem value="joao">João Santos (+244 934 567 890)</SelectItem>
                    <SelectItem value="ana">Ana Costa (+244 945 678 901)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="liters" className="text-right">Liters</Label>
                <Input id="liters" type="number" placeholder="25" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">Location</Label>
                <Input id="location" placeholder="Luanda Centro" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Record Sale</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-white to-primary/5 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{sales.length}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>{pendingSales.length} pending verification</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-water-light/20 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liters</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-water-blue to-water-deep">
              <Droplets className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-water-blue">{totalLiters}L</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>Water sold this period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-success/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-success to-success/80">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalRevenue.toFixed(2)}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>Total sales revenue</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-accent/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cashback Paid</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-accent/80">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">${totalCashback.toFixed(2)}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>Customer rewards</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Verification Alert */}
      {pendingSales.length > 0 && (
        <Card className="border-warning bg-warning/5">
          <CardContent className="flex items-center gap-3 pt-6">
            <AlertCircle className="w-5 h-5 text-warning" />
            <div>
              <p className="font-medium">Pending Verification</p>
              <p className="text-sm text-muted-foreground">
                {pendingSales.length} sales require verification
              </p>
            </div>
            <Button variant="outline" className="ml-auto">
              Review Now
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Transactions</CardTitle>
          <CardDescription>View and manage all water purchase transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer, phone, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Sales ({filteredSales.length})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingSales.length})
                {pendingSales.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {pendingSales.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="verified">Verified ({verifiedSales.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedSales.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Liters</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Cashback</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.map((sale) => (
                    <SaleRow key={sale.id} sale={sale} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-warning" />
                  <p className="text-sm font-medium">Verification Required</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  These sales are waiting for admin verification. Review each transaction carefully.
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Liters</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Cashback</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingSales.map((sale) => (
                    <SaleRow key={sale.id} sale={sale} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="verified" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Liters</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Cashback</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verifiedSales.map((sale) => (
                    <SaleRow key={sale.id} sale={sale} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="rejected" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Liters</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Cashback</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rejectedSales.map((sale) => (
                    <SaleRow key={sale.id} sale={sale} />
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

export default Sales;