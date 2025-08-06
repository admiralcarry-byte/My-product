import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Download, 
  FileText, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Droplets,
  Calendar
} from "lucide-react";

const Reports = () => {
  // Mock data for reports
  const monthlyStats = [
    { month: "Jan", sales: 4500, users: 120, commission: 450 },
    { month: "Feb", sales: 5200, users: 145, commission: 520 },
    { month: "Mar", sales: 4800, users: 132, commission: 480 },
    { month: "Apr", sales: 6100, users: 178, commission: 610 },
    { month: "May", sales: 7300, users: 205, commission: 730 },
    { month: "Jun", sales: 8900, users: 234, commission: 890 },
  ];

  const tierDistribution = [
    { name: "Lead", value: 45, color: "hsl(var(--accent))" },
    { name: "Silver", value: 30, color: "hsl(var(--loyalty-silver))" },
    { name: "Gold", value: 20, color: "hsl(var(--loyalty-gold))" },
    { name: "Platinum", value: 5, color: "hsl(var(--loyalty-platinum))" },
  ];

  const topInfluencers = [
    { name: "Pedro Silva", network: 145, commission: "$1,250", sales: "2,890L" },
    { name: "Sofia Costa", network: 98, commission: "$890", sales: "1,950L" },
    { name: "Miguel Santos", network: 67, commission: "$560", sales: "1,340L" },
    { name: "Ana Ferreira", network: 45, commission: "$380", sales: "900L" },
    { name: "João Lima", network: 34, commission: "$290", sales: "680L" },
  ];

  const exportReport = (type: string) => {
    console.log(`Exporting ${type} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into your loyalty program performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportReport("excel")}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => exportReport("pdf")}>
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$36,580</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-success" />
              +18.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-success" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liters</CardTitle>
            <Droplets className="h-4 w-4 text-water-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73,200L</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-success" />
              +15.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$29.60</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-success" />
              +8.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Sales, users, and commission trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyStats}>
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
                  dataKey="sales" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Sales ($)"
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="hsl(var(--water-blue))" 
                  strokeWidth={2}
                  name="New Users"
                />
                <Line 
                  type="monotone" 
                  dataKey="commission" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Commission ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Tier Distribution</CardTitle>
            <CardDescription>Breakdown of users by loyalty tier</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tierDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {tierDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {tierDistribution.map((item) => (
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

      {/* Top Influencers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Influencers Performance</CardTitle>
          <CardDescription>Highest performing influencers this month</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Influencer</TableHead>
                <TableHead>Network Size</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Commission Earned</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topInfluencers.map((influencer, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge variant={index < 3 ? "default" : "secondary"}>
                      #{index + 1}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{influencer.name}</TableCell>
                  <TableCell>{influencer.network} users</TableCell>
                  <TableCell>{influencer.sales}</TableCell>
                  <TableCell className="font-bold text-success">{influencer.commission}</TableCell>
                  <TableCell>
                    <Badge variant={index < 2 ? "default" : index < 4 ? "secondary" : "outline"}>
                      {index < 2 ? "Excellent" : index < 4 ? "Good" : "Average"}
                    </Badge>
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

export default Reports;