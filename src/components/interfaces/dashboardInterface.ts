import { DollarSign, Plane, Ship, X } from "lucide-react";

// Define interfaces for props
export interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
}

export interface FlightRouteProgressProps {
  route: string;
  km: number;
  passengers: number;
  maxPassengers: number;
}

export interface Airline {
  color: string;
  name: string;
  per: number;
}

export interface Hike {
  sign: 'up' | 'down';
  per: string;
}

export interface WidgetItem {
  title: string;
  icon: 'Plane' | 'Ship' | 'X' | 'DollarSign';
  numb: number;
  hike: Hike;
}

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane,
  Ship,
  X,
  DollarSign,
};


 export interface Country {
  name: string;
  progress: number;
  color: string;
}