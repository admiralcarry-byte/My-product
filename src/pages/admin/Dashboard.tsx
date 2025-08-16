import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  Droplets,
  DollarSign,
  TrendingUp,
  Crown,
  Medal,
  Gem,
  Star,
  Eye,
  ArrowUpRight,
  Calendar,
  MapPin,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { geolocationService } from "@/services/geolocation";

const Dashboard = () => {
  // Mock data for charts
  const salesData = [
    { month: "Jan", liters: 4500, revenue: 2250 },
    { month: "Feb", liters: 5200, revenue: 2600 },
    { month: "Mar", liters: 4800, revenue: 2400 },
    { month: "Apr", liters: 6100, revenue: 3050 },
    { month: "May", liters: 7300, revenue: 3650 },
    { month: "Jun", liters: 8900, revenue: 4450 },
  ];

  const loyaltyDistribution = [
    { name: "Lead", value: 45, color: "hsl(var(--accent))", gradient: "url(#leadGradient)" },
    { name: "Silver", value: 30, color: "hsl(var(--loyalty-silver))", gradient: "url(#silverGradient)" },
    { name: "Gold", value: 20, color: "hsl(var(--loyalty-gold))", gradient: "url(#goldGradient)" },
    { name: "Platinum", value: 5, color: "hsl(var(--loyalty-platinum))", gradient: "url(#platinumGradient)" },
  ];

  const recentUsers = [
    { id: 1, name: "Maria Silva", phone: "+244 923 456 789", tier: "Gold", liters: 145, joined: "2 hours ago" },
    { id: 2, name: "João Santos", phone: "+244 912 345 678", tier: "Silver", liters: 89, joined: "5 hours ago" },
    { id: 3, name: "Ana Costa", phone: "+244 934 567 890", tier: "Platinum", liters: 234, joined: "1 day ago" },
    { id: 4, name: "Carlos Lima", phone: "+244 945 678 901", tier: "Lead", liters: 23, joined: "2 days ago" },
  ];

  const topInfluencers = [
    { name: "Pedro Influencer", network: 145, commission: "$1,250", tier: "Platinum" },
    { name: "Sofia Marketing", network: 98, commission: "$890", tier: "Gold" },
    { name: "Miguel Promo", network: 67, commission: "$560", tier: "Silver" },
  ];

  // Mock store locations for dashboard
  const storeLocations = [
    { name: "Luanda Central", city: "Luanda", latitude: -8.8383, longitude: 13.2344, sales: 125000 },
    { name: "Benguela", city: "Benguela", latitude: -12.5778, longitude: 13.4077, sales: 89000 },
    { name: "Huambo", city: "Huambo", latitude: -12.7761, longitude: 15.7392, sales: 75000 },
    { name: "Lobito", city: "Lobito", latitude: -12.3647, longitude: 13.5361, sales: 65000 },
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-white to-water-mist border border-border shadow-sm">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-water-blue bg-clip-text text-transparent">
            Welcome back, Admin!
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your loyalty program today.</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
          <Link to="/admin/reports">
            <Calendar className="w-4 h-4 mr-2" />
            View Reports
          </Link>
        </Button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-white to-water-mist border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-water-blue">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2,845</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from last month
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
            <div className="text-2xl font-bold text-water-blue">45,890</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-success/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Paid</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-success to-success/80">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$12,450</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-accent/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Influencers</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-accent/80">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">127</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.7% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly liters sold and revenue generated</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="liters" 
                  stroke="hsl(var(--water-blue))" 
                  strokeWidth={3}
                  name="Liters"
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-water-mist/30 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-water-blue bg-clip-text text-transparent">
              Loyalty Tier Distribution
            </CardTitle>
            <CardDescription>User distribution across loyalty levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <defs>
                  <radialGradient id="leadGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={1} />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.7} />
                  </radialGradient>
                  <radialGradient id="silverGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(var(--loyalty-silver))" stopOpacity={1} />
                    <stop offset="100%" stopColor="hsl(var(--loyalty-silver))" stopOpacity={0.7} />
                  </radialGradient>
                  <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(var(--loyalty-gold))" stopOpacity={1} />
                    <stop offset="100%" stopColor="hsl(var(--loyalty-gold))" stopOpacity={0.7} />
                  </radialGradient>
                  <radialGradient id="platinumGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(var(--loyalty-platinum))" stopOpacity={1} />
                    <stop offset="100%" stopColor="hsl(var(--loyalty-platinum))" stopOpacity={0.7} />
                  </radialGradient>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <Pie
                  data={loyaltyDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={130}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={3}
                  filter="url(#shadow)"
                >
                  {loyaltyDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.gradient}
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)",
                    fontWeight: "500"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {loyaltyDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store Locations Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Store Locations
            </CardTitle>
            <CardDescription>Geographic distribution of our stores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {storeLocations.map((store, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div>
                      <div className="font-medium text-sm">{store.name}</div>
                      <div className="text-xs text-muted-foreground">{store.city}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">${store.sales.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {store.latitude.toFixed(4)}, {store.longitude.toFixed(4)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Geographic Coverage
            </CardTitle>
            <CardDescription>Store distribution across Angola</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cities Covered</span>
                <span className="font-semibold">{new Set(storeLocations.map(s => s.city)).size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Stores</span>
                <span className="font-semibold">{storeLocations.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Northernmost</span>
                <span className="font-semibold">Luanda</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Southernmost</span>
                <span className="font-semibold">Lobito</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest user registrations and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Liters</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTierBadgeVariant(user.tier)} className="flex items-center gap-1 w-fit">
                        {getTierIcon(user.tier)}
                        {user.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.liters}L</TableCell>
                    <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Influencers</CardTitle>
            <CardDescription>Highest performing influencers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topInfluencers.map((influencer, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{influencer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {influencer.network} users in network
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-success">{influencer.commission}</div>
                    <Badge variant={getTierBadgeVariant(influencer.tier)} className="flex items-center gap-1">
                      {getTierIcon(influencer.tier)}
                      {influencer.tier}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;