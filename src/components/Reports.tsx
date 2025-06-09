
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, Calendar, DollarSign, Car } from "lucide-react";
import { dashboardStats } from "@/data/mockData";
import type { User } from "@/pages/Index";

interface ReportsProps {
  currentUser: User;
}

export const Reports = ({ currentUser }: ReportsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const reports = [
    {
      title: "Reporte de Ventas Mensual",
      description: "Resumen completo de ventas del mes actual",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
      data: `${dashboardStats.soldThisMonth} ventas completadas`
    },
    {
      title: "Inventario Actual",
      description: "Estado actual del inventario de vehículos",
      icon: Car,
      color: "bg-blue-100 text-blue-600",
      data: `${dashboardStats.availableVehicles} vehículos disponibles`
    },
    {
      title: "Análisis Financiero",
      description: "Ganancias, pérdidas y márgenes de beneficio",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
      data: `${formatCurrency(dashboardStats.totalProfit)} en ganancias`
    },
    {
      title: "Reporte de Clientes",
      description: "Base de datos de clientes y historial de compras",
      icon: FileText,
      color: "bg-orange-100 text-orange-600",
      data: `${dashboardStats.totalClients} clientes registrados`
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes y Análisis</h1>
          <p className="text-gray-600 mt-1">
            Genera informes detallados sobre el rendimiento del negocio
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          Nuevo Reporte
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ventas Este Mes</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.soldThisMonth}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardStats.totalRevenue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ganancia Neta</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardStats.totalProfit)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vehículos Activos</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.availableVehicles}</p>
              </div>
              <Car className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Reportes Disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, index) => {
              const Icon = report.icon;
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${report.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {report.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {report.description}
                      </p>
                      <p className="text-sm font-medium text-blue-600 mb-4">
                        {report.data}
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Period Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Generar Reporte Personalizado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Inicio
              </label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="2024-06-01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Fin
              </label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="2024-06-30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Reporte
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Ventas</option>
                <option>Inventario</option>
                <option>Clientes</option>
                <option>Financiero</option>
              </select>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Generar Reporte
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
