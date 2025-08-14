import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Shield,
  Key,
  Save,
  Upload,
  Activity,
  Sparkles,
  ArrowUpRight,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Settings,
  Edit,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    loginCount: 0,
    actionsCount: 0,
    lastActivity: 0
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
          loginCount: Math.floor(156 * progress),
          actionsCount: Math.floor(89 * progress),
          lastActivity: Math.floor(24 * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedValues({
            loginCount: 156,
            actionsCount: 89,
            lastActivity: 24
          });
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    animateNumbers();
  }, []);

  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@aguatwezah.com",
    phone: "+244 900 000 000",
    role: "Super Administrator",
    department: "Management",
    joinDate: "2023-01-15",
    lastLogin: "2024-12-19 10:30 AM"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated Successfully!",
      description: "Your profile information has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original values if needed
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Updated Successfully!",
      description: "Your password has been successfully changed.",
    });
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const activityLog = [
    { action: "Login", time: "Today at 10:30 AM", ip: "192.168.1.100", status: "success" },
    { action: "User Created", time: "Yesterday at 3:45 PM", ip: "192.168.1.100", status: "success" },
    { action: "Report Generated", time: "Dec 17 at 2:20 PM", ip: "192.168.1.100", status: "success" },
    { action: "Settings Modified", time: "Dec 17 at 11:15 AM", ip: "192.168.1.100", status: "warning" },
    { action: "Login", time: "Dec 17 at 9:00 AM", ip: "192.168.1.100", status: "success" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-white to-slate-50 border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-water-blue bg-clip-text text-transparent">
            Admin Profile
          </h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-success to-success/80 text-white shadow-success animate-pulse-glow">
            <Shield className="w-4 h-4 mr-1" />
            Administrator
          </Badge>
          <Button className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logins</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <Activity className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{animatedValues.loginCount}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions Taken</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
              <User className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{animatedValues.actionsCount}</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Active</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{animatedValues.lastActivity}h</div>
            <div className="flex items-center text-xs text-success font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Profile Overview */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <CardHeader className="text-center bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <CardTitle className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24 ring-4 ring-primary/20 shadow-lg">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary/80 text-white">AD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center ring-4 ring-white">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{profileData.name}</h3>
                <p className="text-sm text-muted-foreground">{profileData.role}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined {profileData.joinDate}</span>
                </div>
              </div>
              
              <Badge className="bg-gradient-to-r from-primary/10 to-water-blue/10 text-primary border-primary/20">
                <Shield className="w-3 h-3 mr-1" />
                {profileData.department}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Profile Settings */}
        <Card className="lg:col-span-2 border-0 shadow-lg animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Profile Settings
            </CardTitle>
            <CardDescription>Update your profile information and security settings</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-slate-50 to-slate-100">
                <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Profile Info</TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                      disabled={!isEditing}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleProfileUpdate} className="bg-gradient-to-r from-success to-success/80 hover:shadow-success shadow-md">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit} className="bg-gradient-to-r from-slate-50 to-slate-100">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="bg-gradient-to-r from-slate-50 to-white"
                    />
                  </div>
                  
                  <Button onClick={handlePasswordUpdate} className="bg-gradient-to-r from-primary to-water-blue hover:shadow-primary shadow-md">
                    <Key className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Activity Log */}
      <Card className="border-0 shadow-lg animate-fade-in" style={{ animationDelay: '1.0s' }}>
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your recent account activities and login history</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {activityLog.map((activity, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-gradient-to-r from-white to-slate-50/50 hover:from-slate-50 hover:to-slate-100 transition-all duration-300 hover:shadow-md hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-water-blue/10 flex items-center justify-center">
                    {getStatusIcon(activity.status)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{activity.action}</div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  IP: {activity.ip}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;