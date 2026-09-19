import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { X, Bookmark, BookmarkCheck, Sparkles, Send, MapPin, Calendar, Clock, ChevronRight, ChevronLeft, RefreshCw, Check, Edit3, Trash2, Plus, Youtube, PlayCircle, Flame, Download, ExternalLink, Share2, CheckCircle, Search, BookOpen, Printer, ShoppingBag, Info, Star, FolderArchive, Archive, ChevronDown, ChevronUp } from 'lucide-react';
import { DrawerType, Destination, CultureItem, CulinaryItem, SouvenirItem, EventItem, FormAIResponse, HotInfoItem } from '../types';
import { AdminPanel } from './AdminPanel';
import { InteractiveMapModal } from './InteractiveMapModal';
import { ItineraryMap } from './ItineraryMap';
import { EBookletModal } from './EBookletModal';
import { WeatherWidget } from './WeatherWidget';
import { ReviewSection } from './ReviewSection';
import { getDestinationRatingSummary } from '../data/reviewsData';
import { Language, translations } from '../lib/translations';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, HOT_INFO_ITEMS, DOWNLOAD_ITEMS } from '../data/content';
import { fetchAiItinerary, fetchAiChat, fetchAiHotInfo, isWithinLast6Months, isWithinLast30Days, deduplicateNewsItems, parseNewsTimestamp, isSumbarTopic, getNewsDisplayTitle, getNewsDisplayDescription } from '../utils/ai';
import { CurrencyCode, CurrencyRate, DEFAULT_RATES, fetchLiveExchangeRates, formatToCurrency } from '../utils/currency';
import { generateSumbarBookletPDF, generateItineraryPDF } from '../utils/pdfGenerator';
import { getSafeYoutubeUrl, getEventYoutubeUrl } from '../utils/youtube';
import { parseRoute, getItemDeepLink, getDrawerPath, pushRoute, applyPageSeo, findItemBySlugOrId } from '../utils/urlRouter';
import { logTourismSignal } from '../utils/telemetry';

