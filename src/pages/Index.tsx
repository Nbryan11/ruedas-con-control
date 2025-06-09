
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { VehicleInventory } from "@/components/VehicleInventory";
import { ClientManagement } from "@/components/ClientManagement";
import { SalesModule } from "@/components/SalesModule";
import { Reports } from "@/components/Reports";
import { Profile } from "@/components/Profile";

export type UserRole = "manager" | "advisor" | "client";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [currentUser] = useState<User>({
    id: "1",
    name: "Carlos Rodríguez",
    role: "manager",
    email: "carlos@autosusados.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  });

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard currentUser={currentUser} />;
      case "inventory":
        return <VehicleInventory currentUser={currentUser} />;
      case "clients":
        return <ClientManagement currentUser={currentUser} />;
      case "sales":
        return <SalesModule currentUser={currentUser} />;
      case "reports":
        return <Reports currentUser={currentUser} />;
      case "profile":
        return <Profile currentUser={currentUser} />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        currentUser={currentUser}
      />
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
