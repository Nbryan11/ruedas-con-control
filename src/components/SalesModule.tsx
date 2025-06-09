
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, TrendingUp, DollarSign, Car, User, Calendar, CheckCircle } from "lucide-react";
import { mockSales, mockVehicles, mockClients } from "@/data/mockData";
import type { User } from "@/pages/Index";
import type { Sale } from "@/data/mockData";

interface SalesModuleProps {
  currentUser: User;
}

export const SalesModule = ({ currentUser }: SalesModuleProps) => {
  const [sales] = useState<Sale[]>(mockSales);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "cash": return "Efectivo";
      case "financing": return "Financiamiento";
      case "bank_transfer": return "Transferencia";
      default: return method;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Completada";
      case "pending": return "Pendiente";
      case "cancelled": return "Cancelada";
      default: return status;
    }
  };

  const totalSales = sales.reduce((sum, sale) => sum + sale.salePrice, 0);
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);
  const averageTicket = totalSales / sales.length || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Módulo de Ventas</h1>
          <p className="text-gray-600 mt-1">
            Gestiona y monitorea todas las transacciones de venta
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Venta
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ventas Totales
            </CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalSales)}
            </div>
            <p className="text-xs text-green-600 mt-1">
              +25% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ganancia Total
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalProfit)}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Margen del 11.1%
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Número de Ventas
            </CardTitle>
            <Car className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{sales.length}</div>
            <p className="text-xs text-purple-600 mt-1">
              Este mes
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ticket Promedio
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(averageTicket)}
            </div>
            <p className="text-xs text-orange-600 mt-1">
              Por venta
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Process Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Pipeline de Ventas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-sm text-blue-800">Prospectos</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">5</div>
              <p className="text-sm text-yellow-800">En Negociación</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <p className="text-sm text-purple-800">Pendientes</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{sales.length}</div>
              <p className="text-sm text-green-800">Completadas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Ventas Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sales.map((sale) => {
              const vehicle = mockVehicles.find(v => v.id === sale.vehicleId);
              const client = mockClients.find(c => c.id === sale.clientId);
              
              return (
                <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded flex items-center justify-center">
                      <Car className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {vehicle?.brand} {vehicle?.model} {vehicle?.year}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Cliente: {client?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {formatCurrency(sale.salePrice)}
                      </p>
                      <p className="text-sm text-green-600">
                        Ganancia: {formatCurrency(sale.profit)}
                      </p>
                    </div>

                    <div className="text-right">
                      <Badge className={getStatusColor(sale.status)}>
                        {getStatusLabel(sale.status)}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {getPaymentMethodLabel(sale.paymentMethod)}
                      </p>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(sale.saleDate).toLocaleDateString('es-CO')}
                    </div>

                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nueva Venta</h3>
            <p className="text-sm text-gray-600">
              Registra una nueva transacción de venta
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Reportes</h3>
            <p className="text-sm text-gray-600">
              Genera reportes de ventas y rendimiento
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Prospecto</h3>
            <p className="text-sm text-gray-600">
              Añadir nuevo cliente potencial
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
