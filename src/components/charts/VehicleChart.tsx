import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Truck } from 'lucide-react';
import { useVehicleData } from '@/hooks/useSupabaseDashboard';

const VehicleChart = () => {
  const { data = [], isLoading } = useVehicleData();

  return (
    <div className="bg-card rounded-xl shadow-lg p-4 h-full animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Truck className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Araç Kullanım Durumu</h3>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={isLoading ? [] : data} margin={{ top: 10, right: 10, left: -10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="businessName" 
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              angle={-45}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Bar dataKey="totalVehicles" name="Mevcut Araç" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="usedVehicles" name="Kullanılan" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="excess" name="Aşım" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VehicleChart;
