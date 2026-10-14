/**
 * Ultra-Lightweight News & Date Utilities (Zero Heavy AI / GenAI Dependencies)
 * Used by App.tsx & Homepage critical rendering path to keep initial bundle ultra small.
 */

export function parseNewsTimestamp(dateStr?: string, createdAt?: any): number {
  if (createdAt) {
    if (typeof createdAt === 'number') return createdAt;
    if (typeof createdAt.toMillis === 'function') return createdAt.toMillis();
    if (typeof createdAt.toDate === 'function') return createdAt.toDate().getTime();
    if (typeof createdAt === 'string') {
      const parsed = Date.parse(createdAt);
      if (!isNaN(parsed)) return parsed;
    }
  }

  if (!dateStr || !dateStr.trim()) return Date.now();

  const lower = dateStr.toLowerCase().trim();

  const monthsMap: Record<string, number> = {
    'jan': 0, 'januari': 0, 'january': 0,
    'feb': 1, 'februari': 1, 'february': 1,
    'mar': 2, 'maret': 2, 'march': 2,
    'apr': 3, 'april': 3,
    'mei': 4, 'may': 4,
    'jun': 5, 'juni': 5, 'june': 5,
    'jul': 6, 'juli': 6, 'july': 6,
    'ags': 7, 'agustus': 7, 'aug': 7, 'august': 7,
    'sep': 8, 'september': 8,
    'okt': 9, 'oktober': 9, 'oct': 9, 'october': 9,
    'nov': 10, 'november': 10,
    'des': 11, 'desember': 11, 'dec': 11, 'december': 11,
  };

  // 1. Indonesian / Standard format with Day Month Year and optional time:
  const dmyMatch = lower.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})(?:[^\d]*(\d{1,2})[:.](\d{2}))?/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const monthName = dmyMatch[2];
    const year = parseInt(dmyMatch[3], 10);
    const hour = dmyMatch[4] ? parseInt(dmyMatch[4], 10) : 0;
    const minute = dmyMatch[5] ? parseInt(dmyMatch[5], 10) : 0;
    const monthIndex = monthsMap[monthName];
    if (monthIndex !== undefined) {
      return new Date(year, monthIndex, day, hour, minute).getTime();
    }
  }

  // 2. English format with Month Day, Year and optional time:
  const mdyMatch = lower.match(/([a-z]+)\s+(\d{1,2}),?\s+(\d{4})(?:[^\d]*(\d{1,2})[:.](\d{2}))?/);
  if (mdyMatch) {
    const monthName = mdyMatch[1];
    const day = parseInt(mdyMatch[2], 10);
    const year = parseInt(mdyMatch[3], 10);
    const hour = mdyMatch[4] ? parseInt(mdyMatch[4], 10) : 0;
    const minute = mdyMatch[5] ? parseInt(mdyMatch[5], 10) : 0;
    const monthIndex = monthsMap[monthName];
    if (monthIndex !== undefined) {
      return new Date(year, monthIndex, day, hour, minute).getTime();
    }
  }

  // 3. Direct ISO / native parse
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return parsed;

  // 4. Relative time in dateStr: "X jam lalu", "X hari lalu", "hari ini", "kemarin"
  const minMatch = lower.match(/(\d+)\s*(?:menit|minute|min)\s*(?:lalu|ago)/);
  if (minMatch) return Date.now() - parseInt(minMatch[1], 10) * 60 * 1000;

  const hrMatch = lower.match(/(\d+)\s*(?:jam|hour|hr)\s*(?:lalu|ago)/);
  if (hrMatch) return Date.now() - parseInt(hrMatch[1], 10) * 3600 * 1000;

  const dayMatch = lower.match(/(\d+)\s*(?:hari|day)\s*(?:lalu|ago)/);
  if (dayMatch) return Date.now() - parseInt(dayMatch[1], 10) * 86400 * 1000;

  if (lower.includes('hari ini') || lower.includes('today') || lower.includes('update')) return Date.now();
  if (lower.includes('kemarin') || lower.includes('yesterday')) return Date.now() - 86400000;

  return 0;
}

export function isWithinLast30Days(dateStr?: string, createdAt?: any): boolean {
  if (!dateStr && !createdAt) return true;
  try {
    const timestamp = parseNewsTimestamp(dateStr, createdAt);
    if (timestamp > 0) {
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      const diff = now - timestamp;
      return diff >= -86400000 && diff <= thirtyDaysInMs;
    }
    return true;
  } catch {
    return true;
  }
}

export function isWithinLast6Months(dateStr?: string, createdAt?: any): boolean {
  if (!dateStr && !createdAt) return true;
  try {
    const timestamp = parseNewsTimestamp(dateStr, createdAt);
    if (timestamp > 0) {
      const sixMonthsInMs = 180 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      const diff = now - timestamp;
      return diff >= -86400000 && diff <= sixMonthsInMs;
    }
    return true;
  } catch {
    return true;
  }
}

