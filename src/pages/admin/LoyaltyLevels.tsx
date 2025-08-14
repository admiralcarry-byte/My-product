import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Trophy, 
  Crown, 
  Award, 
  Star,
  TrendingUp,
  BarChart3
} from "lucide-react";

const LoyaltyLevels = () => {
  const [loyaltyLevels, setLoyaltyLevels] = useState([
    {
      id: "lead",
      name: "Lead",
      icon: "Star",
      color: "amber",
      requiredLiters: 0,
      cashbackRate: 5,
      commissionRate: 10,
      isActive: true,
      userCount: 1250,
      upgradeRate: 15
    },
    {
      id: "silver",
      name: "Silver",
      icon: "Award",
      color: "slate",
      requiredLiters: 50,
      cashbackRate: 8,
      commissionRate: 20,
      isActive: true,
      userCount: 890,
      upgradeRate: 25
    },
    {
      id: "gold",
      name: "Gold",
      icon: "Trophy",
      color: "yellow",
      requiredLiters: 150,
      cashbackRate: 12,
      commissionRate: 30,
      isActive: true,
      userCount: 456,
      upgradeRate: 35
    },
    {
      id: "platinum",
      name: "Platinum",
      icon: "Crown",
      color: "slate",
      requiredLiters: 300,
      cashbackRate: 15,
      commissionRate: 40,
      isActive: true,
      userCount: 123,
      upgradeRate: 45
    }
  ]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Star": return <Star className="w-5 h-5" />;
      case "Award": return <Award className="w-5 h-5" />;
      case "Trophy": return <Trophy className="w-5 h-5" />;
      case "Crown": return <Crown className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "amber": return "bg-amber-500 text-white";
      case "slate": return "bg-slate-500 text-white";
      case "yellow": return "bg-yellow-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const handleToggleLevel = (levelId: string) => {
    setLoyaltyLevels(prev => 
      prev.map(level => 
        level.id === levelId 
          ? { ...level, isActive: !level.isActive }
          : level
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-white to-slate-50 border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-water-blue bg-clip-text text-transparent">
            Loyalty Levels Management
          </h1>
          <p className="text-muted-foreground mt-1">Configure and manage loyalty tiers and user progression settings.</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          Add Level
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-white to-water-mist border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-water-blue">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{loyaltyLevels.reduce((sum, level) => sum + level.userCount, 0)}</div>
            <p className="text-xs text-success font-medium">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-water-light/20 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Levels</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-water-blue to-water-deep">
              <Trophy className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-water-blue">{loyaltyLevels.filter(level => level.isActive).length}</div>
            <p className="text-xs text-success font-medium">Out of {loyaltyLevels.length} total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-success/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Upgrade Rate</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-success to-success/80">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.round(loyaltyLevels.reduce((sum, level) => sum + level.upgradeRate, 0) / loyaltyLevels.length)}%
            </div>
            <p className="text-xs text-success font-medium">Monthly progression</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-accent/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Level</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-accent/80">
              <Crown className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">Platinum</div>
            <p className="text-xs text-success font-medium">123 users</p>
          </CardContent>
        </Card>
      </div>

      {/* Levels Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Loyalty Levels Configuration
          </CardTitle>
          <CardDescription>Manage level requirements, benefits, and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Requirements</TableHead>
                <TableHead>Rates</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loyaltyLevels.map((level) => (
                <TableRow key={level.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getColorClasses(level.color)}`}>
                        {getIconComponent(level.icon)}
                      </div>
                      <div>
                        <div className="font-medium">{level.name}</div>
                        <div className="text-sm text-muted-foreground">Level {level.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {level.requiredLiters}L required
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>Cashback: {level.cashbackRate}%</div>
                      <div>Commission: {level.commissionRate}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{level.userCount}</div>
                    <div className="text-xs text-muted-foreground">
                      {level.upgradeRate}% upgrade rate
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={level.isActive}
                        onCheckedChange={() => handleToggleLevel(level.id)}
                      />
                      <Badge variant={level.isActive ? "default" : "secondary"}>
                        {level.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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

export default LoyaltyLevels; 