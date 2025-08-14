import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  CreditCard, 
  Search, 
  Download, 
  RefreshCw, 
  DollarSign, 
  Users, 
  TrendingUp,
  Activity,
  Sparkles,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Shield,
  Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BankDetails = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [bankFilter, setBankFilter] = useState("all");
  const [animatedValues, setAnimatedValues] = useState({
    totalAccounts: 0,
    verifiedAccounts: 0,
    pendingVerification: 0
  });

  // Animate numbers on component mount
  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedValues({
          totalAccounts: Math.floor(5 * progress),
          verifiedAccounts: Math.floor(3 * progress),
          pendingVerification: Math.floor(2 * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedValues({
            totalAccounts: 5,
            verifiedAccounts: 3,
            pendingVerification: 2
          });
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    animateNumbers();
  }, []);

  const bankData = [
    {
      id: "1",
      customerName: "João Silva",
      customerEmail: "joao.silva@email.com",
      avatar: "",
      bankName: "Banco do Brasil",
      accountNumber: "****1234",
      accountType: "Conta Corrente",
      verificationStatus: "verified",
      lastUpdated: "2024-01-20"
    },
    {
      id: "2",
      customerName: "Maria Santos",
      customerEmail: "maria.santos@email.com",
      avatar: "",
      bankName: "Itaú",
      accountNumber: "****5678",
      accountType: "Conta Poupança",
      verificationStatus: "pending",
      lastUpdated: "2024-01-19"
    },
    {
      id: "3",
      customerName: "Pedro Costa",
      customerEmail: "pedro.costa@email.com",
      avatar: "",
      bankName: "Bradesco",
      accountNumber: "****9012",
      accountType: "Conta Corrente",
      verificationStatus: "verified",
      lastUpdated: "2024-01-18"
    },
    {
      id: "4",
      customerName: "Ana Ferreira",
      customerEmail: "ana.ferreira@email.com",
      avatar: "",
      bankName: "Santander",
      accountNumber: "****3456",
      accountType: "Conta Corrente",
      verificationStatus: "pending",
      lastUpdated: "2024-01-17"
    },
    {
      id: "5",
      customerName: "Carlos Lima",
      customerEmail: "carlos.lima@email.com",
      avatar: "",
      bankName: "Caixa Econômica",
      accountNumber: "****7890",
      accountType: "Conta Poupança",
      verificationStatus: "verified",
      lastUpdated: "2024-01-16"
    }
  ];

  const filteredData = bankData.filter(account => {
    const matchesSearch = account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.bankName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBank = bankFilter === "all" || account.bankName.toLowerCase() === bankFilter;
    
    return matchesSearch && matchesBank;
  });

  const totalAccounts = bankData.length;
  const verifiedAccounts = bankData.filter(a => a.verificationStatus === 'verified').length;
  const pendingVerification = bankData.filter(a => a.verificationStatus === 'pending').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Verified</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header Section */}
      <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-white to-slate-50 border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-water-blue bg-clip-text text-transparent">
            Bank Details Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage customer bank account information</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-success to-success/80 text-white shadow-success animate-pulse-glow">
            <Shield className="w-4 h-4 mr-1" />
            Secure System
          </Badge>
          <Button 
            variant="outline"
            className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200 hover:bg-slate-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{animatedValues.totalAccounts}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Accounts</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{animatedValues.verifiedAccounts}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +18% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-yellow-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{animatedValues.pendingVerification}</div>
            <div className="flex items-center text-xs text-warning font-medium">
              <AlertCircle className="w-3 h-3 mr-1" />
              Awaiting review
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
          <CardDescription>Find specific bank account records</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Accounts</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search by customer or bank..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gradient-to-r from-slate-50 to-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank">Bank Filter</Label>
              <Select value={bankFilter} onValueChange={setBankFilter}>
                <SelectTrigger className="bg-gradient-to-r from-slate-50 to-white">
                  <SelectValue placeholder="Filter by bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Banks</SelectItem>
                  <SelectItem value="banco do brasil">Banco do Brasil</SelectItem>
                  <SelectItem value="itau">Itaú</SelectItem>
                  <SelectItem value="bradesco">Bradesco</SelectItem>
                  <SelectItem value="santander">Santander</SelectItem>
                  <SelectItem value="caixa economica">Caixa Econômica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Bank Details Table */}
      <Card className="border-0 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            Bank Account Details
          </CardTitle>
          <CardDescription>All customer bank account information with verification status</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Bank Name</TableHead>
                <TableHead className="font-semibold">Account Number</TableHead>
                <TableHead className="font-semibold">Account Type</TableHead>
                <TableHead className="font-semibold">Last Updated</TableHead>
                <TableHead className="font-semibold">Verification Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((account, index) => (
                <TableRow 
                  key={account.id}
                  className="hover:bg-slate-50/50 transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={account.avatar} />
                        <AvatarFallback>{account.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{account.customerName}</div>
                        <div className="text-sm text-muted-foreground">{account.customerEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{account.bankName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-muted-foreground">{account.accountNumber}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{account.accountType}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{account.lastUpdated}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(account.verificationStatus)}
                      {getStatusBadge(account.verificationStatus)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankDetails; 