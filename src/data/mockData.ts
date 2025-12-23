import { District, Business, FireData, MonthlyFireData, YearlyFireData, TreeTypeData, FireCauseData, VehicleData, DangerRankingData } from '@/types/forest';

export const districts: District[] = [
  // Bursa
  { id: 'bursa-merkez', name: 'Merkez', province: 'Bursa', coordinates: { x: 45, y: 35 }, latLng: [40.1885, 29.0610] },
  { id: 'bursa-gemlik', name: 'Gemlik', province: 'Bursa', coordinates: { x: 55, y: 25 }, latLng: [40.4364, 29.1561] },
  { id: 'bursa-inegol', name: 'İnegöl', province: 'Bursa', coordinates: { x: 65, y: 45 }, latLng: [40.0781, 29.5134] },
  { id: 'bursa-iznik', name: 'İznik', province: 'Bursa', coordinates: { x: 70, y: 30 }, latLng: [40.4294, 29.7206] },
  { id: 'bursa-karacabey', name: 'Karacabey', province: 'Bursa', coordinates: { x: 25, y: 40 }, latLng: [40.2131, 28.3625] },
  { id: 'bursa-keles', name: 'Keles', province: 'Bursa', coordinates: { x: 40, y: 55 }, latLng: [39.9136, 29.2269] },
  { id: 'bursa-mkpasa', name: 'Mustafakemalpaşa', province: 'Bursa', coordinates: { x: 35, y: 60 }, latLng: [40.0333, 28.4000] },
  { id: 'bursa-orhaneli', name: 'Orhaneli', province: 'Bursa', coordinates: { x: 50, y: 65 }, latLng: [39.9039, 28.9886] },
  // Bilecik
  { id: 'bilecik-merkez', name: 'Merkez', province: 'Bilecik', coordinates: { x: 80, y: 55 }, latLng: [40.0567, 30.0667] },
  { id: 'bilecik-bozuyuk', name: 'Bozüyük', province: 'Bilecik', coordinates: { x: 75, y: 65 }, latLng: [39.9075, 30.0353] },
  // Yalova
  { id: 'yalova-merkez', name: 'Merkez', province: 'Yalova', coordinates: { x: 60, y: 15 }, latLng: [40.6550, 29.2769] },
];

