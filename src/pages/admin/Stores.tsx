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
import { 
  Plus, 
  Edit, 
  Trash2,
  MapPin,
  Building2,
  Phone,
  Mail,
  Star,
  Search,
  Droplets
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Store {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  status: "active" | "inactive" | "maintenance";
  type: "retail" | "wholesale" | "both";
  openingHours: string;
  manager: string;
  capacity: number;
  rating: number;
  totalSales: number;
  createdAt: string;
  updatedAt: string;
}

const Stores = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock stores data
  const [stores, setStores] = useState<Store[]>([
    {
      id: "store1",
      name: "Água Twezah - Luanda Central",
      city: "Luanda",
      address: "Rua Comandante Valódia, 123, Luanda",
      phone: "+244 222 123 456",
      email: "luanda.central@aguatwezah.ao",
      website: "https://aguatwezah.ao/luanda-central",
      status: "active",
      type: "retail",
      openingHours: "Mon-Sat: 8:00-20:00, Sun: 9:00-18:00",
      manager: "João Silva",
      capacity: 5000,
      rating: 4.8,
      totalSales: 125000,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20"
    },
    {
      id: "store2",
      name: "Água Twezah - Benguela",
      city: "Benguela",
      address: "Avenida 4 de Fevereiro, 45, Benguela",
      phone: "+244 272 234 567",
      email: "benguela@aguatwezah.ao",
      status: "active",
      type: "both",
      openingHours: "Mon-Sat: 7:30-19:30, Sun: 8:00-17:00",
      manager: "Maria Santos",
      capacity: 3500,
      rating: 4.6,
      totalSales: 89000,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18"
    }
  ]);

  const [newStore, setNewStore] = useState({
    name: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    type: "retail" as "retail" | "wholesale" | "both",
    openingHours: "",
    manager: "",
    capacity: 0
  });

  const cities = ["Luanda", "Benguela", "Huambo", "Lobito", "Lubango", "Namibe", "Malanje", "Kuito"];

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStore = () => {
    if (!newStore.name || !newStore.city || !newStore.address || !newStore.phone || !newStore.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const store: Store = {
      id: `store${Date.now()}`,
      ...newStore,
      status: "active",
      rating: 0,
      totalSales: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setStores([...stores, store]);
    setNewStore({
      name: "",
      city: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      type: "retail",
      openingHours: "",
      manager: "",
      capacity: 0
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Store Added",
      description: `Store "${store.name}" has been added successfully`,
    });
  };

  const handleEditStore = () => {
    if (!selectedStore) return;

    const updatedStores = stores.map(store => 
      store.id === selectedStore.id 
        ? { ...selectedStore, updatedAt: new Date().toISOString().split('T')[0] }
        : store
    );

    setStores(updatedStores);
    setIsEditDialogOpen(false);
    setSelectedStore(null);

    toast({
      title: "Store Updated",
      description: `Store "${selectedStore.name}" has been updated successfully`,
    });
  };

  const handleDeleteStore = () => {
    if (!selectedStore) return;

    const updatedStores = stores.filter(store => store.id !== selectedStore.id);
    setStores(updatedStores);
    setIsDeleteDialogOpen(false);
    setSelectedStore(null);

    toast({
      title: "Store Deleted",
      description: `Store "${selectedStore.name}" has been deleted successfully`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "retail":
        return <Badge variant="outline">Retail</Badge>;
      case "wholesale":
        return <Badge variant="outline">Wholesale</Badge>;
      case "both":
        return <Badge variant="outline">Both</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Store Management</h1>
          <p className="text-muted-foreground">Manage all store locations and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Store
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Store</DialogTitle>
              <DialogDescription>
                Add a new store location to the system with complete information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name *</Label>
                  <Input
                    id="storeName"
                    placeholder="Enter store name"
                    value={newStore.name}
                    onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeCity">City *</Label>
                  <Select value={newStore.city} onValueChange={(value) => setNewStore({...newStore, city: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Address *</Label>
                <Textarea
                  id="storeAddress"
                  placeholder="Enter complete store address"
                  value={newStore.address}
                  onChange={(e) => setNewStore({...newStore, address: e.target.value})}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone *</Label>
                  <Input
                    id="storePhone"
                    placeholder="+244 XXX XXX XXX"
                    value={newStore.phone}
                    onChange={(e) => setNewStore({...newStore, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email *</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    placeholder="store@aguatwezah.ao"
                    value={newStore.email}
                    onChange={(e) => setNewStore({...newStore, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeWebsite">Website</Label>
                <Input
                  id="storeWebsite"
                  placeholder="https://aguatwezah.ao/store"
                  value={newStore.website}
                  onChange={(e) => setNewStore({...newStore, website: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeType">Store Type</Label>
                  <Select value={newStore.type} onValueChange={(value: "retail" | "wholesale" | "both") => setNewStore({...newStore, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeCapacity">Capacity (L)</Label>
                  <Input
                    id="storeCapacity"
                    type="number"
                    placeholder="5000"
                    value={newStore.capacity}
                    onChange={(e) => setNewStore({...newStore, capacity: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeHours">Opening Hours</Label>
                <Input
                  id="storeHours"
                  placeholder="Mon-Sat: 8:00-20:00, Sun: 9:00-18:00"
                  value={newStore.openingHours}
                  onChange={(e) => setNewStore({...newStore, openingHours: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeManager">Store Manager</Label>
                <Input
                  id="storeManager"
                  placeholder="Manager name"
                  value={newStore.manager}
                  onChange={(e) => setNewStore({...newStore, manager: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStore}>
                <Plus className="w-4 h-4 mr-2" />
                Add Store
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stores.length}</div>
            <p className="text-xs text-muted-foreground">
              Store locations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Stores</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stores.filter(store => store.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently operating
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cities Covered</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(stores.map(store => store.city)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Different cities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stores.reduce((sum, store) => sum + store.capacity, 0).toLocaleString()}L
            </div>
            <p className="text-xs text-muted-foreground">
              Combined storage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Stores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stores by name, address, or manager..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stores Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Stores</CardTitle>
          <CardDescription>Manage store locations and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{store.name}</div>
                      <div className="text-sm text-muted-foreground">{store.manager}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <div>
                        <div className="font-medium">{store.city}</div>
                        <div className="text-sm text-muted-foreground max-w-xs truncate">
                          {store.address}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        {store.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {store.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTypeBadge(store.type)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(store.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {store.capacity.toLocaleString()}L
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{store.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedStore(store);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedStore(store);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
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

      {/* Edit Store Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Store</DialogTitle>
            <DialogDescription>
              Update store information and details.
            </DialogDescription>
          </DialogHeader>
          {selectedStore && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editStoreName">Store Name</Label>
                  <Input
                    id="editStoreName"
                    value={selectedStore.name}
                    onChange={(e) => setSelectedStore({...selectedStore, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStoreCity">City</Label>
                  <Select value={selectedStore.city} onValueChange={(value) => setSelectedStore({...selectedStore, city: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="editStoreAddress">Address</Label>
                <Textarea
                  id="editStoreAddress"
                  value={selectedStore.address}
                  onChange={(e) => setSelectedStore({...selectedStore, address: e.target.value})}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editStorePhone">Phone</Label>
                  <Input
                    id="editStorePhone"
                    value={selectedStore.phone}
                    onChange={(e) => setSelectedStore({...selectedStore, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStoreEmail">Email</Label>
                  <Input
                    id="editStoreEmail"
                    type="email"
                    value={selectedStore.email}
                    onChange={(e) => setSelectedStore({...selectedStore, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editStoreWebsite">Website</Label>
                <Input
                  id="editStoreWebsite"
                  value={selectedStore.website || ""}
                  onChange={(e) => setSelectedStore({...selectedStore, website: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editStoreType">Store Type</Label>
                  <Select value={selectedStore.type} onValueChange={(value: "retail" | "wholesale" | "both") => setSelectedStore({...selectedStore, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStoreStatus">Status</Label>
                  <Select value={selectedStore.status} onValueChange={(value: "active" | "inactive" | "maintenance") => setSelectedStore({...selectedStore, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editStoreCapacity">Capacity (L)</Label>
                  <Input
                    id="editStoreCapacity"
                    type="number"
                    value={selectedStore.capacity}
                    onChange={(e) => setSelectedStore({...selectedStore, capacity: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStoreManager">Store Manager</Label>
                  <Input
                    id="editStoreManager"
                    value={selectedStore.manager}
                    onChange={(e) => setSelectedStore({...selectedStore, manager: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editStoreHours">Opening Hours</Label>
                <Input
                  id="editStoreHours"
                  value={selectedStore.openingHours}
                  onChange={(e) => setSelectedStore({...selectedStore, openingHours: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditStore}>
              <Edit className="w-4 h-4 mr-2" />
              Update Store
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Store</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedStore?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteStore}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Store
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Stores;