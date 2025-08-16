import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Navigation, 
  Star, 
  Phone, 
  Mail, 
  Clock, 
  Target,
  Globe,
  Award,
  Gift
} from "lucide-react";

interface Store {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  status: "active" | "inactive" | "maintenance";
  type: "retail" | "wholesale" | "both";
  openingHours: string;
  rating: number;
  distance?: number;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

const ClientPoints = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearbyStores, setNearbyStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [userPoints, setUserPoints] = useState(1250);
  const [userTier, setUserTier] = useState("Gold");

  // Mock stores data with geolocation
  const allStores: Store[] = [
    {
      id: "store1",
      name: "Água Twezah - Luanda Central",
      city: "Luanda",
      address: "Rua Comandante Valódia, 123, Luanda",
      phone: "+244 222 123 456",
      email: "luanda.central@aguatwezah.ao",
      latitude: -8.8383,
      longitude: 13.2344,
      status: "active",
      type: "retail",
      openingHours: "Mon-Sat: 8:00-20:00, Sun: 9:00-18:00",
      rating: 4.8
    },
    {
      id: "store2",
      name: "Água Twezah - Benguela",
      city: "Benguela",
      address: "Avenida 4 de Fevereiro, 45, Benguela",
      phone: "+244 272 234 567",
      email: "benguela@aguatwezah.ao",
      latitude: -12.5778,
      longitude: 13.4077,
      status: "active",
      type: "both",
      openingHours: "Mon-Sat: 7:30-19:30, Sun: 8:00-17:00",
      rating: 4.6
    },
    {
      id: "store3",
      name: "Água Twezah - Huambo",
      city: "Huambo",
      address: "Rua Rainha Ginga, 67, Huambo",
      phone: "+244 241 345 678",
      email: "huambo@aguatwezah.ao",
      latitude: -12.7761,
      longitude: 15.7392,
      status: "active",
      type: "retail",
      openingHours: "Mon-Sat: 8:00-19:00, Sun: 9:00-17:00",
      rating: 4.5
    },
    {
      id: "store4",
      name: "Água Twezah - Lobito",
      city: "Lobito",
      address: "Avenida da Marginal, 89, Lobito",
      phone: "+244 234 456 789",
      email: "lobito@aguatwezah.ao",
      latitude: -12.3647,
      longitude: 13.5361,
      status: "maintenance",
      type: "both",
      openingHours: "Mon-Sat: 7:00-18:30, Sun: 8:00-16:00",
      rating: 4.7
    }
  ];

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          
          // Calculate distances and sort stores
          const storesWithDistance = allStores.map(store => ({
            ...store,
            distance: calculateDistance(latitude, longitude, store.latitude, store.longitude)
          })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
          
          setNearbyStores(storesWithDistance);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to all stores without distance
          setNearbyStores(allStores);
        }
      );
    } else {
      setNearbyStores(allStores);
    }
  };

  // Filter stores based on search term
  const filteredStores = nearbyStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getUserLocation();
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum": return "text-purple-600 bg-purple-100";
      case "Gold": return "text-yellow-600 bg-yellow-100";
      case "Silver": return "text-gray-600 bg-gray-100";
      default: return "text-blue-600 bg-blue-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "inactive": return "bg-gray-500";
      case "maintenance": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* User Points Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary to-water-blue">
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-white">
            <div>
              <h1 className="text-2xl font-bold">Welcome back!</h1>
              <p className="text-white/80">Your loyalty points and nearby stores</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userPoints.toLocaleString()}</div>
              <div className="text-white/80">Total Points</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Tier and Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Your Tier</div>
                <div className="font-semibold">{userTier}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Available Rewards</div>
                <div className="font-semibold">3 rewards</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Next Tier</div>
                <div className="font-semibold">250 points needed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={getUserLocation}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-water-blue hover:from-primary/90 hover:to-water-blue/90"
        >
          <Navigation className="w-4 h-4" />
          {userLocation ? "Update My Location" : "Get My Location"}
        </Button>
        
        <div className="relative flex-1">
          <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stores by name, city, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Nearby Stores */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            {userLocation ? "Nearby Stores" : "All Stores"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedStore?.id === store.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
                onClick={() => setSelectedStore(store)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{store.name}</h3>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(store.status)}`}></div>
                      <Badge variant="outline" className="text-xs">
                        {store.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {store.address}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {store.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {store.openingHours}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{store.rating}</span>
                      </div>
                      {store.distance && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Target className="w-3 h-3" />
                          {store.distance.toFixed(1)} km away
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Store Details */}
      {selectedStore && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Store Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">{selectedStore.name}</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Address:</strong> {selectedStore.address}</div>
                  <div><strong>Phone:</strong> {selectedStore.phone}</div>
                  <div><strong>Email:</strong> {selectedStore.email}</div>
                  <div><strong>Hours:</strong> {selectedStore.openingHours}</div>
                  <div><strong>Coordinates:</strong> {selectedStore.latitude.toFixed(4)}, {selectedStore.longitude.toFixed(4)}</div>
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge className={`text-xs ${getStatusColor(selectedStore.status)} text-white`}>
                      {selectedStore.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Type:</span>
                    <Badge variant="outline" className="text-xs">
                      {selectedStore.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{selectedStore.rating}</span>
                    </div>
                  </div>
                  {selectedStore.distance && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Distance:</span>
                      <span className="text-sm text-muted-foreground">
                        {selectedStore.distance.toFixed(1)} km away
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientPoints;