export const businesses: Business[] = [
  { id: 'b1', name: 'Bursa Merkez Orman İşletmesi', districtId: 'bursa-merkez', totalVehicles: 25, usedInFireVehicles: 32, dangerLevel: 'high', vehicleTypes: [{ type: 'İtfaiye Aracı', count: 10 }, { type: 'Su Tankeri', count: 8 }, { type: 'Arazi Aracı', count: 7 }] },
  { id: 'b2', name: 'Gemlik Orman İşletmesi', districtId: 'bursa-gemlik', totalVehicles: 18, usedInFireVehicles: 15, dangerLevel: 'medium', vehicleTypes: [{ type: 'İtfaiye Aracı', count: 7 }, { type: 'Su Tankeri', count: 6 }, { type: 'Arazi Aracı', count: 5 }] },
  { id: 'b3', name: 'İnegöl Orman İşletmesi', districtId: 'bursa-inegol', totalVehicles: 22, usedInFireVehicles: 28, dangerLevel: 'high', vehicleTypes: [{ type: 'İtfaiye Aracı', count: 9 }, { type: 'Su Tankeri', count: 7 }, { type: 'Helikopter', count: 1 }, { type: 'Arazi Aracı', count: 5 }] },
  { id: 'b4', name: 'İznik Orman İşletmesi', districtId: 'bursa-iznik', totalVehicles: 15, usedInFireVehicles: 12, dangerLevel: 'low', vehicleTypes: [{ type: 'İtfaiye Aracı', count: 6 }, { type: 'Su Tankeri', count: 5 }, { type: 'Arazi Aracı', count: 4 }] },
  { id: 'b5', name: 'Karacabey Orman İşletmesi', districtId: 'bursa-karacabey', totalVehicles: 20, usedInFireVehicles: 18, dangerLevel: 'medium', vehicleTypes: [{ type: 'İtfaiye Aracı', count: 8 }, { type: 'Su Tankeri', count: 7 }, { type: 'Arazi Aracı', count: 5 }] },
  { id: 'b6', name: 'Keles Orman İşletmesi', districtId: 'bursa-keles', totalVehicles: 12, usedInFireVehicles: 10, dangerLevel: 'low', vehicleTypes: [{ type: 'İtfaiye Aracı', count: 5 }, { type: 'Su Tankeri', count: 4 }, { type: 'Arazi Aracı', count: 3 }] },
  { id: 'b7', name: 'Mustafakemalpaşa Orman İşletmesi', districtId: 'bursa-mkpasa', totalVehicles: 16, usedInFireVehicles: 22, dangerLevel: 'critical', vehicleTypes: [{ type: 'İtfaiye Aracı', count: 6 }, { type: 'Su Tankeri', count: 5 }, { type: 'Arazi Aracı', count: 5 }] },
  { id: 'b8', name: 'Orhaneli Orman İşletmesi', districtId: 'bursa-orhaneli', totalVehicles: 14, usedInFireVehicles: 16, dangerLevel: 'medium', vehicleTypes: [{ type: 'İtfaiye Aracı', count: 5 }, { type: 'Su Tankeri', count: 5 }, { type: 'Arazi Aracı', count: 4 }] },
  { id: 'b9', name: 'Bilecik Merkez Orman İşletmesi', districtId: 'bilecik-merkez', totalVehicles: 10, usedInFireVehicles: 8, dangerLevel: 'low', vehicleTypes: [{ type: 'İtfaiye Aracı', count: 4 }, { type: 'Su Tankeri', count: 3 }, { type: 'Arazi Aracı', count: 3 }] },
  { id: 'b10', name: 'Bozüyük Orman İşletmesi', districtId: 'bilecik-bozuyuk', totalVehicles: 8, usedInFireVehicles: 12, dangerLevel: 'high', vehicleTypes: [{ type: 'İtfaiye Aracı', count: 3 }, { type: 'Su Tankeri', count: 3 }, { type: 'Arazi Aracı', count: 2 }] },
  { id: 'b11', name: 'Yalova Merkez Orman İşletmesi', districtId: 'yalova-merkez', totalVehicles: 12, usedInFireVehicles: 10, dangerLevel: 'medium', vehicleTypes: [{ type: 'İtfaiye Aracı', count: 5 }, { type: 'Su Tankeri', count: 4 }, { type: 'Arazi Aracı', count: 3 }] },
];

