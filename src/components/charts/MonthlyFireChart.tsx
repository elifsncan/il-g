import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Business } from '@/types/forest';
import { useMonthlyFireData } from '@/hooks/useSupabaseDashboard';

interface MonthlyFireChartProps {
  business?: Business | null;
}

const availableYears = [2023, 2024, 2025];

const MonthlyFireChart = ({ business }: MonthlyFireChartProps) => {
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const { data = [], isLoading } = useMonthlyFireData(business?.id, selectedYear);

  return (
    <div className="bg-card rounded-xl shadow-lg p-4 h-full animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-fire-high" />
          <h3 className="font-semibold text-foreground">Aylık Yangın Grafiği</h3>
        </div>
        <Select value={selectedYear.toString()} onValueChange={(val) => setSelectedYear(Number(val))}>
          <SelectTrigger className="w-24 h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={isLoading ? [] : data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFire" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--fire-danger-high))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--fire-danger-high))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: number) => [value, 'Yangın Sayısı']}
            />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="hsl(var(--fire-danger-high))" 
              fillOpacity={1} 
              fill="url(#colorFire)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyFireChart;
