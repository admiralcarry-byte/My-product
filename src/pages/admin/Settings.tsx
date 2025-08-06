import { useState } from "react";
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
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
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

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSaveLoyalty = () => {
    toast({
      title: "Loyalty Settings Saved",
      description: "Loyalty program settings have been updated.",
    });
  };

  const handleSaveSystem = () => {
    toast({
      title: "System Settings Saved",
      description: "System configuration has been updated.",
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup Started",
      description: "System backup is being created. You'll be notified when complete.",
    });
  };

  const handleRestore = () => {
    toast({
      title: "Restore Initiated",
      description: "System restore process has started.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure application settings and preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBackup}>
            <Download className="w-4 h-4 mr-2" />
            Backup
          </Button>
          <Button variant="outline" onClick={handleRestore}>
            <Upload className="w-4 h-4 mr-2" />
            Restore
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                General Settings
              </CardTitle>
              <CardDescription>Configure basic application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appName">Application Name</Label>
                  <Input
                    id="appName"
                    value={generalSettings.appName}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, appName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={generalSettings.currency} onValueChange={(value) => 
                    setGeneralSettings(prev => ({ ...prev, currency: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="AOA">AOA - Angolan Kwanza</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={generalSettings.timezone} onValueChange={(value) => 
                    setGeneralSettings(prev => ({ ...prev, timezone: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Luanda">Africa/Luanda</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appDescription">Application Description</Label>
                <Textarea
                  id="appDescription"
                  value={generalSettings.appDescription}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, appDescription: e.target.value }))}
                  rows={3}
                />
              </div>
              <Button onClick={handleSaveGeneral}>
                <Save className="w-4 h-4 mr-2" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive push notifications</div>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">SMS Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive notifications via SMS</div>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Weekly Reports</div>
                    <div className="text-sm text-muted-foreground">Receive weekly analytics reports</div>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, weeklyReports: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">New User Alerts</div>
                    <div className="text-sm text-muted-foreground">Get notified when new users register</div>
                  </div>
                  <Switch
                    checked={notificationSettings.newUserAlerts}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, newUserAlerts: checked }))
                    }
                  />
                </div>
              </div>
              <Button onClick={handleSaveNotifications}>
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Loyalty Program Settings
              </CardTitle>
              <CardDescription>Configure loyalty tiers and rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="silverMin">Silver Tier (Min Liters)</Label>
                  <Input
                    id="silverMin"
                    type="number"
                    value={loyaltySettings.silverMinLiters}
                    onChange={(e) => setLoyaltySettings(prev => ({ ...prev, silverMinLiters: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goldMin">Gold Tier (Min Liters)</Label>
                  <Input
                    id="goldMin"
                    type="number"
                    value={loyaltySettings.goldMinLiters}
                    onChange={(e) => setLoyaltySettings(prev => ({ ...prev, goldMinLiters: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platinumMin">Platinum Tier (Min Liters)</Label>
                  <Input
                    id="platinumMin"
                    type="number"
                    value={loyaltySettings.platinumMinLiters}
                    onChange={(e) => setLoyaltySettings(prev => ({ ...prev, platinumMinLiters: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cashbackPercent">Cashback Percentage (%)</Label>
                  <Input
                    id="cashbackPercent"
                    type="number"
                    value={loyaltySettings.cashbackPercentage}
                    onChange={(e) => setLoyaltySettings(prev => ({ ...prev, cashbackPercentage: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commissionPercent">Commission Percentage (%)</Label>
                  <Input
                    id="commissionPercent"
                    type="number"
                    value={loyaltySettings.commissionPercentage}
                    onChange={(e) => setLoyaltySettings(prev => ({ ...prev, commissionPercentage: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minNetwork">Minimum Network Size</Label>
                  <Input
                    id="minNetwork"
                    type="number"
                    value={loyaltySettings.minimumNetworkSize}
                    onChange={(e) => setLoyaltySettings(prev => ({ ...prev, minimumNetworkSize: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <Button onClick={handleSaveLoyalty}>
                <Save className="w-4 h-4 mr-2" />
                Save Loyalty Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                System Settings
              </CardTitle>
              <CardDescription>Configure system-level settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Auto Backup</div>
                    <div className="text-sm text-muted-foreground">Automatically backup data daily</div>
                  </div>
                  <Switch
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, autoBackup: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Maintenance Mode</div>
                    <div className="text-sm text-muted-foreground">Enable maintenance mode</div>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Debug Mode</div>
                    <div className="text-sm text-muted-foreground">Enable debug logging</div>
                  </div>
                  <Switch
                    checked={systemSettings.debugMode}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, debugMode: checked }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">API Rate Limit (req/min)</Label>
                  <Input
                    id="rateLimit"
                    type="number"
                    value={systemSettings.apiRateLimit}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, apiRateLimit: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <Button onClick={handleSaveSystem}>
                <Save className="w-4 h-4 mr-2" />
                Save System Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;