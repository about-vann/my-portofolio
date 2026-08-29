import { Project, SkillItem, ExperienceItem, Testimonial, Article } from '../types';
import profileAvatar from '../assets/images/profile-avatar.jpg';
import heroCover from '../assets/images/hero-cover.jpg';

export const PERSONAL_INFO = {
  name: 'Muhammad Fikri',
  brandName: 'Ignmasvikk Creative',
  alias: 'Ignmasvikk',
  title: {
    id: 'Web & Bot Developer',
    en: 'Web & Bot Developer',
  },
  tagline: {
    id: 'Full-stack developer focused exclusively on personal projects, building modern and scalable web applications with React, developing WhatsApp bots, and integrating reliable WhatsApp gateway solutions for seamless automation and communication.',
    en: 'Full-stack developer focused exclusively on personal projects, building modern and scalable web applications with React, developing WhatsApp bots, and integrating reliable WhatsApp gateway solutions for seamless automation and communication.',
  },
  age: '17 Year',
  location: 'Surabaya, Indonesia',
  email: 'vanndx26@gmail.com',
  phone: '6287721401837',
  formattedPhone: '+62 877-2140-1837',
  whatsapp: 'https://wa.me/6287721401837',
  github: 'https://github.com/about-vann',
  githubHandle: '@ignmasvikk',
  instagram: 'https://instagram.com/piikkkri_',
  instagramHandle: '@piikkkri_',
  telegram: 'https://t.me/masvanz',
  telegramHandle: '@masvanz',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  avatar: profileAvatar,
  heroCover,
  note: {
    id: 'Web & Bot Developer',
    en: 'Web & Bot Developer',
  },
  availability: {
    status: 'open',
    label: {
      id: 'Tersedia untuk Pekerjaan & Kolaborasi',
      en: 'Available for Work & Projects',
    },
  },
  stats: [
    { value: '17', label: { id: 'Usia', en: 'Age' } },
    { value: 'Stack', label: { id: 'Fokus', en: 'Focus' } },
    { value: 'Surabaya', label: { id: 'Lokasi', en: 'Location' } },
    { value: 'Active', label: { id: 'Status', en: 'Status' } },
  ],
  bio: {
    philosophy: {
      id: 'Full-stack developer focused exclusively on personal projects, building modern and scalable web applications with React, developing WhatsApp bots, and integrating reliable WhatsApp gateway solutions for seamless automation and communication.',
      en: 'Full-stack developer focused exclusively on personal projects, building modern and scalable web applications with React, developing WhatsApp bots, and integrating reliable WhatsApp gateway solutions for seamless automation and communication.',
    },
    background: {
      id: 'Specializing in TypeScript, React, Node.js, Express, Baileys multi-device bot framework, and robust RESTful API gateways.',
      en: 'Specializing in TypeScript, React, Node.js, Express, Baileys multi-device bot framework, and robust RESTful API gateways.',
    },
    aboutIntro: {
      id: 'Welcome to my developer ecosystem, a self-built infrastructure that brings web applications, WhatsApp bots, and gateway services together under one unified platform.',
      en: 'Welcome to my developer ecosystem, a self-built infrastructure that brings web applications, WhatsApp bots, and gateway services together under one unified platform.',
    },
    aboutBody: {
      id: 'Built from the ground up, the ecosystem is designed for seamless integration between web and bot services, enabling automation, real-time communication, and scalable service management through a lightweight and highly responsive architecture.',
      en: 'Built from the ground up, the ecosystem is designed for seamless integration between web and bot services, enabling automation, real-time communication, and scalable service management through a lightweight and highly responsive architecture.',
    },
  },
};

