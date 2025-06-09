
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2, Eye, FileText, Wrench, DollarSign } from "lucide-react";
import type { Vehicle } from "@/data/mockData";
import type { User } from "@/pages/Index";

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onClose: () => void;
  currentUser: User;
}

export const VehicleDetails = ({ vehicle, onClose, currentUser }: VehicleDetailsProps) => {
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

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case "excellent": return "Excelente";
      case "good": return "Bueno";
      case "fair": return "Regular";
      case "needs_repair": return "Necesita Reparación";
      default: return condition;
    }
  };

  const profit = vehicle.price - vehicle.purchasePrice;
  const profitMargin = ((profit / vehicle.purchasePrice) * 100).toFixed(1);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {vehicle.brand} {vehicle.model} {vehicle.year}
            </h1>
            <p className="text-gray-600">ID: {vehicle.id}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(vehicle.status)}>
            {getStatusLabel(vehicle.status)}
          </Badge>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Imágenes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicle.images.map((image, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${vehicle.brand} ${vehicle.model} - ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Características y Equipamiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-center p-2 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Marca:</span>
                <span className="font-medium">{vehicle.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Modelo:</span>
                <span className="font-medium">{vehicle.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Año:</span>
                <span className="font-medium">{vehicle.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kilometraje:</span>
                <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Color:</span>
                <span className="font-medium">{vehicle.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Combustible:</span>
                <span className="font-medium">{vehicle.fuel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transmisión:</span>
                <span className="font-medium">{vehicle.transmission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className="font-medium">{getConditionLabel(vehicle.condition)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Información Financiera
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Precio de Compra:</span>
                <span className="font-medium">{formatCurrency(vehicle.purchasePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Precio de Venta:</span>
                <span className="font-bold text-blue-600">{formatCurrency(vehicle.price)}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Ganancia Estimada:</span>
                <span className={`font-bold ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(profit)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Margen:</span>
                <span className={`font-medium ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {profitMargin}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documentos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">SOAT:</span>
                <Badge variant={vehicle.documents.soat ? "default" : "destructive"}>
                  {vehicle.documents.soat ? "Vigente" : "Vencido"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revisión Técnica:</span>
                <Badge variant={vehicle.documents.technicalReview ? "default" : "destructive"}>
                  {vehicle.documents.technicalReview ? "Vigente" : "Vencida"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tarjeta de Propiedad:</span>
                <Badge variant={vehicle.documents.ownership ? "default" : "destructive"}>
                  {vehicle.documents.ownership ? "Disponible" : "Pendiente"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Mantenimiento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Último Mantenimiento:</span>
                <span className="font-medium">
                  {new Date(vehicle.lastMaintenance).toLocaleDateString('es-CO')}
                </span>
              </div>
              <Button variant="outline" className="w-full">
                <Wrench className="w-4 h-4 mr-2" />
                Programar Mantenimiento
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
