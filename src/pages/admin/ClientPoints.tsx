import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Coins, Search, Download, RefreshCw, TrendingUp, Users, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ClientPoints = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const pointsData = [
    {
      id: "1",
      name: "João Silva",
      email: "joao.silva@email.com",
      avatar: "",
      currentPoints: 12500,
      totalEarned: 15000,
      totalSpent: 2500,
      tier: "Platinum",
      lastActivity: "2024-01-20",
      status: 'active'
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria.santos@email.com",
      avatar: "",
      currentPoints: 7500,
      totalEarned: 9000,
      totalSpent: 1500,
      tier: "Gold",
      lastActivity: "2024-01-19",
      status: 'active'
    }
  ];

  const filteredData = pointsData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPoints = pointsData.reduce((sum, user) => sum + user.currentPoints, 0);
  const totalUsers = pointsData.length;
  const avgPoints = Math.round(totalPoints / totalUsers);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header Section */}
      <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-white to-slate-50 border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-water-blue bg-clip-text text-transparent">
            Client Points Management
          </h1>
          <p className="text-muted-foreground mt-1">Track and manage user points and rewards</p>
        </div>
        <div className="flex gap-2">
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
        <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
              <Coins className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalPoints.toLocaleString()}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% from last month
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Points</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <Award className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{avgPoints.toLocaleString()}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
                 </Card>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Points Overview</CardTitle>
          <CardDescription>View and manage user points and rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search Users</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Current Points</TableHead>
                <TableHead>Total Earned</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{user.currentPoints.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      +{Math.round(user.currentPoints * 0.1)} this month
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{user.totalEarned.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{user.totalSpent.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.tier}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{new Date(user.lastActivity).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
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

export default ClientPoints; 