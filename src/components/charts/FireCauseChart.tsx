import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle } from 'lucide-react';
import type { Business } from '@/types/forest';
import { useFireCauseData } from '@/hooks/useSupabaseDashboard';

interface FireCauseChartProps {
  business?: Business | null;
}

const COLORS = [
  'hsl(var(--fire-danger-critical))',
  'hsl(var(--fire-danger-high))',
  'hsl(var(--fire-danger-medium))',
  'hsl(var(--primary))',
];

const FireCauseChart = ({ business }: FireCauseChartProps) => {
  const { data = [], isLoading } = useFireCauseData(business?.name);

  return (
    <div className="bg-card rounded-xl shadow-lg p-4 h-full animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <h3 className="font-semibold text-foreground">Yangın Nedenleri</h3>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={isLoading ? [] : data} margin={{ top: 10, right: 10, left: -10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="cause" 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              angle={-30}
              textAnchor="end"
              interval={0}
              height={50}
            />
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
            <Bar dataKey="count" name="Yangın Sayısı" radius={[4, 4, 0, 0]}>
              {(isLoading ? [] : data).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FireCauseChart;
