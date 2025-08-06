import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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
import {
  Users as UsersIcon,
  Search,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  Ban,
  Crown,
  Medal,
  Gem,
  Star,
  Phone,
  Mail,
  Calendar,
  Droplets,
  DollarSign,
  Eye,
  MoreHorizontal,
  Key,
  Settings,
  UserCog,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Users = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTier, setFilterTier] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");

  // Mock data
  const users = [
    {
      id: 1,
      name: "Maria Silva",
      phone: "+244 923 456 789",
      email: "maria@email.com",
      type: "customer",
      tier: "Gold",
      liters: 245,
      cashback: 49.50,
      referrals: 0,
      joinDate: "2024-01-15",
      status: "active",
      influencer: "Pedro Influencer"
    },
    {
      id: 2,
      name: "Pedro Influencer",
      phone: "+244 912 345 678",
      email: "pedro@email.com",
      type: "influencer",
      tier: "Platinum",
      liters: 0,
      cashback: 0,
      referrals: 145,
      commission: 1250.00,
      joinDate: "2023-08-10",
      status: "active",
      influencer: null
    },
    {
      id: 3,
      name: "João Santos",
      phone: "+244 934 567 890",
      email: "joao@email.com",
      type: "customer",
      tier: "Silver",
      liters: 89,
      cashback: 17.80,
      referrals: 0,
      joinDate: "2024-02-20",
      status: "active",
      influencer: "Sofia Marketing"
    },
    {
      id: 4,
      name: "Ana Costa",
      phone: "+244 945 678 901",
      email: "ana@email.com",
      type: "customer",
      tier: "Platinum",
      liters: 450,
      cashback: 135.00,
      referrals: 0,
      joinDate: "2023-12-05",
      status: "blocked",
      influencer: "Pedro Influencer"
    },
    {
      id: 5,
      name: "Sofia Marketing",
      phone: "+244 956 789 012",
      email: "sofia@email.com",
      type: "influencer",
      tier: "Gold",
      liters: 0,
      cashback: 0,
      referrals: 98,
      commission: 890.00,
      joinDate: "2023-09-15",
      status: "active",
      influencer: null
    },
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
    switch (status) {
      case "active": return "default";
      case "blocked": return "destructive";
      default: return "secondary";
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    return type === "influencer" ? "secondary" : "outline";
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === "all" || user.tier === filterTier;
    const matchesType = filterType === "all" || user.type === filterType;
    
    return matchesSearch && matchesTier && matchesType;
  });

  const customers = filteredUsers.filter(user => user.type === "customer");
  const influencers = filteredUsers.filter(user => user.type === "influencer");

  const handleEditUser = (user: any) => {
    setEditingUser(user);
  };

  const handleChangePassword = (user: any) => {
    if (!newPassword) {
      toast({
        title: "Error",
        description: "Please enter a new password",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: `Password changed successfully for ${user.name}`,
      variant: "success",
    });
    setNewPassword("");
    setEditingUser(null);
  };

  const handleUpdateUser = (updatedData: any) => {
    toast({
      title: "User Updated",
      description: `${updatedData.name}'s information has been updated`,
      variant: "success",
    });
    setEditingUser(null);
  };

  const handleBlockUser = (user: any) => {
    const action = user.status === "active" ? "blocked" : "unblocked";
    toast({
      title: `User ${action}`,
      description: `${user.name} has been ${action}`,
      variant: action === "blocked" ? "warning" : "success",
    });
  };

  const UserRow = ({ user }: { user: any }) => (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <UsersIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {user.phone}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getTypeBadgeVariant(user.type)}>
          {user.type === "influencer" ? "Influencer" : "Customer"}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={getTierBadgeVariant(user.tier)} className="flex items-center gap-1 w-fit">
          {getTierIcon(user.tier)}
          {user.tier}
        </Badge>
      </TableCell>
      <TableCell>
        {user.type === "customer" ? (
          <div className="flex items-center gap-1">
            <Droplets className="w-4 h-4 text-water-blue" />
            {user.liters}L
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <UsersIcon className="w-4 h-4 text-primary" />
            {user.referrals} users
          </div>
        )}
      </TableCell>
      <TableCell>
        {user.type === "customer" ? (
          <div className="flex items-center gap-1 text-success">
            <DollarSign className="w-4 h-4" />
            ${user.cashback}
          </div>
        ) : (
          <div className="flex items-center gap-1 text-success">
            <DollarSign className="w-4 h-4" />
            ${user.commission}
          </div>
        )}
      </TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(user.status)}>
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{user.joinDate}</span>
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditUser(user)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User Info
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingUser({ ...user, passwordMode: true })}>
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleBlockUser(user)} className="text-warning">
              <Ban className="mr-2 h-4 w-4" />
              {user.status === "active" ? "Block User" : "Unblock User"}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage customers and influencers</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new customer or influencer account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="influencer">Influencer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {editingUser?.passwordMode ? (
                  <>
                    <Key className="w-5 h-5" />
                    Change Password for {editingUser?.name}
                  </>
                ) : (
                  <>
                    <UserCog className="w-5 h-5" />
                    Edit User Information
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                {editingUser?.passwordMode 
                  ? "Set a new password for this user account."
                  : "Update the user's personal information and settings."
                }
              </DialogDescription>
            </DialogHeader>
            
            {editingUser?.passwordMode ? (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="bg-info/10 text-info-foreground p-3 rounded-lg text-sm">
                  <strong>Note:</strong> The user will need to use this new password for their next login.
                </div>
              </div>
            ) : (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editName">Full Name</Label>
                    <Input
                      id="editName"
                      defaultValue={editingUser?.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editPhone">Phone</Label>
                    <Input
                      id="editPhone"
                      defaultValue={editingUser?.phone}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    defaultValue={editingUser?.email}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editTier">Loyalty Tier</Label>
                    <Select defaultValue={editingUser?.tier}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lead">Lead</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Platinum">Platinum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editStatus">Status</Label>
                    <Select defaultValue={editingUser?.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button 
                onClick={() => editingUser?.passwordMode 
                  ? handleChangePassword(editingUser) 
                  : handleUpdateUser(editingUser)
                }
              >
                {editingUser?.passwordMode ? "Change Password" : "Update User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {customers.length} customers, {influencers.length} influencers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((users.filter(u => u.status === "active").length / users.length) * 100)}% active rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platinum Users</CardTitle>
            <Crown className="h-4 w-4 text-loyalty-platinum" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.tier === "Platinum").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Highest tier members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cashback</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${customers.reduce((sum, user) => sum + user.cashback, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Rewards distributed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Search and filter users by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="influencer">Influencer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Loyalty Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="Lead">Lead</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Users ({filteredUsers.length})</TabsTrigger>
              <TabsTrigger value="customers">Customers ({customers.length})</TabsTrigger>
              <TabsTrigger value="influencers">Influencers ({influencers.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="customers" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Liters</TableHead>
                    <TableHead>Cashback</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="influencers" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Influencer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {influencers.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;