export interface District {
  id: string;
  name: string;
  province: string;
  coordinates: { x: number; y: number };
  latLng: [number, number]; // [lat, lng] for Leaflet
}

export interface VehicleType {
  type: string;
  count: number;
}

export interface Business {
  id: string;
  name: string;
  districtId: string;
  totalVehicles: number;
  usedInFireVehicles: number;
  dangerLevel: 'low' | 'medium' | 'high' | 'critical';
  vehicleTypes: VehicleType[];
}

export interface FireData {
  id: string;
  businessId: string;
  month: number;
  year: number;
  count: number;
  dangerLevel: 'low' | 'medium' | 'high' | 'critical';
  treeType: string;
  cause: string;
}

export interface MonthlyFireData {
  month: string;
  count: number;
}

export interface YearlyFireData {
  year: number;
  count: number;
}

export interface TreeTypeData {
  treeType: string;
  count: number;
}

export interface FireCauseData {
  cause: string;
  count: number;
}

export interface VehicleData {
  businessName: string;
  totalVehicles: number;
  usedVehicles: number;
  excess: number;
}

export interface DangerRankingData {
  businessName: string;
  dangerScore: number;
  level: 'low' | 'medium' | 'high' | 'critical';
}
