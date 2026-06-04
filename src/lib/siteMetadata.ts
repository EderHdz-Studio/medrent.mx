/**
 * Metadatos centralizados del sitio para robots.txt y humans.txt
 * Fuente única de verdad (SSOT) para estructura de URLs y equipo
 */

// ============================================
// INFORMACIÓN DEL EQUIPO
// ============================================
export const TEAM = {
  leads: [
    {
      name: 'Benjamin Giovanni Vidaurri Solís',
      role: 'Product Lead & UX Strategy',
      description: 'Information architecture, UX/UI design, accessibility, atomic design system, technical SEO strategy, CRO alignment, and product direction',
      contact: 'www.giovidaurri.com'
    }
  ],
  developers: [
    {
      name: 'Eder Hernández Avendaño',
      role: 'Principal Full-Stack Developer',
      description: 'Astro + Strapi architecture, performance optimization, CMS modeling, structured data implementation, component refactoring, and Vercel deployments',
      contactGitHub: 'https://github.com/Ederhdz',
      studio: 'EderHdz Studio',
      linkedIn: 'https://www.linkedin.com/in/eder-hernandez-avenda%C3%B1o-468a62112',
      contactEmail: 'eder229153@gmail.com',
      contact: '+52 55 2428 1877',
    },
    {
      name: 'María de la Paz Medina Guzmán',
      role: 'Frontend Developer Jr.',
      description: 'Frontend support, component implementation, QA assistance, and UI adjustments',
      contactGitHub: 'https://github.com/PazMedinaGuz',
      linkedIn: 'https://www.linkedin.com/in/mar%C3%ADa-de-la-paz-medina-guzm%C3%A1n-79b25321b',
      contactEmail: 'pazmedinaupn@gmail.com',
    }
  ],
  direction: [
    {
      name: 'Iván Francisco García Anguiano',
      role: 'MedRent Direction',
      description: 'Marketing strategy, brand supervision, business alignment, and final content validation'
    }
  ]
};

// ============================================
// INFORMACIÓN DEL SITIO
// ============================================
export const SITE_INFO = {
  name: 'MedRent (Medrent®)',
  description: 'MedRent distribuye tecnología médica, equipos y consumibles en México para profesionales e instituciones de salud',
  canonicalUrl: 'https://www.medrent.mx',
  email: 'sdr_telemarketing@medrent.mx',
  phone: '+52 55 5985 4347',
  language: 'es-MX',
  lastUpdated: new Date().toISOString().split('T')[0],
  stack: {
    framework: 'Astro JS',
    cms: 'Strapi CMS (Headless)',
    styling: 'Tailwind CSS',
    hosting: 'Vercel',
    analytics: ['Google Analytics 4', 'Google Tag Manager'],
    crm: 'HubSpot'
  }
};

// ============================================
// RUTAS ESTÁTICAS DEL SITIO
// ============================================
export const STATIC_ROUTES = {
  home: '/',
  specialties: '/especialidades',
  products: '/productos',
  brands: '/nuestras-marcas',
  financing: '/financiamiento',
  blog: '/blog',
  events: '/eventos',
  aboutUs: '/acerca-de-nosotros',
  contact: '/contacto',
  // Legal
  privacy: '/aviso-de-privacidad',
  terms: '/condiciones-de-uso'
};

// ============================================
// ESPECIALIDADES (TERAPÉUTICAS)
// ============================================
export const SPECIALTIES = {
  neurofisiologia: {
    slug: 'neurofisiologia',
    label: 'Neurofisiología',
    priority: '0.8'
  },
  'neurocirugia-y-orl': {
    slug: 'neurocirugia-y-orl',
    label: 'Neurocirugía y ORL',
    priority: '0.8'
  },
  neuromodulacion: {
    slug: 'neuromodulacion',
    label: 'Neuromodulación',
    priority: '0.8'
  },
  neurovascular: {
    slug: 'neurovascular',
    label: 'Neurovascular',
    priority: '0.8'
  },
  rehabilitacion: {
    slug: 'rehabilitacion',
    label: 'Rehabilitación',
    priority: '0.8'
  },
  'medicina-del-sueno': {
    slug: 'medicina-del-sueno',
    label: 'Medicina del Sueño',
    priority: '0.8'
  }
};

// ============================================
// CONFIGURACIÓN DE ROBOTS.TXT
// ============================================
export const ROBOTS_CONFIG = {
  // Rutas bloqueadas universalmente
  disallowed: [
    '/admin/',
    '/dashboard/',
    '/login/',
    '/staging/',
    '/mvp/',
    '/tmp/',
    '/cgi-bin/',
    '/api/'
  ],
  // Parámetros no indexados (UTM, facets)
  disallowParams: false,

  // Rutas permitidas (recursos Astro)
  allowedAssets: [
    '/_astro/',
    '/assets/',
    '/images/',
    '/css/',
    '/js/',
    '/uploads/',
    '/favicon.ico',
    '/scripts/',
    '/fonts/'
  ],
  // Configuración por bot
  bots: {
    googlebot: {
      crawlDelay: null, // Sin límite para Google
      requestRate: null
    },
    bingbot: {
      crawlDelay: 10,
      requestRate: '1/10s'
    }
  }
};

// ============================================
// DESCRIPCIÓN DEL NEGOCIO
// ============================================
export const BUSINESS_CONTEXT = {
  focus: 'Medical technology distribution and clinical education',
  specializations: [
    'Neurosurgery',
    'Neurophysiology',
    'Neuromodulation',
    'Neurovascular',
    'Rehabilitation'
  ],
  regions: ['México (MX)', 'Colombia (CO)'],
  market: 'B2B healthcare professionals and institutions',
  dataHandling: {
    law: 'Mexican Federal Law on Protection of Personal Data (LFPDPPP)',
    infrastructure: 'Google Cloud Platform (GCP)',
    department: {
      email: 'dataprotection@medrent.mx',
      address: 'Av. Insurgentes Sur 866, Col. Del Valle, Benito Juárez, CDMX, 03100',
      phone: '+52 55 1078 9311'
    }
  }
};

// ============================================
// SOCIAL MEDIA
// ============================================
export const SOCIAL_MEDIA = {
  linkedin: 'https://www.linkedin.com/company/medrent',
  instagram: 'https://www.instagram.com/medrent_mx',
  facebook: 'https://www.facebook.com/MedRentMX',
  youtube: 'https://www.youtube.com/@medrent'
};