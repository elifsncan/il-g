import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type {
  Business,
  DangerRankingData,
  FireCauseData,
  MonthlyFireData,
  TreeTypeData,
  VehicleData,
  YearlyFireData,
} from "@/types/forest";

const dangerMap: Record<string, Business["dangerLevel"]> = {
  "Çok Yüksek": "critical",
  "Cok Yuksek": "critical",
  "Yüksek": "high",
  "Yuksek": "high",
  "Orta": "medium",
  "Düşük": "low",
  Dusuk: "low",
};

const monthLabels = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
const monthAliases = [
  ["ocak", "january"],
  ["şubat", "subat", "february"],
  ["mart", "march"],
  ["nisan", "april"],
  ["mayıs", "mayis", "may"],
  ["haziran", "june"],
  ["temmuz", "july"],
  ["ağustos", "agustos", "august"],
  ["eylül", "eylul", "september"],
  ["ekim", "october"],
  ["kasım", "kasim", "november"],
  ["aralık", "aralik", "december"],
];

const yearTable: Record<number, string> = {
  2023: "Yangin_2023",
  2024: "Yangin_2024",
  2025: "Yangin_2025",
};

// Hard mapping isletme_ad -> districtId used by the map UI
const districtMap: Record<string, string> = {
  "Bursa Merkez Orman İşletmesi": "bursa-merkez",
  "Gemlik Orman İşletmesi": "bursa-gemlik",
  "İnegöl Orman İşletmesi": "bursa-inegol",
  "Inegol Orman İşletmesi": "bursa-inegol",
  "İznik Orman İşletmesi": "bursa-iznik",
  "Orhaneli Orman İşletmesi": "bursa-orhaneli",
  "Mustafakemalpaşa Orman İşletmesi": "bursa-mkpasa",
  "Karacabey Orman İşletmesi": "bursa-karacabey",
  "Keles Orman İşletmesi": "bursa-keles",
  "Bilecik Merkez Orman İşletmesi": "bilecik-merkez",
  "Bozüyük Orman İşletmesi": "bilecik-bozuyuk",
  "Bozuyuk Orman İşletmesi": "bilecik-bozuyuk",
  "Yalova Merkez Orman İşletmesi": "yalova-merkez",
};

const normalizeDistrictId = (name?: string | null) => {
  if (!name) return undefined;
  if (districtMap[name]) return districtMap[name];
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[üÜ]/g, "u");
};

const supabaseFetch = async <T>(promise: Promise<{ data: T | null; error: any }>): Promise<T> => {
  const { data, error } = await promise;
  if (error) throw error;
  return (data as T) ?? ([] as unknown as T);
};

export const useBusinesses = () =>
  useQuery({
    queryKey: ["businesses"],
    queryFn: async (): Promise<Business[]> => {
      const [isletmeler, aracAsimi, tehlike, araclar] = await Promise.all([
        supabaseFetch(
          supabase.from("Isletme").select(`
            isletme_id,
            isletme_ad
          `)
        ),
        supabaseFetch(supabase.from("isletme_arac_asimi_view").select("*")),
        supabaseFetch(supabase.from("isletme_tehlike_siralama_view").select("*")),
        supabaseFetch(
          supabase
            .from("Isletme_arac")
            .select("isletme_id, adet, Arac(arac_tur_adi)")
        ),
      ]);

      return isletmeler.map((row) => {
        const name = row.isletme_ad ?? `İşletme ${row.isletme_id}`;
        const vehicleInfo = aracAsimi.find((v) => v.isletme_ad === name);
        const dangerInfo = tehlike.find((d) => d.isletme_ad === name);
        const vehicleTypes =
          araclar
            .filter((a) => a.isletme_id === row.isletme_id)
            .map((a) => ({
              type: a.arac?.arac_tur_adi ?? "Araç",
              count: Number(a.adet ?? 0),
            })) ?? [];

        return {
          id: String(row.isletme_id),
          name,
          districtId: normalizeDistrictId(name) ?? String(row.isletme_id),
          totalVehicles: Number(vehicleInfo?.isletme_toplam_arac ?? 0),
          usedInFireVehicles: Number(vehicleInfo?.yanginda_kullanilan_arac ?? 0),
          dangerLevel: dangerMap[dangerInfo?.tehlike_turu ?? "Düşük"] ?? "low",
          vehicleTypes,
        };
      });
    },
  });

