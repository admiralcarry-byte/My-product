import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Send, 
  Bell, 
  Users, 
  Calendar,
  Target,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Notifications = () => {
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    audience: "",
    type: "general"
  });
  const { toast } = useToast();

  const notificationHistory = [
    { 
      id: 1, 
      title: "Welcome Bonus Available", 
      message: "Get 10% cashback on your first purchase!", 
      audience: "New Users",
      sent: "2 hours ago",
      status: "sent",
      recipients: 45
    },
    { 
      id: 2, 
      title: "Level Up Celebration", 
      message: "Congratulations on reaching Gold tier!", 
      audience: "Gold Users",
      sent: "1 day ago",
      status: "sent",
      recipients: 123
    },
    { 
      id: 3, 
      title: "Commission Payout Ready", 
      message: "Your commission is ready for withdrawal", 
      audience: "Influencers",
      sent: "2 days ago",
      status: "sent",
      recipients: 67
    },
    { 
      id: 4, 
      title: "Monthly Target Reminder", 
      message: "You're 80% towards your monthly goal!", 
      audience: "All Users",
      sent: "3 days ago",
      status: "sent",
      recipients: 1234
    },
  ];

  const handleSendNotification = () => {
    if (!notification.title || !notification.message || !notification.audience) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notification Sent",
      description: `Notification sent to ${notification.audience}`,
    });

    setNotification({
      title: "",
      message: "",
      audience: "",
      type: "general"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge variant="default">Sent</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground">Send push notifications and manage communication with users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Notification Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send New Notification
            </CardTitle>
            <CardDescription>Create and send push notifications to users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Notification Title</Label>
              <Input
                id="title"
                placeholder="Enter notification title"
                value={notification.title}
                onChange={(e) => setNotification(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your notification message..."
                rows={4}
                value={notification.message}
                onChange={(e) => setNotification(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Select value={notification.audience} onValueChange={(value) => setNotification(prev => ({ ...prev, audience: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="users">Customers Only</SelectItem>
                  <SelectItem value="influencers">Influencers Only</SelectItem>
                  <SelectItem value="lead">Lead Tier</SelectItem>
                  <SelectItem value="silver">Silver Tier</SelectItem>
                  <SelectItem value="gold">Gold Tier</SelectItem>
                  <SelectItem value="platinum">Platinum Tier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Notification Type</Label>
              <Select value={notification.type} onValueChange={(value) => setNotification(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                  <SelectItem value="reward">Reward</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="achievement">Achievement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSendNotification} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Total Users</span>
                </div>
                <span className="font-bold">2,845</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Notifications Sent Today</span>
                </div>
                <span className="font-bold">12</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">Delivery Rate</span>
                </div>
                <span className="font-bold text-success">98.5%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Daily Goal Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Weekly Progress Update
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                New Feature Announcement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Notification History
          </CardTitle>
          <CardDescription>Recent notifications sent to users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-50 to-blue-100">
                <TableHead className="text-blue-800 font-semibold">Status</TableHead>
                <TableHead className="text-blue-800 font-semibold">Title</TableHead>
                <TableHead className="text-blue-800 font-semibold">Message</TableHead>
                <TableHead className="text-blue-800 font-semibold">Audience</TableHead>
                <TableHead className="text-blue-800 font-semibold">Recipients</TableHead>
                <TableHead className="text-blue-800 font-semibold">Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notificationHistory.map((notif, index) => (
                <TableRow 
                  key={notif.id}
                  className={`${
                    index % 2 === 0 
                      ? 'bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200' 
                      : 'bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200'
                  } transition-colors duration-200`}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(notif.status)}
                      {getStatusBadge(notif.status)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-800">{notif.title}</TableCell>
                  <TableCell className="max-w-xs truncate text-gray-700">{notif.message}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-white border-blue-300 text-blue-700">
                      {notif.audience}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-800">{notif.recipients}</TableCell>
                  <TableCell className="text-gray-600">{notif.sent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;