import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Crown,
  Medal,
  Gem,
  Star,
  Edit,
  Save,
  X,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InfluencerLevels = () => {
  const { toast } = useToast();
  const [editingLevel, setEditingLevel] = useState<string | null>(null);
  const [autoPromotionEnabled, setAutoPromotionEnabled] = useState(true);

  const [levelRequirements, setLevelRequirements] = useState([
    {
      id: "silver",
      name: "Silver",
      requiredReferrals: 20,
      requiredActiveClients: 15,
      commissionRate: 20, // 20% per liter
      autoPromotion: true
    },
    {
      id: "gold",
      name: "Gold", 
      requiredReferrals: 50,
      requiredActiveClients: 35,
      commissionRate: 30, // 30% per liter
      autoPromotion: true
    },
    {
      id: "platinum",
      name: "Platinum",
      requiredReferrals: 100,
      requiredActiveClients: 75,
      commissionRate: 40, // 40% per liter
      autoPromotion: true
    }
  ]);

  const influencers = [
    {
      id: 1,
      name: "Pedro Influencer",
      currentLevel: "Gold",
      referrals: 67,
      activeClients: 45,
      monthlySales: 320,
      nextLevel: "Platinum",
      progress: 85
    },
    {
      id: 2,
      name: "Sofia Marketing",
      currentLevel: "Silver",
      referrals: 28,
      activeClients: 22,
      monthlySales: 180,
      nextLevel: "Gold",
      progress: 65
    }
  ];

  const handleEditLevel = (levelId: string) => {
    setEditingLevel(levelId);
  };

  const handleSaveLevel = (levelId: string, updatedData: any) => {
    setLevelRequirements(prev => 
      prev.map(level => 
        level.id === levelId 
          ? { ...level, ...updatedData }
          : level
      )
    );
    setEditingLevel(null);
    toast({
      title: "Level Updated",
      description: "Level requirements have been updated",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Influencer Level Management</h1>
          <p className="text-muted-foreground">
            Configure level requirements and automatic promotion settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={autoPromotionEnabled}
            onCheckedChange={setAutoPromotionEnabled}
          />
          <Label>Auto Promotion</Label>
        </div>
      </div>

      <Tabs defaultValue="requirements" className="space-y-6">
        <TabsList>
          <TabsTrigger value="requirements">Level Requirements</TabsTrigger>
          <TabsTrigger value="promotion">Auto Promotion</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements" className="space-y-6">
          <div className="grid gap-6">
            {levelRequirements.map((level) => (
              <Card key={level.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100">
                        {level.name === "Platinum" && <Crown className="w-5 h-5 text-slate-700" />}
                        {level.name === "Gold" && <Medal className="w-5 h-5 text-amber-600" />}
                        {level.name === "Silver" && <Gem className="w-5 h-5 text-slate-500" />}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{level.name} Level</CardTitle>
                        <CardDescription>
                          Requirements for {level.name} tier influencers
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditLevel(level.id)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingLevel === level.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Required Referrals</Label>
                          <Input
                            type="number"
                            value={level.requiredReferrals}
                            onChange={(e) => handleSaveLevel(level.id, { 
                              requiredReferrals: parseInt(e.target.value) 
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Active Clients</Label>
                          <Input
                            type="number"
                            value={level.requiredActiveClients}
                            onChange={(e) => handleSaveLevel(level.id, { 
                              requiredActiveClients: parseInt(e.target.value) 
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Commission Rate (%)</Label>
                          <Input
                            type="number"
                            value={level.commissionRate}
                            onChange={(e) => handleSaveLevel(level.id, { 
                              commissionRate: parseInt(e.target.value)
                            })}
                            placeholder="20"
                          />
                          <p className="text-xs text-muted-foreground">
                            Commission percentage per liter purchased by network members
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleSaveLevel(level.id, {})}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setEditingLevel(null)}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Requirements</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Referrals:</span>
                            <span className="font-medium">{level.requiredReferrals}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Active Clients:</span>
                            <span className="font-medium">{level.requiredActiveClients}</span>
                          </div>
                                                     <div className="flex justify-between">
                             <span>Commission Rate:</span>
                             <span className="font-medium">{level.commissionRate}%</span>
                           </div>
                          <div className="flex justify-between">
                            <span>Network Focus:</span>
                            <span className="font-medium">Referrals & Clients</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Benefits</h4>
                        <ul className="space-y-1 text-sm">
                                                     <li className="flex items-center gap-2">
                             <CheckCircle className="w-3 h-3 text-green-600" />
                             {level.commissionRate}% commission rate
                           </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            Priority support access
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            Exclusive campaign access
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="promotion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Level Promotion Status
              </CardTitle>
              <CardDescription>
                Monitor influencers approaching level upgrades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Influencer</TableHead>
                    <TableHead>Current Level</TableHead>
                    <TableHead>Next Level</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {influencers.map((influencer) => (
                    <TableRow key={influencer.id}>
                      <TableCell className="font-medium">{influencer.name}</TableCell>
                      <TableCell>{influencer.currentLevel}</TableCell>
                      <TableCell>{influencer.nextLevel}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${influencer.progress >= 80 ? 'bg-green-600' : 'bg-yellow-600'}`}
                              style={{ width: `${influencer.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {influencer.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {influencer.progress >= 100 ? (
                          <Badge variant="default" className="bg-green-600">
                            Ready for Promotion
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            In Progress
                          </Badge>
                        )}
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

export default InfluencerLevels;
