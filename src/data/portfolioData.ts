import { Project, SkillItem, ExperienceItem, Testimonial, Article } from '../types';
import profileAvatar from '../assets/images/profile-avatar.jpg';
import heroCover from '../assets/images/hero-cover.jpg';

export const PERSONAL_INFO = {
  name: 'Ignmasvikk',
  alias: 'Ignmasvikk',
  title: {
    id: 'Full-Stack Developer',
    en: 'Full-Stack Developer',
  },
  tagline: {
    id: 'Developer muda berusia 17 tahun dari Surabaya yang berfokus membangun aplikasi web modern, performa tinggi, dan antarmuka minimalis.',
    en: '17-year-old Full-Stack Developer from Surabaya focused on building modern, high-performance web applications and minimalist interfaces.',
  },
  age: '17 Year',
  location: 'Surabaya, Indonesia',
  email: 'vanndx26@gmail.com',
  phone: '6287721401837',
  formattedPhone: '+62 877-2140-1837',
  whatsapp: 'https://wa.me/6287721401837',
  github: 'https://github.com/about-vann',
  githubHandle: '@about-vann',
  instagram: 'https://instagram.com/piikkkri_',
  instagramHandle: '@piikkkri_',
  telegram: 'https://t.me/masvanz',
  telegramHandle: '@masvanz',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  avatar: profileAvatar,
  // Replace this URL with your own cover/banner image when needed.
  heroCover,
  note: {
    id: 'Full-Stack Developer',
    en: 'Full-Stack Developer',
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
      id: 'Full-Stack Developer muda berbasis di Surabaya yang berfokus pada pengembangan aplikasi web cepat, arsitektur backend andal, dan desain antarmuka bersih serta interaktif.',
      en: 'Young Full-Stack Developer based in Surabaya focused on fast web application engineering, reliable backend architectures, and clean interactive interface design.',
    },
    background: {
      id: 'Spesialisasi dalam TypeScript, React, Node.js, Express, dan integrasi API terkini untuk menciptakan sistem digital yang efisien.',
      en: 'Specializing in TypeScript, React, Node.js, Express, and modern API integrations to create streamlined digital systems.',
    },
  },
};

