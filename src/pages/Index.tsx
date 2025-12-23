import { useState } from 'react';
import Header from '@/components/Header';
import RegionMap from '@/components/RegionMap';
import Dashboard from '@/components/Dashboard';
import { useBusinesses } from '@/hooks/useSupabaseDashboard';

const Index = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const { data: businesses = [], isLoading, error } = useBusinesses();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Map Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-6">
              <RegionMap 
                businesses={businesses}
                selectedDistrict={selectedDistrict}
                onDistrictSelect={setSelectedDistrict}
              />
            </div>
          </aside>

          {/* Dashboard Main Area */}
          <section className="lg:col-span-8 xl:col-span-9">
            <Dashboard 
              businesses={businesses}
              selectedDistrict={selectedDistrict} 
              isLoading={isLoading}
              errorMessage={error?.message}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Orman Yangını İzleme Sistemi © 2024 • Bursa, Bilecik, Yalova Bölge Müdürlüğü</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
