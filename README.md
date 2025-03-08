# İftar Sayacı

Bu proje, İstanbul için iftar vaktine kalan süreyi gösteren basit bir geri sayım sayacıdır. HTML, CSS ve JavaScript kullanılarak geliştirilmiştir ve [Aladhan API](https://api.aladhan.com/) üzerinden günlük iftar vakitlerini çeker. İftar vakti geçtiğinde, otomatik olarak ertesi günün vaktine geçer.

## Özellikler
- Gerçek zamanlı geri sayım (saat, dakika, saniye).
- Koyu mod ile modern bir tasarım.
- İftar vakti geçince otomatik olarak ertesi güne geçiş.
- İstanbul için Aladhan API entegrasyonu.

## Kullanılan Diller
- **HTML:** Yapı ve içerik.
- **CSS:** Koyu mod tasarımı ve stil.
- **JavaScript:** API entegrasyonu ve geri sayım mantığı.

## Nasıl Çalışır?
1. `index.html` dosyası sayacın temel yapısını oluşturur.
2. `style.css` koyu mod temasını ve sayaç tasarımını sağlar.
3. `script.js` Aladhan API’den iftar vaktini çeker, kalan süreyi hesaplar ve ekranda günceller.

## Kurulum ve Kullanım
1. **Dosyaları İndir:**
   - Depodaki `index.html`, `style.css` ve `script.js` dosyalarını indirin.
2. **Yerel Olarak Çalıştır:**
   - `index.html` dosyasını bir tarayıcıda açın; sayaç otomatik olarak çalışır.
3. **GitHub Pages ile Canlı Kullanım:**
   - Depoyu GitHub’a yükledikten sonra GitHub Pages’i etkinleştirerek canlı hale getirebilirsiniz.

## API
- Kullanılan API: [Aladhan API](https://api.aladhan.com/v1/timingsByCity)
- Endpoint: `https://api.aladhan.com/v1/timingsByCity/{tarih}?city=Istanbul&country=Turkey`
- İftar vakti, `data.timings.Maghrib` alanından alınır.

## Canlı Site
Sayacı şu adresten ziyaret edebilirsiniz: [https://kullaniciadi.github.io/iftar-sayaci/](https://kullaniciadi.github.io/iftar-sayaci/)
