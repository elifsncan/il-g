-- View'ları SECURITY INVOKER olarak yeniden oluştur
DROP VIEW IF EXISTS public.isletme_arac_asimi_view;
DROP VIEW IF EXISTS public.isletme_tehlike_siralama_view;
DROP VIEW IF EXISTS public.isletme_yangin_nedenleri_view;
DROP VIEW IF EXISTS public.tehlikeli_yangin_agac_view;
DROP VIEW IF EXISTS public.yangin_analiz_view;
DROP VIEW IF EXISTS public.tum_yillar_yangin_arac;
DROP VIEW IF EXISTS public.tum_yillar_yangin_detay;
DROP VIEW IF EXISTS public.tum_yillar_yangin;

-- Tüm yıllar yangın view (SECURITY INVOKER)
CREATE VIEW public.tum_yillar_yangin 
WITH (security_invoker = true) AS
SELECT yangin_id, isletme_id FROM public.yangin_2023
UNION ALL
SELECT yangin_id, isletme_id FROM public.yangin_2024
UNION ALL
SELECT yangin_id, isletme_id FROM public.yangin_2025;

-- Tüm yıllar yangın detay view (SECURITY INVOKER)
CREATE VIEW public.tum_yillar_yangin_detay 
WITH (security_invoker = true) AS
SELECT isletme_id, yangin_neden FROM public.yangin_2023
UNION ALL
SELECT isletme_id, yangin_neden FROM public.yangin_2024
UNION ALL
SELECT isletme_id, yangin_neden FROM public.yangin_2025;

-- Tüm yıllar yangın araç view (SECURITY INVOKER)
CREATE VIEW public.tum_yillar_yangin_arac 
WITH (security_invoker = true) AS
SELECT yangin_id, arac_tur_id, adet FROM public.yangin_arac_2023
UNION ALL
SELECT yangin_id, arac_tur_id, adet FROM public.yangin_arac_2024
UNION ALL
SELECT yangin_id, arac_tur_id, adet FROM public.yangin_arac_2025;

-- Yangın analiz view (SECURITY INVOKER)
CREATE VIEW public.yangin_analiz_view 
WITH (security_invoker = true) AS
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

-- İşletme yangın nedenleri view (SECURITY INVOKER)
CREATE VIEW public.isletme_yangin_nedenleri_view 
WITH (security_invoker = true) AS
SELECT 
  i.isletme_ad,
  t.yangin_neden,
  COUNT(*) AS yangin_sayisi
FROM public.tum_yillar_yangin_detay t
JOIN public.isletme i ON t.isletme_id = i.isletme_id
GROUP BY i.isletme_ad, t.yangin_neden;

-- Tehlikeli yangın ağaç view (SECURITY INVOKER)
CREATE VIEW public.tehlikeli_yangin_agac_view 
WITH (security_invoker = true) AS
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

-- İşletme tehlike sıralama view (SECURITY INVOKER)
CREATE VIEW public.isletme_tehlike_siralama_view 
WITH (security_invoker = true) AS
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

-- İşletme araç aşımı view (SECURITY INVOKER)
CREATE VIEW public.isletme_arac_asimi_view 
WITH (security_invoker = true) AS
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