export const PROJECTS: Project[] = [
  {
    id: 'neural-canvas',
    title: 'NeuralCanvas AI Studio',
    category: 'ai',
    categoryLabel: { id: 'AI & Generatif', en: 'AI & Generative' },
    summary: {
      id: 'Platform pembuatan dan manipulasi aset visual bertenaga AI dengan canvas interaktif real-time dan pipeline latensi rendah.',
      en: 'AI-powered visual asset generation and canvas manipulation suite with real-time feedback and low-latency pipelines.',
    },
    description: {
      id: 'NeuralCanvas menggabungkan kekuatan model difusi dan LLM ke dalam antarmuka web yang intuitif. Memungkinkan tim desainer dan developer menghasilkan mockup UI, tekstur 3D, dan ilustrasi vektor dalam hitungan detik dengan akselerasi WebGL.',
      en: 'NeuralCanvas fuses generative diffusion models and LLMs into an intuitive canvas UI, enabling design and engineering teams to synthesize UI mockups, 3D textures, and vector assets in sub-seconds with WebGL acceleration.',
    },
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'TypeScript', 'Gemini AI', 'Tailwind CSS', 'WebGL', 'FastAPI'],
    liveUrl: 'https://example.com/demo/neural-canvas',
    githubUrl: 'https://github.com/example/neural-canvas',
    featured: true,
    year: '2026',
    metrics: [
      { label: { id: 'Waktu Render', en: 'Render Latency' }, value: '< 240ms' },
      { label: { id: 'Pengguna Aktif', en: 'Active Users' }, value: '14.2k+' },
    ],
    architecture: {
      overview: {
        id: 'Arsitektur modular berbasis event-driven client dengan sinkronisasi WebSockets dan kompresi layer WebAssembly.',
        en: 'Modular event-driven client architecture with bidirectional WebSocket sync and WebAssembly layer compression.',
      },
      challenges: {
        id: 'Mengelola state canvas berukuran gigabit tanpa menurunkan framerate 60 FPS pada perangkat mobile.',
        en: 'Managing gigabyte-scale canvas state while sustaining steady 60 FPS framerates on lower-end mobile devices.',
      },
      solutions: {
        id: 'Menggunakan spatial partitioning quadtree dan offscreen canvas rendering workers.',
        en: 'Implemented spatial quadtree partitioning combined with offscreen canvas background workers.',
      },
      stack: ['React 19', 'TypeScript', 'Tailwind v4', 'Web Workers', 'FastAPI', 'Redis'],
    },
  },
  {
    id: 'nexus-terminal',
    title: 'Nexus DeFi & Asset Terminal',
    category: 'web',
    categoryLabel: { id: 'Fintech & Web', en: 'Fintech & Web' },
    summary: {
      id: 'Terminal trading desentralisasi dengan visualisasi orderbook sub-milidetik, chart candlestick d3, dan analitik portofolio.',
      en: 'Decentralized trading workstation featuring sub-millisecond orderbook telemetry, D3 candlestick feeds, and asset risk analytics.',
    },
    description: {
      id: 'Nexus adalah dashboard keuangan masa depan yang menghadirkan kecepatan tingkat institusional ke browser web. Dilengkapi dengan alert cerdas, eksekusi multi-chain, dan proteksi transaksi otomatis.',
      en: 'Nexus is a futuristic financial workstation bringing institutional execution speeds directly to the web browser with intelligent alerts, multi-chain routing, and slippage guardrails.',
    },
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'D3.js', 'WebSockets', 'Tailwind CSS', 'Ethers.js', 'Node.js'],
    liveUrl: 'https://example.com/demo/nexus-terminal',
    githubUrl: 'https://github.com/example/nexus-terminal',
    featured: true,
    year: '2025',
    metrics: [
      { label: { id: 'Throughput', en: 'Throughput' }, value: '50k ops/s' },
      { label: { id: 'Volume Transaksi', en: 'Trade Volume' }, value: '$120M+' },
    ],
    architecture: {
      overview: {
        id: 'Streaming data real-time melalui SSE & WebSockets dengan buffer ring berkinerja tinggi.',
        en: 'Real-time data streaming via SSE & WebSockets backed by a memory-efficient client ring buffer.',
      },
      challenges: {
        id: 'Mencegah bottleneck re-render UI pada volume update pasar ekstrem (>1000 pesan per detik).',
        en: 'Eliminating UI re-render bottlenecks during peak market volatility (>1000 tick updates per second).',
      },
      solutions: {
        id: 'Virtualisasi list DOM dan batching state menggunakan requestAnimationFrame.',
        en: 'Virtual windowed DOM lists with requestAnimationFrame state batching.',
      },
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'D3.js', 'Go backend'],
    },
  },
  {
    id: 'quantum-cloud',
    title: 'QuantumOps Cloud Orchestrator',
    category: 'system',
    categoryLabel: { id: 'Cloud & Sistem', en: 'Cloud & System' },
    summary: {
      id: 'Sistem visualisasi infrastruktur cloud multi-region dengan auto-scaling otomatis dan mitigasi anomali AI.',
      en: 'Multi-region cloud infrastructure visualizer with autonomic auto-scaling and predictive AI anomaly mitigation.',
    },
    description: {
      id: 'Memberikan visibilitas 360 derajat atas ribuan microservices yang berjalan di kluster Kubernetes global, dengan topologi interaktif 3D dan mitigasi latency cerdas.',
      en: 'Provides 360-degree observability over thousands of microservices running across global Kubernetes clusters with 3D interactive topologies and latency mitigation.',
    },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    tags: ['TypeScript', 'Three.js / Canvas', 'Docker', 'Kubernetes', 'Golang', 'GraphQL'],
    liveUrl: 'https://example.com/demo/quantum-cloud',
    githubUrl: 'https://github.com/example/quantum-cloud',
    featured: true,
    year: '2025',
    metrics: [
      { label: { id: 'Penghematan Biaya', en: 'Cost Saved' }, value: '38%' },
      { label: { id: 'Kluster Terpantau', en: 'Monitored Pods' }, value: '5,000+' },
    ],
    architecture: {
      overview: {
        id: 'Integrasi Prometheus/OpenTelemetry dengan visualisasi topologi graf.',
        en: 'Prometheus and OpenTelemetry integration rendered with dynamic graph topology shaders.',
      },
      challenges: {
        id: 'Merender ribuan node dan edge koneksi jaringan secara responsif.',
        en: 'Smoothly rendering thousands of interconnected nodes without GPU frame stutter.',
      },
      solutions: {
        id: 'Instanced mesh rendering dengan WebGL shader kustom.',
        en: 'Instanced 3D mesh rendering pipeline utilizing custom GLSL shaders.',
      },
      stack: ['React', 'Three.js', 'GraphQL Subscriptions', 'Golang', 'OpenTelemetry'],
    },
  },
  {
    id: 'aether-os',
    title: 'AetherOS Web Desktop Environment',
    category: 'web',
    categoryLabel: { id: 'Web & UI/UX', en: 'Web & UI/UX' },
    summary: {
      id: 'Sistem antarmuka web desktop futuristik dengan file system virtual, terminal built-in, dan multi-windowing dinamis.',
      en: 'Futuristic browser-based desktop environment featuring virtual filesystem, built-in terminal, and fluid multi-window manager.',
    },
    description: {
      id: 'Eksperimen UI masa depan yang mengaburkan batas antara aplikasi web dan native OS. Memiliki arsitektur event-driven, window drag-and-drop mutakhir, dan sistem plugin modular.',
      en: 'A futuristic web UI experiment blurring the boundaries between desktop operating systems and web apps, complete with window snapping and modular plugin sandbox.',
    },
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'Tailwind CSS', 'Motion', 'IndexedDB', 'TypeScript'],
    liveUrl: 'https://example.com/demo/aether-os',
    githubUrl: 'https://github.com/example/aether-os',
    featured: false,
    year: '2024',
    metrics: [
      { label: { id: 'Ukuran Bundle', en: 'Bundle Size' }, value: '82 KB' },
      { label: { id: 'Lighthouse Score', en: 'Lighthouse' }, value: '100' },
    ],
    architecture: {
      overview: {
        id: 'Window manager berbasis React Context dengan z-index coordinator.',
        en: 'Zero-dependency window management system powered by React context state coordination.',
      },
      challenges: {
        id: 'Sinkronisasi window layering, drag boundaries, dan persistensi virtual filesystem.',
        en: 'Managing overlapping window layering, drag boundary physics, and indexedDB file caching.',
      },
      solutions: {
        id: 'Penggunaan PointerCapture API dan arsitektur atomic state store.',
        en: 'PointerCapture API coupled with an atomic state manager for lag-free drag dynamics.',
      },
      stack: ['React', 'Motion', 'Tailwind', 'Web Audio API'],
    },
  },
  {
    id: 'omnisync-mobile',
    title: 'OmniSync Cross-Platform Vault',
    category: 'mobile',
    categoryLabel: { id: 'Mobile & Security', en: 'Mobile & Security' },
    summary: {
      id: 'Aplikasi enkripsi data ujung-ke-ujung (E2EE) dengan sinkronisasi P2P offline-first dan otentikasi biometrik.',
      en: 'End-to-end encrypted offline-first data vault featuring peer-to-peer sync and hardware biometric authentication.',
    },
    description: {
      id: 'Solusi keamanan dokumen dan aset rahasia dengan arsitektur zero-knowledge proof. Data dienkripsi secara lokal sebelum dikirim melalui protokol WebRTC.',
      en: 'A zero-knowledge confidential document and secret manager encrypting everything client-side prior to decentralized WebRTC transport.',
    },
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native / Web', 'WebCrypto API', 'WebRTC', 'Tailwind', 'Rust'],
    liveUrl: 'https://example.com/demo/omnisync',
    githubUrl: 'https://github.com/example/omnisync',
    featured: false,
    year: '2024',
    metrics: [
      { label: { id: 'Enkripsi', en: 'Encryption' }, value: 'AES-256-GCM' },
      { label: { id: 'Zero-Knowledge', en: 'Zero-Knowledge' }, value: 'Verified' },
    ],
    architecture: {
      overview: {
        id: 'Enkripsi WebCrypto di sisi klien dengan WebRTC peer mesh.',
        en: 'Client-side WebCrypto encryption layer orchestrated over WebRTC mesh network.',
      },
      challenges: {
        id: 'Resolusi konflik data pada mode offline multi-perangkat.',
        en: 'Conflict-free replicated data types (CRDTs) resolution across disconnected mobile nodes.',
      },
      solutions: {
        id: 'Penerapan algoritma Yjs CRDT untuk auto-merge data tanpa server pusat.',
        en: 'Integrated Yjs CRDT state trees for deterministic distributed conflict resolution.',
      },
      stack: ['React', 'TypeScript', 'WebCrypto', 'Yjs', 'Tailwind'],
    },
  },
  {
    id: 'sentio-health',
    title: 'Sentio AI Health Matrix',
    category: 'ai',
    categoryLabel: { id: 'HealthTech & AI', en: 'HealthTech & AI' },
    summary: {
      id: 'Analisis prediktif biomarker kesehatan dan pelacak kebiasaan holistik dengan visualisasi metriks pintar.',
      en: 'Predictive health biomarker intelligence engine and biometric tracker with interactive health span forecasting.',
    },
    description: {
      id: 'Platform kesehatan modern yang memproses data fisiologis wearables secara real-time, memberikan rekomendasi nutrisi dan pemulihan berbasis sains.',
      en: 'Next-gen health intelligence platform processing multi-sensor telemetry to provide personalized recovery and cognitive focus scores.',
    },
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'Python', 'Tailwind CSS', 'Recharts', 'Gemini AI'],
    liveUrl: 'https://example.com/demo/sentio-health',
    githubUrl: 'https://github.com/example/sentio-health',
    featured: false,
    year: '2024',
    metrics: [
      { label: { id: 'Akurasi Prediksi', en: 'Accuracy' }, value: '96.4%' },
      { label: { id: 'Data Point', en: 'Data Points' }, value: '2M+/Hari' },
    ],
    architecture: {
      overview: {
        id: 'Pipeline time-series dengan integrasi Gemini API untuk penjelasan diagnosa ramah pengguna.',
        en: 'Time-series forecasting pipeline synthesized into natural language summaries using Gemini API.',
      },
      challenges: {
        id: 'Privasi data medis ketat dan visualisasi time-series yang padat.',
        en: 'Strict data masking compliance alongside dense multi-axis biometric visualization.',
      },
      solutions: {
        id: 'Desensitisasi data sebelum pemrosesan dan visualisasi chart dinamis berbasis Recharts & SVG.',
        en: 'Client-side data sanitization with adaptive dynamic Recharts SVG pipelines.',
      },
      stack: ['React', 'TypeScript', 'Recharts', 'Tailwind', 'Python'],
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

export const TERMINAL_COMMANDS_HELP = {
  id: [
    { cmd: 'help', desc: 'Menampilkan daftar perintah terminal yang tersedia' },
    { cmd: 'whoami', desc: 'Informasi singkat tentang profil pengembang' },
    { cmd: 'skills', desc: 'Menampilkan ringkasan keahlian teknis' },
    { cmd: 'projects', desc: 'Menampilkan daftar proyek unggulan' },
    { cmd: 'contact', desc: 'Menampilkan jalur kontak langsung' },
    { cmd: 'stats', desc: 'Statistik performa dan rekayasa kode' },
    { cmd: 'clear', desc: 'Membersihkan layar terminal' },
  ],
  en: [
    { cmd: 'help', desc: 'Show all available interactive CLI commands' },
    { cmd: 'whoami', desc: 'Brief overview of developer persona' },
    { cmd: 'skills', desc: 'List core technical competencies' },
    { cmd: 'projects', desc: 'List standout featured projects' },
    { cmd: 'contact', desc: 'Show direct communication channels' },
    { cmd: 'stats', desc: 'Display engineering telemetry & metrics' },
    { cmd: 'clear', desc: 'Clear the terminal output history' },
  ],
};

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Instalasi Script Optima & Bot di VPS Linux',
    slug: 'instalasi-script-optima-vps',
    reads: '95 reads',
    date: '2026',
    excerpt: 'Sebelum memulai, pastikan sudah punya 3 hal berikut: Script Optima, akses root VPS Ubuntu/Debian, dan Node.js runtime terpasang...',
    content: `### Panduan Instalasi Script Optima di VPS

Panduan konfigurasi server VPS untuk menjalankan script bot, RESTful API, dan service otomasi dengan performa optimal.

#### Persyaratan Sistem:
1. VPS dengan OS Ubuntu 22.04 LTS / Debian 11+
2. Minimal RAM 1GB & 1 Core CPU
3. Akses SSH / Root Terminal

#### Langkah Instalasi:
\`\`\`bash
# 1. Update paket server
sudo apt update && sudo apt upgrade -y

# 2. Pasang Node.js LTS & Git
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git build-essential

# 3. Clone repository & install dependencies
git clone https://github.com/about-vann/optima-core.git
cd optima-core
npm install

# 4. Jalankan dengan PM2 Process Manager
sudo npm install -g pm2
pm2 start index.js --name "optima-service"
pm2 startup && pm2 save
\`\`\`

Service Anda sekarang berjalan di latar belakang (background daemon) dengan auto-restart otomatis.`,
  },
  {
    id: 'art-2',
    title: 'Membangun Web Full-Stack Cepat dengan Vite + Tailwind',
    slug: 'membangun-web-fullstack-vite-tailwind',
    reads: '142 reads',
    date: '2026',
    excerpt: 'Langkah praktis menyusun struktur modular TypeScript, konfigurasi Tailwind, dan animasi interaktif Motion...',
    content: `### Arsitektur Web Modern 2026

Penggunaan Vite bersama Tailwind CSS memberikan pengalaman development instan tanpa lag.

- **Fast Bundling**: Menggunakan esbuild di bawah naungan Vite.
- **Type-Safety**: Skema TypeScript ketat mencegah runtime bug.
- **Micro-Interactions**: Animasi halus memperkaya estetika aplikasi.`,
  },
  {
    id: 'art-3',
    title: 'Tips Optimasi Performa & Latensi API Node.js',
    slug: 'tips-optimasi-performa-api-nodejs',
    reads: '88 reads',
    date: '2026',
    excerpt: 'Teknik caching memori, penanganan koneksi asynchronous, dan manajemen resource hemat memori pada server...',
    content: `### Optimasi Server Node.js

Cara memaksimalkan throughput server pada spesifikasi hemat resource:
1. Hindari blocking event loop dengan async/await yang tepat.
2. Gunakan Redis/In-memory caching untuk data yang sering diakses.
3. Kompresi respon dengan gzip / brotli.`,
  },
];

