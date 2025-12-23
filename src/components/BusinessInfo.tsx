import { districts } from '@/data/mockData';
import { Building2, Truck, AlertTriangle, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Business } from '@/types/forest';

interface BusinessInfoProps {
  businesses: Business[];
  districtId: string | null;
}

const dangerBadgeColors = {
  low: 'bg-fire-low/20 text-fire-low border-fire-low/30',
  medium: 'bg-fire-medium/20 text-fire-medium border-fire-medium/30',
  high: 'bg-fire-high/20 text-fire-high border-fire-high/30',
  critical: 'bg-fire-critical/20 text-fire-critical border-fire-critical/30',
};

const dangerLabels = {
  low: 'Düşük Risk',
  medium: 'Orta Risk',
  high: 'Yüksek Risk',
  critical: 'Kritik Risk',
};

const BusinessInfo = ({ businesses, districtId }: BusinessInfoProps) => {
  if (!districtId) {
    return (
      <div className="bg-card rounded-xl shadow-lg p-6 animate-fade-in">
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">İşletme Seçin</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Haritadan veya butonlardan bir ilçe seçerek işletme detaylarını görüntüleyin.
          </p>
        </div>
      </div>
    );
  }

  const district = districts.find(d => d.id === districtId);
  const business = businesses.find(b => b.districtId === districtId);

  if (!district || !business) return null;

  const vehicleExcess = business.usedInFireVehicles - business.totalVehicles;
  const excessPercentage = business.totalVehicles > 0 
    ? ((vehicleExcess / business.totalVehicles) * 100).toFixed(1)
    : '0';

  return (
    <div className="bg-card rounded-xl shadow-lg p-5 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <MapPin className="h-4 w-4" />
            <span>{district.province}</span>
          </div>
          <h3 className="font-bold text-lg text-foreground">{business.name}</h3>
        </div>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium border",
            dangerBadgeColors[business.dangerLevel]
          )}
        >
          {dangerLabels[business.dangerLevel]}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Truck className="h-4 w-4" />
            <span>Mevcut Araç</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{business.totalVehicles}</p>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Truck className="h-4 w-4 text-fire-high" />
            <span>Kullanılan</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{business.usedInFireVehicles}</p>
        </div>

        {/* Araç Türleri */}
        <div className="col-span-2 bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
            <Truck className="h-4 w-4" />
            <span>Araç Türleri</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {business.vehicleTypes.map((vehicle, index) => (
              <div key={index} className="flex items-center justify-between bg-background/50 rounded-md px-3 py-2">
                <span className="text-sm text-foreground">{vehicle.type}</span>
                <span className="text-sm font-semibold text-primary">{vehicle.count}</span>
              </div>
            ))}
          </div>
        </div>

        {vehicleExcess > 0 && (
          <div className="col-span-2 bg-destructive/10 rounded-lg p-4 border border-destructive/20">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">Araç Kapasitesi Aşıldı</p>
                <p className="text-xs text-muted-foreground">
                  {vehicleExcess} araç fazla kullanıldı ({excessPercentage}% aşım)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessInfo;
