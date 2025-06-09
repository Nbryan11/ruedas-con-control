
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Settings, Save, Shield } from "lucide-react";
import type { User as UserType } from "@/pages/Index";

interface ProfileProps {
  currentUser: UserType;
}

export const Profile = ({ currentUser }: ProfileProps) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case "manager": return "Gerente";
      case "advisor": return "Asesor Comercial";
      case "client": return "Cliente";
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "manager": return "bg-blue-100 text-blue-800";
      case "advisor": return "bg-green-100 text-green-800";
      case "client": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Perfil de Usuario</h1>
        <p className="text-gray-600 mt-1">
          Gestiona tu información personal y configuración de cuenta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>

            <Badge className={`${getRoleColor(currentUser.role)} px-3 py-1`}>
              {getRoleLabel(currentUser.role)}
            </Badge>

            <Button variant="outline" className="w-full">
              Cambiar Foto
            </Button>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Detalles del Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" defaultValue={currentUser.name} />
              </div>
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue={currentUser.email} />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="+57 300 123 4567" />
              </div>
              <div>
                <Label htmlFor="position">Cargo</Label>
                <Input id="position" defaultValue={getRoleLabel(currentUser.role)} disabled />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" placeholder="Dirección completa" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateJoined">Fecha de Ingreso</Label>
                <Input id="dateJoined" type="date" defaultValue="2024-01-15" />
              </div>
              <div>
                <Label htmlFor="department">Departamento</Label>
                <Input id="department" defaultValue="Ventas" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Configuración de Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentPassword">Contraseña Actual</Label>
              <Input id="currentPassword" type="password" placeholder="••••••••" />
            </div>
            <div>
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <Input id="newPassword" type="password" placeholder="••••••••" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Autenticación de Dos Factores</p>
              <p className="text-xs text-gray-500">Agrega una capa extra de seguridad a tu cuenta</p>
            </div>
            <Button variant="outline">
              Configurar 2FA
            </Button>
          </div>

          <div className="flex justify-end pt-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Actualizar Contraseña
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Actividad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <p className="text-sm text-blue-800">Vehículos Gestionados</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <p className="text-sm text-green-800">Ventas Realizadas</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">25</div>
              <p className="text-sm text-purple-800">Clientes Atendidos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