export const fireData: FireData[] = [
  // 2023 Data
  { id: 'f1', businessId: 'b1', month: 1, year: 2023, count: 5, dangerLevel: 'medium', treeType: 'Çam', cause: 'İnsan Kaynaklı' },
  { id: 'f2', businessId: 'b1', month: 2, year: 2023, count: 3, dangerLevel: 'low', treeType: 'Meşe', cause: 'Yıldırım' },
  { id: 'f3', businessId: 'b1', month: 6, year: 2023, count: 15, dangerLevel: 'critical', treeType: 'Çam', cause: 'İnsan Kaynaklı' },
  { id: 'f4', businessId: 'b1', month: 7, year: 2023, count: 22, dangerLevel: 'critical', treeType: 'Kızılçam', cause: 'Kasıt' },
  { id: 'f5', businessId: 'b1', month: 8, year: 2023, count: 18, dangerLevel: 'high', treeType: 'Çam', cause: 'İhmal' },
  { id: 'f6', businessId: 'b2', month: 5, year: 2023, count: 8, dangerLevel: 'medium', treeType: 'Kayın', cause: 'İnsan Kaynaklı' },
  { id: 'f7', businessId: 'b2', month: 7, year: 2023, count: 12, dangerLevel: 'high', treeType: 'Çam', cause: 'İhmal' },
  { id: 'f8', businessId: 'b3', month: 6, year: 2023, count: 10, dangerLevel: 'high', treeType: 'Kızılçam', cause: 'Yıldırım' },
  { id: 'f9', businessId: 'b3', month: 8, year: 2023, count: 25, dangerLevel: 'critical', treeType: 'Çam', cause: 'Kasıt' },
  { id: 'f13', businessId: 'b7', month: 7, year: 2023, count: 30, dangerLevel: 'critical', treeType: 'Kızılçam', cause: 'Kasıt' },
  { id: 'f14', businessId: 'b10', month: 8, year: 2023, count: 15, dangerLevel: 'high', treeType: 'Çam', cause: 'İnsan Kaynaklı' },
  
  // 2024 Data
  { id: 'f20', businessId: 'b1', month: 1, year: 2024, count: 4, dangerLevel: 'low', treeType: 'Çam', cause: 'Yıldırım' },
  { id: 'f21', businessId: 'b1', month: 3, year: 2024, count: 6, dangerLevel: 'medium', treeType: 'Meşe', cause: 'İnsan Kaynaklı' },
  { id: 'f22', businessId: 'b1', month: 5, year: 2024, count: 12, dangerLevel: 'high', treeType: 'Çam', cause: 'İhmal' },
  { id: 'f23', businessId: 'b1', month: 6, year: 2024, count: 20, dangerLevel: 'critical', treeType: 'Kızılçam', cause: 'Kasıt' },
  { id: 'f24', businessId: 'b1', month: 7, year: 2024, count: 28, dangerLevel: 'critical', treeType: 'Çam', cause: 'İnsan Kaynaklı' },
  { id: 'f25', businessId: 'b1', month: 8, year: 2024, count: 24, dangerLevel: 'critical', treeType: 'Kızılçam', cause: 'Kasıt' },
  { id: 'f26', businessId: 'b1', month: 9, year: 2024, count: 14, dangerLevel: 'high', treeType: 'Çam', cause: 'İhmal' },
  { id: 'f27', businessId: 'b2', month: 4, year: 2024, count: 5, dangerLevel: 'medium', treeType: 'Kayın', cause: 'Yıldırım' },
  { id: 'f28', businessId: 'b2', month: 6, year: 2024, count: 10, dangerLevel: 'high', treeType: 'Çam', cause: 'İnsan Kaynaklı' },
  { id: 'f29', businessId: 'b2', month: 7, year: 2024, count: 15, dangerLevel: 'high', treeType: 'Meşe', cause: 'İhmal' },
  { id: 'f30', businessId: 'b3', month: 5, year: 2024, count: 8, dangerLevel: 'medium', treeType: 'Kızılçam', cause: 'Yıldırım' },
  { id: 'f31', businessId: 'b3', month: 7, year: 2024, count: 22, dangerLevel: 'critical', treeType: 'Çam', cause: 'Kasıt' },
  { id: 'f32', businessId: 'b3', month: 8, year: 2024, count: 18, dangerLevel: 'high', treeType: 'Kızılçam', cause: 'İnsan Kaynaklı' },
  { id: 'f33', businessId: 'b4', month: 6, year: 2024, count: 6, dangerLevel: 'medium', treeType: 'Çam', cause: 'İhmal' },
  { id: 'f34', businessId: 'b5', month: 7, year: 2024, count: 11, dangerLevel: 'high', treeType: 'Meşe', cause: 'İnsan Kaynaklı' },
  { id: 'f35', businessId: 'b6', month: 8, year: 2024, count: 7, dangerLevel: 'medium', treeType: 'Kayın', cause: 'Yıldırım' },
  { id: 'f36', businessId: 'b7', month: 6, year: 2024, count: 25, dangerLevel: 'critical', treeType: 'Kızılçam', cause: 'Kasıt' },
  { id: 'f37', businessId: 'b7', month: 7, year: 2024, count: 35, dangerLevel: 'critical', treeType: 'Çam', cause: 'İnsan Kaynaklı' },
  { id: 'f38', businessId: 'b8', month: 7, year: 2024, count: 9, dangerLevel: 'medium', treeType: 'Meşe', cause: 'İhmal' },
  { id: 'f39', businessId: 'b9', month: 5, year: 2024, count: 4, dangerLevel: 'low', treeType: 'Çam', cause: 'Yıldırım' },
  { id: 'f40', businessId: 'b10', month: 7, year: 2024, count: 18, dangerLevel: 'high', treeType: 'Kızılçam', cause: 'Kasıt' },
  { id: 'f41', businessId: 'b11', month: 6, year: 2024, count: 8, dangerLevel: 'medium', treeType: 'Kayın', cause: 'İnsan Kaynaklı' },
  
  // 2025 Data
  { id: 'f50', businessId: 'b1', month: 1, year: 2025, count: 3, dangerLevel: 'low', treeType: 'Çam', cause: 'Yıldırım' },
  { id: 'f51', businessId: 'b1', month: 2, year: 2025, count: 2, dangerLevel: 'low', treeType: 'Meşe', cause: 'İhmal' },
  { id: 'f52', businessId: 'b1', month: 3, year: 2025, count: 5, dangerLevel: 'medium', treeType: 'Çam', cause: 'İnsan Kaynaklı' },
  { id: 'f53', businessId: 'b1', month: 4, year: 2025, count: 8, dangerLevel: 'medium', treeType: 'Kızılçam', cause: 'Kasıt' },
  { id: 'f54', businessId: 'b1', month: 5, year: 2025, count: 14, dangerLevel: 'high', treeType: 'Çam', cause: 'İnsan Kaynaklı' },
  { id: 'f55', businessId: 'b1', month: 6, year: 2025, count: 22, dangerLevel: 'critical', treeType: 'Kızılçam', cause: 'Kasıt' },
  { id: 'f56', businessId: 'b2', month: 3, year: 2025, count: 4, dangerLevel: 'low', treeType: 'Kayın', cause: 'Yıldırım' },
  { id: 'f57', businessId: 'b2', month: 5, year: 2025, count: 9, dangerLevel: 'medium', treeType: 'Çam', cause: 'İhmal' },
  { id: 'f58', businessId: 'b2', month: 6, year: 2025, count: 13, dangerLevel: 'high', treeType: 'Meşe', cause: 'İnsan Kaynaklı' },
  { id: 'f59', businessId: 'b3', month: 4, year: 2025, count: 7, dangerLevel: 'medium', treeType: 'Kızılçam', cause: 'Yıldırım' },
  { id: 'f60', businessId: 'b3', month: 5, year: 2025, count: 12, dangerLevel: 'high', treeType: 'Çam', cause: 'Kasıt' },
  { id: 'f61', businessId: 'b3', month: 6, year: 2025, count: 20, dangerLevel: 'critical', treeType: 'Kızılçam', cause: 'İnsan Kaynaklı' },
  { id: 'f62', businessId: 'b4', month: 5, year: 2025, count: 5, dangerLevel: 'medium', treeType: 'Çam', cause: 'İhmal' },
  { id: 'f63', businessId: 'b5', month: 4, year: 2025, count: 6, dangerLevel: 'medium', treeType: 'Meşe', cause: 'Yıldırım' },
  { id: 'f64', businessId: 'b5', month: 6, year: 2025, count: 14, dangerLevel: 'high', treeType: 'Çam', cause: 'İnsan Kaynaklı' },
  { id: 'f65', businessId: 'b6', month: 5, year: 2025, count: 4, dangerLevel: 'low', treeType: 'Kayın', cause: 'İhmal' },
  { id: 'f66', businessId: 'b7', month: 4, year: 2025, count: 15, dangerLevel: 'high', treeType: 'Kızılçam', cause: 'Kasıt' },
  { id: 'f67', businessId: 'b7', month: 5, year: 2025, count: 28, dangerLevel: 'critical', treeType: 'Çam', cause: 'İnsan Kaynaklı' },
  { id: 'f68', businessId: 'b7', month: 6, year: 2025, count: 32, dangerLevel: 'critical', treeType: 'Kızılçam', cause: 'Kasıt' },
  { id: 'f69', businessId: 'b8', month: 5, year: 2025, count: 8, dangerLevel: 'medium', treeType: 'Meşe', cause: 'Yıldırım' },
  { id: 'f70', businessId: 'b9', month: 4, year: 2025, count: 3, dangerLevel: 'low', treeType: 'Çam', cause: 'İhmal' },
  { id: 'f71', businessId: 'b10', month: 5, year: 2025, count: 11, dangerLevel: 'high', treeType: 'Kızılçam', cause: 'İnsan Kaynaklı' },
  { id: 'f72', businessId: 'b10', month: 6, year: 2025, count: 16, dangerLevel: 'high', treeType: 'Çam', cause: 'Kasıt' },
  { id: 'f73', businessId: 'b11', month: 4, year: 2025, count: 5, dangerLevel: 'medium', treeType: 'Kayın', cause: 'Yıldırım' },
  { id: 'f74', businessId: 'b11', month: 6, year: 2025, count: 10, dangerLevel: 'high', treeType: 'Meşe', cause: 'İnsan Kaynaklı' },
];

