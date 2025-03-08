// Tarihi "GG-AA-YYYY" formatına çeviren fonksiyon
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Günü alır ve 2 haneli yapar
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ayı alır (0-11, +1 ekler), 2 haneli yapar
    const year = date.getFullYear(); // Yılı alır
    return `${day}-${month}-${year}`; // "GG-AA-YYYY" formatında string döner
}

// API’den iftar vaktini çeken fonksiyon
async function getIftarTime() {
    const today = new Date(); // Bugünün tarihini alır
    const dateString = formatDate(today); // Tarihi formatlar
    const url = `https://api.aladhan.com/v1/timingsByCity/${dateString}?city=Istanbul&country=Turkey`; // API URL’si
    
    try {
        const response = await fetch(url); // API’ye istek gönderir
        const data = await response.json(); // Cevabı JSON’a çevirir
        const iftarTime = data.data.timings.Maghrib; // İftar vaktini (Maghrib) alır
        console.log("API'dan gelen iftar vakti:", iftarTime); // Konsola veriyi yazar
        return iftarTime; // İftar vaktini döner (örn: "18:45")
    } catch (error) {
        console.error("API hatası:", error); // Hata varsa konsola yazar
        return null; // Hata durumunda null döner
    }
}

// İftar vaktini tam tarih nesnesine çeviren fonksiyon
function getIftarDateTime(iftarTime) {
    if (!iftarTime) return null; // İftar vakti yoksa null döner
    const [hours, minutes] = iftarTime.split(':'); // "18:45" → ["18", "45"]
    const iftarDate = new Date(); // Bugünün tarihini alır
    iftarDate.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Saat ve dakikayı yerel saate göre ayarlar
    console.log("Hesaplanan iftar zamanı:", iftarDate.toString()); // Konsola tam zamanı yazar
    return iftarDate; // Yerel saat dilimine göre tam zaman damgasını döner
}

// Geri sayımı güncelleyen fonksiyon
function updateCountdown() {
    getIftarTime().then(iftarTime => {
        if (!iftarTime) { // İftar vakti alınamazsa
            console.log("İftar vakti alınamadı, sayaç durduruldu.");
            document.getElementById('hours').innerText = "00";
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00";
            return;
        }

        const iftarDateTime = getIftarDateTime(iftarTime); // İftar vaktini tarih nesnesine çevirir
        if (!iftarDateTime) return; // Eğer çevirme başarısızsa durur

        const now = new Date(); // Şimdiki zamanı alır
        let timeLeft = iftarDateTime - now; // Kalan süreyi milisaniye cinsinden hesaplar

        if (timeLeft <= 0) { // İftar vakti geçmişse
            console.log("İftar vakti geçti, ertesi güne geçiliyor.");
            const tomorrow = new Date(); // Bugünü alır
            tomorrow.setDate(tomorrow.getDate() + 1); // Bir gün ileri alır
            setTimeout(updateCountdown, 1000); // 1 saniye sonra yeniden başlatır
            return;
        }

        // Kalan süreyi saat, dakika, saniyeye çevirir
        const hours = Math.floor(timeLeft / (1000 * 60 * 60)); // Saati hesaplar
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); // Dakikayı hesaplar
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); // Saniyeyi hesaplar

        // HTML’e değerleri yazar
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        console.log(`Kalan süre: ${hours}:${minutes}:${seconds}`); // Konsola kalan süreyi yazar
    }).catch(error => {
        console.error("updateCountdown hatası:", error); // Promise’de hata olursa yakalar
    });
}

// Sayacı başlatır
document.addEventListener('DOMContentLoaded', () => { // DOM tamamen yüklendiğinde çalışır
    updateCountdown(); // İlk çalıştırma
    setInterval(updateCountdown, 1000); // Her saniye günceller
});