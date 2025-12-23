-- Araç türleri tablosu
CREATE TABLE public.arac (
  arac_tur_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  arac_tur_adi TEXT
);

-- İşletmeler tablosu
CREATE TABLE public.isletme (
  isletme_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  isletme_ad TEXT
);

-- İşletme araçları tablosu
CREATE TABLE public.isletme_arac (
  isletme_arac_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  isletme_id BIGINT REFERENCES public.isletme(isletme_id),
  arac_tur_id BIGINT REFERENCES public.arac(arac_tur_id),
  adet BIGINT
);

-- Yangın tabloları (yıllara göre)
CREATE TABLE public.yangin_2023 (
  yangin_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  yangin_ay TEXT,
  yangin_il TEXT,
  isletme_id BIGINT REFERENCES public.isletme(isletme_id),
  agac_tur TEXT,
  yangin_neden TEXT,
  kullanilan_personel_sayisi BIGINT
);

CREATE TABLE public.yangin_2024 (
  yangin_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  yangin_ay TEXT,
  yangin_il TEXT,
  isletme_id BIGINT REFERENCES public.isletme(isletme_id),
  agac_tur TEXT,
  yangin_neden TEXT,
  kullanilan_personel_sayisi BIGINT
);

CREATE TABLE public.yangin_2025 (
  yangin_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  yangin_ay TEXT,
  yangin_il TEXT,
  isletme_id BIGINT REFERENCES public.isletme(isletme_id),
  agac_tur TEXT,
  yangin_neden TEXT,
  kullanilan_personel_sayisi BIGINT
);

-- Yangın araç tabloları (yıllara göre)
CREATE TABLE public.yangin_arac_2023 (
  yangin_arac_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  yangin_id BIGINT REFERENCES public.yangin_2023(yangin_id),
  arac_tur_id BIGINT REFERENCES public.arac(arac_tur_id),
  adet BIGINT
);

CREATE TABLE public.yangin_arac_2024 (
  yangin_arac_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  yangin_id BIGINT REFERENCES public.yangin_2024(yangin_id),
  arac_tur_id BIGINT REFERENCES public.arac(arac_tur_id),
  adet BIGINT
);

CREATE TABLE public.yangin_arac_2025 (
  yangin_arac_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  yangin_id BIGINT REFERENCES public.yangin_2025(yangin_id),
  arac_tur_id BIGINT REFERENCES public.arac(arac_tur_id),
  adet BIGINT
);

-- Tüm yıllar yangın view
CREATE VIEW public.tum_yillar_yangin AS
SELECT yangin_id, isletme_id FROM public.yangin_2023
UNION ALL
SELECT yangin_id, isletme_id FROM public.yangin_2024
UNION ALL
SELECT yangin_id, isletme_id FROM public.yangin_2025;

-- Tüm yıllar yangın detay view
CREATE VIEW public.tum_yillar_yangin_detay AS
SELECT isletme_id, yangin_neden FROM public.yangin_2023
UNION ALL
SELECT isletme_id, yangin_neden FROM public.yangin_2024
UNION ALL
SELECT isletme_id, yangin_neden FROM public.yangin_2025;

-- Tüm yıllar yangın araç view
CREATE VIEW public.tum_yillar_yangin_arac AS
SELECT yangin_id, arac_tur_id, adet FROM public.yangin_arac_2023
UNION ALL
SELECT yangin_id, arac_tur_id, adet FROM public.yangin_arac_2024
UNION ALL
SELECT yangin_id, arac_tur_id, adet FROM public.yangin_arac_2025;

-- Yangın analiz view
CREATE VIEW public.yangin_analiz_view AS
SELECT 
  yangin_ay,
  isletme_id,
  kullanilan_personel_sayisi,
  CASE 
    WHEN kullanilan_personel_sayisi > 50 THEN 'Yüksek'
    WHEN kullanilan_personel_sayisi > 20 THEN 'Orta'
    ELSE 'Düşük'
  END AS tehlike_seviyesi
FROM (
  SELECT yangin_ay, isletme_id, kullanilan_personel_sayisi FROM public.yangin_2023
  UNION ALL
  SELECT yangin_ay, isletme_id, kullanilan_personel_sayisi FROM public.yangin_2024
  UNION ALL
  SELECT yangin_ay, isletme_id, kullanilan_personel_sayisi FROM public.yangin_2025
) AS all_fires;

-- İşletme yangın nedenleri view
CREATE VIEW public.isletme_yangin_nedenleri_view AS
SELECT 
  i.isletme_ad,
  t.yangin_neden,
  COUNT(*) AS yangin_sayisi
FROM public.tum_yillar_yangin_detay t
JOIN public.isletme i ON t.isletme_id = i.isletme_id
GROUP BY i.isletme_ad, t.yangin_neden;

-- Tehlikeli yangın ağaç view
CREATE VIEW public.tehlikeli_yangin_agac_view AS
SELECT 
  i.isletme_ad,
  y.agac_tur,
  COUNT(*) AS yangin_sayisi
FROM (
  SELECT isletme_id, agac_tur FROM public.yangin_2023
  UNION ALL
  SELECT isletme_id, agac_tur FROM public.yangin_2024
  UNION ALL
  SELECT isletme_id, agac_tur FROM public.yangin_2025
) y
JOIN public.isletme i ON y.isletme_id = i.isletme_id
GROUP BY i.isletme_ad, y.agac_tur;

-- İşletme tehlike sıralama view
CREATE VIEW public.isletme_tehlike_siralama_view AS
SELECT 
  i.isletme_ad,
  CASE 
    WHEN COUNT(*) > 10 THEN 'Çok Yüksek'
    WHEN COUNT(*) > 5 THEN 'Yüksek'
    WHEN COUNT(*) > 2 THEN 'Orta'
    ELSE 'Düşük'
  END AS tehlike_turu,
  COUNT(*) AS yangin_sayisi
FROM public.tum_yillar_yangin t
JOIN public.isletme i ON t.isletme_id = i.isletme_id
GROUP BY i.isletme_ad;

-- İşletme araç aşımı view
CREATE VIEW public.isletme_arac_asimi_view AS
SELECT 
  i.isletme_ad,
  COALESCE(SUM(ia.adet), 0) AS isletme_toplam_arac,
  COALESCE(SUM(ya.adet), 0) AS yanginda_kullanilan_arac,
  COALESCE(SUM(ya.adet), 0) - COALESCE(SUM(ia.adet), 0) AS arac_asimi
FROM public.isletme i
LEFT JOIN public.isletme_arac ia ON i.isletme_id = ia.isletme_id
LEFT JOIN public.tum_yillar_yangin ty ON i.isletme_id = ty.isletme_id
LEFT JOIN public.tum_yillar_yangin_arac ya ON ty.yangin_id = ya.yangin_id
GROUP BY i.isletme_ad;

-- RLS'yi etkinleştir (public okuma izni)
ALTER TABLE public.arac ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.isletme ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.isletme_arac ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yangin_2023 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yangin_2024 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yangin_2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yangin_arac_2023 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yangin_arac_2024 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yangin_arac_2025 ENABLE ROW LEVEL SECURITY;

-- Herkese okuma izni (public dashboard için)
CREATE POLICY "Public read access" ON public.arac FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.isletme FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.isletme_arac FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.yangin_2023 FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.yangin_2024 FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.yangin_2025 FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.yangin_arac_2023 FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.yangin_arac_2024 FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.yangin_arac_2025 FOR SELECT USING (true);