const triggerDownload = (filename: string, content: string, mimeType: string = 'application/octet-stream') => {
  if (!content) return;
  const trimmed = content.trim();

  // Case 1: Data URL (e.g. data:image/png;base64,... or data:application/pdf;base64,...)
  if (trimmed.startsWith('data:')) {
    try {
      const parts = trimmed.split(',');
      const meta = parts[0];
      const raw = parts[1];

      if (meta.includes('base64')) {
        const decoded = atob(raw);
        const u8arr = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) {
          u8arr[i] = decoded.charCodeAt(i);
        }
        const detectedMime = meta.split(':')[1]?.split(';')[0] || mimeType;
        const blob = new Blob([u8arr], { type: detectedMime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'downloaded_file';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return;
      }
    } catch (err) {
      console.warn("Failed to decode base64 data URL, falling back to direct href link:", err);
      const a = document.createElement('a');
      a.href = trimmed;
      a.download = filename || 'downloaded_file';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
  }

  // Case 2: Web URL (http://, https://, or relative /downloads/...)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    const a = document.createElement('a');
    a.href = `${trimmed}${trimmed.includes('?') ? '&' : '?'}v=${Date.now()}`;
    a.target = '_blank';
    a.download = filename || 'downloaded_file.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  // Case 3: Raw SVG string or Plain text
  const blob = new Blob([trimmed], { type: mimeType || 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'downloaded_file';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const getGoogleMapsUrl = (input?: string) => {
  if (!input || !input.trim()) return null;
  const trimmed = input.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trimmed)}`;
};

export const getDestinationGoogleMapsUrl = (dest?: Destination | null): string => {
  if (!dest) return 'https://www.google.com/maps/search/?api=1&query=Wisata+Sumatera+Barat';
  if (dest.mapUrl && dest.mapUrl.trim()) {
    const trimmed = dest.mapUrl.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trimmed)}`;
  }
  const cleanTitle = (dest.title || '').replace(/[^\w\s\d]/gi, ' ').trim();
  const cleanRegency = (dest.regency || 'Sumatera Barat').replace(/[^\w\s\d]/gi, ' ').trim();
  const query = encodeURIComponent(`${cleanTitle} ${cleanRegency}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

export const getCulinaryGoogleMapsUrl = (culinary?: CulinaryItem | null): string => {
  if (!culinary) return 'https://www.google.com/maps/search/?api=1&query=Kuliner+Khas+Minang+Sumatera+Barat';
  if (culinary.mapUrl && culinary.mapUrl.trim()) {
    const trimmed = culinary.mapUrl.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trimmed)}`;
  }
  const cleanTitle = (culinary.title || '').replace(/[^\w\s\d]/gi, ' ').trim();
  const cleanOrigin = (culinary.origin || 'Sumatera Barat').replace(/[^\w\s\d]/gi, ' ').trim();
  const query = encodeURIComponent(`Rumah Makan ${cleanTitle} ${cleanOrigin}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

export const getEventGoogleMapsUrl = (event?: EventItem | null): string => {
  if (!event) return 'https://www.google.com/maps/search/?api=1&query=Sumatera+Barat';
  if (event.mapUrl && event.mapUrl.trim()) {
    const trimmed = event.mapUrl.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trimmed)}`;
  }
  const cleanTitle = (event.title || '').replace(/[^\w\s\d]/gi, ' ').trim();
  const cleanLocation = (event.location || 'Sumatera Barat').replace(/[^\w\s\d]/gi, ' ').trim();
  const query = encodeURIComponent(`Lokasi ${cleanTitle} ${cleanLocation}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

export const getPublisherFavicon = (domain?: string, fallbackSource?: string): string => {
  if (domain && domain.includes('.')) {
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim();
    return `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=64`;
  }
  if (fallbackSource) {
    const s = fallbackSource.toLowerCase();
    if (s.includes('detik')) return 'https://www.google.com/s2/favicons?domain=detik.com&sz=64';
    if (s.includes('kompas')) return 'https://www.google.com/s2/favicons?domain=kompas.com&sz=64';
    if (s.includes('antara')) return 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64';
    if (s.includes('padang') || s.includes('padek')) return 'https://www.google.com/s2/favicons?domain=jawapos.com&sz=64';
    if (s.includes('haluan')) return 'https://www.google.com/s2/favicons?domain=harianhaluan.com&sz=64';
    if (s.includes('langgam')) return 'https://www.google.com/s2/favicons?domain=langgam.id&sz=64';
    if (s.includes('cnn')) return 'https://www.google.com/s2/favicons?domain=cnnindonesia.com&sz=64';
    if (s.includes('tempo')) return 'https://www.google.com/s2/favicons?domain=tempo.co&sz=64';
    if (s.includes('tribrata')) return 'https://www.google.com/s2/favicons?domain=tribratanews.polri.go.id&sz=64';
  }
  return 'https://www.google.com/s2/favicons?domain=news.google.com&sz=64';
};

export const getTiketAffiliateId = (appSettings?: any): string => {
  return appSettings?.tiketAffiliateId || '6a893170239c5bf8a8b71930';
};

export const getTiketHotelUrl = (dest?: Destination | null, appSettings?: any): string => {
  const affId = getTiketAffiliateId(appSettings);
  if (dest?.title) {
    return `https://www.tiket.com/hotel/search?q=${encodeURIComponent(dest.title + ' Sumatera Barat')}&aff_id=${affId}&tracking_id=malala_sumbar`;
  }
  return `https://www.tiket.com/hotel/search?q=Sumatera%20Barat&aff_id=${affId}&tracking_id=malala_sumbar`;
};

export const getTiketCarRentalUrl = (appSettings?: any): string => {
  const affId = getTiketAffiliateId(appSettings);
  return `https://www.tiket.com/sewa-mobil?aff_id=${affId}&tracking_id=malala_sumbar`;
};

export const getTiketFlightUrl = (appSettings?: any): string => {
  const affId = getTiketAffiliateId(appSettings);
  return `https://www.tiket.com/pesawat?aff_id=${affId}&tracking_id=malala_sumbar`;
};

export const getTiketActivitiesUrl = (dest?: Destination | null, appSettings?: any): string => {
  const affId = getTiketAffiliateId(appSettings);
  if (dest?.title) {
    return `https://www.tiket.com/to-do/search?keyword=${encodeURIComponent(dest.title)}&aff_id=${affId}&tracking_id=malala_sumbar`;
  }
  return `https://www.tiket.com/to-do/search?keyword=Sumatera%20Barat&aff_id=${affId}&tracking_id=malala_sumbar`;
};

export const getTravelokaHotelUrl = (_dest?: Destination | null): string => {
  return 'https://www.traveloka.com/id-id/hotel';
};

export const getTravelokaSecondaryAction = (dest?: Destination | null, lang: Language = 'id') => {
  if (!dest) {
    return {
      label: lang === 'en' ? 'Car Rental' : 'Rental Mobil & Supir',
      icon: '🚗',
      url: 'https://www.traveloka.com/id-id/car-rental'
    };
  }

  const category = (dest.category || '').toLowerCase();
  const tag = (dest.tag || '').toLowerCase();
  const text = `${dest.title} ${dest.description || ''}`.toLowerCase();

  // Marine, Island, Adventure, Waterfalls -> Xperience / Tours
  if (
    category.includes('bahari') ||
    category.includes('pantai') ||
    category.includes('air terjun') ||
    tag.includes('petualangan') ||
    tag.includes('bahari') ||
    text.includes('surfing') ||
    text.includes('diving') ||
    text.includes('snorkeling') ||
    text.includes('trekking')
  ) {
    return {
      label: lang === 'en' ? 'Tours & Activities' : 'Tur & Aktivitas Seru',
      icon: '🎟️',
      url: 'https://www.traveloka.com/id-id/activities'
    };
  }

  // Cultural, City, Heritage, Mountain, Lake -> Car Rental
  return {
    label: lang === 'en' ? 'Car Rental & Driver' : 'Rental Mobil & Supir',
    icon: '🚗',
    url: 'https://www.traveloka.com/id-id/car-rental'
  };
};

interface DrawersProps {
  activeDrawer: DrawerType;
  onClose: () => void;
  onOpenDrawer?: (type: DrawerType) => void;
  savedIds: string[];
  onToggleSave: (id: string, title: string) => void;
  dataStore: any;
  lang?: Language;
  onMouseEnterDrawer?: () => void;
  onMouseLeaveDrawer?: () => void;
  onSelectNews?: (item: HotInfoItem) => void;
  searchQuery?: string;
  onSearchQueryChange?: (q: string) => void;
}

export const Drawers: React.FC<DrawersProps> = ({
  activeDrawer,
  onClose,
  onOpenDrawer,
  savedIds,
  onToggleSave,
  dataStore,
  lang = 'id',
  onMouseEnterDrawer,
  onMouseLeaveDrawer,
  onSelectNews,
  searchQuery = '',
  onSearchQueryChange,
}) => {
  const {
    destinations, updateDestinations,
    cultureItems, updateCultureItems,
    culinaryItems, updateCulinaryItems,
    eventItems, updateEventItems
  } = dataStore;
  const souvenirItems = dataStore?.souvenirItems || [];
  const hotInfoItems = dataStore?.hotInfoItems || [];

  // Category filter state for destinations
  const [destCategory, setDestCategory] = useState<string>('Semua');

  // Calendar of Events (CoE) state
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string>('all');
  const [eventMonthFilter, setEventMonthFilter] = useState<string | number>('all');

  // Selected item modal/detail view
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedCulture, setSelectedCulture] = useState<CultureItem | null>(null);
  const [selectedCulinary, setSelectedCulinary] = useState<CulinaryItem | null>(null);
  const [selectedSouvenir, setSelectedSouvenir] = useState<SouvenirItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isBookletModalOpen, setIsBookletModalOpen] = useState<boolean>(false);
  const [souvenirCategory, setSouvenirCategory] = useState<string>('Semua');
  const [bookingPartner, setBookingPartner] = useState<'tiket' | 'traveloka'>('tiket');
  const [currency, setCurrency] = useState<CurrencyCode>('IDR');
  const [currencyRates, setCurrencyRates] = useState<Record<CurrencyCode, CurrencyRate>>(DEFAULT_RATES);

  useEffect(() => {
    fetchLiveExchangeRates().then(rates => {
      if (rates) setCurrencyRates(rates);
    });
  }, []);

  // Deep-linking and URL synchronization for Submodals
  useEffect(() => {
    if (selectedDestination) {
      const ratingSummary = getDestinationRatingSummary(selectedDestination.id, selectedDestination.title);
      pushRoute(getItemDeepLink('destinasi', selectedDestination), { malalaLayer: 'submodal', category: 'destinasi', id: selectedDestination.id });
      applyPageSeo({
        title: `${lang === 'en' && selectedDestination.titleEn ? selectedDestination.titleEn : selectedDestination.title} - Destinasi Wisata Sumatera Barat | Malala`,
        description: lang === 'en' && selectedDestination.descriptionEn ? selectedDestination.descriptionEn : selectedDestination.description,
        url: `https://malala.my.id${getItemDeepLink('destinasi', selectedDestination)}`,
        imageUrl: selectedDestination.imageUrl,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          "name": selectedDestination.title,
          "description": selectedDestination.description,
          "image": [selectedDestination.imageUrl || "https://malala.my.id/og-image.jpg"],
          "address": {
            "@type": "PostalAddress",
            "addressRegion": selectedDestination.regency || "Sumatera Barat",
            "addressCountry": "ID"
          },
          "geo": selectedDestination.lat && selectedDestination.lng ? {
            "@type": "GeoCoordinates",
            "latitude": selectedDestination.lat,
            "longitude": selectedDestination.lng
          } : undefined,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": ratingSummary.rating.toFixed(1),
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": ratingSummary.reviewCount,
            "reviewCount": ratingSummary.reviewCount
          },
          "review": ratingSummary.reviews.slice(0, 3).map(r => ({
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": r.author
            },
            "datePublished": r.date,
            "reviewBody": r.comment,
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": r.rating,
              "bestRating": "5",
              "worstRating": "1"
            }
          }))
        }
      });
    }
  }, [selectedDestination, lang]);

  useEffect(() => {
    if (selectedCulture) {
      pushRoute(getItemDeepLink('kebudayaan', selectedCulture), { malalaLayer: 'submodal', category: 'kebudayaan', id: selectedCulture.id });
      applyPageSeo({
        title: `${lang === 'en' && selectedCulture.titleEn ? selectedCulture.titleEn : selectedCulture.title} - Tradisi Budaya Minangkabau | Malala`,
        description: lang === 'en' && selectedCulture.descriptionEn ? selectedCulture.descriptionEn : selectedCulture.description,
        url: `https://malala.my.id${getItemDeepLink('kebudayaan', selectedCulture)}`,
        imageUrl: selectedCulture.imageUrl
      });
    }
  }, [selectedCulture, lang]);

  useEffect(() => {
    if (selectedCulinary) {
      pushRoute(getItemDeepLink('kuliner', selectedCulinary), { malalaLayer: 'submodal', category: 'kuliner', id: selectedCulinary.id });
      applyPageSeo({
        title: `${lang === 'en' && selectedCulinary.titleEn ? selectedCulinary.titleEn : selectedCulinary.title} - Kuliner Khas Minangkabau | Malala`,
        description: lang === 'en' && selectedCulinary.descriptionEn ? selectedCulinary.descriptionEn : selectedCulinary.description,
        url: `https://malala.my.id${getItemDeepLink('kuliner', selectedCulinary)}`,
        imageUrl: selectedCulinary.imageUrl
      });
    }
  }, [selectedCulinary, lang]);

  useEffect(() => {
    if (selectedEvent) {
      pushRoute(getItemDeepLink('event', selectedEvent), { malalaLayer: 'submodal', category: 'event', id: selectedEvent.id });
      applyPageSeo({
        title: `${lang === 'en' && selectedEvent.titleEn ? selectedEvent.titleEn : selectedEvent.title} - Kalender Event Pariwisata Sumbar 2026 | Malala`,
        description: lang === 'en' && selectedEvent.descriptionEn ? selectedEvent.descriptionEn : selectedEvent.description,
        url: `https://malala.my.id${getItemDeepLink('event', selectedEvent)}`,
        imageUrl: selectedEvent.imageUrl,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": selectedEvent.title,
          "description": selectedEvent.description,
          "startDate": selectedEvent.date,
          "location": {
            "@type": "Place",
            "name": selectedEvent.location || "Sumatera Barat",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Sumatera Barat",
              "addressCountry": "ID"
            }
          },
          "image": [selectedEvent.imageUrl || "https://malala.my.id/og-image.jpg"]
        }
      });
    }
  }, [selectedEvent, lang]);

  useEffect(() => {
    if (selectedSouvenir) {
      pushRoute(getItemDeepLink('oleh-oleh', selectedSouvenir), { malalaLayer: 'submodal', category: 'oleh-oleh', id: selectedSouvenir.id });
      applyPageSeo({
        title: `${lang === 'en' && selectedSouvenir.titleEn ? selectedSouvenir.titleEn : selectedSouvenir.title} - Pusat Oleh-Oleh Khas Sumbar | Malala`,
        description: lang === 'en' && selectedSouvenir.descriptionEn ? selectedSouvenir.descriptionEn : selectedSouvenir.description,
        url: `https://malala.my.id${getItemDeepLink('oleh-oleh', selectedSouvenir)}`,
        imageUrl: selectedSouvenir.imageUrl
      });
    }
  }, [selectedSouvenir, lang]);

  // Sub-modal helpers
  const openSubModal = useCallback((callback: () => void) => {
    callback();
  }, []);

  const closeAllSubModals = useCallback(() => {
    setSelectedDestination(null);
    setSelectedCulture(null);
    setSelectedCulinary(null);
    setSelectedSouvenir(null);
    setSelectedEvent(null);
    setIsBookletModalOpen(false);

    if (activeDrawer) {
      pushRoute(getDrawerPath(activeDrawer), { malalaLayer: 'drawer', drawer: activeDrawer });
    } else {
      pushRoute('/', { malalaLayer: 'root' });
    }
  }, [activeDrawer]);

  const handleSubModalClose = useCallback(() => {
    closeAllSubModals();
  }, [closeAllSubModals]);

  // Auto-open matching submodal on deep-linked page load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const { drawer, itemSlug } = parseRoute(window.location.pathname);
    if (!itemSlug) return;

    if (drawer === 'destinations' && destinations.length > 0 && !selectedDestination) {
      const match = findItemBySlugOrId(destinations, itemSlug);
      if (match) setSelectedDestination(match);
    } else if (drawer === 'culture' && cultureItems.length > 0 && !selectedCulture) {
      const match = findItemBySlugOrId(cultureItems, itemSlug);
      if (match) setSelectedCulture(match);
    } else if (drawer === 'culinary' && culinaryItems.length > 0 && !selectedCulinary) {
      const match = findItemBySlugOrId(culinaryItems, itemSlug);
      if (match) setSelectedCulinary(match);
    } else if (drawer === 'events' && eventItems.length > 0 && !selectedEvent) {
      const match = findItemBySlugOrId(eventItems, itemSlug);
      if (match) setSelectedEvent(match);
    } else if (drawer === 'souvenirs' && souvenirItems.length > 0 && !selectedSouvenir) {
      const match = findItemBySlugOrId(souvenirItems, itemSlug);
      if (match) setSelectedSouvenir(match);
    }
  }, [destinations, cultureItems, culinaryItems, eventItems, souvenirItems, selectedDestination, selectedCulture, selectedCulinary, selectedEvent, selectedSouvenir]);

  // Synchronize popstate with smartphone hardware / gesture back button
  useEffect(() => {
    const handlePopState = () => {
      const { itemSlug } = parseRoute(window.location.pathname);
      // If we popped back and there is no item slug in the URL, close any open submodal
      if (!itemSlug && (selectedDestination || selectedCulture || selectedCulinary || selectedSouvenir || selectedEvent || isBookletModalOpen)) {
        setSelectedDestination(null);
        setSelectedCulture(null);
        setSelectedCulinary(null);
        setSelectedSouvenir(null);
        setSelectedEvent(null);
        setIsBookletModalOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedDestination, selectedCulture, selectedCulinary, selectedSouvenir, selectedEvent, isBookletModalOpen]);

  // Calendar of Events helpers
  const [eventViewMode, setEventViewMode] = useState<'calendar' | 'list'>('calendar');
  const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth());
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<number | null>(null);

  const parseEventMonth = (scheduleStr: string): number => {
    if (!scheduleStr) return 0;
    const s = scheduleStr.toLowerCase();
    const idMonths = ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember'];
    const enMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    
    for (let i = 0; i < 12; i++) {
      if (s.includes(idMonths[i]) || s.includes(enMonths[i])) {
        return i;
      }
    }
    if (s.includes('rajab')) return 0;
    if (s.includes('syawal') || s.includes('lebaran')) return 3;
    if (s.includes('muharram')) return 6;
    if (s.includes('mingguan') || s.includes('akhir pekan') || s.includes('weekend')) return new Date().getMonth();
    return 7;
  };

  const getEventDays = (scheduleStr: string, targetMonthIdx: number): number[] => {
    if (!scheduleStr) return [];
    const evMonth = parseEventMonth(scheduleStr);
    if (evMonth !== targetMonthIdx) return [];

    // Range like "17 - 22 Agustus 2026" or "5 - 6 Agustus 2026" or "8 - 12 September 2026"
    const rangeMatch = scheduleStr.match(/(\d{1,2})\s*[-–]\s*(\d{1,2})/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1]);
      const end = parseInt(rangeMatch[2]);
      if (start && end && start <= end && end <= 31) {
        const days: number[] = [];
        for (let d = start; d <= end; d++) {
          days.push(d);
        }
        return days;
      }
    }

    // Single day like "2 Juli", "10 Muharram"
    const singleMatch = scheduleStr.match(/\b(\d{1,2})\b/);
    if (singleMatch) {
      const d = parseInt(singleMatch[1]);
      if (d >= 1 && d <= 31) return [d];
    }

    // Month-wide or seasonal default highlights (mid-month weekend)
    return [10, 11, 12, 13, 14, 15];
  };

  const handlePlanEventWithAi = (ev: EventItem) => {
    const evMonth = parseEventMonth(ev.schedule);
    const days = getEventDays(ev.schedule, evMonth);
    const day = days.length > 0 ? days[0] : 15;
    const formattedDate = `2026-${String(evMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const evTitle = lang === 'en' && ev.titleEn ? ev.titleEn : ev.title;
    const evLoc = lang === 'en' && ev.locationNameEn ? ev.locationNameEn : (ev.locationName || ev.location || ev.regency);
    
    setItineraryForm((prev: any) => ({
      ...prev,
      targetEvent: ev,
      durasiHari: Math.max(prev.durasiHari || 3, 2),
      waktuKunjungan: {
        tanggalMulai: formattedDate,
        tanggalSelesai: formattedDate
      },
      kebutuhanKhusus: {
        ...prev.kebutuhanKhusus,
        catatanKhusus: lang === 'en'
          ? `MANDATORY HIGHLIGHT: Attend the "${evTitle}" (${ev.scheduleEn || ev.schedule}) in ${evLoc}. Please schedule attending this event as the primary centerpiece of the itinerary!`
          : `WAJIB DIHADIRI: Menghadiri "${evTitle}" (${ev.schedule}) di ${evLoc}. Mohon jadwalkan kunjungan ke acara/festival ini sebagai puncak (highlight utama) rencana liburan!`
      },
      preferensiMinat: {
        ...prev.preferensiMinat,
        kategoriWisata: Array.from(new Set([...(prev.preferensiMinat?.kategoriWisata || []), 'festival', 'budaya']))
      }
    }));
    
    setSelectedEvent(null);
    setFormAiTab('generator');
    onOpenDrawer?.('formai');
  };

  const getEventProximity = (scheduleStr: string) => {
    const currentMonth = new Date().getMonth();
    const eventMonth = parseEventMonth(scheduleStr);
    let diff = eventMonth - currentMonth;
    if (diff < 0) {
      diff += 12;
    }
    return {
      diff,
      eventMonth,
      isCurrentMonth: diff === 0,
      isNextMonth: diff === 1
    };
  };

  const getGoogleCalendarUrl = (ev: EventItem) => {
    const isEn = lang === 'en';
    const title = encodeURIComponent(`${isEn && ev.titleEn ? ev.titleEn : ev.title} - Wonderful West Sumatra`);
    const desc = encodeURIComponent(`${isEn && ev.descriptionEn ? ev.descriptionEn : ev.description}\n\nJadwal: ${isEn && ev.scheduleEn ? ev.scheduleEn : ev.schedule}\nLokasi: ${isEn && ev.locationEn ? ev.locationEn : ev.location}\nPortal Resmi: https://malala-my-id.web.app`);
    const loc = encodeURIComponent(`${isEn && ev.locationEn ? ev.locationEn : ev.location}, Sumatera Barat, Indonesia`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${desc}&location=${loc}`;
  };

  const handleShareEvent = async (ev: EventItem) => {
    const isEn = lang === 'en';
    const title = isEn && ev.titleEn ? ev.titleEn : ev.title;
    const text = `${title} | Calendar of Events Pariwisata Sumatera Barat`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(`${title} - ${url}`);
      alert(isEn ? 'Event information copied to clipboard!' : 'Informasi event berhasil disalin!');
    }
  };

  // Hot Info & Download state
  const [hotInfoCategory, setHotInfoCategory] = useState<string>('Semua');
  const [showAllNewsArchive, setShowAllNewsArchive] = useState<boolean>(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [isFetchingHotInfo, setIsFetchingHotInfo] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const handleRefreshHotInfo = async () => {
    setIsFetchingHotInfo(true);
    try {
      const data = await fetchAiHotInfo(lang);
      if (dataStore.updateHotInfoItems && Array.isArray(data) && data.length > 0) {
        await dataStore.updateHotInfoItems(data);
      }
    } catch (e) {
      alert(lang === 'en' ? 'Network error.' : 'Terjadi kesalahan jaringan.');
    } finally {
      setIsFetchingHotInfo(false);
    }
  };

  // FormAI state
  const [formAiTab, setFormAiTab] = useState<'generator' | 'chat'>('generator');

  // Listen for custom event to open chat directly
  useEffect(() => {
    const handleOpenChat = () => setFormAiTab('chat');
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  const [itineraryForm, setItineraryForm] = useState<any>({
    durasiHari: 3,
    profilWisatawan: {
      jumlahOrang: 2,
      kategori: 'pasangan',
      asal: 'domestik',
    },
    preferensiMinat: {
      kategoriWisata: [],
      tingkatAktivitas: 'sedang',
      suasanaRamai: false,
    },
    logistik: {
      titikKeberangkatan: '',
      moda: 'kendaraan_pribadi',
      radiusMaksimalKm: 100,
    },
    anggaran: {
      rentang: 'menengah',
      alokasi: { akomodasiPersen: 35, makanPersen: 25, tiketPersen: 20, transportasiPersen: 20 },
    },
    akomodasi: {
      jenis: ['hotel'],
      lokasiPreferensi: '',
    },
    waktuKunjungan: {
      tanggalMulai: '',
      tanggalSelesai: '',
    },
    kebutuhanKhusus: {
      catatanKhusus: '',
      preferensiMakanan: [],
      alergiMakanan: [],
      aksesibilitasFisik: false,
    },
    outputPreferensi: {
      formatItinerary: 'per_hari',
      tingkatDetail: 'lengkap_kuliner_oleholeh',
    },
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<FormAIResponse | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);

  const handlePrintA4Itinerary = async () => {
    if (!aiResponse || isDownloadingPdf) return;
    try {
      setIsDownloadingPdf(true);
      await generateItineraryPDF(aiResponse, lang);
      logTourismSignal('download_pdf', { type: 'itinerary_a4', title: aiResponse.title });
    } catch (err) {
      console.error('Failed to generate A4 itinerary PDF:', err);
      alert(lang === 'en' ? 'Failed to download itinerary PDF. Please try again.' : 'Gagal mengunduh file PDF rencana wisata. Silakan coba lagi.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const updateForm = (path: string[], value: any) => {
    setItineraryForm((prev: any) => {
      const newState = { ...prev };
      let current = newState;
      for (let i = 0; i < path.length - 1; i++) {
        current[path[i]] = { ...current[path[i]] };
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newState;
    });
  };

  // UNI MALA AI Chatbot state
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: 'Saluang & Ranah Minang! Saya UNI MALA AI Sumbar, asisten resmi pariwisata Sumatera Barat. Ada yang bisa saya bantu terkait destinasi wisata, kuliner Rendang, atau kebudayaan Minangkabau?',
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Search drawer state and multi-category searchable index
  const [searchCategory, setSearchCategory] = useState<string>('Semua');

  const searchableIndex = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      titleEn?: string;
      desc: string;
      descEn?: string;
      icon: string;
      categoryLabel: string;
      categoryLabelEn: string;
      drawerType: DrawerType;
      imageUrl?: string;
      locationName?: string;
      subTag?: string;
      keywords: string;
      rawItem: any;
    }> = [];

    (destinations || []).forEach((d: Destination) => {
      items.push({
        id: d.id,
        title: d.title,
        titleEn: d.titleEn || d.title,
        desc: d.description,
        descEn: d.descriptionEn || d.description,
        icon: '🏔️',
        categoryLabel: 'Destinasi',
        categoryLabelEn: 'Destination',
        drawerType: 'destinations',
        imageUrl: d.imageUrl,
        locationName: d.regency,
        subTag: d.category,
        keywords: `${d.title} ${d.titleEn || ''} ${d.regency} ${d.category} ${d.description}`.toLowerCase(),
        rawItem: d,
      });
    });

    (cultureItems || []).forEach((c: CultureItem) => {
      items.push({
        id: c.id,
        title: c.title,
        titleEn: c.titleEn || c.title,
        desc: c.description,
        descEn: c.descriptionEn || c.description,
        icon: '🏛️',
        categoryLabel: 'Kebudayaan',
        categoryLabelEn: 'Culture',
        drawerType: 'culture',
        imageUrl: c.imageUrl,
        locationName: c.origin,
        subTag: c.category,
        keywords: `${c.title} ${c.titleEn || ''} ${c.origin} ${c.category} ${c.description}`.toLowerCase(),
        rawItem: c,
      });
    });

    (culinaryItems || []).forEach((c: CulinaryItem) => {
      items.push({
        id: c.id,
        title: c.title,
        titleEn: c.titleEn || c.title,
        desc: c.description,
        descEn: c.descriptionEn || c.description,
        icon: '🍲',
        categoryLabel: 'Kuliner',
        categoryLabelEn: 'Culinary',
        drawerType: 'culinary',
        imageUrl: c.imageUrl,
        locationName: c.origin,
        subTag: c.type,
        keywords: `${c.title} ${c.titleEn || ''} ${c.origin} ${c.type} ${c.description}`.toLowerCase(),
        rawItem: c,
      });
    });

    (eventItems || []).forEach((e: EventItem) => {
      items.push({
        id: e.id,
        title: e.title,
        titleEn: e.titleEn || e.title,
        desc: e.description,
        descEn: e.descriptionEn || e.description,
        icon: '📅',
        categoryLabel: 'Event',
        categoryLabelEn: 'Event',
        drawerType: 'events',
        imageUrl: e.imageUrl,
        locationName: e.location,
        subTag: e.schedule,
        keywords: `${e.title} ${e.titleEn || ''} ${e.location} ${e.description}`.toLowerCase(),
        rawItem: e,
      });
    });

    (dataStore?.souvenirItems || []).forEach((s: SouvenirItem) => {
      items.push({
        id: s.id,
        title: s.title,
        titleEn: s.titleEn || s.title,
        desc: s.description,
        descEn: s.descriptionEn || s.description,
        icon: '🛍️',
        categoryLabel: 'Oleh-Oleh',
        categoryLabelEn: 'Souvenirs',
        drawerType: 'souvenirs',
        imageUrl: s.imageUrl,
        locationName: s.origin,
        subTag: s.category,
        keywords: `${s.title} ${s.titleEn || ''} ${s.origin} ${s.category} ${s.description}`.toLowerCase(),
        rawItem: s,
      });
    });

    const rawNewsList = (dataStore?.hotInfoItems && dataStore.hotInfoItems.length > 0)
      ? dataStore.hotInfoItems
      : HOT_INFO_ITEMS;

    const newsList = [...rawNewsList].sort((a: any, b: any) => {
      return parseNewsTimestamp(b.date, b.createdAt) - parseNewsTimestamp(a.date, a.createdAt);
    });

    newsList.forEach((h: HotInfoItem) => {
      items.push({
        id: h.id,
        title: h.title,
        titleEn: h.titleEn || h.title,
        desc: h.description,
        descEn: h.descriptionEn || h.description,
        icon: '🔥',
        categoryLabel: 'Berita',
        categoryLabelEn: 'News',
        drawerType: 'hotinfo',
        imageUrl: (h.isUserUploadedImage || (h.imageUrl && h.imageUrl.startsWith('data:image/'))) ? h.imageUrl : undefined,
        locationName: h.locationName || h.category,
        subTag: h.date,
        keywords: `${h.title} ${h.titleEn || ''} ${h.category} ${h.description} ${h.sourceName || ''} ${h.sourceDomain || ''}`.toLowerCase(),
        rawItem: h,
      });
    });

    return items;
  }, [destinations, cultureItems, culinaryItems, dataStore?.souvenirItems, eventItems, dataStore?.hotInfoItems]);

  const filteredSearchItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let result = searchableIndex;
    if (q) {
      result = result.filter(item => item.keywords.includes(q));
    }
    if (searchCategory !== 'Semua') {
      result = result.filter(item => item.categoryLabel === searchCategory);
    }
    if (searchCategory === 'Berita') {
      result = [...result].sort((a, b) => {
        const timeA = parseNewsTimestamp(a.rawItem?.date, a.rawItem?.createdAt);
        const timeB = parseNewsTimestamp(b.rawItem?.date, b.rawItem?.createdAt);
        return timeB - timeA;
      });
    }
    return result;
  }, [searchQuery, searchCategory, searchableIndex]);

  const handleOpenSearchItemDetail = (item: any) => {
    if (!item?.rawItem) {
      onOpenDrawer?.(item?.drawerType || 'destinations');
      return;
    }
    if (item.drawerType === 'destinations') {
      openSubModal(() => setSelectedDestination(item.rawItem as Destination));
    } else if (item.drawerType === 'culture') {
      openSubModal(() => setSelectedCulture(item.rawItem as CultureItem));
    } else if (item.drawerType === 'culinary') {
      openSubModal(() => setSelectedCulinary(item.rawItem as CulinaryItem));
    } else if (item.drawerType === 'souvenirs') {
      openSubModal(() => setSelectedSouvenir(item.rawItem as SouvenirItem));
    } else if (item.drawerType === 'events') {
      openSubModal(() => setSelectedEvent(item.rawItem as EventItem));
    } else if (item.drawerType === 'hotinfo') {
      if (onSelectNews && item.rawItem) {
        onSelectNews(item.rawItem as HotInfoItem);
      } else {
        onOpenDrawer?.('hotinfo');
      }
    }
  };

  const getDrawerTitle = () => {
    const isEn = lang === 'en';
    switch (activeDrawer) {
      case 'destinations':
        return isEn ? 'Featured Destinations' : 'Destinasi Wisata MALALA';
      case 'culture':
        return isEn ? 'Minangkabau Culture & Heritage' : 'Seni & Budaya Minang';
      case 'culinary':
        return isEn ? 'Authentic West Sumatra Culinary' : 'Kuliner Authentic';
      case 'souvenirs':
        return isEn ? 'Authentic Minang Souvenirs & Crafts' : 'Oleh-Oleh & Kriya Khas Minang';
      case 'events':
        return isEn ? 'Events & Festivals' : 'Event & Festival';
      case 'formai':
        return isEn ? 'UNI MALA AI Travel Assistant' : 'UNI MALA AI Sumbar';
      case 'saved':
        return isEn ? 'My Saved Favorites' : 'Destinasi Favorit Saya';
      case 'admin':
        return 'Admin Data Management';
      case 'hotinfo':
        return isEn ? 'Hot Info & Travel Updates' : 'Hot Info & Berita Wisata';
      case 'download':
        return isEn ? 'Media Kit & Download Center' : 'Pusat Unduhan & Asset';
      case 'chat':
        return isEn ? 'Ask Uni Mala Guide' : 'Tanya Uni Mala Guide';
      case 'search':
        return isEn ? 'Search Results & Information' : 'Pencarian Informasi Wisata';
      default:
        return '';
    }
  };

  const getDrawerSubtitle = () => {
    const isEn = lang === 'en';
    switch (activeDrawer) {
      case 'destinations':
        return isEn ? 'Explore natural landscapes, geoparks & heritage villages' : 'Pesona Alam, Geopark & Desa Wisata Ranah Minang';
      case 'culture':
        return isEn ? 'Traditional Rumah Gadang architecture, arts & heritage' : 'Warisan Rumah Gadang, Ukiran & Seni Tradisi';
      case 'culinary':
        return isEn ? 'Authentic Rendang, Padang Satay & traditional flavors' : 'Rendang, Sate Padang & Cita Rasa Khas';
      case 'souvenirs':
        return isEn ? 'Long-lasting culinary specialties, Songket textiles & official Minang merchandise' : 'Koleksi Kuliner Khas Tahan Lama, Kain Tenun Songket & Merchandise Resmi Minang';
      case 'events':
        return isEn ? 'Cultural calendar & sports tourism events' : 'Kalender Budaya & Olahraga Parawisata';
      case 'formai':
        return isEn ? 'AI-powered itinerary builder & official travel assistant' : 'Rencana Perjalanan AI & Asisten Pariwisata Resmi';
      case 'saved':
        return isEn ? 'Your saved destinations and cultural highlights' : 'Daftar Destinasi & Kebudayaan yang Disimpan';
      case 'admin':
        return 'Admin Panel';
      case 'hotinfo':
        return isEn ? 'Live updates, weather, traffic routes & tourism notices' : 'Update Terkini, Cuaca, Jalur & Pengumuman Pariwisata Sumbar';
      case 'download':
        return isEn ? 'Download official logos, travel guide booklets & flyers' : 'Unduh Logo Resmi, Booklet, Leaflet & Flyer Wisata Sumbar';
      case 'chat':
        return isEn ? 'Interactive AI tourism guide for West Sumatra' : 'Asisten Percakapan & Panduan Wisata Interaktif Ranah Minang';
      case 'search':
        return isEn ? 'Real-time search results across all West Sumatra tourism categories' : 'Hasil pencarian waktu-nyata ke seluruh data pariwisata Sumatera Barat';
      default:
        return '';
    }
  };

  // Filtered destinations
  const filteredDestinations = destCategory === 'Semua'
    ? destinations
    : destinations.filter((d: Destination) => {
        if (destCategory === 'Danau & Gunung') {
          return d.category === 'Danau & Gunung' || d.category === 'Alam';
        }
        if (destCategory === 'Air Terjun & Alam') {
          return d.category === 'Air Terjun & Alam' || d.category.toLowerCase().includes('air terjun');
        }
        if (destCategory === 'Sejarah') {
          return d.category.startsWith('Sejarah');
        }
        return d.category === destCategory;
      });

  // Handle FormAI Itinerary Generation
  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setAiError(null);

    try {
      const data: FormAIResponse = await fetchAiItinerary({
        ...itineraryForm,
        targetEvent: itineraryForm.targetEvent || null,
        availableEvents: eventItems,
        availableDestinations: destinations,
        language: lang,
      });
      setAiResponse(data);
      logTourismSignal('generate_itinerary', {
        durationDays: itineraryForm.durasiHari || 3,
        travelerCategory: itineraryForm.profilWisatawan?.kategori || 'umum',
        originType: itineraryForm.profilWisatawan?.asal || 'domestik',
        targetEvent: itineraryForm.targetEvent?.title || null,
        title: data.title || 'Itinerary Sumbar',
      });
    } catch (err: any) {
      setAiError(err.message || 'Terjadi kesalahan saat memanggil UNI MALA AI.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle UNI MALA AI Chat Submit
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isChatLoading) return;

    const userText = chatMessage.trim();
    setChatMessage('');
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);
    setIsChatLoading(true);

    const currentHistory = [...chatHistory];
    try {
      const data = await fetchAiChat(userText, currentHistory);
      setChatHistory(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err: any) {
      setChatHistory(prev => [
        ...prev,
        { sender: 'ai', text: 'Maaf, terjadi masalah saat menghubungi UNI MALA AI. Mohon coba lagi beberapa saat.' },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Get saved destination/culture objects
  const savedDestinationsList = destinations.filter((d: Destination) => savedIds.includes(d.id));
  const savedCultureList = cultureItems.filter((c: CultureItem) => savedIds.includes(c.id));

  if (!activeDrawer) return null;

  return (
    <>
      {activeDrawer === 'map' ? (
        <InteractiveMapModal
          isOpen={true}
          onClose={onClose}
          lang={lang}
          destinations={destinations}
          cultureItems={cultureItems}
          culinaryItems={culinaryItems}
          eventItems={eventItems}
          onSelectDestination={(item) => openSubModal(() => setSelectedDestination(item))}
          onSelectCulture={(item) => openSubModal(() => setSelectedCulture(item))}
          onSelectCulinary={(item) => openSubModal(() => setSelectedCulinary(item))}
          onSelectEvent={(item) => openSubModal(() => setSelectedEvent(item))}
        />
      ) : (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[60] animate-fade-backdrop cursor-pointer"
            aria-hidden="true"
          />
      {/* Drawer Outer Wrapper */}
      <div
        className={`fixed top-0 bottom-0 z-[70] ${
          activeDrawer === 'hotinfo'
            ? 'w-full md:w-1/2 lg:w-1/2 left-0 border-r border-gray-200 animate-drawer-slide-left'
            : activeDrawer === 'chat'
            ? 'w-full sm:w-[480px] md:w-[520px] right-0 border-l border-gray-200 animate-drawer-slide-right'
            : ['events', 'destinations', 'culture', 'culinary', 'souvenirs', 'search'].includes(activeDrawer)
            ? 'w-full md:w-[92vw] lg:w-[88vw] xl:w-[82vw] max-w-7xl right-0 border-l border-gray-200 animate-drawer-slide-right'
            : activeDrawer === 'download'
            ? 'w-full md:w-[75vw] lg:w-[65vw] xl:w-[58vw] max-w-5xl right-0 border-l border-gray-200 animate-drawer-slide-right'
            : (activeDrawer === 'formai' && aiResponse)
            ? 'w-full md:w-[96vw] lg:w-[95vw] xl:w-[92vw] max-w-[1550px] right-0 border-l border-gray-200 animate-drawer-slide-right'
            : activeDrawer === 'formai'
            ? 'w-full sm:w-[540px] md:w-[620px] lg:w-[680px] right-0 border-l border-gray-200 animate-drawer-slide-right'
            : 'w-full md:w-1/2 lg:w-1/2 right-0 border-l border-gray-200 animate-drawer-slide-right'
        } bg-white shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-300`}
      >
        
        {/* Header Drawer */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-orbitron font-extrabold text-black uppercase tracking-wider text-base sm:text-lg">
                {getDrawerTitle()}
              </h2>
              {activeDrawer === 'formai' && (
                <span className="bg-black text-white font-orbitron font-bold text-[9px] px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                  <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                  AI Powered
                </span>
              )}
              {activeDrawer === 'hotinfo' && (
                <span className="bg-red-600 text-white font-orbitron font-bold text-[9px] px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                  <Flame className="w-2.5 h-2.5 text-yellow-300 fill-current animate-pulse" />
                  Live Update
                </span>
              )}
              {activeDrawer === 'chat' && (
                <span className="bg-blue-600 text-white font-orbitron font-bold text-[9px] px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                  <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                  Guide AI
                </span>
              )}
              {activeDrawer === 'download' && (
                <span className="bg-indigo-700 text-white font-orbitron font-bold text-[9px] px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                  <Download className="w-2.5 h-2.5 text-cyan-300" />
                  Media Kit
                </span>
              )}
            </div>
            <p className="font-jakarta text-gray-500 text-xs mt-0.5">
              {getDrawerSubtitle()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Tutup Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Main Content (Smooth, isolated scrolling) */}
        <div className={`flex-1 ${
          activeDrawer === 'chat'
            ? 'p-3.5 flex flex-col overflow-hidden h-full'
            : (activeDrawer === 'formai' && aiResponse)
            ? 'p-3 sm:p-4 md:p-5 overflow-y-auto lg:overflow-hidden flex flex-col lg:h-[calc(100vh-73px)]'
            : 'p-6 space-y-6 overflow-y-auto'
        } overscroll-contain scroll-smooth focus:outline-none`} tabIndex={0}>

          {/* Sub-Menu Navigation Bar across main categories */}
          {/* Sub-Menu Navigation Bar across main categories */}
          {['destinations', 'culture', 'culinary', 'souvenirs', 'events', 'download'].includes(activeDrawer) && (
            <div className="bg-gray-50/90 border border-gray-200 p-2 rounded-xl shadow-2xs space-y-1.5 font-jakarta mb-5 shrink-0 w-full">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500 flex items-center gap-1">
                  <span>🗺️</span>
                  <span>{lang === 'en' ? 'Sub-Menu Categories:' : 'Sub-Menu Kategori Wisata:'}</span>
                </span>
              </div>

              {/* 7 Category Buttons Fitted Perfectly Without Swipe */}
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-1 sm:gap-1.5 w-full text-[10px] sm:text-[10.5px]">
                <button
                  onClick={() => onOpenDrawer?.('destinations')}
                  className={`px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-lg font-bold uppercase tracking-tight transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                    activeDrawer === 'destinations'
                      ? 'bg-red-600 text-white shadow-xs font-extrabold'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <span className="text-xs">🏔️</span>
                  <span className="truncate">{translations[lang].navDestinations}</span>
                </button>

                <button
                  onClick={() => onOpenDrawer?.('culture')}
                  className={`px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-lg font-bold uppercase tracking-tight transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                    activeDrawer === 'culture'
                      ? 'bg-purple-600 text-white shadow-xs font-extrabold'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <span className="text-xs">🏛️</span>
                  <span className="truncate">{translations[lang].navCulture}</span>
                </button>

                <button
                  onClick={() => onOpenDrawer?.('culinary')}
                  className={`px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-lg font-bold uppercase tracking-tight transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                    activeDrawer === 'culinary'
                      ? 'bg-amber-600 text-white shadow-xs font-extrabold'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <span className="text-xs">🍲</span>
                  <span className="truncate">{translations[lang].navCulinary}</span>
                </button>

                <button
                  onClick={() => onOpenDrawer?.('souvenirs')}
                  className={`px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-lg font-bold uppercase tracking-tight transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                    activeDrawer === 'souvenirs'
                      ? 'bg-rose-600 text-white shadow-xs font-extrabold'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <span className="text-xs">🎁</span>
                  <span className="truncate">{translations[lang].navSouvenirs}</span>
                </button>

                <button
                  onClick={() => onOpenDrawer?.('events')}
                  className={`px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-lg font-bold uppercase tracking-tight transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                    activeDrawer === 'events'
                      ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <span className="text-xs">📅</span>
                  <span className="truncate">{translations[lang].navEvents}</span>
                </button>

                <button
                  onClick={() => onOpenDrawer?.('download')}
                  className={`px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-lg font-bold uppercase tracking-tight transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                    activeDrawer === 'download'
                      ? 'bg-indigo-600 text-white shadow-xs font-extrabold'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <span className="text-xs">📥</span>
                  <span className="truncate">{translations[lang].navDownloads}</span>
                </button>

                <button
                  onClick={() => onOpenDrawer?.('map')}
                  className={`px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-lg font-bold uppercase tracking-tight transition-all cursor-pointer flex items-center justify-center gap-1 text-center shadow-2xs ${
                    activeDrawer === 'map'
                      ? 'bg-red-600 text-white shadow-xs font-extrabold border border-red-600'
                      : 'bg-emerald-600 text-white border border-emerald-600 hover:bg-red-600 hover:border-red-600'
                  }`}
                >
                  <span className="text-xs">🗺️</span>
                  <span className="truncate">{translations[lang].navMap}</span>
                </button>
              </div>
            </div>
          )}

          {/* =================================================== */}
          {/* 0. HASIL PENCARIAN DRAWER (SLIDING FROM RIGHT)      */}
          {/* =================================================== */}
          {activeDrawer === 'search' && (
            <div className="space-y-6 font-jakarta animate-fade-in">
              {/* Search Bar Input inside the Right-side Sliding Drawer Header */}
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md pt-1 pb-4 border-b border-gray-200">
                <div className="relative flex items-center bg-gray-50 border-2 border-gray-300 focus-within:border-red-600 rounded-xl p-1 shadow-sm transition-all">
                  <div className="pl-3 pr-2 text-red-600">
                    <Search className="w-5 h-5 animate-pulse" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange && onSearchQueryChange(e.target.value)}
                    placeholder={
                      lang === 'en'
                        ? "Type search (e.g. Harau, Jam Gadang, Rendang, Sate)..."
                        : "Ketik kata kunci pencarian (cth: Harau, Jam Gadang, Rendang)..."
                    }
                    className="w-full py-2 px-1 bg-transparent text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchQueryChange && onSearchQueryChange('')}
                      className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-200 transition-colors mr-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Filter Pills for Search Results */}
                <div className="flex items-center gap-1.5 overflow-x-auto pt-3 no-scrollbar text-xs">
                  <button
                    onClick={() => setSearchCategory('Semua')}
                    className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                      searchCategory === 'Semua'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {lang === 'en' ? 'All' : 'Semua'} ({filteredSearchItems.length})
                  </button>
                  <button
                    onClick={() => setSearchCategory('Destinasi')}
                    className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                      searchCategory === 'Destinasi'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    🏔️ Destinasi
                  </button>
                  <button
                    onClick={() => setSearchCategory('Kebudayaan')}
                    className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                      searchCategory === 'Kebudayaan'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    🏛️ Kebudayaan
                  </button>
                  <button
                    onClick={() => setSearchCategory('Kuliner')}
                    className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                      searchCategory === 'Kuliner'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    🍲 Kuliner
                  </button>
                  <button
                    onClick={() => setSearchCategory('Event')}
                    className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                      searchCategory === 'Event'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    📅 Event
                  </button>
                  <button
                    onClick={() => setSearchCategory('Berita')}
                    className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                      searchCategory === 'Berita'
                        ? 'bg-red-700 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    🔥 Berita
                  </button>
                </div>
              </div>

              {/* Search Results List (3 Columns Grid on Desktop) */}
              {filteredSearchItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {filteredSearchItems.map((item, idx) => {
                    const isNews = item.drawerType === 'hotinfo' || item.categoryLabel === 'Berita';
                    const publisherDomain = isNews ? (item.rawItem?.sourceDomain || item.rawItem?.sourceName) : undefined;
                    const publisherFavicon = isNews ? (item.rawItem?.sourceIcon || getPublisherFavicon(item.rawItem?.sourceDomain, item.rawItem?.sourceName)) : undefined;

                    return (
                      <div
                        key={`${item.id}-${idx}`}
                        onClick={() => handleOpenSearchItemDetail(item)}
                        className={`border border-gray-200 rounded-xl p-3.5 hover:shadow-lg transition-all bg-white hover:border-red-300 flex flex-col justify-between group font-jakarta cursor-pointer ${
                          isNews ? 'space-y-3 bg-gradient-to-b from-white to-amber-50/20' : 'space-y-2.5'
                        }`}
                      >
                        <div className="space-y-2">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-32 rounded-lg object-cover border border-gray-100 group-hover:scale-102 transition-transform"
                            />
                          ) : (
                            !isNews && (
                              <div className="w-full h-32 rounded-lg bg-gray-100 flex items-center justify-center text-4xl">
                                {item.icon}
                              </div>
                            )
                          )}

                          <div className="space-y-1.5">
                            {isNews ? (
                              /* Tampilan header khusus berita: Favicon + Domain + Tag */
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {publisherFavicon && (
                                  <img
                                    src={publisherFavicon}
                                    alt={publisherDomain || 'Media'}
                                    className="w-3.5 h-3.5 rounded-xs object-contain shrink-0 bg-white border border-gray-200 p-0.5"
                                    onError={(e: any) => { e.target.style.display = 'none'; }}
                                  />
                                )}
                                {publisherDomain && (
                                  <span className="text-[11px] font-bold text-gray-700 truncate max-w-[120px]">
                                    {publisherDomain}
                                  </span>
                                )}
                                <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                  🔥 {lang === 'en' ? 'News' : 'Berita'}
                                </span>
                                {item.subTag && (
                                  <span className="text-[9.5px] font-semibold text-gray-400 truncate max-w-[110px]">
                                    • {item.subTag}
                                  </span>
                                )}
                              </div>
                            ) : (
                              /* Tampilan badge standar untuk non-berita */
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                                  {lang === 'en' && item.categoryLabelEn ? item.categoryLabelEn : item.categoryLabel}
                                </span>
                                {item.subTag && (
                                  <span className="text-[9.5px] font-semibold text-gray-500 truncate max-w-[120px]">
                                    • {item.subTag}
                                  </span>
                                )}
                              </div>
                            )}

                            <h3 className={`font-bold text-gray-900 group-hover:text-red-600 transition-colors ${
                              isNews ? 'text-xs sm:text-sm leading-snug line-clamp-2' : 'text-xs sm:text-sm line-clamp-1'
                            }`}>
                              {lang === 'en' && item.titleEn ? item.titleEn : item.title}
                            </h3>
                            <p className={`text-[11px] text-gray-600 leading-relaxed ${
                              isNews ? 'line-clamp-3' : 'line-clamp-2'
                            }`}>
                              {lang === 'en' && item.descEn ? item.descEn : item.desc}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
                          <span className="text-gray-500 font-medium flex items-center gap-1 truncate max-w-[120px]">
                            {item.locationName && (
                              <>
                                <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                                <span className="truncate">{item.locationName}</span>
                              </>
                            )}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenSearchItemDetail(item);
                            }}
                            className="inline-flex items-center gap-0.5 font-bold text-red-600 hover:text-black transition-colors cursor-pointer shrink-0"
                          >
                            <span>{isNews ? (lang === 'en' ? 'Read Story' : 'Buka Berita') : (lang === 'en' ? 'View Details' : 'Lihat Detail')}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 px-4 space-y-3">
                  <div className="text-4xl">🔍</div>
                  <h3 className="font-bold text-gray-800 text-base">
                    {searchQuery
                      ? (lang === 'en' ? `No matching information found for "${searchQuery}"` : `Tidak ada informasi ditemukan untuk "${searchQuery}"`)
                      : (lang === 'en' ? 'Type keywords above to search all West Sumatra tourism info' : 'Ketik kata kunci di atas untuk mencari seluruh info pariwisata Sumbar')}
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    {lang === 'en'
                      ? 'Try searching for Bukittinggi, Harau Valley, Rendang, Jam Gadang, Pariangan, or Pacu Jawi.'
                      : 'Coba cari kata kunci seperti Lembah Harau, Jam Gadang, Rendang, Sate, Nagari Pariangan, atau Pacu Jawi.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* 1. DESTINASI WISATA DRAWER                          */}
          {/* =================================================== */}
          {activeDrawer === 'destinations' && (
            <div className="space-y-6">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-jakarta">
                {[
                  { val: 'Semua', label: translations[lang].catAll },
                  { val: 'Danau & Gunung', label: translations[lang].catLakeMountain },
                  { val: 'Lembah & Geopark', label: translations[lang].catValleyGeopark },
                  { val: 'Pantai & Bahari', label: translations[lang].catBeachMarine },
                  { val: 'Air Terjun & Alam', label: translations[lang].catWaterfallNature },
                  { val: 'Sejarah', label: translations[lang].catHistoryHeritage },
                  { val: 'Desa Wisata', label: translations[lang].catVillage }
                ].map(cat => (
                  <button
                    key={cat.val}
                    onClick={() => setDestCategory(cat.val)}
                    className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      destCategory === cat.val
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Destination Cards - 3 COLUMN GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDestinations.map((dest) => {
                  const isSaved = savedIds.includes(dest.id);
                  const isEn = lang === 'en';
                  return (
                    <div
                      key={dest.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:border-black transition-all bg-white group flex flex-col justify-between shadow-xs"
                    >
                      <div>
                        {/* Image Banner */}
                        <div className="relative h-36 w-full overflow-hidden bg-gray-100">
                          <img
                            src={dest.imageUrl}
                            alt={isEn && dest.titleEn ? dest.titleEn : dest.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/75 text-white font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded backdrop-blur-xs">
                            {isEn && dest.categoryEn ? dest.categoryEn : dest.category}
                          </div>

                          {/* Bookmark Button */}
                          <button
                            onClick={() => onToggleSave(dest.id, isEn && dest.titleEn ? dest.titleEn : dest.title)}
                            className={`absolute top-2 right-2 p-1.5 rounded-full border transition-all cursor-pointer ${
                              isSaved
                                ? 'bg-black text-white border-black'
                                : 'bg-white/90 text-gray-700 border-gray-200 hover:text-black hover:bg-white'
                            }`}
                            title={isSaved ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                          >
                            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Card Info */}
                        <div className="p-3.5 space-y-2">
                          <div className="flex items-center justify-between gap-1">
                            <div className="text-gray-400 font-jakarta text-[11px] flex items-center gap-1 font-semibold truncate">
                              <MapPin className="w-3 h-3 text-black shrink-0" />
                              <span className="truncate">{isEn && dest.regencyEn ? dest.regencyEn : dest.regency}</span>
                            </div>
                            {/* Star Rating Rich Badge */}
                            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 shrink-0 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                              <span>{getDestinationRatingSummary(dest.id, dest.title).rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <h3 className="font-orbitron font-bold text-black uppercase tracking-wide text-xs sm:text-sm line-clamp-2">
                            {isEn && dest.titleEn ? dest.titleEn : dest.title}
                          </h3>
                          <p className="font-jakarta text-gray-600 text-[11px] leading-relaxed line-clamp-2">
                            {isEn && dest.descriptionEn ? dest.descriptionEn : dest.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-3 border-t border-gray-100 bg-gray-50 flex flex-col gap-2 text-[10px] font-jakarta">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-gray-500 font-medium truncate">
                            <Clock className="w-3 h-3 text-gray-400 shrink-0" />
                            <span className="truncate">{isEn && dest.bestTimeEn ? dest.bestTimeEn : dest.bestTime}</span>
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium shrink-0">
                            {getDestinationRatingSummary(dest.id, dest.title).reviewCount} {isEn ? 'reviews' : 'ulasan'}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-gray-200/60">
                          <a
                            href={getDestinationGoogleMapsUrl(dest)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-1 rounded font-jakarta font-bold uppercase text-[10px] transition-colors cursor-pointer flex justify-center items-center gap-1 shadow-xs text-center"
                            title={isEn ? "View Location on Google Maps" : "Cari Lokasi di Google Maps"}
                          >
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{isEn ? "Maps" : "Maps"}</span>
                          </a>

                          <a
                            href={getSafeYoutubeUrl(dest.title, dest.regency || dest.category, dest.videoUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-1 rounded font-jakarta font-bold uppercase text-[10px] transition-colors cursor-pointer flex justify-center items-center gap-1 shadow-xs text-center"
                            title={isEn ? "Watch Video on YouTube" : "Tonton Video di YouTube"}
                          >
                            <Youtube className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">YouTube</span>
                          </a>

                          <button
                            onClick={() => openSubModal(() => setSelectedDestination(dest))}
                            className="bg-black hover:bg-amber-600 text-white py-1.5 px-1 rounded font-jakarta font-bold uppercase text-[10px] transition-colors cursor-pointer flex justify-center items-center gap-1 shadow-xs text-center"
                            title={translations[lang].btnDetail}
                          >
                            <Info className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{translations[lang].btnDetail}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =================================================== */}
          {/* 2. SENI & BUDAYA MINANG DRAWER                     */}
          {/* =================================================== */}
          {activeDrawer === 'culture' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cultureItems.map((item: CultureItem) => {
                const isSaved = savedIds.includes(item.id);
                const isEn = lang === 'en';
                return (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col justify-between shadow-xs hover:border-black transition-all group"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative h-36 w-full overflow-hidden bg-gray-100">
                        <img
                          src={item.imageUrl}
                          alt={isEn && item.titleEn ? item.titleEn : item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 bg-black/75 text-white font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded backdrop-blur-xs">
                          {isEn && item.categoryEn ? item.categoryEn : item.category}
                        </span>
                        <button
                          onClick={() => onToggleSave(item.id, isEn && item.titleEn ? item.titleEn : item.title)}
                          className={`absolute top-2 right-2 p-1.5 rounded-full border transition-all cursor-pointer ${
                            isSaved
                              ? 'bg-black text-white border-black'
                              : 'bg-white/90 text-gray-700 border-gray-200 hover:text-black hover:bg-white'
                          }`}
                        >
                          {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="p-3.5 space-y-2">
                        <h3 className="font-orbitron font-bold text-black uppercase tracking-wide text-xs sm:text-sm">
                          {isEn && item.titleEn ? item.titleEn : item.title}
                        </h3>
                        <p className="font-jakarta text-gray-600 text-[11px] leading-relaxed line-clamp-3">
                          {isEn && item.descriptionEn ? item.descriptionEn : item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex flex-col gap-2">
                      <div>
                        <span className="font-jakarta font-bold text-[9px] text-gray-400 uppercase tracking-widest block">
                          {isEn ? 'MINANG PHILOSOPHY' : 'FALSAFAH MINANG'}
                        </span>
                        <p className="font-jakarta italic text-black font-semibold text-[11px] line-clamp-1 truncate mt-0.5">
                          "{isEn && item.philosophyEn ? item.philosophyEn : item.philosophy}"
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-gray-200/60">
                        <a
                          href={getSafeYoutubeUrl(item.title, item.category || item.origin, item.videoUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-2 rounded font-jakarta font-bold uppercase text-[10px] transition-colors cursor-pointer flex justify-center items-center gap-1 shadow-xs text-center"
                          title={isEn ? "Watch Video on YouTube" : "Tonton Video di YouTube"}
                        >
                          <Youtube className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">YouTube</span>
                        </a>

                        <button
                          onClick={() => openSubModal(() => setSelectedCulture(item))}
                          className="bg-black hover:bg-amber-600 text-white py-1.5 px-2 rounded font-jakarta font-bold uppercase text-[10px] transition-colors cursor-pointer flex justify-center items-center gap-1 shadow-xs text-center"
                          title={translations[lang].btnDetail}
                        >
                          <Info className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{translations[lang].btnDetail}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* =================================================== */}
          {/* 3. KULINER AUTHENTIC DRAWER                        */}
          {/* =================================================== */}
          {activeDrawer === 'culinary' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {culinaryItems.map((cul: CulinaryItem) => {
                const isEn = lang === 'en';
                return (
                  <div
                    key={cul.id}
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col justify-between shadow-xs hover:border-black transition-all group"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative h-36 w-full overflow-hidden bg-gray-100">
                        <img
                          src={cul.imageUrl}
                          alt={isEn && cul.titleEn ? cul.titleEn : cul.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 bg-black/75 text-white font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded backdrop-blur-xs">
                          {isEn && cul.typeEn ? cul.typeEn : cul.type}
                        </span>
                      </div>

                      <div className="p-3.5 space-y-2">
                        <div className="text-gray-400 font-jakarta text-[10px] uppercase tracking-wider font-semibold">
                          {isEn ? 'Origin:' : 'Asal:'} {isEn && cul.originEn ? cul.originEn : cul.origin}
                        </div>
                        <h3 className="font-orbitron font-bold text-black uppercase tracking-wide text-xs sm:text-sm">
                          {isEn && cul.titleEn ? cul.titleEn : cul.title}
                        </h3>
                        <p className="font-jakarta text-gray-600 text-[11px] leading-relaxed line-clamp-3">
                          {isEn && cul.descriptionEn ? cul.descriptionEn : cul.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t border-gray-100 text-[11px] font-jakarta flex flex-col gap-2">
                      <div className="truncate">
                        <span className="font-bold text-black">{isEn ? 'Flavor Profile:' : 'Profil Rasa:'} </span>
                        <span className="text-gray-600 line-clamp-1 block sm:inline">{isEn && cul.flavorProfileEn ? cul.flavorProfileEn : cul.flavorProfile}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-gray-200/60">
                        <a
                          href={getCulinaryGoogleMapsUrl(cul)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-1 rounded font-jakarta font-bold uppercase text-[10px] transition-colors cursor-pointer flex justify-center items-center gap-1 shadow-xs text-center"
                          title={isEn ? "Find Food Places on Google Maps" : "Cari Tempat Kuliner di Google Maps"}
                        >
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{isEn ? "Maps" : "Maps"}</span>
                        </a>

                        <a
                          href={getSafeYoutubeUrl(cul.title, cul.type || cul.origin, cul.videoUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-1 rounded font-jakarta font-bold uppercase text-[10px] transition-colors cursor-pointer flex justify-center items-center gap-1 shadow-xs text-center"
                          title={isEn ? "Watch Video on YouTube" : "Tonton Video di YouTube"}
                        >
                          <Youtube className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">YouTube</span>
                        </a>

                        <button
                          onClick={() => openSubModal(() => setSelectedCulinary(cul))}
                          className="bg-black hover:bg-amber-600 text-white py-1.5 px-1 rounded font-jakarta font-bold uppercase text-[10px] transition-colors cursor-pointer flex justify-center items-center gap-1 shadow-xs text-center"
                          title={translations[lang].btnDetail}
                        >
                          <Info className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{translations[lang].btnDetail}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* =================================================== */}
          {/* 3.5. OLEH-OLEH & KRIYA KHAS MINANG (SHOPEE AFFILIATE) */}
          {/* =================================================== */}
          {activeDrawer === 'souvenirs' && (() => {
            const isEn = lang === 'en';
            const allSouvenirs: SouvenirItem[] = (dataStore?.souvenirItems && dataStore.souvenirItems.length > 0)
              ? dataStore.souvenirItems
              : [];

            const filteredSouvenirs = allSouvenirs.filter((s: SouvenirItem) => {
              if (souvenirCategory === 'Semua') return true;
              return s.category === souvenirCategory;
            });

            return (
              <div className="space-y-6">
                {/* Header Actions: Category Filter & Multi-Currency Switcher */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-jakarta">
                      {[
                        { val: 'Semua', label: isEn ? 'All Souvenirs' : 'Semua Oleh-Oleh' },
                        { val: 'Kuliner Kemasan', label: isEn ? 'Packaged Food' : 'Kuliner Kemasan' },
                        { val: 'Fashion & Tenun', label: isEn ? 'Fashion & Songket' : 'Fashion & Tenun' },
                        { val: 'Kopi & Rempah', label: isEn ? 'Coffee & Spices' : 'Kopi & Rempah' },
                        { val: 'Kriya & Kerajinan', label: isEn ? 'Handicrafts' : 'Kriya & Kerajinan' }
                      ].map((cat) => (
                        <button
                          key={cat.val}
                          onClick={() => setSouvenirCategory(cat.val)}
                          className={`px-3 py-1.5 rounded-full uppercase tracking-wider font-bold text-[10px] whitespace-nowrap transition-colors cursor-pointer ${
                            souvenirCategory === cat.val
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Multi-Currency Auto Converter Pill Bar */}
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200 text-[10px] font-bold">
                      <span className="text-gray-400 px-1 text-[9px] uppercase font-semibold">Kurs:</span>
                      {(['IDR', 'MYR', 'SGD', 'USD', 'AUD'] as CurrencyCode[]).map((cCode) => (
                        <button
                          key={cCode}
                          onClick={() => setCurrency(cCode)}
                          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                            currency === cCode
                              ? 'bg-black text-white shadow-2xs font-black'
                              : 'text-gray-600 hover:text-black hover:bg-gray-200/60'
                          }`}
                        >
                          {DEFAULT_RATES[cCode].flag} {cCode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Souvenir Product Grid - 3 COLUMN GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSouvenirs.map((souv: SouvenirItem) => {
                    const rawPrice = (isEn && souv.priceRangeEn ? souv.priceRangeEn : souv.priceRange) || '';
                    const displayPrice = formatToCurrency(rawPrice, currency, currencyRates);

                    return (
                      <div
                        key={souv.id}
                        className="border border-gray-200 rounded-xl overflow-hidden bg-white flex flex-col justify-between shadow-xs hover:shadow-md hover:border-red-300 transition-all group font-jakarta"
                      >
                        <div>
                          {/* Image Banner */}
                          <div
                            onClick={() => openSubModal(() => setSelectedSouvenir(souv))}
                            className="relative h-44 w-full overflow-hidden bg-gray-100 cursor-pointer"
                          >
                            <img
                              src={souv.imageUrl}
                              alt={isEn && souv.titleEn ? souv.titleEn : souv.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                              <span className="bg-black/80 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded backdrop-blur-xs">
                                {isEn && souv.categoryEn ? souv.categoryEn : souv.category}
                              </span>
                              {souv.isMinangkaos && (
                                <span className="bg-red-600 text-white font-black text-[9px] uppercase px-2 py-0.5 rounded shadow-2xs tracking-wider">
                                  Official Minangkaos
                                </span>
                              )}
                            </div>

                            <span className="absolute bottom-2 right-2 bg-white/95 text-red-600 font-orbitron font-extrabold text-[10.5px] px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-xs border border-red-200">
                              {displayPrice}
                            </span>
                          </div>

                          <div className="p-3.5 space-y-2">
                            <div className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                              <span>{isEn ? 'Origin:' : 'Asal:'} {isEn && souv.originEn ? souv.originEn : souv.origin}</span>
                            </div>
                            <h3
                              onClick={() => openSubModal(() => setSelectedSouvenir(souv))}
                              className="font-orbitron font-bold text-black uppercase tracking-wide text-xs sm:text-sm group-hover:text-red-600 transition-colors cursor-pointer line-clamp-1"
                            >
                              {isEn && souv.titleEn ? souv.titleEn : souv.title}
                            </h3>
                            <p className="text-gray-600 text-[11px] leading-relaxed line-clamp-2">
                              {isEn && souv.descriptionEn ? souv.descriptionEn : souv.description}
                            </p>

                            {/* Highlights pills */}
                            <div className="flex flex-wrap gap-1 pt-1">
                              {(isEn && souv.highlightsEn ? souv.highlightsEn : souv.highlights).slice(0, 2).map((h, hIdx) => (
                                <span key={hIdx} className="text-[9px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                                  ✓ {h}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-3 bg-gray-50 border-t border-gray-100 space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            <a
                              href={souv.shopeeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-[#EE4D2D] hover:bg-[#d73211] text-white py-2 px-2.5 rounded-lg font-jakarta font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 shadow-2xs text-center cursor-pointer"
                            >
                              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                              <span>{isEn ? 'Buy on Shopee' : 'Beli di Shopee'}</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-80" />
                            </a>

                            {souv.isMinangkaos && souv.whatsappUrl ? (
                              <a
                                href={souv.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2 px-2.5 rounded-lg font-jakarta font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 shadow-2xs text-center cursor-pointer"
                              >
                                <span>💬 {isEn ? 'WhatsApp' : 'Pesan WA'}</span>
                              </a>
                            ) : (
                              <button
                                type="button"
                                onClick={() => openSubModal(() => setSelectedSouvenir(souv))}
                                className="w-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 py-2 px-2.5 rounded-lg font-jakarta font-bold text-[11px] transition-all flex items-center justify-center gap-1 text-center cursor-pointer"
                              >
                                <span>{translations[lang].btnDetail}</span>
                                <ChevronRight className="w-3 h-3 shrink-0" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* =================================================== */}
          {/* 4. CALENDAR OF EVENTS (CoE) SUMATERA BARAT          */}
          {/* =================================================== */}
          {activeDrawer === 'events' && (() => {
            const isEn = lang === 'en';
            const monthNamesId = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const currentMonthIdx = new Date().getMonth();

            // Filter logic
            const filteredEvents = eventItems.filter((ev: EventItem) => {
              if (searchQuery.trim().length > 0) {
                const q = searchQuery.toLowerCase().trim();
                const matchText = [
                  ev.title, ev.titleEn, ev.location, ev.locationEn,
                  ev.schedule, ev.scheduleEn, ev.description, ev.descriptionEn
                ].filter(Boolean).join(' ').toLowerCase();
                if (!matchText.includes(q)) return false;
              }

              // Month Filter
              if (eventMonthFilter === 'current') {
                const prox = getEventProximity(ev.schedule);
                if (!prox.isCurrentMonth) return false;
              } else if (typeof eventMonthFilter === 'number') {
                const evMonth = parseEventMonth(ev.schedule);
                if (evMonth !== eventMonthFilter) return false;
              }

              // Category Filter
              if (eventCategoryFilter === 'ken') {
                return Boolean(ev.isKen);
              } else if (eventCategoryFilter === 'budaya') {
                const text = (ev.title + ' ' + (ev.titleEn || '') + ' ' + ev.description).toLowerCase();
                return text.includes('budaya') || text.includes('tradisi') || text.includes('alek') || text.includes('suku');
              } else if (eventCategoryFilter === 'sport') {
                const text = (ev.title + ' ' + (ev.titleEn || '') + ' ' + ev.description).toLowerCase();
                return text.includes('pacu') || text.includes('tour de') || text.includes('paralayang') || text.includes('sampan') || text.includes('kudo') || text.includes('jawi');
              } else if (eventCategoryFilter === 'bahari') {
                const text = (ev.title + ' ' + (ev.titleEn || '') + ' ' + ev.location).toLowerCase();
                return text.includes('pantai') || text.includes('danau') || text.includes('sungai') || text.includes('pesisir') || text.includes('mentawai') || text.includes('muaro');
              }

              return true;
            });

            const totalKenCount = eventItems.filter((e: any) => Boolean(e.isKen)).length;

            // Sort all filtered events by Chronological Proximity (Upcoming First relative to today)
            const sortedEvents = [...filteredEvents].sort((a, b) => {
              return getEventProximity(a.schedule).diff - getEventProximity(b.schedule).diff;
            });

            const renderEventCard = (ev: EventItem) => {
              const titleText = isEn && ev.titleEn ? ev.titleEn : ev.title;
              const isKEN = Boolean(ev.isKen);
              const prox = getEventProximity(ev.schedule);

              return (
                <div
                  key={ev.id}
                  className={`border rounded-xl overflow-hidden bg-white flex flex-col justify-between shadow-xs transition-all duration-300 group hover:shadow-md ${
                    prox.isCurrentMonth
                      ? 'border-red-400 ring-2 ring-red-200'
                      : isKEN
                      ? 'border-amber-300 ring-1 ring-amber-200'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                      <img
                        src={ev.imageUrl}
                        alt={titleText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 flex-wrap">
                        {/* Timing Status Badge */}
                        <div
                          className={`font-jakarta font-black text-[9px] uppercase px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-md shadow-xs ${
                            prox.isCurrentMonth
                              ? 'bg-red-600 text-white animate-pulse'
                              : prox.isNextMonth
                              ? 'bg-amber-500 text-black'
                              : 'bg-black/80 text-white'
                          }`}
                        >
                          <Calendar className="w-3 h-3 text-amber-300" />
                          <span>
                            {prox.isCurrentMonth
                              ? (isEn ? '🔥 Happening This Month' : '🔥 Sedang Berlangsung / Bulan Ini')
                              : prox.isNextMonth
                              ? (isEn ? '⏳ Next Month' : '⏳ Segera Hadir Bulan Depan')
                              : (isEn && ev.scheduleEn ? ev.scheduleEn : ev.schedule)}
                          </span>
                        </div>

                        {isKEN && (
                          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-jakarta font-black text-[9px] uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm tracking-wider">
                            <Sparkles className="w-3 h-3 text-yellow-200 animate-pulse" />
                            <span>KEN Kemenparekraf</span>
                          </div>
                        )}
                      </div>

                      {/* Location at bottom of image - Clickable to Google Maps */}
                      <a
                        href={getEventGoogleMapsUrl(ev)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-2 left-3 right-3 text-white font-jakarta text-[10px] flex items-center gap-1 font-semibold truncate drop-shadow-sm hover:text-amber-300 transition-colors group/loc"
                        title={isEn ? "View Event Location on Google Maps" : "Lihat Lokasi Event di Google Maps"}
                      >
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover/loc:scale-110 transition-transform" />
                        <span className="truncate underline underline-offset-2 decoration-amber-400/60">{isEn && ev.locationEn ? ev.locationEn : ev.location}</span>
                      </a>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-jakarta text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-600" />
                          {isEn && ev.scheduleEn ? ev.scheduleEn : ev.schedule}
                        </span>
                      </div>
                      <h3 className="font-orbitron font-bold text-black uppercase tracking-wide text-xs sm:text-sm line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {titleText}
                      </h3>
                      <p className="font-jakarta text-gray-600 text-[11px] leading-relaxed line-clamp-3">
                        {isEn && ev.descriptionEn ? ev.descriptionEn : ev.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer & Action Buttons */}
                  <div className="p-3 bg-gray-50 border-t border-gray-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      {/* 1-Click Google Calendar button */}
                      <a
                        href={getGoogleCalendarUrl(ev)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border border-gray-300 hover:border-black text-gray-700 hover:text-black font-jakarta font-bold text-[10px] uppercase px-2.5 py-1.5 rounded-md flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs hover:bg-gray-50 text-center shrink-0"
                        title={isEn ? 'Add to Google Calendar' : 'Simpan ke Google Calendar'}
                      >
                        <Calendar className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="text-center">{isEn ? '+ Calendar' : '+ Kalender'}</span>
                      </a>

                      <div className="flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => handlePlanEventWithAi(ev)}
                          className="bg-amber-500 hover:bg-amber-400 text-black font-jakarta font-bold text-[10px] uppercase px-2.5 py-1.5 rounded-md flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs text-center"
                          title={isEn ? 'Plan with AI' : 'Rencanakan dengan AI'}
                        >
                          <Sparkles className="w-3 h-3 shrink-0" />
                          <span className="text-center">{isEn ? 'AI Plan' : 'AI Plan'}</span>
                        </button>

                        <button
                          onClick={() => handleShareEvent(ev)}
                          className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors cursor-pointer bg-white flex items-center justify-center shrink-0"
                          title={isEn ? 'Share Event' : 'Bagikan Event'}
                        >
                          <Share2 className="w-3 h-3 shrink-0" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-gray-200/60">
                      <a
                        href={getEventGoogleMapsUrl(ev)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-1 rounded font-jakarta font-bold uppercase text-[10px] transition-colors cursor-pointer flex justify-center items-center gap-1 shadow-xs text-center"
                        title={isEn ? "View Event Location on Google Maps" : "Cari Lokasi Event di Google Maps"}
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{isEn ? "Maps" : "Maps"}</span>
                      </a>

                      <a
                        href={getEventYoutubeUrl(ev)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-1 rounded font-jakarta font-bold uppercase text-[10px] transition-colors cursor-pointer flex justify-center items-center gap-1 shadow-xs text-center"
                        title={isEn ? "Watch Video on YouTube" : "Tonton Video di YouTube"}
                      >
                        <Youtube className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">YouTube</span>
                      </a>

                      <button
                        onClick={() => openSubModal(() => setSelectedEvent(ev))}
                        className="bg-black hover:bg-amber-600 text-white py-1.5 px-1 rounded font-jakarta font-bold uppercase text-[10px] transition-colors cursor-pointer flex justify-center items-center gap-1 shadow-xs text-center"
                        title={translations[lang].btnDetail}
                      >
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{translations[lang].btnDetail}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            };

            // Days of the week names
            const dayNamesId = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
            const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            // Calculate calendar grid properties for 2026
            const year2026 = 2026;
            const daysInActiveMonth = new Date(year2026, calendarMonth + 1, 0).getDate();
            const firstDayOfWeek = new Date(year2026, calendarMonth, 1).getDay(); // 0 = Sun, 1 = Mon ...

            // Month events
            const eventsInActiveMonth = filteredEvents.filter((ev: EventItem) => parseEventMonth(ev.schedule) === calendarMonth);
            
            // Events to show in cards below calendar (filtered by day if clicked, or showing all events if in list mode)
            const calendarEventsToDisplay = eventViewMode === 'list'
              ? filteredEvents
              : (calendarSelectedDate 
                ? eventsInActiveMonth.filter((ev: EventItem) => getEventDays(ev.schedule, calendarMonth).includes(calendarSelectedDate))
                : eventsInActiveMonth);

            return (
              <div className="space-y-6 font-jakarta">
                {/* Minimalist Header Calendar of Events */}
                <div className="bg-neutral-900 text-white p-3.5 sm:p-4 rounded-xl shadow-xs relative overflow-hidden border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-amber-500 text-black font-orbitron font-black text-[9px] uppercase px-2 py-0.5 rounded tracking-wider">
                        OFFICIAL CoE 2026
                      </span>
                      <span className="text-gray-300 font-jakarta font-medium text-[10px]">
                        {isEn ? 'Curated by MINANGKAOS' : 'Disusun oleh MINANGKAOS'}
                      </span>
                    </div>
                    <h2 className="font-orbitron font-bold text-xs sm:text-sm uppercase tracking-wide text-white">
                      {isEn ? 'CALENDAR OF EVENTS (CoE) 2026' : 'KALENDER EVENT SUMBAR 2026'}
                    </h2>
                  </div>

                  {/* Compact Quick Stats & CoE Download Button */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 text-center">
                        <span className="font-orbitron font-bold text-xs text-amber-400">{eventItems.length}</span>
                        <span className="text-[9px] text-gray-400 ml-1 uppercase">{isEn ? 'Events' : 'Event'}</span>
                      </div>
                      <div className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 text-center">
                        <span className="font-orbitron font-bold text-xs text-yellow-300">{totalKenCount}</span>
                        <span className="text-[9px] text-gray-400 ml-1 uppercase">KEN</span>
                      </div>
                      <div className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 text-center">
                        <span className="font-orbitron font-bold text-xs text-emerald-400">19</span>
                        <span className="text-[9px] text-gray-400 ml-1 uppercase">Kab/Kota</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = `/downloads/kalender-event-sumbar-2026.pdf?v=${Date.now()}`;
                        link.download = 'MALALA-Kalender-Event-CoE-Sumatera-Barat-2026.pdf';
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-black px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0 ml-auto sm:ml-0"
                      title={isEn ? 'Download Calendar of Events E-Book (PDF)' : 'Unduh E-Book Kalender Event Resmi 2026 (PDF)'}
                    >
                      <Download className="w-3.5 h-3.5 text-black" />
                      <span>{isEn ? 'Download CoE E-Book' : 'Unduh E-Book CoE'}</span>
                    </button>
                  </div>
                </div>

                {/* 2-Panel Master-Detail Layout: Kalender di Kiri, Semua Event 2 Kolom di Kanan */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  
                  {/* ======================================================== */}
                  {/* PANEL KIRI: PANEL KHUSUS KALENDER VISUAL BULANAN        */}
                  {/* ======================================================== */}
                  <div className="w-full lg:w-[380px] xl:w-[410px] shrink-0 space-y-4 lg:sticky lg:top-0">
                    {/* Month Navigator Header */}
                    <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            setCalendarMonth((prev) => (prev > 0 ? prev - 1 : 11));
                            setCalendarSelectedDate(null);
                          }}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-black hover:text-white transition-colors cursor-pointer text-gray-700"
                          title={isEn ? 'Previous Month' : 'Bulan Sebelumnya'}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="text-center">
                          <h3 className="font-orbitron font-bold text-sm text-black uppercase tracking-wider flex items-center justify-center gap-2">
                            <span>{isEn ? monthNamesEn[calendarMonth] : monthNamesId[calendarMonth]} 2026</span>
                            {calendarMonth === currentMonthIdx && (
                              <span className="bg-red-600 text-white text-[8.5px] font-bold font-jakarta px-2 py-0.5 rounded-full uppercase">
                                {isEn ? 'Current' : 'Bulan Ini'}
                              </span>
                            )}
                          </h3>
                          <p className="text-[10.5px] text-gray-500 font-jakarta mt-0.5">
                            {eventsInActiveMonth.length > 0
                              ? (isEn ? `${eventsInActiveMonth.length} Events Scheduled` : `${eventsInActiveMonth.length} Event Terjadwal`)
                              : (isEn ? 'No events this month' : 'Tidak ada event bulan ini')}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setCalendarMonth((prev) => (prev < 11 ? prev + 1 : 0));
                            setCalendarSelectedDate(null);
                          }}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-black hover:text-white transition-colors cursor-pointer text-gray-700"
                          title={isEn ? 'Next Month' : 'Bulan Berikutnya'}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quick 12-Month Selector Pills */}
                      <div className="grid grid-cols-6 gap-1 pt-2 border-t border-gray-100">
                        {(isEn ? monthNamesEn : monthNamesId).map((mName, idx) => {
                          const hasEvents = eventItems.some((e: EventItem) => parseEventMonth(e.schedule) === idx);
                          const isSelected = calendarMonth === idx;
                          const isNow = idx === currentMonthIdx;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                setCalendarMonth(idx);
                                setCalendarSelectedDate(null);
                              }}
                              className={`py-1 px-1 rounded text-[10px] font-bold transition-all text-center cursor-pointer relative ${
                                isSelected
                                  ? 'bg-black text-white shadow-xs scale-105'
                                  : isNow
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                  : 'bg-gray-50 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <span>{mName.slice(0, 3)}</span>
                              {hasEvents && !isSelected && (
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-500 rounded-full ring-1 ring-white" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interactive Calendar Grid Table */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                      {/* Day of Week Header */}
                      <div className="grid grid-cols-7 bg-slate-900 text-white text-center py-2 text-[10px] font-bold font-orbitron uppercase tracking-wider">
                        {(isEn ? dayNamesEn : dayNamesId).map((dName, i) => (
                          <div key={i} className={i === 0 || i === 6 ? 'text-amber-400' : 'text-gray-200'}>
                            {dName}
                          </div>
                        ))}
                      </div>

                      {/* Day Cells Grid */}
                      <div className="grid grid-cols-7 gap-px bg-gray-200">
                        {/* Leading empty cells */}
                        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                          <div key={`empty-${i}`} className="bg-gray-50 min-h-[44px] sm:min-h-[50px] p-1 opacity-40" />
                        ))}

                        {/* Month Days */}
                        {Array.from({ length: daysInActiveMonth }).map((_, i) => {
                          const dayNum = i + 1;
                          const matchedDayEvents = eventsInActiveMonth.filter((ev: EventItem) =>
                            getEventDays(ev.schedule, calendarMonth).includes(dayNum)
                          );
                          const hasKen = matchedDayEvents.some((e: any) => Boolean(e.isKen));
                          const isSelectedDay = calendarSelectedDate === dayNum;

                          return (
                            <div
                              key={dayNum}
                              onClick={() => {
                                if (matchedDayEvents.length > 0) {
                                  setCalendarSelectedDate(isSelectedDay ? null : dayNum);
                                }
                              }}
                              className={`min-h-[44px] sm:min-h-[50px] p-1 flex flex-col justify-between transition-all ${
                                matchedDayEvents.length > 0 ? 'cursor-pointer hover:scale-105 hover:z-10' : ''
                              } ${
                                isSelectedDay
                                  ? 'bg-amber-200 ring-2 ring-amber-500 shadow-md font-bold'
                                  : matchedDayEvents.length > 0
                                  ? hasKen
                                    ? 'bg-amber-100 hover:bg-amber-200 border-amber-300 font-bold'
                                    : 'bg-red-100 hover:bg-red-200 border-red-300 font-bold'
                                  : 'bg-white hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-[11px] font-orbitron ${
                                  matchedDayEvents.length > 0 ? 'text-black font-bold' : 'text-gray-400'
                                }`}>
                                  {dayNum}
                                </span>
                                {hasKen && (
                                  <span className="text-[9px]" title="Karisma Event Nusantara">⭐</span>
                                )}
                              </div>

                              {/* Mini Dot Event Indicator */}
                              {matchedDayEvents.length > 0 && (
                                <div className="flex items-center gap-0.5 justify-center mt-1">
                                  {matchedDayEvents.slice(0, 3).map((ev: EventItem) => (
                                    <span
                                      key={ev.id}
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        ev.isKen ? 'bg-amber-500' : 'bg-red-500'
                                      }`}
                                      title={ev.title}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Category Filter Pills on Left Sidebar */}
                    <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        {isEn ? 'Filter by Category' : 'Filter Kategori Event'}
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { key: 'all', label: isEn ? `Semua (${eventItems.length})` : `Semua (${eventItems.length})` },
                          { key: 'ken', label: isEn ? `⭐ KEN (${totalKenCount})` : `⭐ KEN (${totalKenCount})` },
                          { key: 'budaya', label: isEn ? '🏛️ Budaya' : '🏛️ Budaya' },
                          { key: 'sport', label: isEn ? '🏇 Sport' : '🏇 Sport' },
                          { key: 'bahari', label: isEn ? '🌊 Bahari' : '🌊 Bahari' },
                        ].map((f) => (
                          <button
                            key={f.key}
                            onClick={() => setEventCategoryFilter(f.key)}
                            className={`w-full py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer text-center truncate ${
                              eventCategoryFilter === f.key
                                ? 'bg-black text-white shadow-xs'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-black hover:text-black'
                            }`}
                            title={f.label}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* PANEL KANAN: SEMUA EVENT TETAP 2 KOLOM PANEL            */}
                  {/* ======================================================== */}
                  <div className="flex-1 w-full space-y-4">
                    {/* Header Panel Kanan: Status Bulan / Tanggal Terpilih & View Mode Toggle */}
                    <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <h3 className="font-orbitron font-bold text-xs sm:text-sm uppercase text-black">
                          {eventViewMode === 'list'
                            ? (isEn ? `📋 All Scheduled Events (${calendarEventsToDisplay.length}):` : `📋 Seluruh Event Terjadwal (${calendarEventsToDisplay.length}):`)
                            : (calendarSelectedDate
                              ? (isEn ? `📅 Event Tanggal ${calendarSelectedDate} ${monthNamesEn[calendarMonth]} 2026:` : `📅 Event Tanggal ${calendarSelectedDate} ${monthNamesId[calendarMonth]} 2026:`)
                              : (isEn ? `🎪 Event Bulan ${monthNamesEn[calendarMonth]} 2026 (${eventsInActiveMonth.length}):` : `🎪 Event Bulan ${monthNamesId[calendarMonth]} 2026 (${eventsInActiveMonth.length}):`))}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Toggle Mode Bulanan vs Semua Event */}
                        <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-[10px] font-bold">
                          <button
                            type="button"
                            onClick={() => {
                              setEventViewMode('calendar');
                            }}
                            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                              eventViewMode === 'calendar'
                                ? 'bg-black text-white shadow-xs'
                                : 'text-gray-600 hover:text-black hover:bg-gray-200'
                            }`}
                          >
                            📅 {isEn ? 'Monthly' : 'Per Bulan'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEventViewMode('list');
                              setCalendarSelectedDate(null);
                            }}
                            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                              eventViewMode === 'list'
                                ? 'bg-black text-white shadow-xs'
                                : 'text-gray-600 hover:text-black hover:bg-gray-200'
                            }`}
                          >
                            📋 {isEn ? `All Events (${eventItems.length})` : `Semua Event (${eventItems.length})`}
                          </button>
                        </div>

                        {eventViewMode === 'calendar' && calendarSelectedDate && (
                          <button
                            onClick={() => setCalendarSelectedDate(null)}
                            className="text-xs text-amber-700 font-bold hover:underline cursor-pointer bg-amber-50 px-2 py-1 rounded-md border border-amber-200"
                          >
                            {isEn ? '← Show Month' : '← Bulan Ini'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 2 Kolom Event Cards di Sebelah Kanan */}
                    {calendarEventsToDisplay.length === 0 ? (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center text-gray-500 space-y-3">
                        <p className="text-xs sm:text-sm font-jakarta">
                          {isEn
                            ? `No events scheduled in ${monthNamesEn[calendarMonth]} 2026.`
                            : `Belum ada festival resmi yang dijadwalkan pada bulan ${monthNamesId[calendarMonth]} 2026.`}
                        </p>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setCalendarMonth(7); // Jump to August (Peak Season)
                              setCalendarSelectedDate(null);
                            }}
                            className="bg-black hover:bg-neutral-800 text-white font-jakarta font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
                          >
                            {isEn ? 'View Peak Festival Season (August 2026) →' : 'Lihat Musim Puncak Festival (Agustus 2026) →'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {calendarEventsToDisplay.map(renderEventCard)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* =================================================== */}

          {/* =================================================== */}
          {/* 5. FORMAI SUMATERA BARAT (AI ITINERARY BUILDER)      */}
          {/* =================================================== */}
                    {activeDrawer === 'formai' && (() => {
            const renderBookingSuite = () => (
              <div className={`shrink-0 text-white p-3.5 rounded-2xl space-y-2.5 shadow-sm transition-all ${
                bookingPartner === 'tiket'
                  ? 'bg-gradient-to-br from-[#0064D2] via-[#0050A8] to-[#002B66] border-2 border-[#FEDD00]/70'
                  : 'bg-gradient-to-br from-[#0194F3] via-[#0082DE] to-[#0264A6] border-2 border-white/40'
              }`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    {bookingPartner === 'tiket' ? (
                      <span className="bg-[#FEDD00] text-[#002B66] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0064D2]"></span>
                        <span>tiket.com</span>
                      </span>
                    ) : (
                      <span className="bg-white text-[#0194F3] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs flex items-center gap-1">
                        <span>✈️</span>
                        <span>traveloka</span>
                      </span>
                    )}
                    <span className="font-orbitron font-bold text-xs uppercase tracking-wide text-white">
                      {lang === 'en' ? 'Book Itinerary Logistics' : 'Pesan Logistik & Akomodasi Rute'}
                    </span>
                  </div>

                  {/* Partner Switcher Tabs */}
                  <div className="flex items-center bg-black/30 p-0.5 rounded-lg border border-white/20 text-[10px] font-bold font-jakarta">
                    <button
                      type="button"
                      onClick={() => setBookingPartner('tiket')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                        bookingPartner === 'tiket'
                          ? 'bg-[#FEDD00] text-[#002B66] shadow-sm font-black'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0064D2]"></span>
                      <span>tiket.com</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingPartner('traveloka')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                        bookingPartner === 'traveloka'
                          ? 'bg-white text-[#0194F3] shadow-sm font-black'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <span>✈️</span>
                      <span>Traveloka</span>
                    </button>
                  </div>
                </div>

                <p className={`text-xs font-jakarta leading-relaxed ${
                  bookingPartner === 'tiket' ? 'text-blue-100' : 'text-sky-100'
                }`}>
                  {lang === 'en'
                    ? 'Make your dream vacation a reality by booking hotels, car rentals in Padang, tours, and flights via our official partners Tiket.com or Traveloka.'
                    : 'Wujudkan rencana liburan impian ini dengan memesan hotel, rental mobil di Padang, tur wisata, dan tiket pesawat melalui Tiket.com atau Traveloka.'}
                </p>

                {bookingPartner === 'tiket' ? (
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <a
                      href={getTiketHotelUrl(null, dataStore?.appSettings)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FEDD00] hover:bg-[#FFE53B] text-[#002B66] py-2 px-2.5 rounded-lg font-jakarta font-black text-[11px] transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer text-center"
                    >
                      <span>🏨 {lang === 'en' ? 'Hotels Sumbar' : 'Cari Hotel'}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <a
                      href={getTiketCarRentalUrl(dataStore?.appSettings)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#00479E] hover:bg-[#003B85] text-white border border-white/25 py-2 px-2.5 rounded-lg font-jakarta font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer text-center"
                    >
                      <span>🚗 {lang === 'en' ? 'Car Rental' : 'Sewa Mobil'}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <a
                      href={getTiketFlightUrl(dataStore?.appSettings)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#00479E] hover:bg-[#003B85] text-white border border-white/25 py-2 px-2.5 rounded-lg font-jakarta font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer text-center"
                    >
                      <span>✈️ {lang === 'en' ? 'Flight to BIM' : 'Tiket Pesawat'}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <a
                      href={getTiketActivitiesUrl(null, dataStore?.appSettings)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#00479E] hover:bg-[#003B85] text-white border border-white/25 py-2 px-2.5 rounded-lg font-jakarta font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer text-center"
                    >
                      <span>🎟️ {lang === 'en' ? 'Attractions' : 'Tur & Atraksi'}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <a
                      href="https://www.traveloka.com/id-id/hotel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-sky-50 text-[#0194F3] py-2 px-2.5 rounded-lg font-jakarta font-black text-[11px] transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer text-center"
                    >
                      <span>🏨 {lang === 'en' ? 'Hotels' : 'Cek Hotel'}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <a
                      href="https://www.traveloka.com/id-id/car-rental"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0264A6]/80 hover:bg-[#0264A6] text-white border border-white/30 py-2 px-2.5 rounded-lg font-jakarta font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer text-center"
                    >
                      <span>🚗 {lang === 'en' ? 'Car Rental' : 'Rental Mobil'}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <a
                      href="https://www.traveloka.com/id-id/flight/to/Padang.PDG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0264A6]/80 hover:bg-[#0264A6] text-white border border-white/30 py-2 px-2.5 rounded-lg font-jakarta font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer text-center"
                    >
                      <span>✈️ {lang === 'en' ? 'Flight BIM' : 'Tiket Pesawat'}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <a
                      href="https://www.traveloka.com/id-id/activities"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0264A6]/80 hover:bg-[#0264A6] text-white border border-white/30 py-2 px-2.5 rounded-lg font-jakarta font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer text-center"
                    >
                      <span>🎟️ {lang === 'en' ? 'Activities' : 'Tur & Tiket'}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                )}
              </div>
            );

            const renderItineraryFormFields = () => (
              <div className="space-y-4">
                {/* Target Event Priority Banner */}
                {itineraryForm.targetEvent && (
                  <div className="p-3 bg-amber-50 border-2 border-amber-400 rounded-xl space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-jakarta font-black uppercase text-amber-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
                        {lang === 'en' ? '🎯 Target Event Selected' : '🎯 Event Prioritas Terpilih'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setItineraryForm((prev: any) => ({ ...prev, targetEvent: null }))}
                        className="text-[10px] text-red-600 hover:text-red-800 font-bold underline cursor-pointer"
                      >
                        {lang === 'en' ? 'Remove' : 'Hapus Event'}
                      </button>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {itineraryForm.targetEvent.imageUrl && (
                        <img
                          src={itineraryForm.targetEvent.imageUrl}
                          alt={itineraryForm.targetEvent.title}
                          className="w-12 h-12 object-cover rounded-lg shrink-0 border border-amber-200"
                        />
                      )}
                      <div className="min-w-0">
                        <h4 className="font-orbitron font-bold text-xs text-black truncate">
                          {lang === 'en' && itineraryForm.targetEvent.titleEn ? itineraryForm.targetEvent.titleEn : itineraryForm.targetEvent.title}
                        </h4>
                        <p className="font-jakarta text-[10px] text-amber-800 font-semibold flex items-center gap-1 truncate">
                          <Calendar className="w-3 h-3 shrink-0" />
                          {lang === 'en' && itineraryForm.targetEvent.scheduleEn ? itineraryForm.targetEvent.scheduleEn : itineraryForm.targetEvent.schedule}
                        </p>
                        <p className="font-jakarta text-[10px] text-gray-600 truncate">
                          📍 {lang === 'en' && itineraryForm.targetEvent.locationNameEn ? itineraryForm.targetEvent.locationNameEn : (itineraryForm.targetEvent.locationName || itineraryForm.targetEvent.location || itineraryForm.targetEvent.regency)}
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] font-jakarta text-amber-950/80 italic border-t border-amber-200/80 pt-1">
                      {lang === 'en'
                        ? '✨ UNI MALA AI will build an itinerary prioritizing this event as the primary highlight.'
                        : '✨ UNI MALA AI akan menyusun rute perjalanan searah yang memprioritaskan kehadiran Anda pada event ini.'}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                    {translations[lang].fieldDaysForm}
                  </label>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {[1, 2, 3, 4, 5, 7].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => updateForm(['durasiHari'], num)}
                        className={`flex-1 py-1.5 rounded text-xs font-orbitron font-bold transition-all cursor-pointer ${
                          itineraryForm.durasiHari === num
                            ? 'bg-black text-white shadow-xs'
                            : 'bg-white border border-gray-200 text-black hover:border-black'
                        }`}
                      >
                        {num} {lang === 'en' ? 'D' : 'H'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tanggal Mulai Perjalanan (Pilihan) & Deteksi Event Otomatis */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black">
                      📅 {translations[lang].fieldTravelDate}
                    </label>
                    {itineraryForm.waktuKunjungan?.tanggalMulai && (
                      <button
                        type="button"
                        onClick={() => updateForm(['waktuKunjungan'], { tanggalMulai: '', tanggalSelesai: '' })}
                        className="text-[10px] text-red-500 font-bold hover:underline cursor-pointer"
                      >
                        {lang === 'en' ? 'Clear Date' : 'Hapus Tanggal'}
                      </button>
                    )}
                  </div>
                  <input
                    type="date"
                    value={itineraryForm.waktuKunjungan?.tanggalMulai || ''}
                    onChange={(e) => {
                      const start = e.target.value;
                      let end = '';
                      if (start) {
                        const d = new Date(start);
                        d.setDate(d.getDate() + (itineraryForm.durasiHari - 1));
                        end = d.toISOString().split('T')[0];
                      }
                      updateForm(['waktuKunjungan'], { tanggalMulai: start, tanggalSelesai: end });
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black cursor-pointer"
                  />
                  <p className="text-[10px] text-gray-500 font-jakarta mt-1">
                    {translations[lang].fieldTravelDateHint}
                  </p>

                  {/* Smart Event Matching Notice if date chosen */}
                  {(() => {
                    const startStr = itineraryForm.waktuKunjungan?.tanggalMulai;
                    if (!startStr) return null;
                    
                    const dateObj = new Date(startStr);
                    const monthIndex = dateObj.getMonth();
                    const monthNamesId = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                    const selectedMonth = monthNamesId[monthIndex];

                    const matchedEvents = eventItems.filter((ev: EventItem) => {
                      const sched = (ev.schedule || (ev as any).date || '').toLowerCase();
                      return sched.includes(selectedMonth.toLowerCase());
                    });

                    if (matchedEvents.length === 0) return null;

                    return (
                      <div className="mt-2 p-2.5 bg-yellow-50 border border-yellow-200 rounded-lg text-xs font-jakarta space-y-1">
                        <span className="font-bold text-amber-900 text-[11px] flex items-center gap-1">
                          {translations[lang].badgeEventMatched}
                        </span>
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {matchedEvents.map((ev: EventItem) => (
                            <span key={ev.id} className="inline-block bg-white text-slate-800 border border-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs">
                              🎪 {ev.title} {ev.isKen ? '⭐ [KEN]' : ''} ({ev.schedule || selectedMonth})
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                      {translations[lang].fieldTravelerType}
                    </label>
                    <select
                      value={itineraryForm.profilWisatawan.kategori}
                      onChange={(e) => updateForm(['profilWisatawan', 'kategori'], e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black"
                    >
                      <option value="individu">{translations[lang].optSolo}</option>
                      <option value="pasangan">{translations[lang].optCouple}</option>
                      <option value="keluarga_anak">{translations[lang].optFamilyKids}</option>
                      <option value="lansia">{translations[lang].optFamilyElders}</option>
                      <option value="rombongan">{translations[lang].optGroup}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                      {translations[lang].fieldNumPeople}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={itineraryForm.profilWisatawan.jumlahOrang}
                      onChange={(e) => updateForm(['profilWisatawan', 'jumlahOrang'], parseInt(e.target.value) || 1)}
                      className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                    {translations[lang].fieldInterestsForm}
                  </label>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {[
                      { val: 'pantai', label: lang === 'en' ? 'Beaches' : 'Pantai' },
                      { val: 'tempat_wisata', label: lang === 'en' ? 'Tourist Attractions' : 'Tempat Wisata' },
                      { val: 'kuliner_mewah', label: lang === 'en' ? 'Luxury Culinary' : 'Kuliner Mewah' },
                      { val: 'belanja', label: lang === 'en' ? 'Shopping' : 'Belanja' },
                      { val: 'festival', label: lang === 'en' ? 'Festivals' : 'Festival' },
                      { val: 'kuliner', label: lang === 'en' ? 'Culinary' : 'Kuliner' },
                      { val: 'tur_wisata', label: lang === 'en' ? 'Guided Tours' : 'Tur Wisata' },
                      { val: 'petualangan_alam', label: lang === 'en' ? 'Nature & Adventure' : 'Petualangan Alam' },
                      { val: 'hidden_gems', label: lang === 'en' ? 'Hidden Gems' : 'Hidden Gems' },
                      { val: 'spa_relaksasi', label: lang === 'en' ? 'Spa & Relaxation' : 'Spa dan Relaksasi' },
                      { val: 'seni_budaya', label: lang === 'en' ? 'Arts & Culture' : 'Seni dan Budaya' },
                      { val: 'akses_difabel', label: lang === 'en' ? 'Disability Access' : 'Akses Difable' },
                      { val: 'ramah_anak', label: lang === 'en' ? 'Kid-Friendly' : 'Ramah Anak' }
                    ].map((minat) => {
                      const isSelected = itineraryForm.preferensiMinat.kategoriWisata.includes(minat.val);
                      return (
                        <button
                          key={minat.val}
                          type="button"
                          onClick={() => {
                            const list = itineraryForm.preferensiMinat.kategoriWisata;
                            updateForm(['preferensiMinat', 'kategoriWisata'], isSelected ? list.filter((i: string) => i !== minat.val) : [...list, minat.val]);
                          }}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-jakarta transition-all cursor-pointer capitalize ${
                            isSelected
                              ? 'bg-black text-white font-bold shadow-2xs'
                              : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                          }`}
                        >
                          {isSelected ? `✓ ${minat.label}` : minat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                      {translations[lang].fieldActivityLevel}
                    </label>
                    <select
                      value={itineraryForm.preferensiMinat.tingkatAktivitas}
                      onChange={(e) => updateForm(['preferensiMinat', 'tingkatAktivitas'], e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black"
                    >
                      <option value="santai">{translations[lang].optRelaxed}</option>
                      <option value="sedang">{translations[lang].optModerate}</option>
                      <option value="ekstrem">{translations[lang].optExtreme}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                      {translations[lang].fieldBudgetForm}
                    </label>
                    <select
                      value={itineraryForm.anggaran.rentang}
                      onChange={(e) => updateForm(['anggaran', 'rentang'], e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black"
                    >
                      <option value="hemat">{translations[lang].optBudget}</option>
                      <option value="menengah">{translations[lang].optStandard}</option>
                      <option value="mewah">{translations[lang].optPremium}</option>
                    </select>
                  </div>
                </div>

                {/* Kebutuhan Khusus / Alergi Makanan / Catatan Tambahan */}
                <div>
                  <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                    {lang === 'en' ? 'Special Needs / Food Allergies / Notes' : 'Kebutuhan Khusus / Alergi Makanan / Catatan'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'en' ? 'e.g. Shellfish allergy, wheelchair access, prefer non-spicy food...' : 'Contoh: alergi udang, butuh akses kursi roda, tidak suka pedas...'}
                    value={itineraryForm.kebutuhanKhusus?.catatanKhusus ?? (itineraryForm.kebutuhanKhusus?.alergiMakanan?.join(', ') || '')}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateForm(['kebutuhanKhusus'], {
                        ...itineraryForm.kebutuhanKhusus,
                        catatanKhusus: val,
                        alergiMakanan: val.split(',').map((s: string) => s.trim()).filter(Boolean)
                      });
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            );

            return (
              <div className="w-full h-full min-h-0">
                {!aiResponse ? (
                  /* ============================================================== */
                  /* STATE 1: SEBELUM GENERATE (Single Column Form Lapang & Elegan) */
                  /* ============================================================== */
                  <div className="max-w-2xl mx-auto w-full space-y-5 py-2">
                    <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-black text-white p-5 rounded-2xl shadow-sm space-y-2 border border-neutral-800">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                        <span className="font-orbitron font-bold text-xs uppercase tracking-widest text-amber-300">
                          UNI MALA AI ITINERARY BUILDER
                        </span>
                      </div>
                      <h3 className="font-orbitron font-bold text-base sm:text-lg text-white">
                        {lang === 'en' ? 'Create Your Personalized West Sumatra Itinerary' : 'Rancang Rencana Liburan Impian di Sumatera Barat'}
                      </h3>
                      <p className="font-jakarta text-xs text-gray-300 leading-relaxed">
                        {lang === 'en'
                          ? 'Select your duration, dates, travel interests, and budget. UNI MALA AI will craft a smart, directional day-by-day travel plan complete with interactive map routing and authentic culinary tips.'
                          : 'Pilih durasi liburan, tanggal, preferensi minat, dan estimasi anggaran. UNI MALA AI akan menyusun rute perjalanan searah yang efisien, lengkap dengan peta interaktif dan rekomendasi kuliner khas Minangkabau.'}
                      </p>
                    </div>

                    {aiError && (
                      <div className="p-3 bg-red-50 text-red-700 text-xs font-jakarta rounded-xl border border-red-200">
                        {aiError}
                      </div>
                    )}

                    <form onSubmit={handleGenerateItinerary} className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-200 shadow-xs">
                      {renderItineraryFormFields()}
                      <button
                        type="submit"
                        disabled={isGenerating}
                        className="w-full bg-black text-white py-3 rounded-xl font-jakarta font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>{translations[lang].btnGenerating}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span>{translations[lang].btnGenerate}</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* ============================================================== */
                  /* STATE 2: SETELAH GENERATE -> 3 KOLOM BERDAMPINGAN (DESKTOP)    */
                  /* (KOLOM 1: PREFERENSI, KOLOM 2: HASIL ITINERARY, KOLOM 3: PETA) */
                  /* ============================================================== */
                  <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr_1.35fr] gap-4 h-full min-h-0">
                    {/* KOLOM 1 (PALING KIRI): PETA RUTE INTERAKTIF & LOGISTIK PEMESANAN (LEBAR SAMA DENGAN PREFERENSI) */}
                    <div className="order-2 lg:order-1 flex flex-col h-full min-h-0 space-y-3">
                      {/* Peta Rute Interaktif */}
                      <div className="flex-1 min-h-[300px] overflow-hidden rounded-2xl border border-gray-200 shadow-xs bg-gray-50 flex flex-col">
                        <ItineraryMap
                          aiResponse={aiResponse}
                          destinations={destinations}
                          cultureItems={cultureItems}
                          culinaryItems={culinaryItems}
                          eventItems={eventItems}
                          lang={lang}
                          fullHeight={true}
                        />
                      </div>

                      {/* Booking Logistics Suite */}
                      {renderBookingSuite()}
                    </div>

                    {/* KOLOM 2 (TENGAH): INPUT PREFERENSI WISATAWAN (LEBAR SAMA PERSIS DENGAN PETA) */}
                    <div className="order-3 lg:order-2 flex flex-col h-full min-h-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                      <div className="px-4 py-3 bg-neutral-900 text-white flex items-center justify-between shrink-0 border-b border-neutral-800">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">⚙️</span>
                          <div>
                            <h4 className="font-orbitron font-bold text-xs uppercase tracking-wider text-white">
                              {lang === 'en' ? 'Traveler Preferences' : 'Preferensi Wisatawan'}
                            </h4>
                            <p className="text-[10px] text-gray-400 font-jakarta">
                              {lang === 'en' ? 'Adjust parameters & regenerate' : 'Sesuaikan & perbarui rute'}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAiResponse(null)}
                          className="text-[10px] text-gray-400 hover:text-white underline cursor-pointer font-jakarta"
                          title={lang === 'en' ? 'Start new plan from scratch' : 'Buat rencana baru dari awal'}
                        >
                          {lang === 'en' ? 'Reset' : 'Ulang'}
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {aiError && (
                          <div className="p-2.5 bg-red-50 text-red-700 text-xs font-jakarta rounded-lg border border-red-200">
                            {aiError}
                          </div>
                        )}
                        <form id="itinerary-pref-form-desktop" onSubmit={handleGenerateItinerary} className="space-y-4">
                          {renderItineraryFormFields()}
                        </form>
                      </div>

                      <div className="p-3 bg-gray-50 border-t border-gray-200 shrink-0">
                        <button
                          form="itinerary-pref-form-desktop"
                          type="submit"
                          disabled={isGenerating}
                          className="w-full bg-black text-white py-2.5 px-3 rounded-xl font-jakarta font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                        >
                          {isGenerating ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>{translations[lang].btnGenerating}</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                              <span>{lang === 'en' ? 'Update Itinerary' : 'Perbarui Rencana Wisata'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* KOLOM 3 (KANAN): HASIL ITINERARY RESMI */}
                    <div className="order-1 lg:order-3 flex flex-col h-full min-h-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                      {/* Header Itinerary Title & A4 Print Button */}
                      <div className="p-4 bg-gradient-to-r from-neutral-950 via-black to-neutral-900 text-white shrink-0 space-y-2 border-b border-neutral-800">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                            <span className="font-orbitron font-bold text-[10px] uppercase tracking-widest text-amber-300">
                              {lang === 'en' ? 'Official Trip Plan' : 'Rencana Wisata Resmi'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handlePrintA4Itinerary}
                            disabled={isDownloadingPdf}
                            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-1.5 px-3 rounded-lg font-jakarta font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-60"
                            title={translations[lang].btnPrintA4}
                          >
                            {isDownloadingPdf ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>{lang === 'en' ? 'Downloading PDF...' : 'Mengunduh PDF...'}</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>{translations[lang].btnPrintA4}</span>
                              </>
                            )}
                          </button>
                        </div>

                        <h3 className="font-orbitron font-bold text-sm sm:text-base uppercase text-white leading-snug">
                          {aiResponse.title}
                        </h3>
                        <p className="font-jakarta text-[11px] text-gray-300 leading-relaxed line-clamp-2">
                          {aiResponse.summary}
                        </p>
                      </div>

                      {/* Scrollable Schedule & Days */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
                        <div className="space-y-3.5">
                          {aiResponse.itinerary.map((day) => (
                            <div key={day.day} className="p-3.5 border border-gray-200 rounded-xl space-y-2.5 bg-white shadow-2xs hover:border-gray-300 transition-colors">
                              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                <span className="bg-black text-white font-orbitron font-bold text-[10px] uppercase px-2 py-0.5 rounded">
                                  HARI {day.day}
                                </span>
                                <h4 className="font-orbitron font-bold text-xs uppercase text-black truncate ml-2">
                                  {day.title}
                                </h4>
                              </div>

                              <div className="space-y-2">
                                {day.activities.map((act, i) => (
                                  <div key={i} className="text-xs font-jakarta space-y-1 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                                    <div className="flex items-center justify-between font-bold text-black text-[11px]">
                                      <span>⏰ {act.time} — {act.location}</span>
                                    </div>
                                    <p className="text-gray-600 text-[11px] leading-relaxed">{act.activity}</p>
                                    {act.tips && (
                                      <p className="text-[10.5px] text-amber-800 italic bg-amber-50/80 p-1.5 rounded border border-amber-100 flex items-start gap-1">
                                        <span>💡</span>
                                        <span>{act.tips}</span>
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>

                              {day.culinaryRecommendation && (
                                <div className="pt-2 border-t border-gray-100 text-[11px] font-jakarta text-amber-950 bg-amber-50/90 p-2.5 rounded-lg flex items-start gap-1.5 border border-amber-200/60">
                                  <span className="shrink-0">🍲</span>
                                  <div>
                                    <strong className="font-bold">Rekomendasi Kuliner: </strong>
                                    <span>{day.culinaryRecommendation}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Kearifan Lokal & Etika Minangkabau */}
                        {aiResponse.localTips && aiResponse.localTips.length > 0 && (
                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs font-jakarta">
                            <h4 className="font-bold text-black uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                              <span>🏛️</span>
                              <span>Kearifan Lokal & Etika Minangkabau</span>
                            </h4>
                            <ul className="space-y-1 list-disc list-inside text-gray-700 text-[11px] leading-relaxed">
                              {aiResponse.localTips.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* =================================================== */}
          {/* 5.5 CHATBOT TANYA UNI MALA GUIDE (DEDICATED)       */}
          {/* =================================================== */}
          {activeDrawer === 'chat' && (
            <div className="flex flex-col flex-1 h-full min-h-0 border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-inner">
              {/* Chat Messages Log */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar min-h-0">
                {chatHistory.map((item, index) => (
                  <div
                    key={index}
                    className={`flex ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-jakarta leading-relaxed ${
                        item.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                          : 'bg-white border border-gray-200 text-gray-800 shadow-xs rounded-bl-none'
                      }`}
                    >
                      {item.sender === 'ai' && (
                        <div className="flex items-center gap-1.5 font-orbitron font-bold text-[10px] text-blue-600 uppercase mb-1.5 border-b border-gray-100 pb-1">
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          UNI MALA GUIDE
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{item.text}</p>
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-xl text-xs font-jakarta text-gray-500 flex items-center gap-2 shadow-xs">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                      <span>{lang === 'en' ? 'Uni Mala Guide is thinking...' : 'Uni Mala Guide sedang mengetik respon...'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleChatSubmit} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  placeholder={translations[lang].chatInputPlaceholder}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg p-2.5 text-xs font-jakarta text-black focus:outline-none focus:border-blue-600"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatMessage.trim()}
                  className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* =================================================== */}
          {/* 6. SAVED FAVORITES DRAWER                          */}
          {/* =================================================== */}
          {activeDrawer === 'saved' && (
            <div className="space-y-4">
              {savedIds.length === 0 ? (
                <div className="py-16 text-center text-gray-400 space-y-2">
                  <Bookmark className="w-10 h-10 mx-auto text-gray-300 stroke-1" />
                  <p className="font-jakarta font-medium text-sm text-black uppercase tracking-wider">
                    {lang === 'en' ? 'No Saved Items' : 'Belum Ada Destinasi Disimpan'}
                  </p>
                  <p className="font-jakarta text-xs text-gray-400 max-w-xs mx-auto">
                    {translations[lang].savedEmpty}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedDestinationsList.map(dest => (
                    <div key={dest.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col justify-between shadow-xs">
                      <div>
                        <div className="h-28 w-full overflow-hidden bg-gray-100">
                          <img src={dest.imageUrl} alt={dest.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3 space-y-1">
                          <span className="bg-black text-white text-[9px] font-jakarta font-bold px-2 py-0.5 rounded uppercase">
                            {dest.category}
                          </span>
                          <h4 className="font-orbitron font-bold text-xs text-black pt-1">{dest.title}</h4>
                          <p className="font-jakarta text-[11px] text-gray-500">{dest.regency}</p>
                        </div>
                      </div>
                      <div className="p-2.5 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={() => onToggleSave(dest.id, dest.title)}
                          className="text-[11px] text-red-500 font-jakarta font-bold hover:underline cursor-pointer"
                        >
                          {lang === 'en' ? 'Remove' : 'Hapus'}
                        </button>
                      </div>
                    </div>
                  ))}

                  {savedCultureList.map(cul => (
                    <div key={cul.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col justify-between shadow-xs">
                      <div>
                        <div className="h-28 w-full overflow-hidden bg-gray-100">
                          <img src={cul.imageUrl} alt={cul.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3 space-y-1">
                          <span className="bg-gray-100 text-black text-[9px] font-jakarta font-bold px-2 py-0.5 rounded uppercase">
                            {lang === 'en' ? 'Culture' : 'Seni & Budaya'}
                          </span>
                          <h4 className="font-orbitron font-bold text-xs text-black pt-1">{cul.title}</h4>
                          <p className="font-jakarta text-[11px] text-gray-500">{cul.category}</p>
                        </div>
                      </div>
                      <div className="p-2.5 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={() => onToggleSave(cul.id, cul.title)}
                          className="text-[11px] text-red-500 font-jakarta font-bold hover:underline cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* 7. ADMIN MANAGEMENT DRAWER                          */}
          {/* =================================================== */}
          {activeDrawer === 'admin' && (
            <AdminPanel dataStore={dataStore} />
          )}

          {/* =================================================== */}
          {/* 8. HOT INFO & UPDATE TERBARU (LEFT DRAWER)        */}
          {/* =================================================== */}
          {activeDrawer === 'hotinfo' && (
            <div className="space-y-6">
              {/* Category Filter Pills & Refresh Button */}
              <div className="space-y-2 pb-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider font-jakarta">
                    {lang === 'en' ? 'News Category' : 'Kategori Berita'}
                  </span>
                  <button
                    onClick={handleRefreshHotInfo}
                    disabled={isFetchingHotInfo}
                    className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-gray-200 text-[11px] font-bold font-jakarta transition-colors ${
                      isFetchingHotInfo ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'bg-white hover:bg-gray-100 text-black cursor-pointer shadow-2xs'
                    }`}
                    title={lang === 'en' ? 'Refresh Live News' : 'Perbarui Berita'}
                  >
                    <RefreshCw className={`w-3 h-3 ${isFetchingHotInfo ? 'animate-spin text-gray-400' : ''}`} />
                    <span>{lang === 'en' ? 'Refresh' : 'Muat Ulang'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-jakarta w-full">
                  {(() => {
                    const rawList = (dataStore.hotInfoItems && dataStore.hotInfoItems.length > 0 ? dataStore.hotInfoItems : HOT_INFO_ITEMS)
                      .filter((i: any) => isWithinLast6Months(i.date || i.createdAt));
                    const dedupedList = deduplicateNewsItems(rawList);
                    const dynamicCats = dedupedList.map((i: any) => i.category).filter(Boolean);
                    const uniqueCategories = Array.from(new Set([
                      'Semua',
                      'Pariwisata Sumatera Barat',
                      'Pariwisata Indonesia',
                      ...dynamicCats
                    ]));

                    const getCategoryLabel = (cat: string) => {
                      if (lang !== 'en') return cat;
                      if (cat === 'Semua') return 'All Updates';
                      if (cat === 'Pariwisata Sumatera Barat') return 'West Sumatra Tourism';
                      if (cat === 'Pariwisata Indonesia') return 'Indonesian Tourism';
                      if (cat === 'Pariwisata Nasional') return 'National Tourism';
                      return cat;
                    };

                    return uniqueCategories.map((cat: string) => {
                      const isSelected = hotInfoCategory === cat;
                      const isSumbar = cat === 'Pariwisata Sumatera Barat';
                      const isIndo = cat === 'Pariwisata Indonesia';
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setHotInfoCategory(cat);
                            setShowAllNewsArchive(false);
                          }}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                            isSelected
                              ? isSumbar ? 'bg-amber-600 text-white shadow-xs' : 'bg-red-600 text-white shadow-xs'
                              : isSumbar ? 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isSumbar && <span>🏔️</span>}
                          {isIndo && <span>🇮🇩</span>}
                          <span>{getCategoryLabel(cat)}</span>
                        </button>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Side-by-Side: Real-time Weather & Marine Waves + Travel Advisory */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch font-jakarta">
                {/* 1. Live Weather & Marine Swell Panel */}
                <WeatherWidget lang={lang} />

                {/* 2. Smart Travel Advisory & Route Status Panel */}
                <div className="bg-gradient-to-br from-blue-950/90 via-slate-900/90 to-indigo-950/90 text-white p-4 rounded-2xl border border-blue-500/20 shadow-xl space-y-3 font-jakarta h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-white/10 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                            <span>{lang === 'en' ? 'Live Travel Advisory & Routes' : 'Info Jalur Transportasi & Rute'}</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          </h4>
                          <p className="text-[10px] text-gray-400">
                            {lang === 'en' ? 'West Sumatra Arterial Watchdog' : 'Pantauan Jalur Wisata Utama Sumbar'}
                          </p>
                        </div>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-black px-2 py-0.5 rounded-full">
                        {lang === 'en' ? 'ALL MAIN ROUTES OPEN & SAFE' : 'JALUR UTAMA AMAN & NORMAL'}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px]">Jalur Lembah Anai</span>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded">Lancar</span>
                        </div>
                        <p className="text-[10px] text-gray-300 leading-tight">
                          Akses Padang – Bukittinggi beroperasi normal untuk seluruh kendaraan roda dua dan empat.
                        </p>
                      </div>

                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px]">Kelok 9 & Harau</span>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded">Optimal</span>
                        </div>
                        <p className="text-[10px] text-gray-300 leading-tight">
                          Jalur wisata Payakumbuh – Riau lancar dan nyaman untuk perjalanan darat.
                        </p>
                      </div>

                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px]">Status Gunung Api</span>
                          <span className="text-[9px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded">Level II / Waspada</span>
                        </div>
                        <p className="text-[10px] text-gray-300 leading-tight">
                          Zona wisata dan kota Bukittinggi/Tanah Datar di luar radius aman 4.5km beroperasi normal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {(() => {
                const allHotInfo = (dataStore.hotInfoItems && dataStore.hotInfoItems.length > 0 ? dataStore.hotInfoItems : HOT_INFO_ITEMS);
                
                const categoryFiltered = allHotInfo.filter((item: any) => {
                  if (hotInfoCategory === 'Semua') return true;
                  
                  const isExplicitSumbar = item.category === 'Pariwisata Sumatera Barat' || item.tag === 'Sumbar';
                  const isExplicitNational = item.category === 'Pariwisata Indonesia' || item.category === 'Pariwisata Nasional' || item.tag === 'Indonesia';

                  if (hotInfoCategory === 'Pariwisata Sumatera Barat') {
                    if (isExplicitNational) return false;
                    return isExplicitSumbar || isSumbarTopic(item.title);
                  }
                  
                  if (hotInfoCategory === 'Pariwisata Indonesia' || hotInfoCategory === 'Pariwisata Nasional') {
                    if (isExplicitSumbar) return false;
                    return isExplicitNational || !isSumbarTopic(item.title);
                  }
                  
                  return item.category === hotInfoCategory;
                });

                const dedupedList = deduplicateNewsItems(categoryFiltered)
                  .sort((a: any, b: any) => {
                    const timeA = parseNewsTimestamp(a.date, a.createdAt);
                    const timeB = parseNewsTimestamp(b.date, b.createdAt);
                    return timeB - timeA;
                  });

                const activeList = showAllNewsArchive
                  ? dedupedList
                  : dedupedList.filter((item: any) => isWithinLast6Months(item.date || item.createdAt));

                const totalCount = dedupedList.length;
                const hasMoreThan10 = totalCount > 10;
                const displayedList = (hasMoreThan10 && !showAllNewsArchive)
                  ? activeList.slice(0, 10)
                  : activeList;
                const hiddenCount = Math.max(0, totalCount - displayedList.length);
                const isEn = lang === 'en';

                if (activeList.length === 0) {
                  return (
                    <div className="col-span-full text-center py-12 text-gray-500 font-jakarta text-xs bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      {isEn ? 'No recent news updates found in this category.' : 'Tidak ada update berita pariwisata untuk kategori ini.'}
                    </div>
                  );
                }

                return (
                  <div className="space-y-6">
                    {/* 2-Column News Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
                      {displayedList.map((item: any, idx: number) => {
                        const categoryDisplay = isEn ? (item.categoryEn || (item.category === 'Pariwisata Sumatera Barat' ? 'West Sumatra Tourism' : 'Indonesian Tourism')) : (item.category || 'Pariwisata Indonesia');
                        const hasExternalUrl = Boolean(item.sourceUrl && (item.sourceUrl.startsWith('http://') || item.sourceUrl.startsWith('https://')));
                        const primaryLink = hasExternalUrl ? item.sourceUrl! : (item.actionUrl?.startsWith('http') ? item.actionUrl : '');
                        const publisherDomain = item.sourceDomain || item.sourceName || (hasExternalUrl ? (item.tag === 'Sumbar' ? 'sumbar.antaranews.com' : 'travel.kompas.com') : (isEn ? 'Official Tourism Sumbar' : 'Rilis Resmi Pariwisata Sumbar'));
                        const mainFavicon = item.sourceIcon || (hasExternalUrl ? getPublisherFavicon(item.sourceDomain, item.sourceName) : '/favicon.ico');
                        const timeAgoText = item.timeAgo || (isEn && item.dateEn ? item.dateEn : item.date);
                        const isOlderThan6M = !isWithinLast6Months(item.date || item.createdAt);
                        const displayDescription = isEn && item.descriptionEn ? item.descriptionEn : item.description;

                        return (
                          <article
                            key={item.id || idx}
                            style={{ animationDelay: `${idx * 40}ms` }}
                            className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col justify-between shadow-xs hover:border-black transition-all font-jakarta animate-content-stagger group"
                          >
                            <div>
                              {/* News Card Banner Image: Hanya tampil jika memang diupload oleh pengguna */}
                              {Boolean((item as any).isUserUploadedImage || (item.imageUrl && item.imageUrl.startsWith('data:image/'))) && item.imageUrl && (
                                <div
                                  onClick={() => {
                                    if (hasExternalUrl && primaryLink) {
                                      window.open(primaryLink, '_blank', 'noopener,noreferrer');
                                    } else {
                                      onSelectNews?.(item);
                                    }
                                  }}
                                  className="relative h-36 w-full overflow-hidden bg-gray-100 cursor-pointer"
                                >
                                  <img
                                    src={item.imageUrl}
                                    alt={getNewsDisplayTitle(item, lang)}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                    onError={(e: any) => { (e.target as HTMLElement).style.display = 'none'; }}
                                  />
                                </div>
                              )}

                              {/* Card Content: Title, Publisher, Excerpt */}
                              <div className="p-3.5 space-y-2">
                                {/* Publisher Brand Row (Favicon + Domain Name + Category + HOT + Archive Tag) */}
                                <div className="flex items-center gap-2 flex-wrap">
                                  <img
                                    src={mainFavicon}
                                    alt={item.sourceName || 'Publisher'}
                                    className="w-4 h-4 rounded-xs object-contain shrink-0 bg-white border border-gray-200 p-0.5 shadow-2xs"
                                    onError={(e: any) => { e.target.style.display = 'none'; }}
                                  />
                                  <span className="text-xs font-bold text-gray-800 hover:text-blue-600 transition-colors">
                                    {publisherDomain}
                                  </span>
                                  <span className="text-gray-300">•</span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                    item.tag === 'Sumbar' || item.category === 'Pariwisata Sumatera Barat'
                                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                      : 'bg-red-50 text-red-800 border border-red-200'
                                  }`}>
                                    {categoryDisplay}
                                  </span>
                                  {(item.tag === 'Penting' || item.isUrgent) && (
                                    <span className="bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-2xs">
                                      <Flame className="w-2.5 h-2.5 text-yellow-300 fill-current" />
                                      <span>HOT</span>
                                    </span>
                                  )}
                                  {isOlderThan6M && (
                                    <span className="bg-neutral-100 text-neutral-700 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-neutral-300 shadow-2xs">
                                      <Archive className="w-2.5 h-2.5 text-neutral-500" />
                                      <span>{isEn ? 'Archive' : 'Arsip'}</span>
                                    </span>
                                  )}
                                </div>

                                {/* Main Headline */}
                                <h3
                                  onClick={() => {
                                    if (hasExternalUrl && primaryLink) {
                                      window.open(primaryLink, '_blank', 'noopener,noreferrer');
                                    } else {
                                      onSelectNews?.(item);
                                    }
                                  }}
                                  className="font-orbitron font-bold text-black uppercase tracking-wide text-xs sm:text-sm leading-snug hover:text-blue-600 transition-colors cursor-pointer"
                                >
                                  {getNewsDisplayTitle(item, lang)}
                                </h3>

                                {/* Excerpt: Ukuran font persis sama dengan deskripsi item kuliner (text-[11px] font-jakarta text-gray-600 leading-relaxed) */}
                                {displayDescription && (
                                  <p className="font-jakarta text-gray-600 text-[11px] leading-relaxed line-clamp-3">
                                    {displayDescription.split('\n\n')[0]}
                                  </p>
                                )}

                                {/* Meta Details: Time & Location */}
                                <div className="flex items-center gap-2 flex-wrap text-[10px] text-gray-400 font-jakarta font-semibold uppercase tracking-wider pt-0.5">
                                  <span>{timeAgoText}</span>
                                  {item.locationName && (
                                    <>
                                      <span className="text-gray-300">•</span>
                                      <span className="flex items-center gap-1 text-gray-500">
                                        <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                                        {item.locationName.split(',')[0]}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Bottom Grey Action Bar / Column: External Source vs Read Release */}
                            <div className="p-3 bg-gray-50 border-t border-gray-100 mt-auto">
                              {hasExternalUrl && primaryLink ? (
                                <button
                                  onClick={() => window.open(primaryLink, '_blank', 'noopener,noreferrer')}
                                  className="w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-950 hover:from-neutral-800 hover:to-neutral-900 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between shadow-xs hover:shadow-md cursor-pointer group border border-neutral-700/70 hover:border-neutral-500"
                                  title={isEn ? `Open full article at ${publisherDomain}` : `Buka berita lengkap di ${publisherDomain}`}
                                >
                                  <div className="flex items-center gap-2">
                                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-transform" />
                                    <span className="text-gray-100 group-hover:text-white">{isEn ? 'Read Official Source' : 'Baca Sumber Resmi'}</span>
                                  </div>
                                  <span className="text-[11px] font-semibold text-gray-300 bg-white/10 border border-white/10 px-2 py-0.5 rounded-md group-hover:text-white transition-colors truncate max-w-[130px]">
                                    {publisherDomain} ↗
                                  </span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => onSelectNews?.(item)}
                                  className="w-full bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-700 hover:to-teal-800 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between shadow-xs hover:shadow-md cursor-pointer group border border-emerald-700/60"
                                  title={isEn ? 'Read full article' : 'Baca artikel lengkap'}
                                >
                                  <div className="flex items-center gap-2">
                                    <BookOpen className="w-3.5 h-3.5 text-emerald-300 group-hover:text-white group-hover:scale-110 transition-transform" />
                                    <span className="text-white">{isEn ? 'Read Full Article' : 'Baca Rilis Lengkap'}</span>
                                  </div>
                                  <span className="text-[10.5px] font-semibold text-emerald-200 bg-white/10 border border-white/10 px-2 py-0.5 rounded-md">
                                    {isEn ? 'Official Release' : 'Rilis Resmi'}
                                  </span>
                                </button>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>

                    {/* Panel "Tampilkan Semua Arsip Berita" - Muncul jika berita > 10 */}
                    {hasMoreThan10 && (
                      <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-black rounded-2xl p-5 sm:p-6 border border-neutral-700/80 shadow-lg text-white font-jakarta space-y-4 animate-fade-in">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0 text-red-400">
                              <FolderArchive className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-orbitron font-bold text-sm sm:text-base tracking-wide text-white">
                                  {isEn ? 'Tourism News Archive' : 'Panel Arsip Berita'}
                                </h4>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                                  {showAllNewsArchive
                                    ? (isEn ? 'All Archive Active' : 'Semua Arsip Aktif')
                                    : `${totalCount} ${isEn ? 'Articles' : 'Berita'}`}
                                </span>
                              </div>
                              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                                {showAllNewsArchive
                                  ? (isEn
                                      ? `Currently displaying all ${totalCount} articles from the complete tourism archive.`
                                      : `Sedang menampilkan seluruh ${totalCount} berita dari database arsip pariwisata lengkap.`)
                                  : (isEn
                                      ? `Showing top 10 latest news. ${hiddenCount} older articles available in the archive.`
                                      : `Menampilkan 10 berita teratas. Terdapat ${hiddenCount} berita lainnya yang tersimpan dalam arsip.`)}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => setShowAllNewsArchive(prev => !prev)}
                            className="shrink-0 flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-xs transition-all cursor-pointer shadow-md active:scale-95 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white border border-red-400/40 hover:shadow-red-500/20"
                          >
                            {showAllNewsArchive ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                <span>{isEn ? 'Collapse to Top 10' : 'Sembunyikan Sebagian (10 Teratas)'}</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                <span>{isEn ? 'Show All News Archive' : 'Tampilkan Semua Arsip Berita'}</span>
                                <span className="bg-black/25 text-[10px] px-2 py-0.5 rounded-full border border-white/20">
                                  +{hiddenCount}
                                </span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* =================================================== */}
          {/* 9. PUSAT UNDUHAN & ASSET WISATA (RIGHT DRAWER)     */}
          {/* =================================================== */}
          {activeDrawer === 'download' && (
            <div className="space-y-6">
              {downloadSuccessMessage && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-xs font-jakarta flex items-center gap-2 animate-fade-in">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span>{downloadSuccessMessage}</span>
                </div>
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-jakarta text-xs text-gray-600 space-y-1">
                <p className="font-bold text-black uppercase tracking-wider">{lang === 'en' ? 'Official Media Kit & Travel Guides' : 'Materi Promosi & E-Book Resmi'}</p>
                <p>{lang === 'en' ? 'Download West Sumatra tourism promotional assets, master e-books, and travel guides.' : 'Unduh materi promosi pariwisata Sumatera Barat, e-book master komprehensif, dan panduan perjalanan Anda.'}</p>
              </div>

              {/* 2 FEATURED MASTER E-BOOK PANELS (GRID 2 COLUMNS / BARIS) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* FEATURED MASTER E-BOOK COMPREHENSIVE PDF CARD */}
                <div className="border-2 border-red-600/40 rounded-xl p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-red-600 text-white font-jakarta font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow-xs flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        {lang === 'en' ? 'OFFICIAL E-BOOK 2026' : 'E-BOOK RESMI 2026'}
                      </span>
                      <span className="text-yellow-400 font-jakarta text-xs font-bold">
                        PDF E-Book (29 MB)
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-orbitron font-extrabold text-white text-sm sm:text-base tracking-wide">
                        {lang === 'en' ? 'Complete West Sumatra Tourism & Culture Guide 2026' : 'Buku Panduan Lengkap Pariwisata & Budaya Sumbar 2026'}
                      </h3>
                      {(() => {
                        const liveDestCount = (dataStore?.destinations && dataStore.destinations.length > 0) ? dataStore.destinations.length : DESTINATIONS.length;
                        const liveCultCount = (dataStore?.cultureItems && dataStore.cultureItems.length > 0) ? dataStore.cultureItems.length : CULTURE_ITEMS.length;
                        const liveCulCount = (dataStore?.culinaryItems && dataStore.culinaryItems.length > 0) ? dataStore.culinaryItems.length : CULINARY_ITEMS.length;
                        const liveEvCount = (dataStore?.eventItems && dataStore.eventItems.length > 0) ? dataStore.eventItems.length : EVENTS_SCHEDULE.length;

                        return (
                          <p className="font-jakarta text-gray-300 text-xs leading-relaxed">
                            {lang === 'en' 
                              ? `Comprehensive compilation of ${liveDestCount} curated destinations, ${liveCultCount} sacred Minang cultural heritage traditions, ${liveCulCount} authentic gastronomic dishes, and ${liveEvCount} major 2026 events.` 
                              : `Kompilasi komprehensif ${liveDestCount} destinasi wisata, ${liveCultCount} adat budaya Minangkabau, ${liveCulCount} kuliner otentik, serta ${liveEvCount} kalender event resmi 2026.`}
                          </p>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = `/downloads/malala-panduan-wisata-sumbar-2026.pdf?v=${Date.now()}`;
                        link.download = 'MALALA-Panduan-Wisata-Sumatera-Barat-2026.pdf';
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-jakarta font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:shadow-red-600/30 hover:scale-[1.01] text-center"
                    >
                      <Download className="w-4 h-4 text-white" />
                      <span>{lang === 'en' ? '⬇️ DOWNLOAD E-BOOK' : '⬇️ UNDUH E-BOOK'}</span>
                    </button>
                  </div>
                </div>

                {/* FEATURED CALENDAR OF EVENTS 2026 PDF CARD */}
                <div className="border-2 border-amber-500/40 rounded-xl p-5 bg-gradient-to-br from-amber-950 via-stone-900 to-black text-white shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-500 text-black font-jakarta font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow-xs flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-black" />
                        {lang === 'en' ? 'OFFICIAL CoE 2026' : 'KALENDER EVENT RESMI'}
                      </span>
                      <span className="text-amber-400 font-jakarta text-xs font-bold">
                        PDF E-Book (6.6 MB)
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-orbitron font-extrabold text-white text-sm sm:text-base tracking-wide">
                        {lang === 'en' ? 'Official Calendar of Events (CoE) 2026' : 'Kalender Event & Kharisma Event Nusantara 2026'}
                      </h3>
                      <p className="font-jakarta text-gray-300 text-xs leading-relaxed">
                        {lang === 'en'
                          ? 'Special e-book curated by MINANGKAOS detailing cultural festivals, traditional art celebrations, and CoE 2026.'
                          : 'E-Book komprehensif oleh MINANGKAOS memuat ikhtisar lengkap seluruh festival budaya, tradisi anak nagari, dan CoE 2026.'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = `/downloads/kalender-event-sumbar-2026.pdf?v=${Date.now()}`;
                        link.download = 'MALALA-Kalender-Event-CoE-Sumatera-Barat-2026.pdf';
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-jakarta font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:shadow-amber-500/30 hover:scale-[1.01] text-center"
                    >
                      <Download className="w-4 h-4 text-black" />
                      <span>{lang === 'en' ? '⬇️ Download CoE E-Book' : '⬇️ Unduh E-Book CoE'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* DOWNLOAD ITEMS LIST IN 2-COLUMN GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(dataStore.downloadItems && dataStore.downloadItems.length > 0 ? dataStore.downloadItems : DOWNLOAD_ITEMS).map((item: any) => {
                  const isEn = lang === 'en';
                  return (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-xl p-4 bg-white hover:border-indigo-500 hover:shadow-md transition-all flex flex-col justify-between space-y-3 shadow-xs group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="bg-slate-900 text-white font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider">
                            {isEn && item.categoryEn ? item.categoryEn : item.category}
                          </span>
                          <span className="text-indigo-600 font-jakarta text-[10px] font-bold">
                            {item.size}
                          </span>
                        </div>
                        <h3 className="font-orbitron font-bold text-black uppercase tracking-wide text-xs sm:text-sm">
                          {isEn && item.titleEn ? item.titleEn : item.title}
                        </h3>
                        <p className="font-jakarta text-gray-600 text-xs leading-relaxed">
                          {isEn && item.descriptionEn ? item.descriptionEn : item.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-jakarta font-semibold uppercase">
                          Format: {isEn && item.typeEn ? item.typeEn : item.type}
                        </span>
                        <button
                          onClick={() => {
                            triggerDownload(item.filename, item.content, item.mimeType);
                            setDownloadSuccessMessage(isEn ? `Successfully downloaded "${item.titleEn || item.title}"` : `Berhasil mengunduh "${item.title}"`);
                            setTimeout(() => setDownloadSuccessMessage(null), 4000);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-jakarta font-bold text-xs uppercase transition-all shadow-xs cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-cyan-300" />
                          <span>{isEn ? 'Download File' : 'Unduh File'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer info (Hidden for chat so chat box gets full height) */}
        {activeDrawer !== 'chat' && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 text-center font-jakarta text-[10px] text-gray-500 uppercase tracking-widest shrink-0">
            MALALA © 2026 — Presented by MINANGKAOS
          </div>
        )}
      </div>
      </>
      )}

      {/* MODAL INFORMATION DIALOG FOR DESTINATIONS */}
      {selectedDestination && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-lg md:max-w-3xl lg:max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-up p-5 sm:p-6 relative max-h-[92vh] overflow-y-auto font-jakarta">
            {/* Floating Close Button Top Right */}
            <button
              onClick={handleSubModalClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer z-20 shadow-md"
              title={translations[lang].btnClose}
            >
              <X className="w-5 h-5" />
            </button>

            {/* 2-Column Responsive Layout (Left: Media & Narrative, Right: Ratings, Affiliate & Actions) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT COLUMN: Media, Details, Description, Highlights, Best Time */}
              <div className="lg:col-span-7 space-y-4">
                {/* Image Header with Badge & Title */}
                <div className="h-56 sm:h-64 rounded-xl overflow-hidden bg-gray-100 relative shadow-sm">
                  <img
                    src={selectedDestination.imageUrl}
                    alt={selectedDestination.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <span className="bg-white text-black font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider shadow-2xs">
                      {lang === 'en' && selectedDestination.categoryEn ? selectedDestination.categoryEn : selectedDestination.category}
                    </span>
                    <h3 className="font-orbitron font-bold text-base sm:text-lg uppercase text-white pt-1.5 drop-shadow-sm leading-snug">
                      {lang === 'en' && selectedDestination.titleEn ? selectedDestination.titleEn : selectedDestination.title}
                    </h3>
                  </div>
                </div>

                {/* Location Details */}
                <div className="flex items-center justify-between gap-2 flex-wrap pt-0.5">
                  <p className="font-jakarta text-xs text-gray-600 flex items-center gap-1.5 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{lang === 'en' && selectedDestination.locationDetailsEn ? selectedDestination.locationDetailsEn : selectedDestination.locationDetails}</span>
                  </p>
                  {selectedDestination.regency && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-jakarta border border-gray-200">
                      {selectedDestination.regency}
                    </span>
                  )}
                </div>

                {/* Full Narrative Description */}
                <div className="font-jakarta text-xs text-gray-700 leading-relaxed pt-2 border-t border-gray-100 space-y-3">
                  {(lang === 'en' && selectedDestination.descriptionEn ? selectedDestination.descriptionEn : selectedDestination.description)
                    .split('\n\n')
                    .map((paragraph: string, idx: number) => (
                      <p key={idx} className="leading-relaxed">{paragraph}</p>
                    ))}
                </div>

                {/* Highlights */}
                <div className="space-y-2 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  <h4 className="font-jakarta font-bold text-xs uppercase text-black tracking-wider flex items-center gap-1.5">
                    <span>✨</span>
                    <span>{lang === 'en' ? 'Highlights' : 'Daya Tarik Utama (Highlights)'}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs font-jakarta text-gray-700">
                    {(lang === 'en' && selectedDestination.highlightsEn ? selectedDestination.highlightsEn : selectedDestination.highlights).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best Time to Visit */}
                <div className="flex items-center justify-between text-xs font-jakarta p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl">
                  <span className="text-amber-900 font-medium flex items-center gap-1.5">
                    <span>🌤️</span>
                    <span>{lang === 'en' ? 'Best Time to Visit:' : 'Waktu Terbaik Berkunjung:'}</span>
                  </span>
                  <span className="font-bold text-amber-950">{lang === 'en' && selectedDestination.bestTimeEn ? selectedDestination.bestTimeEn : selectedDestination.bestTime}</span>
                </div>
              </div>

              {/* RIGHT COLUMN: Reviews, Affiliate Booking, Google Maps, YouTube, and Close Button */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                {/* 1. Tourist Reviews & Rating Section */}
                <ReviewSection destId={selectedDestination.id} destTitle={selectedDestination.title} lang={lang} />

                {/* 2. Dual-Partner Booking Section (Tiket.com & Traveloka) */}
                <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/90 p-3.5 rounded-xl border border-blue-200/80 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#0064D2] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-2xs">
                        🎫 Tiket.com + ✈️ Traveloka
                      </span>
                      <span className="text-[11px] font-bold text-blue-950 font-jakarta">
                        {lang === 'en' ? 'Book Hotel & Transport' : 'Pesan Hotel & Transportasi'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                    {/* Tiket.com Hotel */}
                    <a
                      href={getTiketHotelUrl(selectedDestination, dataStore?.appSettings)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#0064D2] hover:bg-[#0050A8] text-white py-2 px-2.5 rounded-lg font-jakarta font-bold text-xs hover:shadow-md transition-all flex items-center justify-between border-l-4 border-[#FEDD00] shadow-xs cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-1.5 min-w-0 pr-1">
                        <span>🏨</span>
                        <span className="font-semibold">{lang === 'en' ? 'Find Hotels Nearby' : 'Cari Hotel Dekat Sini'}</span>
                      </span>
                      <span className="bg-[#FEDD00] text-[#002B66] font-black text-[9px] px-1.5 py-0.5 rounded shrink-0">
                        tiket.com
                      </span>
                    </a>

                    {/* Traveloka Hotel */}
                    <a
                      href={getTravelokaHotelUrl(selectedDestination)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#0194F3] hover:bg-[#007ECC] text-white py-2 px-2.5 rounded-lg font-jakarta font-bold text-xs hover:shadow-md transition-all flex items-center justify-between border-l-4 border-white shadow-xs cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-1.5 min-w-0 pr-1">
                        <span>🏨</span>
                        <span className="font-semibold">{lang === 'en' ? 'Find Hotels Nearby' : 'Cari Hotel Dekat Sini'}</span>
                      </span>
                      <span className="bg-white text-[#0194F3] font-black text-[9px] px-1.5 py-0.5 rounded shrink-0">
                        traveloka
                      </span>
                    </a>

                    {/* Tiket.com Car Rental */}
                    <a
                      href={getTiketCarRentalUrl(dataStore?.appSettings)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-50/90 hover:bg-blue-100 text-[#0064D2] border border-blue-300 py-2 px-2.5 rounded-lg font-jakarta font-bold text-xs transition-all flex items-center justify-between shadow-2xs cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-1.5 min-w-0 pr-1">
                        <span>🚗</span>
                        <span className="font-semibold">{lang === 'en' ? 'Car Rental Sumbar' : 'Rental Mobil di Sumbar'}</span>
                      </span>
                      <span className="text-[9px] font-black text-[#0064D2] shrink-0">
                        tiket.com ↗
                      </span>
                    </a>

                    {/* Tiket.com Activities */}
                    <a
                      href={getTiketActivitiesUrl(selectedDestination, dataStore?.appSettings)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-amber-50 hover:bg-amber-100 text-[#002B66] border border-amber-300 py-2 px-2.5 rounded-lg font-jakarta font-bold text-xs transition-all flex items-center justify-between shadow-2xs cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-1.5 min-w-0 pr-1">
                        <span>🎟️</span>
                        <span className="font-semibold">{lang === 'en' ? 'Tours & Packages' : 'Tiket & Paket Wisata'}</span>
                      </span>
                      <span className="text-[9px] font-black bg-[#FEDD00] text-[#002B66] px-1.5 py-0.5 rounded shrink-0">
                        To Do ↗
                      </span>
                    </a>
                  </div>
                </div>

                {/* 3. GOOGLE MAPS DESTINATION LOCATION BUTTON */}
                <a
                  href={getDestinationGoogleMapsUrl(selectedDestination)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-jakarta font-bold uppercase text-xs transition-colors cursor-pointer flex justify-center items-center gap-2 shadow-xs"
                >
                  <MapPin className="w-4 h-4 text-white" />
                  <span>{lang === 'en' ? 'View Location on Google Maps' : 'Lihat Lokasi di Google Maps'}</span>
                </a>

                {/* 4. YOUTUBE VIDEO BUTTON */}
                <a
                  href={getSafeYoutubeUrl(selectedDestination.title, selectedDestination.category || selectedDestination.regency, selectedDestination.videoUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FF0000] text-white py-2.5 rounded-xl font-jakarta font-bold uppercase text-xs hover:bg-red-700 transition-colors cursor-pointer flex justify-center items-center gap-2 shadow-xs"
                >
                  <Youtube className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Watch Videos on YouTube' : 'Tonton Video di YouTube'}</span>
                </a>

                {/* 5. CLOSE BUTTON BAR AT THE BOTTOM OF THE RIGHT COLUMN */}
                <button
                  onClick={handleSubModalClose}
                  className="w-full bg-black hover:bg-gray-800 text-white py-2.5 rounded-xl font-jakarta font-bold uppercase text-xs transition-colors cursor-pointer shadow-xs mt-2"
                >
                  {translations[lang].btnClose}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL INFORMATION DIALOG FOR CULTURE */}
      {selectedCulture && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-up space-y-4 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleSubModalClose}
              className="absolute top-4 right-4 p-1 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="-mx-6 -mt-6 mb-4 h-48 overflow-hidden bg-gray-100 relative">
              <img
                src={selectedCulture.imageUrl}
                alt={selectedCulture.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="bg-white text-black font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider">
                  {lang === 'en' && selectedCulture.categoryEn ? selectedCulture.categoryEn : selectedCulture.category}
                </span>
                <h3 className="font-orbitron font-bold text-base uppercase text-white pt-1 drop-shadow-xs">
                  {lang === 'en' && selectedCulture.titleEn ? selectedCulture.titleEn : selectedCulture.title}
                </h3>
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-jakarta text-xs text-gray-500 flex items-center gap-1 font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {lang === 'en' ? 'Origin:' : 'Asal:'} {lang === 'en' && selectedCulture.originEn ? selectedCulture.originEn : selectedCulture.origin}
              </p>
            </div>

            <div className="font-jakarta text-xs text-gray-700 leading-relaxed pt-2 border-t border-gray-100 space-y-3">
              {(lang === 'en' && selectedCulture.descriptionEn ? selectedCulture.descriptionEn : selectedCulture.description)
                .split('\n\n')
                .map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
            </div>

            <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <h4 className="font-jakarta font-bold text-xs uppercase text-black tracking-wider">
                {lang === 'en' ? 'Minang Philosophy' : 'Falsafah Minang'}
              </h4>
              <p className="font-jakarta italic text-black font-semibold text-xs">
                "{lang === 'en' && selectedCulture.philosophyEn ? selectedCulture.philosophyEn : selectedCulture.philosophy}"
              </p>
            </div>


            <a
              href={getSafeYoutubeUrl(selectedCulture.title, selectedCulture.category || selectedCulture.origin, selectedCulture.videoUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#FF0000] text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-red-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2 shadow-xs"
            >
              <Youtube className="w-4 h-4" />
              {lang === 'en' ? 'Watch Videos on YouTube' : 'Tonton Video di YouTube'}
            </a>

            <button
              onClick={handleSubModalClose}
              className="w-full bg-black text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {translations[lang].btnClose}
            </button>
          </div>
        </div>
      )}

      {/* MODAL INFORMATION DIALOG FOR CULINARY */}
      {selectedCulinary && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-up space-y-4 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleSubModalClose}
              className="absolute top-4 right-4 p-1 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="-mx-6 -mt-6 mb-4 h-48 overflow-hidden bg-gray-100 relative">
              <img
                src={selectedCulinary.imageUrl}
                alt={selectedCulinary.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="bg-white text-black font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider">
                  {lang === 'en' && selectedCulinary.typeEn ? selectedCulinary.typeEn : selectedCulinary.type}
                </span>
                <h3 className="font-orbitron font-bold text-base uppercase text-white pt-1 drop-shadow-xs">
                  {lang === 'en' && selectedCulinary.titleEn ? selectedCulinary.titleEn : selectedCulinary.title}
                </h3>
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-jakarta text-xs text-gray-500 flex items-center gap-1 font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {lang === 'en' ? 'Origin:' : 'Asal:'} {lang === 'en' && selectedCulinary.originEn ? selectedCulinary.originEn : selectedCulinary.origin}
              </p>
            </div>

            <div className="font-jakarta text-xs text-gray-700 leading-relaxed pt-2 border-t border-gray-100 space-y-3">
              {(lang === 'en' && selectedCulinary.descriptionEn ? selectedCulinary.descriptionEn : selectedCulinary.description)
                .split('\n\n')
                .map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
            </div>

            <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center">
              <span className="font-jakarta font-bold text-xs uppercase text-black tracking-wider">
                {lang === 'en' ? 'Flavor Profile:' : 'Profil Rasa:'}
              </span>
              <span className="text-gray-600 font-jakarta text-xs">{lang === 'en' && selectedCulinary.flavorProfileEn ? selectedCulinary.flavorProfileEn : selectedCulinary.flavorProfile}</span>
            </div>

            <a
              href={getCulinaryGoogleMapsUrl(selectedCulinary)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-emerald-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2 shadow-xs"
            >
              <MapPin className="w-4 h-4 text-white" />
              <span>{lang === 'en' ? 'Find Food Places on Google Maps' : 'Cari Tempat Kuliner di Google Maps'}</span>
            </a>

            <a
              href={getSafeYoutubeUrl(selectedCulinary.title, selectedCulinary.type || selectedCulinary.origin, selectedCulinary.videoUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#FF0000] text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-red-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2 shadow-xs"
            >
              <Youtube className="w-4 h-4" />
              {lang === 'en' ? 'Watch Videos on YouTube' : 'Tonton Video di YouTube'}
            </a>

            <button
              onClick={handleSubModalClose}
              className="w-full bg-black text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {translations[lang].btnClose}
            </button>
          </div>
        </div>
      )}

      {/* MODAL INFORMATION DIALOG FOR SOUVENIR (OLEH-OLEH & SHOPEE AFFILIATE) */}
      {selectedSouvenir && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-up space-y-4 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleSubModalClose}
              className="absolute top-4 right-4 p-1 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="-mx-6 -mt-6 mb-4 h-52 overflow-hidden bg-gray-100 relative">
              <img
                src={selectedSouvenir.imageUrl}
                alt={selectedSouvenir.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 flex flex-col gap-1 items-start">
                <span className="bg-white text-black font-jakarta font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded tracking-wider shadow-2xs">
                  {lang === 'en' && selectedSouvenir.categoryEn ? selectedSouvenir.categoryEn : selectedSouvenir.category}
                </span>
                {selectedSouvenir.isMinangkaos && (
                  <span className="bg-red-600 text-white font-jakarta font-black text-[9px] uppercase px-2.5 py-0.5 rounded tracking-wider shadow-2xs">
                    Official Minangkaos
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <h3 className="font-orbitron font-bold text-base uppercase text-white drop-shadow-xs">
                    {lang === 'en' && selectedSouvenir.titleEn ? selectedSouvenir.titleEn : selectedSouvenir.title}
                  </h3>
                </div>
                <span className="bg-red-600 text-white font-orbitron font-black text-xs px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                  {lang === 'en' && selectedSouvenir.priceRangeEn ? selectedSouvenir.priceRangeEn : selectedSouvenir.priceRange}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-jakarta text-xs text-gray-500 flex items-center gap-1 font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                {lang === 'en' ? 'Origin / Center:' : 'Sentra Asal:'} {lang === 'en' && selectedSouvenir.originEn ? selectedSouvenir.originEn : selectedSouvenir.origin}
              </p>
            </div>

            {/* Highlights Box */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 space-y-1.5 font-jakarta">
              <span className="font-bold text-amber-900 text-xs uppercase tracking-wider block">
                {lang === 'en' ? 'Product Highlights & Quality' : 'Keunggulan & Kualitas Produk:'}
              </span>
              <ul className="space-y-1 text-xs text-amber-950">
                {(lang === 'en' && selectedSouvenir.highlightsEn ? selectedSouvenir.highlightsEn : selectedSouvenir.highlights).map((h: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="font-jakarta text-xs text-gray-700 leading-relaxed pt-2 border-t border-gray-100 space-y-3">
              {(lang === 'en' && selectedSouvenir.descriptionEn ? selectedSouvenir.descriptionEn : selectedSouvenir.description)
                .split('\n\n')
                .map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
            </div>

            {/* Shopee & WhatsApp Checkout CTAs */}
            <div className="space-y-2 pt-2 border-t border-gray-100 font-jakarta">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={selectedSouvenir.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#EE4D2D] hover:bg-[#d73211] text-white py-2.5 rounded-lg font-bold uppercase text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer text-center"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Buy on Shopee' : 'Beli di Shopee'}</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                {selectedSouvenir.isMinangkaos && selectedSouvenir.whatsappUrl ? (
                  <a
                    href={selectedSouvenir.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 rounded-lg font-bold uppercase text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer text-center"
                  >
                    <span>💬 {lang === 'en' ? 'Order WhatsApp' : 'Pesan via WhatsApp'}</span>
                  </a>
                ) : (
                  <button
                    onClick={handleSubModalClose}
                    className="w-full bg-black text-white py-2.5 rounded-lg font-bold uppercase text-xs hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    {translations[lang].btnClose}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL INFORMATION DIALOG FOR EVENTS */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-up space-y-4 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleSubModalClose}
              className="absolute top-4 right-4 p-1 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="-mx-6 -mt-6 mb-4 h-48 overflow-hidden bg-gray-100 relative">
              <img
                src={selectedEvent.imageUrl}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="bg-white text-black font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1 w-max">
                  <Calendar className="w-3 h-3" />
                  {lang === 'en' && selectedEvent.scheduleEn ? selectedEvent.scheduleEn : selectedEvent.schedule}
                </span>
                <h3 className="font-orbitron font-bold text-base uppercase text-white pt-1 drop-shadow-xs">
                  {lang === 'en' && selectedEvent.titleEn ? selectedEvent.titleEn : selectedEvent.title}
                </h3>
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-jakarta text-xs text-gray-500 flex items-center gap-1 font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {lang === 'en' && selectedEvent.locationEn ? selectedEvent.locationEn : selectedEvent.location}
              </p>
            </div>

            <div className="font-jakarta text-xs text-gray-700 leading-relaxed pt-2 border-t border-gray-100 space-y-3">
              {(lang === 'en' && selectedEvent.descriptionEn ? selectedEvent.descriptionEn : selectedEvent.description)
                .split('\n\n')
                .map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
            </div>

            {/* Action Buttons: AI Plan, Add to Calendar & Share */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => handlePlanEventWithAi(selectedEvent)}
                className="w-full bg-black hover:bg-neutral-800 text-white py-3 px-3 rounded-lg font-jakarta font-bold uppercase text-[11px] sm:text-xs transition-all cursor-pointer flex justify-center items-center gap-2 shadow-xs text-center leading-tight"
              >
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-center">{lang === 'en' ? 'Plan Trip to This Event with AI' : '✨ Susun Rencana Liburan ke Event Ini dengan AI'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getGoogleCalendarUrl(selectedEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-2 rounded-lg font-jakarta font-bold uppercase text-[11px] sm:text-xs transition-colors cursor-pointer flex justify-center items-center gap-1.5 shadow-xs text-center leading-tight"
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-center">{lang === 'en' ? 'Add to Calendar' : 'Simpan ke Kalender'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleShareEvent(selectedEvent)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 px-2 rounded-lg font-jakarta font-bold uppercase text-[11px] sm:text-xs transition-colors cursor-pointer flex justify-center items-center gap-1.5 border border-gray-200 text-center leading-tight"
                >
                  <Share2 className="w-3.5 h-3.5 shrink-0 text-gray-600" />
                  <span className="text-center">{lang === 'en' ? 'Share Event' : 'Bagikan Event'}</span>
                </button>
              </div>
            </div>

            {/* GOOGLE MAPS EVENT LOCATION BUTTON */}
            <a
              href={getEventGoogleMapsUrl(selectedEvent)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2 shadow-xs"
            >
              <MapPin className="w-4 h-4 text-white" />
              <span>{lang === 'en' ? 'View Event Location on Google Maps' : 'Lihat Lokasi Event di Google Maps'}</span>
            </a>

            <a
              href={getEventYoutubeUrl(selectedEvent)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#FF0000] text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-red-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2 shadow-xs"
            >
              <Youtube className="w-4 h-4" />
              {lang === 'en' ? 'Watch Videos on YouTube' : 'Tonton Video di YouTube'}
            </a>

            <button
              onClick={handleSubModalClose}
              className="w-full bg-black text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {translations[lang].btnClose}
            </button>
          </div>
        </div>
      )}

      {/* E-BOOKLET MAGAZINE READER & PRINT-TO-PDF MODAL */}
      <EBookletModal
        isOpen={isBookletModalOpen}
        onClose={handleSubModalClose}
        lang={lang}
        dataStore={dataStore}
      />
    </>
  );
};
