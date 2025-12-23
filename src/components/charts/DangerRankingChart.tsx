import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import { useDangerRankingData } from '@/hooks/useSupabaseDashboard';

const dangerColors = {
  low: 'hsl(var(--fire-danger-low))',
  medium: 'hsl(var(--fire-danger-medium))',
  high: 'hsl(var(--fire-danger-high))',
  critical: 'hsl(var(--fire-danger-critical))',
};

const DangerRankingChart = () => {
  const { data = [], isLoading } = useDangerRankingData();

  return (
    <div className="bg-card rounded-xl shadow-lg p-4 h-full animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <h3 className="font-semibold text-foreground">Tehlike Sıralaması</h3>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={isLoading ? [] : data} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis 
              dataKey="businessName" 
              type="category" 
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              width={55}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: number) => [`${value}%`, 'Tehlike Skoru']}
            />
            <Bar dataKey="dangerScore" name="Tehlike Skoru" radius={[0, 4, 4, 0]}>
              {(isLoading ? [] : data).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={dangerColors[entry.level]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DangerRankingChart;
