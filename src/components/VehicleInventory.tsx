
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Eye, Edit } from "lucide-react";
import { mockVehicles } from "@/data/mockData";
import type { User } from "@/pages/Index";
import type { Vehicle } from "@/data/mockData";
import { VehicleForm } from "@/components/VehicleForm";
import { VehicleDetails } from "@/components/VehicleDetails";

interface VehicleInventoryProps {
  currentUser: User;
}

export const VehicleInventory = ({ currentUser }: VehicleInventoryProps) => {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "sold": return "bg-gray-100 text-gray-800";
      case "reserved": return "bg-yellow-100 text-yellow-800";
      case "maintenance": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available": return "Disponible";
      case "sold": return "Vendido";
      case "reserved": return "Reservado";
      case "maintenance": return "Mantenimiento";
      default: return status;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent": return "bg-green-100 text-green-800";
      case "good": return "bg-blue-100 text-blue-800";
      case "fair": return "bg-yellow-100 text-yellow-800";
      case "needs_repair": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case "excellent": return "Excelente";
      case "good": return "Bueno";
      case "fair": return "Regular";
      case "needs_repair": return "Necesita Reparación";
      default: return condition;
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.year.toString().includes(searchTerm)
  );

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetails(true);
  };

  if (showForm) {
    return (
      <VehicleForm 
        onClose={() => setShowForm(false)} 
        currentUser={currentUser}
      />
    );
  }

  if (showDetails && selectedVehicle) {
    return (
      <VehicleDetails 
        vehicle={selectedVehicle}
        onClose={() => {
          setShowDetails(false);
          setSelectedVehicle(null);
        }}
        currentUser={currentUser}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventario de Vehículos</h1>
          <p className="text-gray-600 mt-1">
            Gestiona y monitorea todos los vehículos del negocio
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Vehículo
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Búsqueda y Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por marca, modelo o año..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros Avanzados
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={vehicle.images[0]} 
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <Badge className={getStatusColor(vehicle.status)}>
                  {getStatusLabel(vehicle.status)}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="text-gray-600">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(vehicle.price)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Color: {vehicle.color}
                  </p>
                </div>
                <Badge className={getConditionColor(vehicle.condition)}>
                  {getConditionLabel(vehicle.condition)}
                </Badge>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewDetails(vehicle)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Ver
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron vehículos
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta ajustar tu búsqueda o agrega un nuevo vehículo.
            </p>
            <Button onClick={() => setShowForm(true)}>
              Agregar Primer Vehículo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