export const PROJECTS: Project[] = [
  {
    id: 'ignmasvikk-wb',
    title: '@ignmasvikk/wb',
    category: 'system',
    categoryLabel: { id: 'Bot Framework', en: 'Bot Framework' },
    techBadge: 'TS',
    typeBadge: 'NPM',
    summary: {
      id: 'WhatsApp Bot framework and multi-device automation library for Node.js.',
      en: 'WhatsApp Bot framework and multi-device automation library for Node.js.',
    },
    description: {
      id: 'Framework WhatsApp Bot multi-device berlatensi rendah untuk Node.js dengan arsitektur modular, event-driven socket handling, dan dukungan koneksi persistent Baileys yang stabil untuk kebutuhan otomasi skala enterprise.',
      en: 'High-performance WhatsApp multi-device automation framework for Node.js featuring modular plugins, event-driven socket pipelines, and robust session persistence.',
    },
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    tags: ['TypeScript', 'Node.js', 'Baileys', 'Multi-Device', 'NPM Package'],
    liveUrl: 'https://github.com/about-vann',
    githubUrl: 'https://github.com/about-vann',
    featured: true,
    year: '2026',
    metrics: [
      { label: { id: 'Latency', en: 'Latency' }, value: '< 120ms' },
      { label: { id: 'Uptime', en: 'Uptime' }, value: '99.9%' },
    ],
    architecture: {
      overview: {
        id: 'Arsitektur modular event handler dengan session state SQLite / JSON terenkripsi.',
        en: 'Modular event-driven architecture with encrypted local session storage.',
      },
      challenges: {
        id: 'Menjaga reconnect otomatis tanpa disconnect saat handshakes socket berubah.',
        en: 'Sustaining zero-downtime auto reconnect during WhatsApp socket protocol updates.',
      },
      solutions: {
        id: 'Exponential backoff reconnect loop dengan buffer antrean pesan.',
        en: 'Implemented exponential backoff recovery loop with in-memory message queuing.',
      },
      stack: ['TypeScript', 'Node.js', 'Baileys', 'Pino Logger', 'NPM'],
    },
  },
  {
    id: 'ignmasvikk-bot',
    title: 'Ignmasvikk Bot',
    category: 'system',
    categoryLabel: { id: 'WhatsApp Bot', en: 'WhatsApp Bot' },
    techBadge: 'JS',
    typeBadge: 'BOT',
    summary: {
      id: 'WhatsApp Bot powered by @ignmasvikk/wb with a modular plugin system.',
      en: 'WhatsApp Bot powered by @ignmasvikk/wb with a modular plugin system.',
    },
    description: {
      id: 'Bot WhatsApp serbaguna yang ditenagai engine @ignmasvikk/wb. Memiliki ratusan fitur plugin: AI assistant, media downloader, automasi grup, games interaktif, dan integrasi API real-time.',
      en: 'Multi-purpose WhatsApp automation bot powered by @ignmasvikk/wb. Includes rich plugin suite: AI assistant, media downloader, group management, and real-time APIs.',
    },
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    tags: ['JavaScript', 'Node.js', 'Bot Automation', 'REST API', 'Plugin Engine'],
    liveUrl: 'https://t.me/masvanz',
    githubUrl: 'https://github.com/about-vann',
    featured: true,
    year: '2026',
    metrics: [
      { label: { id: 'Total Perintah', en: 'Commands' }, value: '150+' },
      { label: { id: 'Pesan Terproses', en: 'Processed' }, value: '500k+' },
    ],
    architecture: {
      overview: {
        id: 'Plugin loader dinamis yang memuat command script secara on-the-fly tanpa restart bot.',
        en: 'Hot-reloading dynamic plugin loader executing command modules on-the-fly.',
      },
      challenges: {
        id: 'Mencegah spam command dan konsumsi resource berlebih pada grup besar.',
        en: 'Mitigating command flooding and excessive CPU load in heavy group chats.',
      },
      solutions: {
        id: 'Rate limiting bertingkat per user dan group cooldown bucket.',
        en: 'Multi-tier rate limiting with in-memory cooldown bucket algorithms.',
      },
      stack: ['JavaScript', 'Node.js', 'Express', 'FFmpeg', 'Axios'],
    },
  },
  {
    id: 'ignmasvikk-webly',
    title: '@ignmasvikk/webly',
    category: 'web',
    categoryLabel: { id: 'Web Utility', en: 'Web Utility' },
    techBadge: 'TS',
    typeBadge: 'NPM',
    summary: {
      id: 'Lightweight web utility package for building and managing modern web applications',
      en: 'Lightweight web utility package for building and managing modern web applications',
    },
    description: {
      id: 'Paket utilitas web JavaScript/TypeScript yang super ringan untuk mempermudah caching data di browser, helper manipulasi string & array, color format conversion, dan HTTP client wrappers.',
      en: 'Ultra-lightweight web utilities package for modern JS/TS apps, offering smart client caching, format helpers, and clean HTTP client wrappers.',
    },
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    tags: ['TypeScript', 'NPM', 'Utility', 'Web Performance', 'Tree-shaking'],
    liveUrl: 'https://github.com/about-vann',
    githubUrl: 'https://github.com/about-vann',
    featured: true,
    year: '2025',
    metrics: [
      { label: { id: 'Ukuran Paket', en: 'Package Size' }, value: '4.2 KB' },
      { label: { id: 'Zero Deps', en: 'Zero Deps' }, value: '100%' },
    ],
    architecture: {
      overview: {
        id: 'Arsitektur pure ES Module dengan tree-shaking maksimal dan zero external dependencies.',
        en: 'Pure ESM module architecture compiled with esbuild for zero-dependency tree-shaking.',
      },
      challenges: {
        id: 'Menjaga ukuran bundle di bawah 5 KB tanpa mengurangi utilitas penting.',
        en: 'Keeping bundle size strictly under 5 KB while providing essential web utilities.',
      },
      solutions: {
        id: 'Micro-modular export dengan TypeScript strict mode.',
        en: 'Micro-modular exports with strictly typed pure utility primitives.',
      },
      stack: ['TypeScript', 'Vite / esbuild', 'NPM'],
    },
  },
  {
    id: 'open-api',
    title: 'Open API',
    category: 'web',
    categoryLabel: { id: 'Backend API', en: 'Backend API' },
    techBadge: 'JS',
    typeBadge: 'WEB',
    summary: {
      id: 'A Node.js backend framework for building modern web applications and RESTful APIs.',
      en: 'A Node.js backend framework for building modern web applications and RESTful APIs.',
    },
    description: {
      id: 'Framework backend service RESTful API berbasis Node.js & Express yang terstruktur, cepat, dan dilengkapi otentikasi API Key, scraper utilities, media converter, dan gateway proxies terintegrasi.',
      en: 'Structured Node.js RESTful API gateway framework equipped with API Key management, web scraping utilities, media converters, and proxy pipelines.',
    },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    tags: ['Node.js', 'Express', 'REST API', 'API Gateway', 'Scraper'],
    liveUrl: 'https://github.com/about-vann',
    githubUrl: 'https://github.com/about-vann',
    featured: true,
    year: '2025',
    metrics: [
      { label: { id: 'Throughput', en: 'Throughput' }, value: '12k req/s' },
      { label: { id: 'Response', en: 'Avg Response' }, value: '45ms' },
    ],
    architecture: {
      overview: {
        id: 'Express cluster multi-core dengan middleware rate limiter dan caching layer.',
        en: 'Multi-core clustered Express gateway with token bucket rate limiters and caching.',
      },
      challenges: {
        id: 'Mengelola ribuan concurrent request scraper tanpa kena IP rate limit target.',
        en: 'Handling high-concurrency requests while avoiding third-party rate limits.',
      },
      solutions: {
        id: 'Rotasi dynamic proxy pool dan user-agent pooling.',
        en: 'Dynamic proxy pool rotation with intelligent request header randomization.',
      },
      stack: ['JavaScript', 'Node.js', 'Express', 'Axios', 'Cheerio'],
    },
  },
];

