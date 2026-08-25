import { DrawerType, Destination, CultureItem, CulinaryItem, EventItem, SouvenirItem, HotInfoItem } from '../types';
import { Language } from '../lib/translations';

/**
 * Clean slug generator for Indonesian and English titles
 */
export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove special characters
    .replace(/[\s_-]+/g, '-')   // swap spaces for hyphens
    .replace(/^-+|-+$/g, '');   // remove leading/trailing hyphens
}

/**
 * Map DrawerType to canonical clean URL path
 */
export function getDrawerPath(type: DrawerType): string {
  switch (type) {
    case 'destinations':
      return '/destinasi';
    case 'culture':
      return '/kebudayaan';
    case 'culinary':
      return '/kuliner';
    case 'events':
      return '/event';
    case 'souvenirs':
      return '/oleh-oleh';
    case 'download':
      return '/unduhan';
    case 'hotinfo':
      return '/hotinfo';
    case 'formai':
      return '/rencana-liburan';
    case 'chat':
      return '/tanya-mala';
    case 'saved':
      return '/favorit';
    case 'map':
      return '/peta';
    case 'admin':
      return '/admin';
    default:
      return '/';
  }
}

/**
 * Map clean URL path to DrawerType
 */
export function getDrawerFromPath(segment: string): DrawerType | null {
  const clean = segment.toLowerCase().replace(/^\/+|\/+$/g, '');
  if (!clean) return null;

  switch (clean) {
    case 'destinasi':
    case 'destinations':
    case 'wisata':
      return 'destinations';
    case 'kebudayaan':
    case 'budaya':
    case 'culture':
      return 'culture';
    case 'kuliner':
    case 'culinary':
    case 'makanan':
      return 'culinary';
    case 'event':
    case 'events':
    case 'kalender-event':
    case 'agenda':
      return 'events';
    case 'oleh-oleh':
    case 'souvenirs':
    case 'suvenir':
      return 'souvenirs';
    case 'unduhan':
    case 'download':
    case 'downloads':
    case 'panduan':
    case 'ebooklet':
      return 'download';
    case 'hotinfo':
    case 'berita':
    case 'news':
      return 'hotinfo';
    case 'rencana-liburan':
    case 'formai':
    case 'itinerary':
    case 'ai-planner':
      return 'formai';
    case 'tanya-mala':
    case 'chat':
    case 'unimala':
      return 'chat';
    case 'favorit':
    case 'saved':
      return 'saved';
    case 'peta':
    case 'map':
      return 'map';
    case 'admin':
      return 'admin';
    default:
      return null;
  }
}

export interface ParsedRoute {
  drawer: DrawerType;
  itemSlug: string | null;
  rawPath: string;
}

/**
 * Parse current pathname into active drawer and sub-item slug
 */
export function parseRoute(pathname: string): ParsedRoute {
  if (typeof window === 'undefined') {
    return { drawer: null, itemSlug: null, rawPath: '/' };
  }

  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean) {
    return { drawer: null, itemSlug: null, rawPath: '/' };
  }

  const parts = clean.split('/');
  const drawer = getDrawerFromPath(parts[0]);
  const itemSlug = parts.length > 1 ? decodeURIComponent(parts[1]) : null;

  return {
    drawer,
    itemSlug,
    rawPath: pathname
  };
}

/**
 * Find matched item by slug or ID
 */
export function findItemBySlugOrId<T extends { id: string; title?: string; titleEn?: string }>(
  items: T[],
  slugOrId: string | null
): T | null {
  if (!slugOrId || !Array.isArray(items)) return null;

  const target = slugOrId.toLowerCase().trim();

  // 1. Match by ID (case-insensitive)
  const byId = items.find(i => i.id && i.id.toLowerCase() === target);
  if (byId) return byId;

  // 2. Match by Indonesian title slug
  const bySlug = items.find(i => i.title && slugify(i.title) === target);
  if (bySlug) return bySlug;

  // 3. Match by English title slug
  const bySlugEn = items.find(i => i.titleEn && slugify(i.titleEn) === target);
  if (bySlugEn) return bySlugEn;

  return null;
}

/**
 * Generate deep-link URL for an item
 */
export function getItemDeepLink(
  category: 'destinasi' | 'kebudayaan' | 'kuliner' | 'event' | 'oleh-oleh' | 'hotinfo',
  item: { id: string; title?: string; titleEn?: string }
): string {
  const slug = item.title ? slugify(item.title) : item.id;
  return `/${category}/${slug}`;
}

/**
 * Update browser URL dynamically via HTML5 History API without reloading
 */
export function pushRoute(
  path: string,
  stateData: Record<string, any> = {},
  replace: boolean = false
) {
  if (typeof window === 'undefined') return;

  const currentPath = window.location.pathname;
  if (currentPath === path) return;

  if (replace) {
    window.history.replaceState({ ...stateData, path }, '', path);
  } else {
    window.history.pushState({ ...stateData, path }, '', path);
  }
}

/**
 * Dynamic SEO, Meta tags, and Schema.org JSON-LD Manager
 */
export function applyPageSeo(options: {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  lang?: Language;
  jsonLd?: Record<string, any> | Record<string, any>[];
}) {
  if (typeof document === 'undefined') return;

  const {
    title = 'Malala - Panduan Wisata Sumatera Barat | Smart Tourism Portal',
    description = 'Portal Pariwisata Cerdas Resmi Sumatera Barat. Jelajahi 38+ destinasi alam, 22+ tradisi budaya Minangkabau, 26+ kuliner autentik, kalender event 2026, dan asisten AI liburan.',
    url = typeof window !== 'undefined' ? window.location.href : 'https://malala.my.id',
    imageUrl = 'https://malala.my.id/og-image.jpg',
    jsonLd
  } = options;

  // 1. Update Title
  document.title = title;

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = description;

  // 3. Update Open Graph Tags
  const setOg = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  setOg('og:title', title);
  setOg('og:description', description);
  setOg('og:url', url);
  setOg('og:image', imageUrl);

  // 4. Update Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  // 5. Update or Inject Schema.org JSON-LD
  let jsonLdScript = document.getElementById('malala-dynamic-jsonld') as HTMLScriptElement | null;
  if (jsonLd) {
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'malala-dynamic-jsonld';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(jsonLd);
  } else if (jsonLdScript) {
    jsonLdScript.remove();
  }
}
