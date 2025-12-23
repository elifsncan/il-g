import VehicleChart from './charts/VehicleChart';
import DangerRankingChart from './charts/DangerRankingChart';
import MonthlyFireChart from './charts/MonthlyFireChart';
import TreeTypeChart from './charts/TreeTypeChart';
import YearlyFireChart from './charts/YearlyFireChart';
import FireCauseChart from './charts/FireCauseChart';
import BusinessInfo from './BusinessInfo';
import type { Business } from '@/types/forest';

interface DashboardProps {
  businesses: Business[];
  selectedDistrict: string | null;
  isLoading?: boolean;
  errorMessage?: string;
}

const Dashboard = ({ businesses, selectedDistrict, isLoading, errorMessage }: DashboardProps) => {
  const business = selectedDistrict 
    ? businesses.find(b => b.districtId === selectedDistrict)
    : null;

  if (isLoading) {
    return <div className="bg-card rounded-xl shadow p-6">Supabase verileri yükleniyor...</div>;
  }

  if (errorMessage) {
    return <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4">{errorMessage}</div>;
  }

  return (
    <div className="space-y-4">
      {/* Business Info Card */}
      <BusinessInfo businesses={businesses} districtId={selectedDistrict} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VehicleChart />
        <DangerRankingChart />
        <MonthlyFireChart business={business} />
        <TreeTypeChart business={business} />
        <YearlyFireChart business={business} />
        <FireCauseChart business={business} />
      </div>
    </div>
  );
};

export default Dashboard;
