
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  ShoppingCart, 
  FileText, 
  User,
  LogOut,
  Bell
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { User as UserType } from "@/pages/Index";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  currentUser: UserType;
}

export const Sidebar = ({ activeSection, setActiveSection, currentUser }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
    { id: "inventory", label: "Inventario", icon: Car, badge: "12" },
    { id: "clients", label: "Clientes", icon: Users, badge: null },
    { id: "sales", label: "Ventas", icon: ShoppingCart, badge: "3" },
    { id: "reports", label: "Reportes", icon: FileText, badge: null },
    { id: "profile", label: "Perfil", icon: User, badge: null },
  ];

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "manager": return "Gerente";
      case "advisor": return "Asesor";
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
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AutoGest</h1>
            <p className="text-sm text-gray-500">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
            <Badge className={`text-xs ${getRoleColor(currentUser.role)}`}>
              {getRoleLabel(currentUser.role)}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="p-1">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                isActive 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};
