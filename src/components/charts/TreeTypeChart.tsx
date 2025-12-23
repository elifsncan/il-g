import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TreeDeciduous } from 'lucide-react';
import type { Business } from '@/types/forest';
import { useTreeTypeData } from '@/hooks/useSupabaseDashboard';

interface TreeTypeChartProps {
  business?: Business | null;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--fire-danger-medium))',
  'hsl(var(--fire-danger-high))',
  'hsl(var(--earth))',
];

const TreeTypeChart = ({ business }: TreeTypeChartProps) => {
  const { data = [], isLoading } = useTreeTypeData(business?.name);

  return (
    <div className="bg-card rounded-xl shadow-lg p-4 h-full animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <TreeDeciduous className="h-5 w-5 text-leaf" />
        <h3 className="font-semibold text-foreground">En Çok Yanan Ağaç Türleri</h3>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={isLoading ? [] : data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={70}
              fill="#8884d8"
              dataKey="count"
              nameKey="treeType"
              label={({ treeType, percent }) => `${treeType} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '11px' }}
              formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TreeTypeChart;
