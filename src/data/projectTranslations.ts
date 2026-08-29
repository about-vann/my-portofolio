export const PROJECT_TRANSLATIONS: Record<string, {
  summary: string;
  description: string;
  overview: string;
  challenges: string;
  solutions: string;
}> = {
  'ignmasvikk-wb': {
    summary: 'Framework WhatsApp Bot dan library otomasi multi-device untuk Node.js.',
    description: 'Framework WhatsApp Bot multi-device berlatensi rendah untuk Node.js dengan arsitektur modular, event-driven socket handling, dan dukungan koneksi persistent Baileys yang stabil untuk kebutuhan otomasi skala besar.',
    overview: 'Arsitektur modular berbasis event handler dengan penyimpanan session lokal yang aman dan persisten.',
    challenges: 'Menjaga reconnect otomatis tetap stabil tanpa memutus koneksi saat terjadi perubahan pada handshake socket.',
    solutions: 'Menggunakan exponential backoff untuk proses reconnect serta buffer antrean pesan saat koneksi dipulihkan.',
  },
  'ignmasvikk-bot': {
    summary: 'Bot WhatsApp yang ditenagai @ignmasvikk/wb dengan sistem plugin modular.',
    description: 'Bot WhatsApp serbaguna dengan sistem plugin modular untuk AI assistant, downloader media, manajemen grup, game interaktif, dan integrasi API real-time.',
    overview: 'Plugin loader dinamis yang dapat memuat command secara langsung tanpa harus melakukan restart bot.',
    challenges: 'Mengurangi spam command dan penggunaan resource berlebih pada grup dengan aktivitas tinggi.',
    solutions: 'Menerapkan rate limiting bertingkat berdasarkan pengguna serta cooldown khusus untuk setiap grup.',
  },
  'ignmasvikk-webly': {
    summary: 'Paket utilitas web ringan untuk membangun dan mengelola aplikasi web modern.',
    description: 'Paket utilitas web JavaScript/TypeScript yang ringan untuk caching browser, helper manipulasi data, konversi format, dan HTTP client wrappers.',
    overview: 'Arsitektur ES Module murni dengan tree-shaking maksimal dan tanpa dependensi eksternal.',
    challenges: 'Menjaga ukuran bundle tetap sangat kecil tanpa menghilangkan utilitas penting.',
    solutions: 'Menggunakan modul-modul kecil dengan strict typing dan export yang dapat di-tree-shake.',
  },
  'open-api': {
    summary: 'Framework backend Node.js untuk membangun aplikasi web modern dan RESTful API.',
    description: 'Framework backend RESTful API berbasis Node.js dan Express yang terstruktur, cepat, serta mendukung API Key, scraper utilities, media converter, dan gateway proxy.',
    overview: 'Express gateway multi-core dengan rate limiter dan lapisan caching untuk menangani request secara efisien.',
    challenges: 'Mengelola banyak request secara bersamaan sambil menjaga kestabilan akses ke layanan pihak ketiga.',
    solutions: 'Menggunakan rotasi proxy pool dan pengelolaan request secara dinamis untuk meningkatkan ketahanan gateway.',
  },
};