export const SKILLS: SkillItem[] = [
  // Frontend
  {
    name: 'React 19 & Next.js',
    category: 'frontend',
    categoryLabel: { id: 'Frontend', en: 'Frontend' },
    level: 96,
    experience: '5+ thn',
    icon: 'Layers',
    description: {
      id: 'Server Components, dynamic routing, state synchronization, SSR/SSG performa tinggi.',
      en: 'Server Components, dynamic routing, high-performance SSR/SSG, and reactive state stores.',
    },
    topSkill: true,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: { id: 'Frontend', en: 'Frontend' },
    level: 95,
    experience: '5+ thn',
    icon: 'Code2',
    description: {
      id: 'Strict type safety, generics kompleks, AST manipulation, dan arsitektur modular.',
      en: 'Strict type safety, advanced generic design, module patterns, and enterprise typing.',
    },
    topSkill: true,
  },
  {
    name: 'Tailwind CSS v4 & Styling',
    category: 'frontend',
    categoryLabel: { id: 'Frontend', en: 'Frontend' },
    level: 98,
    experience: '4+ thn',
    icon: 'Palette',
    description: {
      id: 'Desain responsif pixel-perfect, custom design token, dark/light themes, dan micro-animasi.',
      en: 'Pixel-perfect responsive craft, bespoke design tokens, fluid dark themes, and micro-interactions.',
    },
    topSkill: true,
  },
  {
    name: 'Motion (Framer Motion)',
    category: 'frontend',
    categoryLabel: { id: 'Frontend', en: 'Frontend' },
    level: 92,
    experience: '4+ thn',
    icon: 'Sparkles',
    description: {
      id: 'Layout animations, gesture controls, physics-based springs, dan SVG morphing.',
      en: 'Layout animations, gesture controls, physics-based spring transitions, and SVG path morphs.',
    },
    topSkill: true,
  },
  // Backend
  {
    name: 'Node.js & Express / Nest',
    category: 'backend',
    categoryLabel: { id: 'Backend', en: 'Backend' },
    level: 90,
    experience: '4+ thn',
    icon: 'Server',
    description: {
      id: 'RESTful API, event-driven streaming, middleware pipeline, dan autentikasi aman.',
      en: 'Robust REST APIs, event-driven streaming, secure authentication, and scalable middleware.',
    },
    topSkill: true,
  },
  {
    name: 'Python & FastAPI',
    category: 'backend',
    categoryLabel: { id: 'Backend', en: 'Backend' },
    level: 88,
    experience: '3+ thn',
    icon: 'Terminal',
    description: {
      id: 'Asynchronous microservices, OpenAPI auto-documentation, dan data processing pipelines.',
      en: 'High-speed asynchronous microservices, data processing, and ML model inference endpoints.',
    },
  },
  {
    name: 'PostgreSQL & Drizzle / Prisma',
    category: 'backend',
    categoryLabel: { id: 'Backend', en: 'Backend' },
    level: 89,
    experience: '4+ thn',
    icon: 'Database',
    description: {
      id: 'Desain relasional ternormalisasi, indexing optimal, queries jsonb, dan transaction isolation.',
      en: 'Normalized relational schemas, index optimization, JSONB querying, and acid transactions.',
    },
  },
  // AI & Machine Learning
  {
    name: 'Gemini API & LLM Engineering',
    category: 'ai',
    categoryLabel: { id: 'AI & ML', en: 'AI & ML' },
    level: 94,
    experience: '3+ thn',
    icon: 'Cpu',
    description: {
      id: 'Prompt engineering, structured JSON outputs, function calling, multimodal vision & audio.',
      en: 'Prompt architecture, structured JSON schemas, function calling, multimodal vision pipelines.',
    },
    topSkill: true,
  },
  {
    name: 'RAG & Vector Embeddings',
    category: 'ai',
    categoryLabel: { id: 'AI & ML', en: 'AI & ML' },
    level: 86,
    experience: '2+ thn',
    icon: 'Boxes',
    description: {
      id: 'Retrieval Augmented Generation, vector similarity search, semantic indexing.',
      en: 'Retrieval Augmented Generation, vector cosine search, semantic document chunking.',
    },
  },
  // Cloud & DevOps
  {
    name: 'Docker & Kubernetes',
    category: 'cloud',
    categoryLabel: { id: 'Cloud & DevOps', en: 'Cloud & DevOps' },
    level: 85,
    experience: '3+ thn',
    icon: 'Box',
    description: {
      id: 'Multi-stage container builds, orchestration, service mesh, dan resource limits.',
      en: 'Multi-stage containerization, service orchestration, deployment manifests, and isolation.',
    },
  },
  {
    name: 'Cloud Run & Serverless GCP/AWS',
    category: 'cloud',
    categoryLabel: { id: 'Cloud & DevOps', en: 'Cloud & DevOps' },
    level: 90,
    experience: '4+ thn',
    icon: 'Cloud',
    description: {
      id: 'Scale-to-zero container deployments, edge CDN routing, CI/CD automation.',
      en: 'Scale-to-zero microservice deployments, edge CDNs, and automated GitHub Actions pipelines.',
    },
  },
  // Tools & UI/UX
  {
    name: 'Figma & UI System Design',
    category: 'tools',
    categoryLabel: { id: 'Design & Tools', en: 'Design & Tools' },
    level: 91,
    experience: '5+ thn',
    icon: 'Layout',
    description: {
      id: 'Komponen modular, auto-layout, token warna fungsional, dan prototipe interaktif.',
      en: 'Modular design systems, accessible color tokens, interactive prototyping, and handoff.',
    },
  },
  {
    name: 'Git & Trunk-Based Workflow',
    category: 'tools',
    categoryLabel: { id: 'Design & Tools', en: 'Design & Tools' },
    level: 95,
    experience: '5+ thn',
    icon: 'GitBranch',
    description: {
      id: 'Interactive rebase, semantic versioning, code review best practices, dan conflict resolution.',
      en: 'Clean commit history, semantic release automation, code reviews, and release tagging.',
    },
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: {
      id: 'Lead Full-Stack Architect',
      en: 'Lead Full-Stack Architect',
    },
    company: 'Nexus Synthetix Tech',
    location: 'Jakarta (Remote)',
    period: '2024 - Sekarang',
    type: { id: 'Penuh Waktu', en: 'Full-time' },
    current: true,
    description: {
      id: 'Memimpin tim engineering yang terdiri dari 8 developer untuk membangun platform kecerdasan cloud dan analitik real-time skala enterprise.',
      en: 'Leading an engineering team of 8 developers in architecting enterprise cloud intelligence and real-time telemetry systems.',
    },
    achievements: [
      {
        id: 'Meningkatkan kecepatan load aplikasi sebesar 64% dengan optimasi bundle splitting dan server components.',
        en: 'Accelerated web app load speeds by 64% using modern bundle splitting and server component rendering.',
      },
      {
        id: 'Mengintegrasikan workflow otomatisasi berbasis Gemini AI yang memangkas waktu operasional tim sebesar 40%.',
        en: 'Integrated autonomous Gemini AI agents cutting internal operational turnaround times by 40%.',
      },
      {
        id: 'Membangun standardisasi UI design system berbasis Tailwind CSS yang digunakan di 6 aplikasi lintas platform.',
        en: 'Engineered a unified design token system across 6 cross-platform web client applications.',
      },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Docker', 'GCP'],
  },
  {
    id: 'exp-2',
    role: {
      id: 'Senior Frontend Engineer',
      en: 'Senior Frontend Engineer',
    },
    company: 'Vortex Digital Labs',
    location: 'Singapura / Hybrid',
    period: '2022 - 2024',
    type: { id: 'Penuh Waktu', en: 'Full-time' },
    current: false,
    description: {
      id: 'Bertanggung jawab atas arsitektur antarmuka pengguna web trading, dashboard interaktif berkinerja tinggi, dan visualisasi data finansial.',
      en: 'Spearheaded frontend client architecture for high-frequency trading dashboards and interactive financial visualizations.',
    },
    achievements: [
      {
        id: 'Merancang visualisasi orderbook WebSockets dengan latensi frame < 16ms tanpa drop frame.',
        en: 'Designed real-time WebSocket orderbook views rendering smoothly under 16ms frame intervals.',
      },
      {
        id: 'Mendapat predikat Top Innovator atas implementasi offline-first cache architecture.',
        en: 'Received Top Innovator recognition for delivering zero-downtime offline-first caching.',
      },
    ],
    techStack: ['React', 'Next.js', 'D3.js', 'Tailwind CSS', 'WebSockets', 'Jest'],
  },
  {
    id: 'exp-3',
    role: {
      id: 'Full-Stack Web Developer',
      en: 'Full-Stack Web Developer',
    },
    company: 'Aura Software Studio',
    location: 'Bandung, Indonesia',
    period: '2021 - 2022',
    type: { id: 'Penuh Waktu', en: 'Full-time' },
    current: false,
    description: {
      id: 'Membangun aplikasi SaaS kustom, sistem e-commerce berskala tinggi, dan integrasi payment gateway untuk klien multinasional.',
      en: 'Developed custom SaaS applications, scalable e-commerce backends, and multi-gateway payment integrations.',
    },
    achievements: [
      {
        id: 'Menyelesaikan lebih dari 12 proyek web client tepat waktu dengan rating kepuasan 100%.',
        en: 'Shipped over 12 client web platforms on schedule with 100% customer satisfaction score.',
      },
    ],
    techStack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'MongoDB', 'Redis'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Alexander Chen',
    role: 'VP of Engineering',
    company: 'Synthetix Global',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: {
      id: 'Kombinasi luar biasa antara pemahaman arsitektur teknis yang mendalam dan selera estetika UI masa depan yang tajam. Hasil kerjanya selalu melebihi ekspektasi.',
      en: 'An exceptional rare blend of deep technical engineering and visionary futuristic UI craftsmanship. His work consistently exceeds high benchmarks.',
    },
  },
  {
    id: 'test-2',
    name: 'Sarah Wijaya',
    role: 'Product Lead',
    company: 'Vortex Fintech',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    content: {
      id: 'Kecepatan eksekusi, perhatian pada detail mikro-interaksi, dan kemampuan menyelesaikan masalah performa rumit sangat mengesankan tim kami.',
      en: 'Execution speed, intense attention to micro-interaction details, and ability to conquer intricate performance hurdles impressed our entire team.',
    },
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'art-ip-blocked',
    title: 'IP Terblokir',
    slug: 'ip-terblokir',
    reads: '59 reads',
    date: '2026',
    iconType: 'shield-alert',
    excerpt: 'Pada dasarnya, Ignmasvikk API tidak memblokir akses berdasarkan negara tertentu. Namun, kenapa IP bisa terblokir dan bagaimana solusinya?',
    content: `### Mengapa IP Bisa Terblokir di Server / API Gateway?

Pada dasarnya, **Ignmasvikk API** tidak memblokir akses berdasarkan negara atau lokasi geografis tertentu. Namun, ada beberapa kondisi sistem keamanan di mana alamat IP pengguna atau server VPS Anda dapat masuk ke dalam daftar proteksi firewall / Cloudflare security mitigations.

---

#### 1. Penyebab Utama IP Terblokir
- **Flooding Request / Rate Limiting**: Mengirimkan request berulang kali dalam jeda milidetik tanpa jeda (melebihi ambang batas proteksi DDoS).
- **Reputasi IP Datacenter/VPS**: Beberapa provider hosting murah sering kali memiliki subnet IP yang telah masuk blacklist global Spamhaus/AbuseIPDB akibat aktivitas penyalahgunaan dari penyewa sebelumnya.
- **Header Request Kosong / Tidak Standar**: Bot atau client scraper yang tidak menyertakan \`User-Agent\` yang valid otomatis dicurigai sebagai bot jahat oleh Web Application Firewall (WAF).
- **Koneksi WebSocket Terputus Paksa**: Menginisiasi ratusan sesi multi-device WhatsApp tanpa menutup koneksi socket lama.

---

#### 2. Cara Mengatasi & Rekomendasi Solusi

##### A. Periksa Format Header Request
Pastikan setiap request dari bot atau backend Anda selalu menyertakan User-Agent yang natural:
\`\`\`javascript
const axios = require('axios');

const response = await axios.get('https://api.ignmasvikk.my.id/endpoint', {
  headers: {
    'User-Agent': 'IgnmasvikkClient/2.0 (Linux; Node.js 20)',
    'Accept': 'application/json'
  },
  timeout: 10000
});
\`\`\`

##### B. Gunakan Jeda / Delay Antar Request
Terapkan jitter dan throttling saat melakukan scraping atau broadcast:
\`\`\`javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
await delay(1500); // Jeda minimal 1.5 detik
\`\`\`

##### C. Rotasi IP / Residential Proxy
Jika Anda menjalankan bot pada server VPS ber-IP kotor, gunakan rotasi proxy terpercaya untuk merutekan request outbound.

##### D. Hubungi Admin / Whitelist IP
Jika IP Anda tetap terblokir secara permanen padahal request berstatus normal, hubungi kontak resmi melalui Telegram \`@masvanz\` untuk pengecekan log firewall.`,
  },
  {
    id: 'art-wa-bot',
    title: 'WhatsApp Bot Multi-Device Automation',
    slug: 'whatsapp-bot-multi-device',
    reads: '84 reads',
    date: '2026',
    iconType: 'bot',
    excerpt: 'Membangun arsitektur bot WhatsApp multi-device dengan Baileys socket persistence dan event streaming yang stabil...',
    content: `### Arsitektur WhatsApp Multi-Device Modern

Membangun bot WhatsApp yang stabil membutuhkan penanganan socket koneksi yang tahan banting terhadap network drops.

- **Session Handling**: Menggunakan database SQLite atau file terenkripsi untuk session auth.
- **Event-Driven Architecture**: Memisahkan handler pesan masuk, update status, dan command parser.
- **Auto Reconnect**: Implementasi reconnect otomatis saat WhatsApp melakukan rotasi keys.`,
  },
  {
    id: 'art-vps-install',
    title: 'Instalasi Script Bot & API di VPS Linux',
    slug: 'instalasi-script-bot-vps',
    reads: '95 reads',
    date: '2026',
    iconType: 'server',
    excerpt: 'Sebelum memulai, pastikan sudah punya VPS Ubuntu/Debian, akses SSH root, dan Node.js LTS terpasang...',
    content: `### Panduan Instalasi Script & Bot di VPS Linux

Panduan konfigurasi server VPS untuk menjalankan bot dan API gateway secara stabil dengan PM2:

\`\`\`bash
# 1. Update server
sudo apt update && sudo apt upgrade -y

# 2. Pasang Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git build-essential

# 3. Jalankan dengan PM2 Process Manager
sudo npm install -g pm2
pm2 start index.js --name "ignmasvikk-service"
pm2 startup && pm2 save
\`\`\`

Service Anda sekarang berjalan 24/7 di latar belakang dengan auto-restart.`,
  },
];

