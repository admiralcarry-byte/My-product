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
  Network, 
  Search, 
  Download, 
  RefreshCw, 
  Users, 
  Globe, 
  TrendingUp, 
  Wifi,
  Activity,
  Sparkles,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NetworkSwitching = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [networkFilter, setNetworkFilter] = useState("all");
  const [animatedValues, setAnimatedValues] = useState({
    totalSwitches: 0,
    completedSwitches: 0,
    totalCommission: 0
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
          totalSwitches: Math.floor(3 * progress),
          completedSwitches: Math.floor(2 * progress),
          totalCommission: Math.floor(450 * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedValues({
            totalSwitches: 3,
            completedSwitches: 2,
            totalCommission: 450
          });
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    animateNumbers();
  }, []);

  const networkData = [
    {
      id: "1",
      customerName: "João Silva",
      customerEmail: "joao.silva@email.com",
      avatar: "",
      currentNetwork: "Vivo",
      newNetwork: "Claro",
      switchDate: "2024-01-20",
      status: "completed",
      commission: 150.00,
      points: 750
    },
    {
      id: "2",
      customerName: "Maria Santos",
      customerEmail: "maria.santos@email.com",
      avatar: "",
      currentNetwork: "TIM",
      newNetwork: "Oi",
      switchDate: "2024-01-19",
      status: "pending",
      commission: 120.00,
      points: 600
    },
    {
      id: "3",
      customerName: "Pedro Costa",
      customerEmail: "pedro.costa@email.com",
      avatar: "",
      currentNetwork: "Claro",
      newNetwork: "Vivo",
      switchDate: "2024-01-18",
      status: "completed",
      commission: 180.00,
      points: 900
    }
  ];

  const filteredData = networkData.filter(switchData => {
    const matchesSearch = switchData.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         switchData.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNetwork = networkFilter === "all" || switchData.newNetwork.toLowerCase() === networkFilter;
    
    return matchesSearch && matchesNetwork;
  });

  const totalSwitches = networkData.length;
  const completedSwitches = networkData.filter(s => s.status === 'completed').length;
  const totalCommission = networkData.reduce((sum, s) => sum + s.commission, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
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
            Network Switching Management
          </h1>
          <p className="text-muted-foreground mt-1">Track and manage network switching requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-success to-success/80 text-white shadow-success animate-pulse-glow">
            <Activity className="w-4 h-4 mr-1" />
            Active System
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
            <CardTitle className="text-sm font-medium">Total Switches</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <Network className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{animatedValues.totalSwitches}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +25% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Switches</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{animatedValues.completedSwitches}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +30% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${animatedValues.totalCommission.toLocaleString()}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +22% from last month
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
          <CardDescription>Find specific network switching records</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Switches</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search by customer name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gradient-to-r from-slate-50 to-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="network">Network Filter</Label>
              <Select value={networkFilter} onValueChange={setNetworkFilter}>
                <SelectTrigger className="bg-gradient-to-r from-slate-50 to-white">
                  <SelectValue placeholder="Filter by network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Networks</SelectItem>
                  <SelectItem value="vivo">Vivo</SelectItem>
                  <SelectItem value="claro">Claro</SelectItem>
                  <SelectItem value="tim">TIM</SelectItem>
                  <SelectItem value="oi">Oi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Network Switching Table */}
      <Card className="border-0 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Network Switching History
          </CardTitle>
          <CardDescription>All network switching requests with detailed information</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Current Network</TableHead>
                <TableHead className="font-semibold">New Network</TableHead>
                <TableHead className="font-semibold">Switch Date</TableHead>
                <TableHead className="font-semibold">Commission</TableHead>
                <TableHead className="font-semibold">Points</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((switchData, index) => (
                <TableRow 
                  key={switchData.id}
                  className="hover:bg-slate-50/50 transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={switchData.avatar} />
                        <AvatarFallback>{switchData.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{switchData.customerName}</div>
                        <div className="text-sm text-muted-foreground">{switchData.customerEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{switchData.currentNetwork}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span className="font-medium text-primary">{switchData.newNetwork}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{switchData.switchDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-medium text-green-600">
                      <DollarSign className="w-4 h-4" />
                      {switchData.commission.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      {switchData.points}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(switchData.status)}
                      {getStatusBadge(switchData.status)}
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

export default NetworkSwitching; 