export const getMonthlyFireData = (businessId?: string, year: number = 2023): MonthlyFireData[] => {
  const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const filteredData = businessId 
    ? fireData.filter(f => f.businessId === businessId)
    : fireData;
  
  return months.map((month, index) => ({
    month,
    count: filteredData
      .filter(f => f.month === index + 1 && f.year === year)
      .reduce((sum, f) => sum + f.count, 0)
  }));
};

export const getYearlyFireData = (businessId?: string): YearlyFireData[] => {
  const years = [2023, 2024, 2025];
  const filteredData = businessId 
    ? fireData.filter(f => f.businessId === businessId)
    : fireData;
  
  return years.map(year => ({
    year,
    count: filteredData
      .filter(f => f.year === year)
      .reduce((sum, f) => sum + f.count, 0)
  }));
};

export const getTreeTypeData = (businessId?: string): TreeTypeData[] => {
  const filteredData = businessId 
    ? fireData.filter(f => f.businessId === businessId)
    : fireData;
  
  const treeTypes: Record<string, number> = {};
  filteredData.forEach(f => {
    treeTypes[f.treeType] = (treeTypes[f.treeType] || 0) + f.count;
  });
  
  return Object.entries(treeTypes).map(([treeType, count]) => ({ treeType, count }));
};

export const getFireCauseData = (businessId?: string): FireCauseData[] => {
  const filteredData = businessId 
    ? fireData.filter(f => f.businessId === businessId)
    : fireData;
  
  const causes: Record<string, number> = {};
  filteredData.forEach(f => {
    causes[f.cause] = (causes[f.cause] || 0) + f.count;
  });
  
  return Object.entries(causes).map(([cause, count]) => ({ cause, count }));
};

export const getVehicleData = (): VehicleData[] => {
  return businesses.map(b => ({
    businessName: b.name.replace(' Orman İşletmesi', ''),
    totalVehicles: b.totalVehicles,
    usedVehicles: b.usedInFireVehicles,
    excess: Math.max(0, b.usedInFireVehicles - b.totalVehicles)
  }));
};

export const getDangerRankingData = (): DangerRankingData[] => {
  const dangerScores: Record<string, number> = {
    'low': 25,
    'medium': 50,
    'high': 75,
    'critical': 100
  };
  
  return businesses
    .map(b => ({
      businessName: b.name.replace(' Orman İşletmesi', ''),
      dangerScore: dangerScores[b.dangerLevel],
      level: b.dangerLevel
    }))
    .sort((a, b) => b.dangerScore - a.dangerScore);
};
