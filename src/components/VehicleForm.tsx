
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Upload } from "lucide-react";
import type { User } from "@/pages/Index";
import { toast } from "sonner";

interface VehicleFormProps {
  onClose: () => void;
  currentUser: User;
}

export const VehicleForm = ({ onClose, currentUser }: VehicleFormProps) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    purchasePrice: "",
    color: "",
    fuel: "",
    transmission: "",
    condition: "",
    description: "",
    features: [] as string[],
    documents: {
      soat: false,
      technicalReview: false,
      ownership: false
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular guardado
    console.log("Guardando vehículo:", formData);
    
    toast.success("Vehículo agregado exitosamente", {
      description: `${formData.brand} ${formData.model} ha sido añadido al inventario.`
    });
    
    onClose();
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  };

  const commonFeatures = [
    "Aire acondicionado",
    "Dirección hidráulica",
    "Vidrios eléctricos",
    "Cierre centralizado",
    "Radio CD/MP3",
    "Bluetooth",
    "Cámara de reversa",
    "Sensores de parqueo",
    "Control crucero",
    "Asientos de cuero"
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onClose}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agregar Nuevo Vehículo</h1>
          <p className="text-gray-600">Completa la información del vehículo</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                placeholder="Toyota, Chevrolet, Nissan..."
                required
              />
            </div>
            <div>
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                placeholder="Corolla, Spark, Sentra..."
                required
              />
            </div>
            <div>
              <Label htmlFor="year">Año</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                placeholder="2020"
                min="1990"
                max="2024"
                required
              />
            </div>
            <div>
              <Label htmlFor="mileage">Kilometraje</Label>
              <Input
                id="mileage"
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
                placeholder="45000"
                required
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                placeholder="Blanco, Negro, Rojo..."
                required
              />
            </div>
            <div>
              <Label htmlFor="fuel">Combustible</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, fuel: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasoline">Gasolina</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="hybrid">Híbrido</SelectItem>
                  <SelectItem value="electric">Eléctrico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="transmission">Transmisión</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, transmission: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="automatic">Automática</SelectItem>
                  <SelectItem value="cvt">CVT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="condition">Estado</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excelente</SelectItem>
                  <SelectItem value="good">Bueno</SelectItem>
                  <SelectItem value="fair">Regular</SelectItem>
                  <SelectItem value="needs_repair">Necesita Reparación</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Información de Precios</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="purchasePrice">Precio de Compra</Label>
              <Input
                id="purchasePrice"
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => setFormData(prev => ({ ...prev, purchasePrice: e.target.value }))}
                placeholder="16000000"
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Precio de Venta</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="18500000"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Description and Features */}
        <Card>
          <CardHeader>
            <CardTitle>Descripción y Características</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe el vehículo, su estado, historial..."
                rows={4}
              />
            </div>
            
            <div>
              <Label>Características</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {commonFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                    />
                    <Label htmlFor={feature} className="text-sm">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="soat"
                  checked={formData.documents.soat}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      documents: { ...prev.documents, soat: checked as boolean }
                    }))
                  }
                />
                <Label htmlFor="soat">SOAT Vigente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="technicalReview"
                  checked={formData.documents.technicalReview}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      documents: { ...prev.documents, technicalReview: checked as boolean }
                    }))
                  }
                />
                <Label htmlFor="technicalReview">Revisión Técnica</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ownership"
                  checked={formData.documents.ownership}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      documents: { ...prev.documents, ownership: checked as boolean }
                    }))
                  }
                />
                <Label htmlFor="ownership">Tarjeta de Propiedad</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Imágenes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Arrastra y suelta las imágenes aquí</p>
              <p className="text-sm text-gray-500">o</p>
              <Button variant="outline" className="mt-2">
                Seleccionar Archivos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Guardar Vehículo
          </Button>
        </div>
      </form>
    </div>
  );
};
