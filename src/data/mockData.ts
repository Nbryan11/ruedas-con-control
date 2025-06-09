
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  purchasePrice: number;
  color: string;
  fuel: string;
  transmission: string;
  condition: "excellent" | "good" | "fair" | "needs_repair";
  status: "available" | "sold" | "reserved" | "maintenance";
  images: string[];
  description: string;
  features: string[];
  lastMaintenance: string;
  documents: {
    soat: boolean;
    technicalReview: boolean;
    ownership: boolean;
  };
  createdAt: string;
  soldAt?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  idNumber: string;
  purchaseHistory: string[];
  notes: string;
  createdAt: string;
  avatar?: string;
}

export interface Sale {
  id: string;
  vehicleId: string;
  clientId: string;
  salePrice: number;
  profit: number;
  paymentMethod: "cash" | "financing" | "bank_transfer";
  advisorId: string;
  saleDate: string;
  warranty: {
    months: number;
    coverage: string[];
  };
  status: "pending" | "completed" | "cancelled";
}

export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    mileage: 45000,
    price: 18500000,
    purchasePrice: 16000000,
    color: "Blanco",
    fuel: "Gasolina",
    transmission: "Automática",
    condition: "excellent",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
    ],
    description: "Toyota Corolla en excelente estado, único dueño, mantenimientos al día.",
    features: ["Aire acondicionado", "Dirección hidráulica", "Vidrios eléctricos", "Radio CD"],
    lastMaintenance: "2024-05-15",
    documents: {
      soat: true,
      technicalReview: true,
      ownership: true
    },
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    brand: "Chevrolet",
    model: "Spark",
    year: 2019,
    mileage: 62000,
    price: 14200000,
    purchasePrice: 12500000,
    color: "Rojo",
    fuel: "Gasolina",
    transmission: "Manual",
    condition: "good",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop"
    ],
    description: "Chevrolet Spark económico y confiable, perfecto para la ciudad.",
    features: ["Aire acondicionado", "Radio", "Llantas nuevas"],
    lastMaintenance: "2024-04-20",
    documents: {
      soat: true,
      technicalReview: false,
      ownership: true
    },
    createdAt: "2024-02-01"
  },
  {
    id: "3",
    brand: "Nissan",
    model: "Sentra",
    year: 2021,
    mileage: 28000,
    price: 22500000,
    purchasePrice: 20000000,
    color: "Gris",
    fuel: "Gasolina",
    transmission: "Automática",
    condition: "excellent",
    status: "sold",
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop"
    ],
    description: "Nissan Sentra como nuevo, tecnología avanzada y bajo kilometraje.",
    features: ["Cámara de reversa", "Pantalla táctil", "Bluetooth", "Control crucero"],
    lastMaintenance: "2024-06-01",
    documents: {
      soat: true,
      technicalReview: true,
      ownership: true
    },
    createdAt: "2024-01-20",
    soldAt: "2024-06-01"
  }
];

export const mockClients: Client[] = [
  {
    id: "1",
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+57 300 123 4567",
    address: "Calle 72 #11-45, Bogotá",
    idNumber: "1234567890",
    purchaseHistory: ["3"],
    notes: "Cliente preferencial, muy puntual en pagos",
    createdAt: "2024-01-10",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    phone: "+57 301 987 6543",
    address: "Carrera 15 #85-32, Medellín",
    idNumber: "0987654321",
    purchaseHistory: [],
    notes: "Interesado en vehículos deportivos",
    createdAt: "2024-02-15"
  },
  {
    id: "3",
    name: "Ana Lucia Torres",
    email: "ana.torres@email.com",
    phone: "+57 302 555 7890",
    address: "Avenida 6 #14-28, Cali",
    idNumber: "1122334455",
    purchaseHistory: [],
    notes: "Busca vehículo familiar, presupuesto medio",
    createdAt: "2024-03-01",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
  }
];

export const mockSales: Sale[] = [
  {
    id: "1",
    vehicleId: "3",
    clientId: "1",
    salePrice: 22500000,
    profit: 2500000,
    paymentMethod: "financing",
    advisorId: "1",
    saleDate: "2024-06-01",
    warranty: {
      months: 6,
      coverage: ["Motor", "Transmisión", "Sistema eléctrico"]
    },
    status: "completed"
  }
];

export const dashboardStats = {
  totalVehicles: mockVehicles.length,
  availableVehicles: mockVehicles.filter(v => v.status === "available").length,
  soldThisMonth: mockSales.filter(s => s.saleDate.startsWith("2024-06")).length,
  totalRevenue: mockSales.reduce((sum, sale) => sum + sale.salePrice, 0),
  totalProfit: mockSales.reduce((sum, sale) => sum + sale.profit, 0),
  totalClients: mockClients.length,
  pendingDocuments: mockVehicles.filter(v => 
    !v.documents.soat || !v.documents.technicalReview || !v.documents.ownership
  ).length
};