export const useVehicleData = () =>
  useQuery({
    queryKey: ["vehicle-data"],
    queryFn: async (): Promise<VehicleData[]> => {
      const data = await supabaseFetch(supabase.from("isletme_arac_asimi_view").select("*"));
      return data.map((row) => ({
        businessName: (row.isletme_ad ?? "İşletme").replace(" Orman İşletmesi", ""),
        totalVehicles: Number(row.isletme_toplam_arac ?? 0),
        usedVehicles: Number(row.yanginda_kullanilan_arac ?? 0),
        excess: Number(row.arac_asimi ?? 0),
      }));
    },
  });

export const useDangerRankingData = () =>
  useQuery({
    queryKey: ["danger-ranking"],
    queryFn: async (): Promise<DangerRankingData[]> => {
      const data = await supabaseFetch(supabase.from("isletme_tehlike_siralama_view").select("*"));
      return data
        .map((row) => {
          const level = dangerMap[row.tehlike_turu ?? "Düşük"] ?? "low";
          const scoreMap = { low: 25, medium: 50, high: 75, critical: 100 };
          return {
            businessName: (row.isletme_ad ?? "İşletme").replace(" Orman İşletmesi", ""),
            dangerScore: scoreMap[level],
            level,
          };
        })
        .sort((a, b) => b.dangerScore - a.dangerScore);
    },
  });

export const useMonthlyFireData = (businessId?: string, year: number = 2023) =>
  useQuery({
    queryKey: ["monthly-fire", businessId, year],
    queryFn: async (): Promise<MonthlyFireData[]> => {
      const table = yearTable[year];
      if (!table) return monthLabels.map((m) => ({ month: m, count: 0 }));
      const data = await supabaseFetch(
        supabase.from(table).select("yangin_ay, isletme_id")
      );
      const filtered = businessId ? data.filter((d) => String(d.isletme_id) === businessId) : data;
      return monthLabels.map((label, idx) => {
        const aliases = monthAliases[idx] ?? [];
        const count = filtered.filter((f) => {
          const val = (f.yangin_ay ?? "").toString();
          const lower = val.toLowerCase();
          return aliases.some((alias) => lower === alias);
        }).length;
        return { month: label, count };
      });
    },
  });

export const useYearlyFireData = (businessId?: string) =>
  useQuery({
    queryKey: ["yearly-fire", businessId],
    queryFn: async (): Promise<YearlyFireData[]> => {
      const results = await Promise.all(
        Object.entries(yearTable).map(async ([yearStr, table]) => {
          const data = await supabaseFetch(
            supabase.from(table).select("isletme_id")
          );
          const filtered = businessId ? data.filter((d) => String(d.isletme_id) === businessId) : data;
          return { year: Number(yearStr), count: filtered.length };
        })
      );
      return results.sort((a, b) => a.year - b.year);
    },
  });

export const useTreeTypeData = (businessName?: string) =>
  useQuery({
    queryKey: ["tree-type", businessName],
    queryFn: async (): Promise<TreeTypeData[]> => {
      const data = await supabaseFetch(
        supabase.from("tehlikeli_yangin_agac_view").select("*")
      );
      const filtered = businessName ? data.filter((d) => d.isletme_ad === businessName) : data;
      return filtered.map((row) => ({
        treeType: row.agac_tur ?? "Bilinmiyor",
        count: Number(row.yangin_sayisi ?? 0),
      }));
    },
  });

export const useFireCauseData = (businessName?: string) =>
  useQuery({
    queryKey: ["fire-cause", businessName],
    queryFn: async (): Promise<FireCauseData[]> => {
      const data = await supabaseFetch(
        supabase.from("isletme_yangin_nedenleri_view").select("*")
      );
      const filtered = businessName ? data.filter((d) => d.isletme_ad === businessName) : data;
      return filtered.map((row) => ({
        cause: row.yangin_neden ?? "Bilinmiyor",
        count: Number(row.yangin_sayisi ?? 0),
      }));
    },
  });

