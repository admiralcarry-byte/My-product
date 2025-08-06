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
  Plus, 
  Megaphone, 
  Edit, 
  Trash2,
  Eye,
  Play,
  Pause,
  Image,
  Video,
  MapPin,
  Crown,
  Medal,
  Gem,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Campaigns = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    city: "",
    tier: "",
    type: "image",
    mediaUrl: ""
  });
  const { toast } = useToast();

  const campaigns = [
    {
      id: 1,
      title: "Summer Hydration Challenge",
      description: "Stay hydrated this summer with special rewards!",
      city: "Luanda",
      tier: "All",
      type: "image",
      status: "active",
      views: 1234,
      engagement: "85%",
      created: "2 days ago"
    },
    {
      id: 2,
      title: "Gold Tier Exclusive",
      description: "Special benefits for our Gold tier members",
      city: "Benguela",
      tier: "Gold",
      type: "video",
      status: "active",
      views: 567,
      engagement: "92%",
      created: "1 week ago"
    },
    {
      id: 3,
      title: "New Customer Welcome",
      description: "Welcome new customers with amazing offers",
      city: "All Cities",
      tier: "Lead",
      type: "image",
      status: "paused",
      views: 2890,
      engagement: "78%",
      created: "2 weeks ago"
    },
    {
      id: 4,
      title: "Platinum VIP Experience",
      description: "Exclusive perks for our most loyal customers",
      city: "Luanda",
      tier: "Platinum",
      type: "video",
      status: "draft",
      views: 0,
      engagement: "0%",
      created: "3 days ago"
    }
  ];

  const handleCreateCampaign = () => {
    if (!campaign.title || !campaign.description || !campaign.city || !campaign.tier) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Campaign Created",
      description: `Campaign "${campaign.title}" has been created successfully`,
    });

    setCampaign({
      title: "",
      description: "",
      city: "",
      tier: "",
      type: "image",
      mediaUrl: ""
    });
    setIsCreateModalOpen(false);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Platinum": return <Crown className="w-4 h-4 text-loyalty-platinum" />;
      case "Gold": return <Medal className="w-4 h-4 text-loyalty-gold" />;
      case "Silver": return <Gem className="w-4 h-4 text-loyalty-silver" />;
      case "Lead": return <Star className="w-4 h-4 text-accent" />;
      default: return <Star className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "paused":
        return <Badge variant="secondary">Paused</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const toggleCampaignStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    toast({
      title: "Campaign Updated",
      description: `Campaign ${newStatus === "active" ? "activated" : "paused"}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground">Create and manage promotional campaigns for different user segments</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-white to-primary/5 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <Megaphone className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>2 new this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-water-light/20 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-water-blue to-water-deep">
              <Eye className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-water-blue">24,691</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>+15% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-accent/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-accent/80">
              <Star className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">83.7%</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>+5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-success/10 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performing</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-success to-success/80">
              <MapPin className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Luanda</div>
            <div className="flex items-center text-xs text-success font-medium">
              <span>92% engagement rate</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Campaign Form */}
      {isCreateModalOpen && (
        <Card className="bg-gradient-to-br from-card to-water-mist/30 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <Plus className="w-5 h-5 text-white" />
              </div>
              Create New Campaign
            </CardTitle>
            <CardDescription>Design a targeted campaign for specific user segments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  placeholder="Enter campaign title"
                  value={campaign.title}
                  onChange={(e) => setCampaign(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Media Type</Label>
                <Select value={campaign.type} onValueChange={(value) => setCampaign(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter campaign description..."
                rows={3}
                value={campaign.description}
                onChange={(e) => setCampaign(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Target City</Label>
                <Select value={campaign.city} onValueChange={(value) => setCampaign(prev => ({ ...prev, city: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="luanda">Luanda</SelectItem>
                    <SelectItem value="benguela">Benguela</SelectItem>
                    <SelectItem value="huambo">Huambo</SelectItem>
                    <SelectItem value="lobito">Lobito</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tier">Target Tier</Label>
                <Select value={campaign.tier} onValueChange={(value) => setCampaign(prev => ({ ...prev, tier: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mediaUrl">Media URL</Label>
              <Input
                id="mediaUrl"
                placeholder="Enter image/video URL"
                value={campaign.mediaUrl}
                onChange={(e) => setCampaign(prev => ({ ...prev, mediaUrl: e.target.value }))}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateCampaign}>
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>Manage your promotional campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((camp) => (
                <TableRow key={camp.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{camp.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {camp.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{camp.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTierIcon(camp.tier)}
                        <span className="text-sm">{camp.tier}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {camp.type === "image" ? <Image className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                      <span className="capitalize">{camp.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(camp.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{camp.views} views</div>
                      <div className="text-sm text-muted-foreground">{camp.engagement} engagement</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{camp.created}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCampaignStatus(camp.id, camp.status)}
                      >
                        {camp.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
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

export default Campaigns;