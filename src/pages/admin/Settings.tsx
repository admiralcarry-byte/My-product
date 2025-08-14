import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Settings as SettingsIcon,
  Bell,
  Database,
  Shield,
  Mail,
  Smartphone,
  Globe,
  Save,
  RefreshCw,
  Download,
  Upload,
  Users as UsersIcon,
  Activity,
  Sparkles,
  ArrowUpRight,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Zap,
  Badge
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [animatedValues, setAnimatedValues] = useState({
    activeSettings: 0,
    savedChanges: 0,
    systemStatus: 0
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
          activeSettings: Math.floor(24 * progress),
          savedChanges: Math.floor(156 * progress),
          systemStatus: Math.floor(100 * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedValues({
            activeSettings: 24,
            savedChanges: 156,
            systemStatus: 100
          });
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    animateNumbers();
  }, []);
  
  const [generalSettings, setGeneralSettings] = useState({
    appName: "ÁGUA TWEZAH",
    appDescription: "Premium Water Loyalty Program",
    supportEmail: "support@aguatwezah.com",
    currency: "USD",
    timezone: "Africa/Luanda",
    language: "Portuguese"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    lowStockAlerts: true,
    newUserAlerts: true,
    commissionAlerts: true
  });

  const [loyaltySettings, setLoyaltySettings] = useState({
    leadMinLiters: 0,
    silverMinLiters: 50,
    goldMinLiters: 200,
    platinumMinLiters: 500,
    cashbackPercentage: 20,
    commissionPercentage: 10,
    minimumNetworkSize: 10
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    maintenanceMode: false,
    debugMode: false,
    apiRateLimit: 1000,
    sessionTimeout: 30,
    maxFileSize: 10
  });

  const [influencerSettings, setInfluencerSettings] = useState({
    minimumClientsForMonetization: 50,
    commissionPercentagePerClient: 10,
    enableInfluencerMonetization: true
  });

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved Successfully!",
      description: "General settings have been updated successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved!",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSaveLoyalty = () => {
    toast({
      title: "Loyalty Settings Saved!",
      description: "Loyalty program settings have been updated.",
    });
  };

  const handleSaveSystem = () => {
    toast({
      title: "System Settings Saved!",
      description: "System configuration has been updated successfully.",
    });
  };

  const handleSaveInfluencer = () => {
    toast({
      title: "Influencer Settings Saved!",
      description: "Influencer program settings have been updated.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-white to-slate-50 border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-water-blue bg-clip-text text-transparent">
            System Settings
          </h1>
          <p className="text-muted-foreground mt-1">Configure system preferences and application settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-success to-success/80 text-white shadow-success animate-pulse-glow">
            <Zap className="w-4 h-4 mr-1" />
            System Active
          </Badge>
          <Button className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
            <Save className="w-4 h-4 mr-2" />
            Save All
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Settings</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <SettingsIcon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{animatedValues.activeSettings}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Changes</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{animatedValues.savedChanges}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +18% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <Shield className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{animatedValues.systemStatus}%</div>
            <div className="flex items-center text-xs text-success font-medium">
              <CheckCircle className="w-3 h-3 mr-1" />
              All Systems Operational
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Settings Tabs */}
      <Card className="border-0 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Configuration Settings
          </CardTitle>
          <CardDescription>Manage all system configurations and preferences</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-slate-50 to-slate-100">
              <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">General</TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Notifications</TabsTrigger>
              <TabsTrigger value="loyalty" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Loyalty</TabsTrigger>
              <TabsTrigger value="system" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">System</TabsTrigger>
              <TabsTrigger value="influencer" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Influencer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="appName">Application Name</Label>
                    <Input
                      id="appName"
                      value={generalSettings.appName}
                      onChange={(e) => setGeneralSettings({...generalSettings, appName: e.target.value})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={generalSettings.currency} onValueChange={(value) => setGeneralSettings({...generalSettings, currency: value})}>
                      <SelectTrigger className="bg-gradient-to-r from-slate-50 to-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="AOA">AOA (Kz)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="appDescription">App Description</Label>
                    <Textarea
                      id="appDescription"
                      value={generalSettings.appDescription}
                      onChange={(e) => setGeneralSettings({...generalSettings, appDescription: e.target.value})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}>
                      <SelectTrigger className="bg-gradient-to-r from-slate-50 to-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Luanda">Africa/Luanda</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}>
                      <SelectTrigger className="bg-gradient-to-r from-slate-50 to-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Portuguese">Portuguese</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveGeneral} className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
                <Save className="w-4 h-4 mr-2" />
                Save General Settings
              </Button>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive SMS notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">Receive weekly system reports</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, weeklyReports: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">Low Stock Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified of low stock</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.lowStockAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, lowStockAlerts: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex items-center gap-3">
                      <UsersIcon className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">New User Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified of new registrations</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.newUserAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newUserAlerts: checked})}
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveNotifications} className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </TabsContent>
            
            <TabsContent value="loyalty" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="silverMinLiters">Silver Tier (Min Liters)</Label>
                    <Input
                      id="silverMinLiters"
                      type="number"
                      value={loyaltySettings.silverMinLiters}
                      onChange={(e) => setLoyaltySettings({...loyaltySettings, silverMinLiters: parseInt(e.target.value)})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goldMinLiters">Gold Tier (Min Liters)</Label>
                    <Input
                      id="goldMinLiters"
                      type="number"
                      value={loyaltySettings.goldMinLiters}
                      onChange={(e) => setLoyaltySettings({...loyaltySettings, goldMinLiters: parseInt(e.target.value)})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platinumMinLiters">Platinum Tier (Min Liters)</Label>
                    <Input
                      id="platinumMinLiters"
                      type="number"
                      value={loyaltySettings.platinumMinLiters}
                      onChange={(e) => setLoyaltySettings({...loyaltySettings, platinumMinLiters: parseInt(e.target.value)})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cashbackPercentage">Cashback Percentage (%)</Label>
                    <Input
                      id="cashbackPercentage"
                      type="number"
                      value={loyaltySettings.cashbackPercentage}
                      onChange={(e) => setLoyaltySettings({...loyaltySettings, cashbackPercentage: parseInt(e.target.value)})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commissionPercentage">Commission Percentage (%)</Label>
                    <Input
                      id="commissionPercentage"
                      type="number"
                      value={loyaltySettings.commissionPercentage}
                      onChange={(e) => setLoyaltySettings({...loyaltySettings, commissionPercentage: parseInt(e.target.value)})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minimumNetworkSize">Minimum Network Size</Label>
                    <Input
                      id="minimumNetworkSize"
                      type="number"
                      value={loyaltySettings.minimumNetworkSize}
                      onChange={(e) => setLoyaltySettings({...loyaltySettings, minimumNetworkSize: parseInt(e.target.value)})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveLoyalty} className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
                <Save className="w-4 h-4 mr-2" />
                Save Loyalty Settings
              </Button>
            </TabsContent>
            
            <TabsContent value="system" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">Auto Backup</Label>
                        <p className="text-sm text-muted-foreground">Automatically backup system data</p>
                      </div>
                    </div>
                    <Switch
                      checked={systemSettings.autoBackup}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoBackup: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable system maintenance mode</p>
                      </div>
                    </div>
                    <Switch
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, maintenanceMode: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable debug logging</p>
                      </div>
                    </div>
                    <Switch
                      checked={systemSettings.debugMode}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, debugMode: checked})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiRateLimit">API Rate Limit</Label>
                    <Input
                      id="apiRateLimit"
                      type="number"
                      value={systemSettings.apiRateLimit}
                      onChange={(e) => setSystemSettings({...systemSettings, apiRateLimit: parseInt(e.target.value)})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={systemSettings.sessionTimeout}
                      onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: parseInt(e.target.value)})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={systemSettings.maxFileSize}
                      onChange={(e) => setSystemSettings({...systemSettings, maxFileSize: parseInt(e.target.value)})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveSystem} className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
                <Save className="w-4 h-4 mr-2" />
                Save System Settings
              </Button>
            </TabsContent>
            
            <TabsContent value="influencer" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="minimumClients">Minimum Clients for Monetization</Label>
                    <Input
                      id="minimumClients"
                      type="number"
                      value={influencerSettings.minimumClientsForMonetization}
                      onChange={(e) => setInfluencerSettings({...influencerSettings, minimumClientsForMonetization: parseInt(e.target.value)})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commissionPerClient">Commission % per Client</Label>
                    <Input
                      id="commissionPerClient"
                      type="number"
                      value={influencerSettings.commissionPercentagePerClient}
                      onChange={(e) => setInfluencerSettings({...influencerSettings, commissionPercentagePerClient: parseInt(e.target.value)})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex items-center gap-3">
                      <UsersIcon className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">Enable Influencer Monetization</Label>
                        <p className="text-sm text-muted-foreground">Allow influencers to earn commissions</p>
                      </div>
                    </div>
                    <Switch
                      checked={influencerSettings.enableInfluencerMonetization}
                      onCheckedChange={(checked) => setInfluencerSettings({...influencerSettings, enableInfluencerMonetization: checked})}
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveInfluencer} className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
                <Save className="w-4 h-4 mr-2" />
                Save Influencer Settings
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;