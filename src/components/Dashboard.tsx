
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Users, TrendingUp, AlertTriangle, DollarSign, Calendar } from "lucide-react";
import { dashboardStats, mockVehicles, mockSales } from "@/data/mockData";
import type { User } from "@/pages/Index";

interface DashboardProps {
  currentUser: User;
}

export const Dashboard = ({ currentUser }: DashboardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const recentVehicles = mockVehicles.slice(0, 3);
  const recentSales = mockSales.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          ¡Bienvenido, {currentUser.name}!
        </h1>
        <p className="text-blue-100 text-lg">
          Panel de control - {new Date().toLocaleDateString('es-CO', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Vehículos Disponibles
            </CardTitle>
            <Car className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {dashboardStats.availableVehicles}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              de {dashboardStats.totalVehicles} total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ventas Este Mes
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {dashboardStats.soldThisMonth}
            </div>
            <p className="text-xs text-green-600 mt-1">
              +20% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Clientes Registrados
            </CardTitle>
            <Users className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {dashboardStats.totalClients}
            </div>
            <p className="text-xs text-purple-600 mt-1">
              +5 nuevos esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ganancia Total
            </CardTitle>
            <DollarSign className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(dashboardStats.totalProfit)}
            </div>
            <p className="text-xs text-orange-600 mt-1">
              Margen del 15.6%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vehicles */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-600" />
              Vehículos Recientes
            </CardTitle>
            <CardDescription>
              Últimos vehículos añadidos al inventario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentVehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-16 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {vehicle.brand} {vehicle.model} {vehicle.year}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(vehicle.price)}
                  </p>
                </div>
                <Badge variant={vehicle.status === "available" ? "default" : "secondary"}>
                  {vehicle.status === "available" ? "Disponible" : "Vendido"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts and Notifications */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Alertas y Notificaciones
            </CardTitle>
            <CardDescription>
              Elementos que requieren atención
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-800">
                  Documentos Pendientes
                </p>
                <p className="text-sm text-orange-600">
                  {dashboardStats.pendingDocuments} vehículos requieren actualización de documentos
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Mantenimientos Programados
                </p>
                <p className="text-sm text-blue-600">
                  2 vehículos tienen mantenimiento esta semana
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Meta de Ventas
                </p>
                <p className="text-sm text-green-600">
                  75% completado este mes (3 de 4 ventas)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
