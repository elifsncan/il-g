import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { districts } from '@/data/mockData';
import { TreePine } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Business } from '@/types/forest';

interface RegionMapProps {
  businesses: Business[];
  selectedDistrict: string | null;
  onDistrictSelect: (districtId: string) => void;
}

const dangerColors = {
  low: { bg: 'bg-fire-low', hex: '#22c55e' },
  medium: { bg: 'bg-fire-medium', hex: '#eab308' },
  high: { bg: 'bg-fire-high', hex: '#f97316' },
  critical: { bg: 'bg-fire-critical', hex: '#ef4444' },
};

const createCustomIcon = (danger: 'low' | 'medium' | 'high' | 'critical', isSelected: boolean) => {
  const color = dangerColors[danger].hex;
  const size = isSelected ? 36 : 28;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        ${danger === 'critical' ? 'animation: pulse 2s infinite;' : ''}
        ${isSelected ? 'box-shadow: 0 0 15px ' + color + ';' : ''}
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

const RegionMap = ({ businesses, selectedDistrict, onDistrictSelect }: RegionMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const getDistrictDanger = (districtId: string): 'low' | 'medium' | 'high' | 'critical' => {
    const business = businesses.find(b => b.districtId === districtId);
    return business?.dangerLevel || 'low';
  };

  const groupedDistricts = districts.reduce((acc, district) => {
    if (!acc[district.province]) {
      acc[district.province] = [];
    }
    acc[district.province].push(district);
    return acc;
  }, {} as Record<string, typeof districts>);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [40.2, 29.3],
      zoom: 9,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    districts.forEach((district) => {
      const danger = getDistrictDanger(district.id);
      const isSelected = selectedDistrict === district.id;
      const business = businesses.find(b => b.districtId === district.id);

      const marker = L.marker(district.latLng, {
        icon: createCustomIcon(danger, isSelected),
      });

      const dangerText = danger === 'low' ? 'Düşük' : danger === 'medium' ? 'Orta' : danger === 'high' ? 'Yüksek' : 'Kritik';
      
      marker.bindPopup(`
        <div style="font-size: 14px;">
          <p style="font-weight: bold; margin: 0 0 4px 0;">${district.name}</p>
          <p style="color: #666; margin: 0 0 4px 0;">${district.province}</p>
          ${business ? `<p style="margin: 0;">Tehlike: <strong>${dangerText}</strong></p>` : ''}
        </div>
      `);

      marker.on('click', () => {
        onDistrictSelect(district.id);
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [selectedDistrict, onDistrictSelect]);

  // Handle selected district change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (selectedDistrict) {
      const district = districts.find(d => d.id === selectedDistrict);
      if (district) {
        map.flyTo(district.latLng, 11, { duration: 0.5 });
      }
    } else {
      map.flyTo([40.2, 29.3], 9, { duration: 0.5 });
    }
  }, [selectedDistrict]);

  return (
    <div className="bg-card rounded-xl shadow-lg p-4 h-full">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <TreePine className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-foreground">Bölge Haritası</h2>
      </div>

      {/* Leaflet Map */}
      <div className="relative rounded-lg overflow-hidden mb-4 h-[300px]">
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
        `}</style>
        <div ref={mapContainerRef} className="h-full w-full rounded-lg" />
      </div>

      {/* Province Sections */}
      <div className="space-y-3">
        {Object.entries(groupedDistricts).map(([province, dists]) => (
          <div key={province}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              {province}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {dists.map((district) => {
                const danger = getDistrictDanger(district.id);
                const isSelected = selectedDistrict === district.id;
                
                return (
                  <button
                    key={district.id}
                    onClick={() => onDistrictSelect(district.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                      "border shadow-sm",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-glow"
                        : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-secondary"
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full",
                          dangerColors[danger].bg
                        )}
                      />
                      {district.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2">Tehlike Seviyeleri</p>
        <div className="flex flex-wrap gap-3">
          {[
            { level: 'Düşük', color: 'bg-fire-low' },
            { level: 'Orta', color: 'bg-fire-medium' },
            { level: 'Yüksek', color: 'bg-fire-high' },
            { level: 'Kritik', color: 'bg-fire-critical' },
          ].map((item) => (
            <div key={item.level} className="flex items-center gap-1.5">
              <span className={cn("w-3 h-3 rounded-full", item.color)} />
              <span className="text-xs text-muted-foreground">{item.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionMap;