export function formatNewsTimeAgo(
  dateStr?: string,
  createdAt?: any,
  rawTimeAgo?: string,
  lang: 'id' | 'en' = 'id'
): string {
  const timestamp = parseNewsTimestamp(dateStr, createdAt);

  if (timestamp && timestamp > 0) {
    const now = Date.now();
    const diffMs = now - timestamp;

    if (diffMs < 60 * 1000 && diffMs >= -300000) {
      return lang === 'en' ? 'Just now' : 'Baru saja';
    }

    if (diffMs >= 0) {
      const diffMinutes = Math.floor(diffMs / (60 * 1000));
      if (diffMinutes < 60) {
        return lang === 'en' ? `${diffMinutes}m ago` : `${diffMinutes} menit lalu`;
      }

      const diffHours = Math.floor(diffMs / (3600 * 1000));
      if (diffHours < 24) {
        return lang === 'en' ? `${diffHours}h ago` : `${diffHours} jam lalu`;
      }

      const diffDays = Math.floor(diffMs / (86400 * 1000));
      if (diffDays === 1) {
        return lang === 'en' ? 'Yesterday' : 'Kemarin';
      }
      if (diffDays < 7) {
        return lang === 'en' ? `${diffDays}d ago` : `${diffDays} hari lalu`;
      }

      if (dateStr && dateStr.trim() && !dateStr.includes('lalu') && !dateStr.includes('ago')) {
        return dateStr.trim();
      }

      const d = new Date(timestamp);
      return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  }

  return rawTimeAgo || (lang === 'en' ? 'Recent' : 'Terkini');
}

const DEDUP_STOP_WORDS = new Set([
  'di', 'ke', 'dari', 'pada', 'dalam', 'oleh', 'untuk', 'dengan', 'dan', 'atau', 'yang', 'ini', 'itu',
  'adalah', 'sebagai', 'akan', 'telah', 'sudah', 'sedang', 'bisa', 'dapat', 'resmi', 'digelar', 'gelar',
  'dibuka', 'buka', 'tinjau', 'kunjungi', 'kunjungan', 'soal', 'terkait', 'tentang', 'kata', 'ungkap',
  'siap', 'jadi', 'ada', 'menjadi', 'sebut', 'beberkan', 'hingga', 'juga', 'tak', 'tidak', 'lebih',
  'ajak', 'mengajak', 'dorong', 'mendorong', 'minta', 'meminta', 'dukung', 'mendukung',
  'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'is', 'are', 'was', 'were', 'will'
]);

function extractKeywords(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= 3 && !DEDUP_STOP_WORDS.has(word));
}

export function deduplicateNewsItems<T extends { title: string; titleEn?: string }>(items: T[]): T[] {
  const uniqueItems: T[] = [];

  for (const item of items) {
    if (!item || !item.title) continue;

    const isDuplicate = uniqueItems.some((existing) => {
      const cleanA = item.title.trim().toLowerCase();
      const cleanB = existing.title.trim().toLowerCase();

      if (cleanA === cleanB) return true;

      const wordsA = extractKeywords(item.title);
      const wordsB = extractKeywords(existing.title);
      const commonWords = wordsA.filter(w => wordsB.some(wb => w === wb || (w.length >= 4 && (wb.startsWith(w) || w.startsWith(wb)))));
      
      const isDistinctiveShared = commonWords.some(w => ['genpi', 'kelok', 'pagaruyung', 'mentawai', 'singkarak', 'harau', 'tabuik', 'songket', 'rendang', 'maninjau', 'mandeh', 'silek', 'geopark'].includes(w));
      if (isDistinctiveShared) return true;

      if (commonWords.length >= 2) return true;

      return false;
    });

    if (!isDuplicate) {
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
}

export function getNewsDisplayTitle(item: any, lang: string): string {
  if (!item) return '';
  const isEn = lang === 'en';
  if (!isEn) return item.title || '';
  if (item.titleEn && item.titleEn.trim() && item.titleEn !== item.title) {
    return item.titleEn;
  }
  return item.title || '';
}

export function getWibNewsCycleInfo(): {
  cycleId: string;
  wibDateString: string;
  wibTimeString: string;
  msUntilNextRun: number;
} {
  const now = new Date();
  const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
  const wibMs = utcMs + (7 * 3600000);
  const wibDate = new Date(wibMs);

  const hours = wibDate.getHours();

  const cycleDate = new Date(wibDate);
  if (hours < 3) {
    cycleDate.setDate(cycleDate.getDate() - 1);
  }

  const yyyy = cycleDate.getFullYear();
  const mm = String(cycleDate.getMonth() + 1).padStart(2, '0');
  const dd = String(cycleDate.getDate()).padStart(2, '0');
  const cycleId = `${yyyy}-${mm}-${dd}`;

  const nextTargetWib = new Date(wibDate);
  if (hours >= 3) {
    nextTargetWib.setDate(nextTargetWib.getDate() + 1);
  }
  nextTargetWib.setHours(3, 0, 0, 0);

  const msUntilNextRun = Math.max(1000, nextTargetWib.getTime() - wibDate.getTime());

  const pad = (n: number) => String(n).padStart(2, '0');
  const wibDateString = `${wibDate.getFullYear()}-${pad(wibDate.getMonth() + 1)}-${pad(wibDate.getDate())}`;
  const wibTimeString = `${pad(wibDate.getHours())}:${pad(wibDate.getMinutes())}:${pad(wibDate.getSeconds())} WIB`;

  return {
    cycleId,
    wibDateString,
    wibTimeString,
    msUntilNextRun,
  };
}

export function getNewsDirectArticleUrl(item: any): string {
  if (!item) return 'https://sumbar.antaranews.com/pariwisata';

  if (typeof item.sourceUrl === 'string' && item.sourceUrl.trim().startsWith('http')) {
    const url = item.sourceUrl.trim();
    if (!url.includes('google.com/maps') && !url.includes('maps.google.com')) {
      return url;
    }
  }

  if (typeof item.actionUrl === 'string' && item.actionUrl.trim().startsWith('http')) {
    const url = item.actionUrl.trim();
    if (!url.includes('google.com/maps') && !url.includes('maps.google.com')) {
      return url;
    }
  }

  const headline = (item.title || '').trim();
  if (headline) {
    return `https://news.google.com/search?q=${encodeURIComponent(headline)}&hl=id&gl=ID&ceid=ID:id`;
  }

  return 'https://sumbar.antaranews.com/pariwisata';
}
