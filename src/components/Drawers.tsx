import React, { useState, useMemo } from 'react';
import { X, Bookmark, BookmarkCheck, Sparkles, Send, MapPin, Calendar, Clock, ChevronRight, ChevronLeft, RefreshCw, Check, Edit3, Trash2, Plus, Youtube, PlayCircle, Flame, Download, ExternalLink, Share2, CheckCircle, Search, BookOpen, Printer } from 'lucide-react';
import { DrawerType, Destination, CultureItem, CulinaryItem, EventItem, FormAIResponse, HotInfoItem } from '../types';
import { AdminPanel } from './AdminPanel';
import { InteractiveMapModal } from './InteractiveMapModal';
import { EBookletModal } from './EBookletModal';
import { Language, translations } from '../lib/translations';
import { HOT_INFO_ITEMS, DOWNLOAD_ITEMS } from '../data/content';
import { fetchAiItinerary, fetchAiChat, fetchAiHotInfo, isWithinLast30Days, deduplicateNewsItems, isSumbarTopic, getNewsDisplayTitle, getNewsDisplayDescription } from '../utils/ai';
import { generateSumbarBookletPDF } from '../utils/pdfGenerator'; // kept for future use

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

  // Case 2: Web URL (http:// or https://)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    const a = document.createElement('a');
    a.href = trimmed;
    a.target = '_blank';
    a.download = filename || 'downloaded_file';
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

  // Category filter state for destinations
  const [destCategory, setDestCategory] = useState<string>('Semua');

  // Calendar of Events (CoE) state
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string>('all');
  const [eventMonthFilter, setEventMonthFilter] = useState<string | number>('all');

  // Selected item modal/detail view
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedCulture, setSelectedCulture] = useState<CultureItem | null>(null);
  const [selectedCulinary, setSelectedCulinary] = useState<CulinaryItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

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
    
    setItineraryForm((prev: any) => ({
      ...prev,
      waktuKunjungan: {
        tanggalMulai: formattedDate,
        tanggalSelesai: formattedDate
      },
      preferensiMinat: {
        ...prev.preferensiMinat,
        kategoriWisata: Array.from(new Set([...(prev.preferensiMinat?.kategoriWisata || []), 'festival']))
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
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [isFetchingHotInfo, setIsFetchingHotInfo] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [isBookletModalOpen, setIsBookletModalOpen] = useState<boolean>(false);

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

  const handlePrintA4Itinerary = () => {
    if (!aiResponse) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Gagal membuka jendela cetak. Silakan izinkan pop-up di browser Anda.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rencana Wisata Sumatera Barat - MALALA.my.id</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 15mm;
          }
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #18181b;
            background: #ffffff;
            line-height: 1.5;
            margin: 0;
            padding: 20px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #18181b;
            padding-bottom: 12px;
            margin-bottom: 20px;
          }
          .brand {
            font-size: 24px;
            font-weight: 900;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .brand span { color: #dc2626; }
          .tagline {
            font-size: 11px;
            color: #52525b;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
            margin-top: 2px;
          }
          .official-badge {
            background-color: #18181b;
            color: #ffffff;
            font-size: 9px;
            font-weight: 800;
            padding: 6px 12px;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          .hero-banner {
            background-color: #f4f4f5;
            border: 1px solid #e4e4e7;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
          }
          .title {
            font-size: 18px;
            font-weight: 800;
            color: #09090b;
            margin: 0 0 6px 0;
            text-transform: uppercase;
          }
          .summary {
            font-size: 12px;
            color: #3f3f46;
            margin: 0;
            line-height: 1.6;
          }
          .day-card {
            border: 1px solid #d4d4d8;
            border-radius: 8px;
            padding: 14px;
            margin-bottom: 16px;
            page-break-inside: avoid;
            background: #ffffff;
          }
          .day-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #f4f4f5;
            padding-bottom: 8px;
            margin-bottom: 12px;
          }
          .day-badge {
            background: #18181b;
            color: #ffffff;
            font-size: 10px;
            font-weight: 800;
            padding: 3px 8px;
            border-radius: 4px;
            text-transform: uppercase;
          }
          .day-title {
            font-size: 13px;
            font-weight: 800;
            color: #09090b;
            text-transform: uppercase;
            margin: 0;
          }
          .activity-item {
            margin-bottom: 10px;
            font-size: 11px;
            border-left: 2px solid #e4e4e7;
            padding-left: 10px;
          }
          .activity-time {
            font-weight: 800;
            color: #18181b;
          }
          .activity-text {
            color: #27272a;
            margin-top: 2px;
          }
          .activity-tips {
            font-size: 10px;
            font-style: italic;
            background: #f4f4f5;
            padding: 4px 8px;
            border-radius: 4px;
            margin-top: 4px;
            color: #52525b;
          }
          .culinary-box {
            background-color: #fefce8;
            border: 1px solid #fef08a;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 11px;
            color: #854d0e;
            margin-top: 10px;
            font-weight: 600;
          }
          .tips-section {
            background: #fafafa;
            border: 1px solid #e4e4e7;
            border-radius: 8px;
            padding: 14px;
            margin-top: 20px;
            page-break-inside: avoid;
          }
          .tips-title {
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            margin: 0 0 8px 0;
            color: #09090b;
          }
          .tips-list {
            margin: 0;
            padding-left: 18px;
            font-size: 11px;
            color: #3f3f46;
          }
          .tips-list li { margin-bottom: 4px; }
          .footer {
            margin-top: 24px;
            padding-top: 12px;
            border-top: 1px solid #e4e4e7;
            text-align: center;
            font-size: 9px;
            color: #a1a1aa;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }
          .no-print-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #dc2626;
            color: white;
            border: none;
            padding: 12px 24px;
            font-weight: bold;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            font-size: 13px;
            z-index: 9999;
          }
          @media print {
            .no-print-btn { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <div class="brand">MALALA<span>.my.id</span></div>
              <div class="tagline">Panduan Wisata Sumatera Barat Berbasis AI</div>
            </div>
            <div class="official-badge">UNI MALA AI ITINERARY</div>
          </div>

          <div class="hero-banner">
            <h1 class="title">${aiResponse.title}</h1>
            <p class="summary">${aiResponse.summary}</p>
          </div>

          ${aiResponse.itinerary.map(day => `
            <div class="day-card">
              <div class="day-header">
                <span class="day-badge">HARI ${day.day}</span>
                <h3 class="day-title">${day.title}</h3>
              </div>
              <div>
                ${day.activities.map(act => `
                  <div class="activity-item">
                    <div class="activity-time">⏰ ${act.time} — ${act.location}</div>
                    <div class="activity-text">${act.activity}</div>
                    ${act.tips ? `<div class="activity-tips">💡 ${act.tips}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ${day.culinaryRecommendation ? `
                <div class="culinary-box">
                  🍲 <strong>Rekomendasi Kuliner:</strong> ${day.culinaryRecommendation}
                </div>
              ` : ''}
            </div>
          `).join('')}

          ${aiResponse.localTips && aiResponse.localTips.length > 0 ? `
            <div class="tips-section">
              <h4 class="tips-title">Kearifan Lokal & Etika Minangkabau</h4>
              <ul class="tips-list">
                ${aiResponse.localTips.map(tip => `<li>${tip}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div class="footer">
            Dibuat secara otomatis oleh UNI MALA AI pada ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} &bull; MALALA.my.id &bull; Ukuran Standar Cetak Kertas A4
          </div>

          <button class="no-print-btn" onclick="window.print()">🖨️ Cetak / Simpan PDF A4</button>
        </div>

        <script>
          setTimeout(() => {
            window.print();
          }, 600);
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
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
      });
    });

    (dataStore?.hotInfoItems || []).forEach((h: HotInfoItem) => {
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
        imageUrl: h.imageUrl,
        locationName: h.locationName || h.category,
        subTag: h.date,
        keywords: `${h.title} ${h.titleEn || ''} ${h.category} ${h.description}`.toLowerCase(),
      });
    });

    return items;
  }, [destinations, cultureItems, culinaryItems, eventItems, dataStore?.hotInfoItems]);

  const filteredSearchItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let result = searchableIndex;
    if (q) {
      result = result.filter(item => item.keywords.includes(q));
    }
    if (searchCategory !== 'Semua') {
      result = result.filter(item => item.categoryLabel === searchCategory);
    }
    return result;
  }, [searchQuery, searchCategory, searchableIndex]);

  const getDrawerTitle = () => {
    const isEn = lang === 'en';
    switch (activeDrawer) {
      case 'destinations':
        return isEn ? 'Featured Destinations' : 'Destinasi Wisata MALALA';
      case 'culture':
        return isEn ? 'Minangkabau Culture & Heritage' : 'Seni & Budaya Minang';
      case 'culinary':
        return isEn ? 'Authentic West Sumatra Culinary' : 'Kuliner Authentic';
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
      case 'search':
        return isEn ? 'Real-time search results across all West Sumatra tourism categories' : 'Hasil pencarian waktu-nyata ke seluruh data pariwisata Sumatera Barat';
      default:
        return '';
    }
  };

  // Filtered destinations
  const filteredDestinations = destCategory === 'Semua'
    ? destinations
    : destinations.filter((d: Destination) => d.category === destCategory);

  // Handle FormAI Itinerary Generation
  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setAiError(null);

    try {
      const data: FormAIResponse = await fetchAiItinerary({
        ...itineraryForm,
        availableEvents: eventItems,
        language: lang,
      });
      setAiResponse(data);
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

    try {
      const data = await fetchAiChat(userText);
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
          onSelectDestination={(item) => setSelectedDestination(item)}
          onSelectCulture={(item) => setSelectedCulture(item)}
          onSelectCulinary={(item) => setSelectedCulinary(item)}
          onSelectEvent={(item) => setSelectedEvent(item)}
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
              {activeDrawer === 'download' && (
                <span className="bg-black text-white font-orbitron font-bold text-[9px] px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                  <Download className="w-2.5 h-2.5 text-green-400" />
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
        <div className="p-6 overflow-y-auto flex-1 space-y-6 overscroll-contain scroll-smooth focus:outline-none" tabIndex={0}>

          {/* Sub-Menu Navigation Bar across main categories */}
          {['destinations', 'culture', 'culinary', 'events', 'download'].includes(activeDrawer) && (
            <div className="bg-gray-50/90 border border-gray-200 p-2 rounded-xl shadow-2xs space-y-1.5 font-jakarta mb-5 shrink-0 w-full">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500 flex items-center gap-1">
                  <span>🗺️</span>
                  <span>{lang === 'en' ? 'Sub-Menu Categories:' : 'Sub-Menu Kategori Wisata:'}</span>
                </span>
              </div>

              {/* 6 Category Buttons Fitted Perfectly Without Swipe */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-1.5 w-full text-[10px] sm:text-[10.5px]">
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
                      ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
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

              {/* Search Results List (2 Columns Grid) */}
              {filteredSearchItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {filteredSearchItems.map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      className="border border-gray-200 rounded-xl p-3.5 hover:shadow-lg transition-all bg-white hover:border-red-300 flex flex-col justify-between group space-y-2.5 font-jakarta"
                    >
                      <div className="space-y-2">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-32 rounded-lg object-cover border border-gray-100 group-hover:scale-102 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-32 rounded-lg bg-gray-100 flex items-center justify-center text-4xl">
                            {item.icon}
                          </div>
                        )}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                              {item.categoryLabel}
                            </span>
                            {item.subTag && (
                              <span className="text-[9.5px] font-semibold text-gray-500 truncate max-w-[120px]">
                                • {item.subTag}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">
                            {lang === 'en' && item.titleEn ? item.titleEn : item.title}
                          </h3>
                          <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                            {lang === 'en' && item.descEn ? item.descEn : item.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
                        <span className="text-gray-500 font-medium flex items-center gap-1 truncate max-w-[110px]">
                          {item.locationName && (
                            <>
                              <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                              <span className="truncate">{item.locationName}</span>
                            </>
                          )}
                        </span>
                        <button
                          onClick={() => onOpenDrawer?.(item.drawerType)}
                          className="inline-flex items-center gap-0.5 font-bold text-red-600 hover:text-black transition-colors cursor-pointer shrink-0"
                        >
                          <span>{lang === 'en' ? 'View' : 'Detail'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
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

              {/* Destination Cards - 2 COLUMN GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          <div className="text-gray-400 font-jakarta text-[11px] flex items-center gap-1 font-semibold">
                            <MapPin className="w-3 h-3 text-black" />
                            {isEn && dest.regencyEn ? dest.regencyEn : dest.regency}
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
                      <div className="px-3.5 py-2.5 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-[10px] font-jakarta">
                        <span className="flex items-center gap-1 text-gray-500 font-medium">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {isEn && dest.bestTimeEn ? dest.bestTimeEn : dest.bestTime}
                        </span>
                        <button
                          onClick={() => setSelectedDestination(dest)}
                          className="font-bold text-black hover:underline uppercase flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>{translations[lang].btnDetail}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div className="p-3 bg-gray-50 border-t border-gray-100 space-y-0.5">
                      <span className="font-jakarta font-bold text-[9px] text-gray-400 uppercase tracking-widest block">
                        {isEn ? 'MINANG PHILOSOPHY' : 'FALSAFAH MINANG'}
                      </span>
                      <p className="font-jakarta italic text-black font-semibold text-[11px] line-clamp-2 pb-2">
                        "{isEn && item.philosophyEn ? item.philosophyEn : item.philosophy}"
                      </p>
                      <div className="flex justify-end pt-2 border-t border-gray-200">
                        <button
                          onClick={() => setSelectedCulture(item)}
                          className="font-bold text-black text-[10px] uppercase flex items-center gap-0.5 hover:underline cursor-pointer"
                        >
                          {translations[lang].btnDetail}
                          <ChevronRight className="w-3 h-3" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div className="p-3 bg-gray-50 border-t border-gray-100 text-[11px] font-jakarta flex items-center justify-between">
                      <div>
                        <span className="font-bold text-black">{isEn ? 'Flavor Profile:' : 'Profil Rasa:'} </span>
                        <span className="text-gray-600 line-clamp-1 block sm:inline">{isEn && cul.flavorProfileEn ? cul.flavorProfileEn : cul.flavorProfile}</span>
                      </div>
                      <button
                        onClick={() => setSelectedCulinary(cul)}
                        className="font-bold text-black text-[10px] uppercase flex items-center gap-0.5 hover:underline cursor-pointer shrink-0"
                      >
                        {translations[lang].btnDetail}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

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

                      {/* Location at bottom of image */}
                      <div className="absolute bottom-2 left-3 right-3 text-white font-jakarta text-[10px] flex items-center gap-1 font-semibold truncate drop-shadow-sm">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{isEn && ev.locationEn ? ev.locationEn : ev.location}</span>
                      </div>
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
                  <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                    {/* 1-Click Google Calendar button */}
                    <a
                      href={getGoogleCalendarUrl(ev)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-gray-300 hover:border-black text-gray-700 hover:text-black font-jakarta font-bold text-[10px] uppercase px-2.5 py-1.5 rounded-md flex items-center gap-1 transition-all cursor-pointer shadow-2xs hover:bg-gray-50 shrink-0"
                      title={isEn ? 'Add to Google Calendar' : 'Simpan ke Google Calendar'}
                    >
                      <Calendar className="w-3 h-3 text-blue-600" />
                      <span>{isEn ? '+ Calendar' : '+ Kalender'}</span>
                    </a>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handlePlanEventWithAi(ev)}
                        className="bg-amber-500 hover:bg-amber-400 text-black font-jakarta font-bold text-[10px] uppercase px-2.5 py-1.5 rounded-md flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                        title={isEn ? 'Plan with AI' : 'Rencanakan dengan AI'}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{isEn ? 'AI Plan' : 'AI Plan'}</span>
                      </button>

                      <button
                        onClick={() => handleShareEvent(ev)}
                        className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors cursor-pointer bg-white"
                        title={isEn ? 'Share Event' : 'Bagikan Event'}
                      >
                        <Share2 className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => setSelectedEvent(ev)}
                        className="bg-black hover:bg-amber-600 text-white font-jakarta font-bold text-[10px] uppercase px-2.5 py-1.5 rounded-md flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                      >
                        <span>{translations[lang].btnDetail}</span>
                        <ChevronRight className="w-3 h-3" />
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
            const eventsInActiveMonth = eventItems.filter((ev: EventItem) => parseEventMonth(ev.schedule) === calendarMonth);
            
            // Events to show in cards below calendar (filtered by day if clicked)
            const calendarEventsToDisplay = calendarSelectedDate 
              ? eventsInActiveMonth.filter((ev: EventItem) => getEventDays(ev.schedule, calendarMonth).includes(calendarSelectedDate))
              : eventsInActiveMonth;

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
                        {isEn ? 'West Sumatra Tourism Board' : 'Dinas Pariwisata Sumatera Barat'}
                      </span>
                    </div>
                    <h2 className="font-orbitron font-bold text-xs sm:text-sm uppercase tracking-wide text-white">
                      {isEn ? 'CALENDAR OF EVENTS (CoE) 2026' : 'KALENDER EVENT RESMI SUMBAR 2026'}
                    </h2>
                  </div>

                  {/* Compact Quick Stats */}
                  <div className="flex items-center gap-2 shrink-0 text-center">
                    <div className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      <span className="font-orbitron font-bold text-xs text-amber-400">{eventItems.length}</span>
                      <span className="text-[9px] text-gray-400 ml-1 uppercase">{isEn ? 'Events' : 'Event'}</span>
                    </div>
                    <div className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      <span className="font-orbitron font-bold text-xs text-yellow-300">{totalKenCount}</span>
                      <span className="text-[9px] text-gray-400 ml-1 uppercase">KEN</span>
                    </div>
                    <div className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      <span className="font-orbitron font-bold text-xs text-emerald-400">19</span>
                      <span className="text-[9px] text-gray-400 ml-1 uppercase">Kab/Kota</span>
                    </div>
                  </div>
                </div>

                {/* Dual-View Switcher Tab */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl gap-1">
                  <button
                    onClick={() => {
                      setEventViewMode('calendar');
                      setCalendarSelectedDate(null);
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-jakarta font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      eventViewMode === 'calendar'
                        ? 'bg-black text-white shadow-xs'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{isEn ? '📅 Monthly Calendar Grid' : '📅 Kalender Visual Bulanan'}</span>
                  </button>

                  <button
                    onClick={() => setEventViewMode('list')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-jakarta font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      eventViewMode === 'list'
                        ? 'bg-black text-white shadow-xs'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <span>{isEn ? `📋 Complete List (${eventItems.length})` : `📋 Daftar Lengkap (${eventItems.length})`}</span>
                  </button>
                </div>

                {/* ======================================================== */}
                {/* 1. MODE KALENDER INTERAKTIF (MONTHLY CALENDAR GRID)      */}
                {/* ======================================================== */}
                {eventViewMode === 'calendar' && (
                  <div className="space-y-4">
                    {/* Month Navigator Header */}
                    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs space-y-3">
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
                          <h3 className="font-orbitron font-bold text-sm sm:text-base text-black uppercase tracking-wider flex items-center justify-center gap-2">
                            <span>{isEn ? monthNamesEn[calendarMonth] : monthNamesId[calendarMonth]} 2026</span>
                            {calendarMonth === currentMonthIdx && (
                              <span className="bg-red-600 text-white text-[9px] font-bold font-jakarta px-2 py-0.5 rounded-full uppercase">
                                {isEn ? 'Current' : 'Bulan Ini'}
                              </span>
                            )}
                          </h3>
                          <p className="text-[11px] text-gray-500 font-jakarta">
                            {eventsInActiveMonth.length > 0
                              ? (isEn ? `${eventsInActiveMonth.length} Tourism Events Scheduled` : `${eventsInActiveMonth.length} Event Pariwisata Terjadwal`)
                              : (isEn ? 'No major festivals scheduled this month' : 'Tidak ada festival besar terjadwal di bulan ini')}
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

                      {/* Quick 12-Month Pills Bar */}
                      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 pt-2 border-t border-gray-100">
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
                      <div className="grid grid-cols-7 bg-slate-900 text-white text-center py-2 text-[10px] sm:text-xs font-bold font-orbitron uppercase tracking-wider">
                        {(isEn ? dayNamesEn : dayNamesId).map((dName, i) => (
                          <div key={i} className={i === 0 || i === 6 ? 'text-amber-400' : 'text-gray-200'}>
                            {dName}
                          </div>
                        ))}
                      </div>

                      {/* Day Cells Grid */}
                      <div className="grid grid-cols-7 gap-px bg-gray-200">
                        {/* Leading empty cells for start of month */}
                        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                          <div key={`empty-${i}`} className="bg-gray-50 min-h-[64px] sm:min-h-[85px] p-1 opacity-40" />
                        ))}

                        {/* Month Days (1 to 31) */}
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
                              className={`min-h-[64px] sm:min-h-[85px] p-1.5 flex flex-col justify-between transition-all ${
                                matchedDayEvents.length > 0 ? 'cursor-pointer hover:scale-[1.02] hover:z-10' : ''
                              } ${
                                isSelectedDay
                                  ? 'bg-amber-100 ring-2 ring-amber-500 shadow-md'
                                  : matchedDayEvents.length > 0
                                  ? hasKen
                                    ? 'bg-amber-50/90 hover:bg-amber-100/90 border-amber-200'
                                    : 'bg-red-50/80 hover:bg-red-100/80 border-red-200'
                                  : 'bg-white hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-[11px] sm:text-xs font-orbitron font-bold ${
                                  matchedDayEvents.length > 0 ? 'text-black' : 'text-gray-400'
                                }`}>
                                  {dayNum}
                                </span>
                                {hasKen && (
                                  <span className="text-[10px]" title="Karisma Event Nusantara">⭐</span>
                                )}
                              </div>

                              {/* Event Chips inside the day cell */}
                              <div className="space-y-1 mt-1">
                                {matchedDayEvents.map((ev: EventItem) => (
                                  <div
                                    key={ev.id}
                                    className={`text-[9px] sm:text-[9.5px] font-jakarta font-semibold px-1 py-0.5 rounded truncate transition-all ${
                                      ev.isKen
                                        ? 'bg-amber-500 text-black font-bold shadow-2xs'
                                        : 'bg-slate-900 text-white'
                                    }`}
                                    title={`${ev.title} (${ev.schedule})`}
                                  >
                                    {ev.isKen ? '⭐ ' : '🎪 '}
                                    {ev.title}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Selected Month / Day Event Detail Cards */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-orbitron font-bold text-xs sm:text-sm uppercase text-black">
                            {calendarSelectedDate 
                              ? (isEn ? `📅 Events on ${calendarSelectedDate} ${monthNamesEn[calendarMonth]} 2026:` : `📅 Event pada ${calendarSelectedDate} ${monthNamesId[calendarMonth]} 2026:`)
                              : (isEn ? `🎪 All Events in ${monthNamesEn[calendarMonth]} 2026 (${eventsInActiveMonth.length}):` : `🎪 Seluruh Event Bulan ${monthNamesId[calendarMonth]} 2026 (${eventsInActiveMonth.length}):`)}
                          </h4>
                        </div>
                        {calendarSelectedDate && (
                          <button
                            onClick={() => setCalendarSelectedDate(null)}
                            className="text-xs text-amber-700 font-bold hover:underline cursor-pointer"
                          >
                            {isEn ? 'Show All Month Events' : 'Tampilkan Semua Bulan Ini'}
                          </button>
                        )}
                      </div>

                      {calendarEventsToDisplay.length === 0 ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-500 space-y-2">
                          <p className="text-xs">
                            {isEn 
                              ? `No official festivals scheduled in ${monthNamesEn[calendarMonth]} 2026.`
                              : `Belum ada festival resmi yang dijadwalkan pada bulan ${monthNamesId[calendarMonth]} 2026.`}
                          </p>
                          <button
                            onClick={() => setCalendarMonth(7)} // jump to august
                            className="text-xs text-black font-bold underline cursor-pointer"
                          >
                            {isEn ? 'View Peak Festival Season (August 2026) →' : 'Lihat Musim Puncak Festival (Agustus 2026) →'}
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {calendarEventsToDisplay.map((ev: EventItem) => (
                            <div
                              key={ev.id}
                              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs hover:border-black transition-all flex flex-col justify-between group"
                            >
                              <div>
                                <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                                  <img
                                    src={ev.imageUrl || 'https://images.unsplash.com/photo-1549479373-cf673e4a9e2c?auto=format&fit=crop&w=800&q=80'}
                                    alt={ev.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                                  <div className="absolute top-2 left-2 flex items-center gap-1.5 flex-wrap">
                                    {ev.isKen && (
                                      <span className="bg-amber-400 text-black font-orbitron font-bold text-[9px] uppercase px-2 py-0.5 rounded shadow-sm">
                                        ⭐ KEN Kemenparekraf
                                      </span>
                                    )}
                                  </div>
                                  <div className="absolute bottom-2 left-3 right-3 text-white">
                                    <h3 className="font-orbitron font-bold text-xs sm:text-sm line-clamp-1">
                                      {isEn && ev.titleEn ? ev.titleEn : ev.title}
                                    </h3>
                                    <p className="text-[10px] text-gray-200 flex items-center gap-1 mt-0.5">
                                      <MapPin className="w-3 h-3 text-amber-400" />
                                      <span className="truncate">{isEn && ev.locationEn ? ev.locationEn : ev.location}</span>
                                    </p>
                                  </div>
                                </div>

                                <div className="p-3.5 space-y-2.5">
                                  <div className="flex items-center justify-between text-[11px] bg-amber-50 p-2 rounded-lg border border-amber-200">
                                    <span className="font-bold text-amber-900 flex items-center gap-1">
                                      📅 {isEn && ev.scheduleEn ? ev.scheduleEn : ev.schedule}
                                    </span>
                                    <a
                                      href={getGoogleCalendarUrl(ev)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[10px] text-blue-700 font-bold hover:underline flex items-center gap-0.5"
                                      title={isEn ? 'Add to Google Calendar' : 'Simpan ke Google Calendar'}
                                    >
                                      <Calendar className="w-3 h-3" />
                                      <span>+ Kalender</span>
                                    </a>
                                  </div>

                                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                                    {isEn && ev.descriptionEn ? ev.descriptionEn : ev.description}
                                  </p>
                                </div>
                              </div>

                              <div className="p-3.5 pt-0 flex items-center gap-2">
                                <button
                                  onClick={() => handlePlanEventWithAi(ev)}
                                  className="flex-1 py-2 px-3 rounded-lg bg-black hover:bg-neutral-800 text-white font-jakarta font-bold text-[10.5px] uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                  <span>{isEn ? 'Plan Trip with AI' : 'Rencanakan dengan AI'}</span>
                                </button>

                                <button
                                  onClick={() => setSelectedEvent(ev)}
                                  className="py-2 px-3 rounded-lg border border-gray-300 hover:border-black text-black font-jakarta font-bold text-[10.5px] uppercase transition-all cursor-pointer"
                                >
                                  {isEn ? 'Detail' : 'Detail'}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* 2. MODE DAFTAR LENGKAP (LIST VIEW)                       */}
                {/* ======================================================== */}
                {eventViewMode === 'list' && (
                  <div className="space-y-4">
                    {/* Filter Controls Bar (100% 1 Baris Pas Tanpa Slider) */}
                    <div className="space-y-2.5 bg-gray-50 p-2.5 sm:p-3 rounded-xl border border-gray-200">
                      {/* Category Filter Pills (5 Grid Columns - 1 Baris Pas) */}
                      <div className="grid grid-cols-5 gap-1 text-center">
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
                            className={`w-full py-1.5 px-0.5 rounded-lg text-[9.5px] sm:text-[10.5px] font-bold uppercase transition-all cursor-pointer text-center truncate ${
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

                      {/* Month Filter Tabs (1 Baris Pas Tanpa Slider) */}
                      <div className="flex items-center gap-0.5 w-full pt-2 border-t border-gray-200/60">
                        <button
                          onClick={() => setEventMonthFilter('all')}
                          className={`flex-1 py-1 px-0.5 rounded text-[9px] sm:text-[9.5px] font-bold uppercase transition-all cursor-pointer text-center truncate ${
                            eventMonthFilter === 'all'
                              ? 'bg-black text-white shadow-xs'
                              : 'bg-white border border-gray-200 text-gray-600 hover:border-black hover:text-black'
                          }`}
                          title={isEn ? 'All Months' : 'Semua Bulan'}
                        >
                          {isEn ? 'All' : 'Semua'}
                        </button>

                        <button
                          onClick={() => setEventMonthFilter('current')}
                          className={`flex-1 py-1 px-0.5 rounded text-[9px] sm:text-[9.5px] font-bold uppercase transition-all cursor-pointer text-center truncate ${
                            eventMonthFilter === 'current'
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'bg-red-50 text-red-700 border border-red-200 hover:border-red-400'
                          }`}
                          title={isEn ? 'This Month' : 'Bulan Ini'}
                        >
                          {isEn ? 'Now' : 'Ini'}
                        </button>

                        {(isEn ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']).map((mShort, idx) => (
                          <button
                            key={idx}
                            onClick={() => setEventMonthFilter(idx)}
                            className={`flex-1 py-1 px-0.5 rounded text-[8.5px] sm:text-[9.5px] font-bold uppercase transition-all cursor-pointer text-center truncate ${
                              eventMonthFilter === idx
                                ? 'bg-black text-white shadow-xs'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-black hover:text-black'
                            }`}
                            title={mShort}
                          >
                            {mShort}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ALL EVENTS LIST (Chronologically Sorted - Upcoming First) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {sortedEvents.map(renderEventCard)}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* =================================================== */}

          {/* =================================================== */}
          {/* 5. FORMAI SUMATERA BARAT (AI ITINERARY & CHAT)      */}
          {/* =================================================== */}
          {activeDrawer === 'formai' && (
            <div className="space-y-6">
              {/* FormAI Mode Switcher */}
              <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setFormAiTab('generator')}
                  className={`py-2 px-3 rounded-md text-xs font-jakarta font-bold uppercase transition-all cursor-pointer ${
                    formAiTab === 'generator'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {translations[lang].tabGenerator}
                </button>
                <button
                  onClick={() => setFormAiTab('chat')}
                  className={`py-2 px-3 rounded-md text-xs font-jakarta font-bold uppercase transition-all cursor-pointer ${
                    formAiTab === 'chat'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {translations[lang].tabChat}
                </button>
              </div>

              {/* MODE 1: ITINERARY GENERATOR */}
              {formAiTab === 'generator' && (
                <div className="space-y-6">
                  <form onSubmit={handleGenerateItinerary} className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div>
                      <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                        {translations[lang].fieldDaysForm}
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5, 7].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => updateForm(['durasiHari'], num)}
                            className={`flex-1 py-1.5 rounded text-xs font-orbitron font-bold transition-all cursor-pointer ${
                              itineraryForm.durasiHari === num
                                ? 'bg-black text-white'
                                : 'bg-white border border-gray-200 text-black hover:border-black'
                            }`}
                          >
                            {num} {lang === 'en' ? 'Days' : 'Hari'}
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
                        className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black cursor-pointer"
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
                          const sched = (ev.schedule || ev.date || '').toLowerCase();
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                          {translations[lang].fieldTravelerType}
                        </label>
                        <select
                          value={itineraryForm.profilWisatawan.kategori}
                          onChange={(e) => updateForm(['profilWisatawan', 'kategori'], e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black"
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
                          onChange={(e) => updateForm(['profilWisatawan', 'jumlahOrang'], parseInt(e.target.value))}
                          className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black"
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
                                  ? 'bg-black text-white font-bold'
                                  : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                              }`}
                            >
                              {isSelected ? `✓ ${minat.label}` : minat.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                          {translations[lang].fieldActivityLevel}
                        </label>
                        <select
                          value={itineraryForm.preferensiMinat.tingkatAktivitas}
                          onChange={(e) => updateForm(['preferensiMinat', 'tingkatAktivitas'], e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black"
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
                          className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black"
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
                        className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full bg-black text-white py-3 rounded-lg font-jakarta font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50"
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

                  {/* AI Response Results */}
                  {aiError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs font-jakarta rounded-md border border-red-200">
                      {aiError}
                    </div>
                  )}

                  {aiResponse && (
                    <div className="space-y-4 border-t border-gray-200 pt-4">
                      <div className="bg-black text-white p-4 rounded-xl space-y-1">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-yellow-300" />
                          <span className="font-orbitron font-bold text-xs uppercase tracking-widest text-gray-300">
                            {lang === 'en' ? 'UNI MALA AI Official Trip Itinerary' : 'Rencana Wisata Resmi UNI MALA AI'}
                          </span>
                        </div>
                        <h3 className="font-orbitron font-bold text-base uppercase text-white">
                          {aiResponse.title}
                        </h3>
                        <p className="font-jakarta text-xs text-gray-300 pt-1">
                          {aiResponse.summary}
                        </p>

                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={handlePrintA4Itinerary}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-lg font-jakarta font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>{translations[lang].btnPrintA4}</span>
                          </button>
                        </div>
                      </div>

                      {/* Itinerary Days */}
                      <div className="space-y-4">
                        {aiResponse.itinerary.map((day) => (
                          <div key={day.day} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-white">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                              <span className="bg-black text-white font-orbitron font-bold text-[10px] uppercase px-2 py-0.5 rounded">
                                HARI {day.day}
                              </span>
                              <h4 className="font-orbitron font-bold text-xs uppercase text-black">
                                {day.title}
                              </h4>
                            </div>

                            <div className="space-y-2.5">
                              {day.activities.map((act, i) => (
                                <div key={i} className="text-xs font-jakarta space-y-1">
                                  <div className="flex items-center justify-between font-bold text-black">
                                    <span>{act.time} — {act.location}</span>
                                  </div>
                                  <p className="text-gray-600">{act.activity}</p>
                                  {act.tips && (
                                    <p className="text-[11px] text-gray-500 italic bg-gray-50 p-1.5 rounded border border-gray-100">
                                      💡 {act.tips}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>

                            {day.culinaryRecommendation && (
                              <div className="pt-2 border-t border-gray-100 text-xs font-jakarta text-black bg-yellow-50 p-2 rounded">
                                <span className="font-bold">🍲 Kuliner Hari Ini: </span>
                                <span>{day.culinaryRecommendation}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Local Tips */}
                      {aiResponse.localTips && aiResponse.localTips.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 text-xs font-jakarta">
                          <h4 className="font-bold text-black uppercase tracking-wider">
                            Kearifan Lokal & Etika Minangkabau
                          </h4>
                          <ul className="space-y-1 list-disc list-inside text-gray-700">
                            {aiResponse.localTips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: CHATBOT AI MINANG GUIDE */}
              {formAiTab === 'chat' && (
                <div className="flex flex-col h-[500px] border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  {/* Chat Messages Log */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    {chatHistory.map((item, index) => (
                      <div
                        key={index}
                        className={`flex ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-xl text-xs font-jakarta leading-relaxed ${
                            item.sender === 'user'
                              ? 'bg-black text-white rounded-br-none'
                              : 'bg-white border border-gray-200 text-gray-800 shadow-xs rounded-bl-none'
                          }`}
                        >
                          {item.sender === 'ai' && (
                            <div className="flex items-center gap-1 font-orbitron font-bold text-[10px] text-gray-400 uppercase mb-1">
                              <Sparkles className="w-2.5 h-2.5 text-black" />
                              UNI MALA AI
                            </div>
                          )}
                          <p className="whitespace-pre-wrap">{item.text}</p>
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 p-3 rounded-xl text-xs font-jakarta text-gray-500 flex items-center gap-2">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                          <span>{lang === 'en' ? 'UNI MALA AI is typing...' : 'UNI MALA AI sedang mengetik respon...'}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleChatSubmit} className="p-2 bg-white border-t border-gray-200 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={translations[lang].chatInputPlaceholder}
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1 border border-gray-200 rounded-lg p-2.5 text-xs font-jakarta text-black focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      disabled={isChatLoading || !chatMessage.trim()}
                      className="bg-black text-white p-2.5 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-40"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
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
                      .filter((i: any) => isWithinLast30Days(i.date || i.createdAt));
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
                          onClick={() => setHotInfoCategory(cat)}
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

              {/* Hot Info Items List (Strictly last 30 days & deduplicated by topic/event) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                {(() => {
                  const rawList = (dataStore.hotInfoItems && dataStore.hotInfoItems.length > 0 ? dataStore.hotInfoItems : HOT_INFO_ITEMS)
                    .filter((item: any) => isWithinLast30Days(item.date || item.createdAt));
                  const dedupedList = deduplicateNewsItems(rawList)
                    .filter((item: any) => {
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

                  if (dedupedList.length === 0) {
                    return (
                      <div className="col-span-1 sm:col-span-2 text-center py-12 text-gray-500 font-jakarta text-xs bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        {lang === 'en' ? 'No recent news updates found in this category.' : 'Tidak ada update berita pariwisata untuk kategori ini.'}
                      </div>
                    );
                  }

                  return dedupedList.map((item: any, idx: number) => {
                    const isEn = lang === 'en';
                    const categoryDisplay = isEn ? (item.categoryEn || (item.category === 'Pariwisata Sumatera Barat' ? 'West Sumatra Tourism' : 'Indonesian Tourism')) : (item.category || 'Pariwisata Indonesia');
                    const tagDisplay = isEn && item.tagEn ? item.tagEn : (item.tag === 'Penting' ? (isEn ? 'Important' : 'Penting') : (item.tag || (isEn ? 'Latest' : 'Terkini')));

                    return (
                      <div
                        key={item.id}
                        style={{ animationDelay: `${idx * 60}ms` }}
                        onClick={() => onSelectNews && onSelectNews(item)}
                        className={`flex flex-col h-full border rounded-xl overflow-hidden bg-white shadow-xs transition-all duration-200 animate-content-stagger cursor-pointer group hover:shadow-md hover:border-black/70 ${
                          item.tag === 'Penting' || item.isUrgent ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-200'
                        }`}
                      >
                        {item.imageUrl ? (
                          <div className="relative h-40 w-full overflow-hidden bg-gray-100 shrink-0">
                            <img
                              src={item.imageUrl}
                              alt={getNewsDisplayTitle(item, lang)}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/85 text-white font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded-md backdrop-blur-xs shrink-0 whitespace-nowrap z-10 shadow-xs">
                              {categoryDisplay}
                            </div>
                            {(item.tag === 'Penting' || item.isUrgent) && (
                              <div className="absolute top-2.5 right-2.5 bg-red-600 text-white font-jakarta font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse shadow-xs z-10">
                                <Flame className="w-3 h-3 text-yellow-300 fill-current" />
                                {tagDisplay}
                              </div>
                            )}
                            {item.date && (
                              <div className="absolute bottom-2.5 left-2.5 bg-black/70 text-gray-200 font-jakarta text-[10px] px-2 py-0.5 rounded backdrop-blur-xs z-10">
                                {isEn && item.dateEn ? item.dateEn : item.date}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="px-3.5 pt-3 pb-2 flex items-center justify-between gap-2 border-b border-gray-100 bg-gray-50/80 shrink-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="bg-black text-white font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded-md shrink-0 whitespace-nowrap">
                                {categoryDisplay}
                              </span>
                              {(item.tag === 'Penting' || item.isUrgent) && (
                                <span className="bg-red-600 text-white font-jakarta font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <Flame className="w-3 h-3 text-yellow-300 fill-current" />
                                  {tagDisplay}
                                </span>
                              )}
                            </div>
                            {item.date && (
                              <span className="text-gray-500 font-jakarta text-[10px] font-medium whitespace-nowrap">
                                {isEn && item.dateEn ? item.dateEn : item.date}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
                          <div className="space-y-1.5">
                            <h3 className="font-orbitron font-bold text-black uppercase tracking-wide text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
                              {getNewsDisplayTitle(item, lang)}
                            </h3>
                            <p className="font-jakarta text-gray-600 text-xs leading-relaxed line-clamp-3">
                              {getNewsDisplayDescription(item, lang)}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap mt-auto">
                            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-gray-500">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                              <span className="truncate max-w-[140px] sm:max-w-[170px]">
                                {(() => {
                                  const rawLoc = isEn && item.locationNameEn ? item.locationNameEn : (item.locationName || '');
                                  const cleanLoc = rawLoc
                                    .replace(/Liputan\s*(Resmi\s*)?Terverifikasi\s*(\([^)]*\))?/gi, '')
                                    .replace(/Verified\s*Report\s*(\([^)]*\))?/gi, '')
                                    .trim();
                                  return cleanLoc || (isEn ? 'Indonesian Tourism' : (item.category === 'Pariwisata Sumatera Barat' ? 'Sumatera Barat' : 'Pariwisata Indonesia'));
                                })()}
                              </span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const textToShare = `${getNewsDisplayTitle(item, lang)}\n${getNewsDisplayDescription(item, lang)}`;
                                if (navigator.share) {
                                  navigator.share({ title: getNewsDisplayTitle(item, lang), text: textToShare, url: window.location.href });
                                } else {
                                  navigator.clipboard.writeText(textToShare);
                                  alert(isEn ? 'News link copied to clipboard!' : 'Tautan informasi berhasil disalin!');
                                }
                              }}
                              className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-medium"
                              title={isEn ? 'Share this update' : 'Bagikan Info Ini'}
                            >
                              <Share2 className="w-3 h-3" />
                              <span>{isEn ? 'Share' : 'Bagikan'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
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
                <p className="font-bold text-black uppercase tracking-wider">{lang === 'en' ? 'Official Media Kit & Travel Guides' : 'Materi Promosi & E-Booklet Resmi'}</p>
                <p>{lang === 'en' ? 'Download West Sumatra tourism promotional assets, master e-booklets, and travel guides.' : 'Unduh materi promosi pariwisata Sumatera Barat, e-booklet master komprehensif, dan panduan perjalanan Anda.'}</p>
              </div>

              {/* FEATURED MASTER E-BOOKLET COMPREHENSIVE PDF CARD */}
              <div className="border-2 border-red-600/40 rounded-xl p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white shadow-xl space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <span className="bg-red-600 text-white font-jakarta font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    {lang === 'en' ? 'OFFICIAL MASTER E-BOOKLET 2026' : 'E-BOOKLET MASTER RESMI 2026'}
                  </span>
                  <span className="text-yellow-400 font-jakarta text-xs font-bold">
                    PDF E-Book
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-orbitron font-extrabold text-white text-base tracking-wide">
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
                          ? `Comprehensive compilation of ${liveDestCount} curated destinations, ${liveCultCount} sacred Minang cultural heritage traditions, ${liveCulCount} authentic gastronomic dishes, and ${liveEvCount} major 2026 events & KEN calendar.` 
                          : `Kompilasi komprehensif seluruh data ${liveDestCount} destinasi wisata, ${liveCultCount} warisan budaya & adat Minangkabau, ${liveCulCount} kuliner gastronomi otentik, serta ${liveEvCount} kalender event & KEN resmi 2026.`}
                      </p>
                    );
                  })()}
                </div>

                <div className="pt-2">
                  <a
                    href="/downloads/malala-panduan-wisata-sumbar-2026.pdf"
                    download="MALALA-Panduan-Wisata-Sumatera-Barat-2026.pdf"
                    className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-jakarta font-bold text-xs uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:shadow-red-600/30 hover:scale-[1.01] text-center"
                  >
                    <Download className="w-4 h-4 text-white" />
                    <span>{lang === 'en' ? '⬇️ Direct Download PDF (Complete)' : '⬇️ Unduh PDF Resmi (Lengkap)'}</span>
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                {(dataStore.downloadItems && dataStore.downloadItems.length > 0 ? dataStore.downloadItems : DOWNLOAD_ITEMS).map((item: any) => {
                  const isEn = lang === 'en';
                  return (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 bg-white hover:border-black transition-all flex flex-col justify-between space-y-3 shadow-xs group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="bg-black text-white font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider">
                            {isEn && item.categoryEn ? item.categoryEn : item.category}
                          </span>
                          <span className="text-gray-400 font-jakarta text-[10px] font-semibold">
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
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-black text-white font-jakarta font-bold text-xs uppercase hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-green-400" />
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

        {/* Footer info */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center font-jakarta text-[10px] text-gray-500 uppercase tracking-widest shrink-0">
          Dinas Pariwisata Provinsi Sumatera Barat © 2026 — Visit Wonderful West Sumatra
        </div>
      </div>
      </>
      )}

      {/* MODAL INFORMATION DIALOG FOR DESTINATIONS */}
      {selectedDestination && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-up space-y-4 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="-mx-6 -mt-6 mb-4 h-48 overflow-hidden bg-gray-100 relative">
              <img
                src={selectedDestination.imageUrl}
                alt={selectedDestination.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="bg-white text-black font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider">
                  {lang === 'en' && selectedDestination.categoryEn ? selectedDestination.categoryEn : selectedDestination.category}
                </span>
                <h3 className="font-orbitron font-bold text-base uppercase text-white pt-1 drop-shadow-xs">
                  {lang === 'en' && selectedDestination.titleEn ? selectedDestination.titleEn : selectedDestination.title}
                </h3>
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-jakarta text-xs text-gray-500 flex items-center gap-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {lang === 'en' && selectedDestination.locationDetailsEn ? selectedDestination.locationDetailsEn : selectedDestination.locationDetails}
              </p>
            </div>

            <div className="font-jakarta text-xs text-gray-700 leading-relaxed pt-2 border-t border-gray-100 space-y-3">
              {(lang === 'en' && selectedDestination.descriptionEn ? selectedDestination.descriptionEn : selectedDestination.description)
                .split('\n\n')
                .map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
            </div>

            <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <h4 className="font-jakarta font-bold text-xs uppercase text-black tracking-wider">
                {lang === 'en' ? 'Highlights' : 'Daya Tarik Utama (Highlights)'}
              </h4>
              <ul className="space-y-1 text-xs font-jakarta text-gray-700">
                {(lang === 'en' && selectedDestination.highlightsEn ? selectedDestination.highlightsEn : selectedDestination.highlights).map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between text-xs font-jakarta pt-2">
              <span className="text-gray-500">{lang === 'en' ? 'Best Time to Visit:' : 'Waktu Terbaik Berkunjung:'}</span>
              <span className="font-bold text-black">{lang === 'en' && selectedDestination.bestTimeEn ? selectedDestination.bestTimeEn : selectedDestination.bestTime}</span>
            </div>

            {getGoogleMapsUrl(selectedDestination.mapUrl) && (
              <a
                href={getGoogleMapsUrl(selectedDestination.mapUrl)!}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-blue-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2 shadow-xs"
              >
                <MapPin className="w-4 h-4 text-white" />
                <span>{translations[lang].btnOpenMap}</span>
              </a>
            )}

            {selectedDestination.videoUrl && (
              <a
                href={selectedDestination.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FF0000] text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-red-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2"
              >
                <Youtube className="w-4 h-4" />
                {lang === 'en' ? 'Watch Video (YouTube)' : 'Tonton Video (YouTube)'}
              </a>
            )}

            <button
              onClick={() => setSelectedDestination(null)}
              className="w-full bg-black text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {translations[lang].btnClose}
            </button>
          </div>
        </div>
      )}

      {/* MODAL INFORMATION DIALOG FOR CULTURE */}
      {selectedCulture && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-up space-y-4 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCulture(null)}
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

            {getGoogleMapsUrl(selectedCulture.mapUrl) && (
              <a
                href={getGoogleMapsUrl(selectedCulture.mapUrl)!}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-blue-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2 shadow-xs"
              >
                <MapPin className="w-4 h-4 text-white" />
                <span>{translations[lang].btnOpenMap}</span>
              </a>
            )}

            {selectedCulture.videoUrl && (
              <a
                href={selectedCulture.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FF0000] text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-red-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2"
              >
                <Youtube className="w-4 h-4" />
                {lang === 'en' ? 'Watch Video (YouTube)' : 'Tonton Video (YouTube)'}
              </a>
            )}

            <button
              onClick={() => setSelectedCulture(null)}
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
              onClick={() => setSelectedCulinary(null)}
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

            {getGoogleMapsUrl(selectedCulinary.mapUrl) && (
              <a
                href={getGoogleMapsUrl(selectedCulinary.mapUrl)!}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-blue-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2 shadow-xs"
              >
                <MapPin className="w-4 h-4 text-white" />
                <span>{translations[lang].btnOpenMap}</span>
              </a>
            )}

            {selectedCulinary.videoUrl && (
              <a
                href={selectedCulinary.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FF0000] text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-red-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2"
              >
                <Youtube className="w-4 h-4" />
                {lang === 'en' ? 'Watch Video (YouTube)' : 'Tonton Video (YouTube)'}
              </a>
            )}

            <button
              onClick={() => setSelectedCulinary(null)}
              className="w-full bg-black text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {translations[lang].btnClose}
            </button>
          </div>
        </div>
      )}

      {/* MODAL INFORMATION DIALOG FOR EVENTS */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-up space-y-4 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEvent(null)}
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
                className="w-full bg-black hover:bg-neutral-800 text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs transition-all cursor-pointer flex justify-center items-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{lang === 'en' ? 'Plan Trip to This Event with AI' : '✨ Susun Rencana Liburan ke Event Ini dengan AI'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getGoogleCalendarUrl(selectedEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs transition-colors cursor-pointer flex justify-center items-center gap-1.5 shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Add to Calendar' : 'Simpan ke Kalender'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleShareEvent(selectedEvent)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs transition-colors cursor-pointer flex justify-center items-center gap-1.5 border border-gray-200"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Share Event' : 'Bagikan Event'}</span>
                </button>
              </div>
            </div>

            {getGoogleMapsUrl(selectedEvent.mapUrl) && (
              <a
                href={getGoogleMapsUrl(selectedEvent.mapUrl)!}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-emerald-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2 shadow-xs"
              >
                <MapPin className="w-4 h-4 text-white" />
                <span>{translations[lang].btnOpenMap}</span>
              </a>
            )}

            {selectedEvent.videoUrl && (
              <a
                href={selectedEvent.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FF0000] text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-red-700 transition-colors cursor-pointer flex justify-center items-center gap-2 mt-2"
              >
                <Youtube className="w-4 h-4" />
                {lang === 'en' ? 'Watch Video (YouTube)' : 'Tonton Video (YouTube)'}
              </a>
            )}

            <button
              onClick={() => setSelectedEvent(null)}
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
        onClose={() => setIsBookletModalOpen(false)}
        lang={lang}
        dataStore={dataStore}
      />
    </>
  );
};
