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
import { Switch } from "@/components/ui/switch";
import {
  DollarSign,
  Settings,
  Users,
  TrendingUp,
  Crown,
  Medal,
  Gem,
  Star,
  Edit,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  Calendar,
  Percent,
  Plus,
} from "lucide-react";

const Commission = () => {
  const [editingSettings, setEditingSettings] = useState(false);
  
  // Mock commission settings
  const [commissionSettings, setCommissionSettings] = useState({
    baseCommission: 5.0, // percentage
    tierMultipliers: {
      Lead: 1.0,
      Silver: 1.2,
      Gold: 1.5,
      Platinum: 2.0
    },
    minimumActiveUsers: 10,
    payoutThreshold: 50.0, // minimum amount for payout
    payoutFrequency: "monthly", // weekly, monthly, quarterly
    autoApproval: false,
    commissionCap: 1000.0 // monthly cap per influencer
  });

  // Mock influencer performance data
  const influencers = [
    {
      id: 1,
      name: "Pedro Influencer",
      phone: "+244 912 345 678",
      tier: "Platinum",
      activeUsers: 145,
      totalSales: 3650, // liters
      monthlyCommission: 365.00,
      pendingPayout: 365.00,
      lastPayout: "2024-07-30",
      status: "active",
      joinDate: "2023-08-10",
      networkGrowth: 12.5 // percentage growth
    },
    {
      id: 2,
      name: "Sofia Marketing",
      phone: "+244 956 789 012",
      tier: "Gold",
      activeUsers: 98,
      totalSales: 2450,
      monthlyCommission: 183.75,
      pendingPayout: 183.75,
      lastPayout: "2024-07-30",
      status: "active",
      joinDate: "2023-09-15",
      networkGrowth: 8.3
    },
    {
      id: 3,
      name: "Miguel Promo",
      phone: "+244 967 890 123",
      tier: "Silver",
      activeUsers: 67,
      totalSales: 1675,
      monthlyCommission: 100.50,
      pendingPayout: 100.50,
      lastPayout: "2024-07-30",
      status: "active",
      joinDate: "2023-11-20",
      networkGrowth: 15.2
    },
    {
      id: 4,
      name: "Ana Referral",
      phone: "+244 978 901 234",
      tier: "Lead",
      activeUsers: 8,
      totalSales: 200,
      monthlyCommission: 0, // Below minimum threshold
      pendingPayout: 12.50,
      lastPayout: null,
      status: "inactive",
      joinDate: "2024-01-15",
      networkGrowth: -2.1
    },
  ];

  // Mock commission rules
  const commissionRules = [
    {
      id: 1,
      name: "Base Commission",
      description: "Standard commission rate for all tiers",
      rate: 5.0,
      type: "percentage",
      active: true
    },
    {
      id: 2,
      name: "Volume Bonus",
      description: "Extra commission for high volume sales (>100L/month)",
      rate: 1.0,
      type: "percentage",
      active: true
    },
    {
      id: 3,
      name: "Growth Bonus",
      description: "Bonus for network growth (>10% monthly)",
      rate: 0.5,
      type: "percentage",
      active: false
    }
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
    return status === "active" ? "default" : "secondary";
  };

  const calculateCommission = (sales: number, tier: string) => {
    const baseRate = commissionSettings.baseCommission;
    const multiplier = commissionSettings.tierMultipliers[tier as keyof typeof commissionSettings.tierMultipliers];
    return (sales * baseRate * multiplier) / 100;
  };

  const totalCommissionPaid = influencers.reduce((sum, inf) => sum + inf.monthlyCommission, 0);
  const totalPendingPayouts = influencers.reduce((sum, inf) => sum + inf.pendingPayout, 0);
  const activeInfluencers = influencers.filter(inf => inf.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Commission Settings</h1>
          <p className="text-muted-foreground">Manage influencer commission structure and payouts</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-white to-primary/5 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Influencers</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeInfluencers}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>{influencers.length} total registered</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-success/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Commission</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-success to-success/80">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalCommissionPaid.toFixed(2)}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>This month's payouts</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-warning/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-warning to-warning/80">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${totalPendingPayouts.toFixed(2)}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>Awaiting processing</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-accent/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Commission Rate</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-accent/80">
              <Percent className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{commissionSettings.baseCommission}%</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>Base commission rate</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList>
          <TabsTrigger value="settings">Commission Settings</TabsTrigger>
          <TabsTrigger value="performance">Influencer Performance</TabsTrigger>
          <TabsTrigger value="rules">Commission Rules</TabsTrigger>
          <TabsTrigger value="payouts">Payout Requests</TabsTrigger>
        </TabsList>
        
        {/* Edit Settings Button - Only show on Commission Settings tab */}
        <div className="flex justify-end mt-4">
          <Button 
            onClick={() => setEditingSettings(!editingSettings)}
            className="h-12 px-6 text-base transition-all duration-200 hover:scale-105"
            size="lg"
          >
            {editingSettings ? <Save className="w-5 h-5 mr-2" /> : <Edit className="w-5 h-5 mr-2" />}
            {editingSettings ? "Save Settings" : "Edit Settings"}
          </Button>
        </div>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Commission Settings</CardTitle>
              <CardDescription>Configure how commissions are calculated and paid</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="baseCommission">Base Commission Rate (%)</Label>
                  <Input
                    id="baseCommission"
                    type="number"
                    value={commissionSettings.baseCommission}
                    disabled={!editingSettings}
                    step="0.1"
                  />
                  <p className="text-xs text-muted-foreground">
                    Base percentage of sales converted to commission
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minimumUsers">Minimum Active Users</Label>
                  <Input
                    id="minimumUsers"
                    type="number"
                    value={commissionSettings.minimumActiveUsers}
                    disabled={!editingSettings}
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum users required to earn commission
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payoutThreshold">Payout Threshold ($)</Label>
                  <Input
                    id="payoutThreshold"
                    type="number"
                    value={commissionSettings.payoutThreshold}
                    disabled={!editingSettings}
                    step="1"
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum amount required for payout
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commissionCap">Monthly Commission Cap ($)</Label>
                  <Input
                    id="commissionCap"
                    type="number"
                    value={commissionSettings.commissionCap}
                    disabled={!editingSettings}
                    step="1"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum commission per influencer per month
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tier Multipliers</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(commissionSettings.tierMultipliers).map(([tier, multiplier]) => (
                    <div key={tier} className="space-y-2">
                      <Label className="flex items-center gap-2">
                        {getTierIcon(tier)}
                        {tier}
                      </Label>
                      <Input
                        type="number"
                        value={multiplier}
                        disabled={!editingSettings}
                        step="0.1"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payout Settings</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-approve payouts</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve payouts under threshold
                    </p>
                  </div>
                  <Switch
                    checked={commissionSettings.autoApproval}
                    disabled={!editingSettings}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payoutFrequency">Payout Frequency</Label>
                  <Select value={commissionSettings.payoutFrequency} disabled={!editingSettings}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Influencer Performance</CardTitle>
              <CardDescription>Track individual influencer metrics and commission earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Influencer</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Network Size</TableHead>
                    <TableHead>Sales (L)</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Growth</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {influencers.map((influencer) => (
                    <TableRow key={influencer.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{influencer.name}</div>
                          <div className="text-sm text-muted-foreground">{influencer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getTierBadgeVariant(influencer.tier)} className="flex items-center gap-1 w-fit">
                          {getTierIcon(influencer.tier)}
                          {influencer.tier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-primary" />
                          {influencer.activeUsers}
                          {influencer.activeUsers < commissionSettings.minimumActiveUsers && (
                            <AlertCircle className="w-4 h-4 text-warning ml-1" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{influencer.totalSales}L</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-success">
                          <DollarSign className="w-4 h-4" />
                          ${influencer.monthlyCommission.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 ${influencer.networkGrowth > 0 ? 'text-success' : 'text-destructive'}`}>
                          <TrendingUp className="w-4 h-4" />
                          {influencer.networkGrowth > 0 ? '+' : ''}{influencer.networkGrowth.toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(influencer.status)}>
                          {influencer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Commission Rules</CardTitle>
                  <CardDescription>Manage additional commission rules and bonuses</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Rule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Commission Rule</DialogTitle>
                      <DialogDescription>
                        Add a new commission rule or bonus structure.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="ruleName">Rule Name</Label>
                        <Input id="ruleName" placeholder="Volume Bonus" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ruleDescription">Description</Label>
                        <Input id="ruleDescription" placeholder="Extra commission for high volume sales" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ruleRate">Rate</Label>
                          <Input id="ruleRate" type="number" step="0.1" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ruleType">Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="percentage">Percentage</SelectItem>
                              <SelectItem value="fixed">Fixed Amount</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Rule</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commissionRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{rule.name}</h3>
                          <Badge variant={rule.active ? "default" : "secondary"}>
                            {rule.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                      <p className="text-sm font-medium mt-2">
                        {rule.rate}% {rule.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={rule.active} />
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payout Requests</CardTitle>
              <CardDescription>Review and process influencer payout requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Influencer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Bank Details</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {influencers.filter(inf => inf.pendingPayout > 0).map((influencer) => (
                    <TableRow key={influencer.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{influencer.name}</div>
                          <div className="text-sm text-muted-foreground">{influencer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 font-medium">
                          <DollarSign className="w-4 h-4" />
                          ${influencer.pendingPayout.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          BIC: 0040 0000 1234 5678
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          2024-08-01
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="default">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Commission;