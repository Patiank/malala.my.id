import React, { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { logTourismSignal } from '../utils/telemetry';
import { 
  BarChart3, Download, RefreshCw, Users, Compass, 
  BookmarkCheck, Calendar, FileText, Smartphone, Monitor, 
  Sparkles, FileSpreadsheet, Activity, Layers
} from 'lucide-react';

interface TourismSignalItem {
  id?: string;
  visitorId: string;
  sessionId: string;
  eventType: 'session_start' | 'save_bookmark' | 'generate_itinerary' | 'download_pdf' | 'view_destination' | 'view_event' | 'affiliate_click';
  timestamp: string;
  screen?: 'mobile' | 'desktop';
  language?: string;
  targetId?: string;
  title?: string;
  durationDays?: number;
  travelerCategory?: string;
  originType?: string;
  type?: string;
  landingPage?: string;
  [key: string]: any;
}

export const TourismIntelligenceTab: React.FC = () => {
  const [signals, setSignals] = useState<TourismSignalItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Subscribe to real-time tourism_signals from Firestore
  useEffect(() => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, 'tourism_signals'),
        orderBy('timestamp', 'desc'),
        limit(300)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items: TourismSignalItem[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as any
        }));
        setSignals(items);
        setIsLoading(false);
      }, (err) => {
        console.warn('Firestore tourism_signals listener notice:', err);
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn('Failed to init tourism_signals listener:', e);
      setIsLoading(false);
    }
  }, []);

  // Compute aggregated statistics
  const stats = useMemo(() => {
    const totalSignals = signals.length;
    const uniqueVisitors = new Set(signals.map(s => s.visitorId)).size;
    const sessionStarts = signals.filter(s => s.eventType === 'session_start').length;
    const bookmarks = signals.filter(s => s.eventType === 'save_bookmark');
    const itineraries = signals.filter(s => s.eventType === 'generate_itinerary');
    const pdfDownloads = signals.filter(s => s.eventType === 'download_pdf').length;

    // Top Bookmarked / Favorite Destinations
    const destCounts: Record<string, { title: string; count: number }> = {};
    bookmarks.forEach(b => {
      const key = b.targetId || b.title || 'Wisata Sumbar';
      const label = b.title || b.targetId || 'Wisata Sumbar';
      if (!destCounts[key]) destCounts[key] = { title: label, count: 0 };
      destCounts[key].count++;
    });
    const topDestinations = Object.values(destCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Duration Preferences
    const durationCounts: Record<number, number> = {};
    itineraries.forEach(it => {
      const d = it.durationDays || 3;
      durationCounts[d] = (durationCounts[d] || 0) + 1;
    });

    // Device breakdown
    const mobileCount = signals.filter(s => s.screen === 'mobile').length;
    const desktopCount = signals.filter(s => s.screen === 'desktop').length;

    return {
      totalSignals,
      uniqueVisitors,
      sessionStarts,
      totalBookmarks: bookmarks.length,
      totalItineraries: itineraries.length,
      pdfDownloads,
      topDestinations,
      durationCounts,
      mobileCount,
      desktopCount,
    };
  }, [signals]);

  // Filtered signal logs
  const filteredSignals = useMemo(() => {
    if (filterType === 'all') return signals;
    return signals.filter(s => s.eventType === filterType);
  }, [signals, filterType]);

  // Export CSV
  const handleExportCSV = () => {
    if (signals.length === 0) {
      alert('Belum ada data sinyal untuk diexport.');
      return;
    }

    const headers = ['Waktu', 'Tipe_Event', 'Target_ID', 'Judul_Detail', 'Durasi_Hari', 'Kategori_Wisatawan', 'Perangkat', 'Bahasa', 'Visitor_ID', 'Session_ID'];
    const rows = signals.map(s => [
      s.timestamp ? `"${s.timestamp}"` : '""',
      `"${s.eventType || ''}"`,
      `"${s.targetId || ''}"`,
      `"${(s.title || '').replace(/"/g, '""')}"`,
      s.durationDays || '',
      `"${s.travelerCategory || s.originType || ''}"`,
      `"${s.screen || 'mobile'}"`,
      `"${s.language || 'id-ID'}"`,
      `"${s.visitorId || ''}"`,
      `"${s.sessionId || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `malala_sinyal_pariwisata_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export JSON (for Google Colab / PyTrends)
  const handleExportJSON = () => {
    if (signals.length === 0) {
      alert('Belum ada data sinyal untuk diexport.');
      return;
    }

    const exportData = {
      source: 'Malala Smart Tourism Intelligence Portal (malala.my.id)',
      generatedAt: new Date().toISOString(),
      totalRecords: signals.length,
      summary: stats,
      signals: signals
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `malala_tourism_signals_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Test Simulation Signal
  const handleSimulateSignal = async () => {
    setIsSimulating(true);
    try {
      await logTourismSignal('save_bookmark', {
        targetId: 'lembah-harau',
        title: 'Lembah Harau Payakumbuh',
        category: 'Geopark & Alam'
      });
      setTimeout(() => setIsSimulating(false), 800);
    } catch {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-5 font-jakarta">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-5 rounded-2xl border border-blue-500/30 shadow-lg space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base uppercase tracking-wider text-blue-200">
                  Intelijen Wisata & Data Cookie Sinyal
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Live Stream</span>
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Data tren minat, durasi kunjungan, dan preferensi anonim wisatawan untuk analisis kebijakan Dinas Pariwisata Sumbar.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleSimulateSignal}
              disabled={isSimulating}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              title="Uji coba kirim 1 sinyal contoh ke database"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isSimulating ? 'Mengirim...' : 'Tes Sinyal'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-md active:scale-95"
              title="Download format CSV untuk Excel / Spreadsheet Dinas"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Unduh CSV (Excel)</span>
            </button>

            <button
              type="button"
              onClick={handleExportJSON}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-md active:scale-95"
              title="Download format JSON untuk diolah di Google Colab / PyTrends"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh JSON (Colab)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[11px] font-bold uppercase">Total Sinyal</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-orbitron font-bold text-gray-900">
            {stats.totalSignals.toLocaleString()}
          </div>
          <p className="text-[10px] text-gray-500">Aktivitas anonim terekam</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[11px] font-bold uppercase">Wisatawan Unik</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl font-orbitron font-bold text-purple-900">
            {stats.uniqueVisitors.toLocaleString()}
          </div>
          <p className="text-[10px] text-gray-500">ID Browser anonim</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[11px] font-bold uppercase">Sesi Wisata</span>
            <Compass className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-orbitron font-bold text-amber-900">
            {stats.sessionStarts.toLocaleString()}
          </div>
          <p className="text-[10px] text-gray-500">Persetujuan cookie aktif</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[11px] font-bold uppercase">Destinasi Simpan</span>
            <BookmarkCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-orbitron font-bold text-emerald-900">
            {stats.totalBookmarks.toLocaleString()}
          </div>
          <p className="text-[10px] text-gray-500">Minat impian (Bookmark)</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[11px] font-bold uppercase">Itinerary AI</span>
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl font-orbitron font-bold text-indigo-900">
            {stats.totalItineraries.toLocaleString()}
          </div>
          <p className="text-[10px] text-gray-500">Rencana trip dibuat</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[11px] font-bold uppercase">PDF Diunduh</span>
            <FileText className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl font-orbitron font-bold text-rose-900">
            {stats.pdfDownloads.toLocaleString()}
          </div>
          <p className="text-[10px] text-gray-500">Rencana dicetak/disimpan</p>
        </div>
      </div>

      {/* Intelligence Insights Breakdown (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Favorite Destinations */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              <span>Top Destinasi Paling Diminati (Bookmark Wisatawan)</span>
            </h4>
            <span className="text-[11px] text-gray-400 font-mono">5 Teratas</span>
          </div>

          {stats.topDestinations.length === 0 ? (
            <p className="text-xs text-gray-400 italic py-4 text-center">
              Belum ada data bookmark destinasi yang terekam.
            </p>
          ) : (
            <div className="space-y-2">
              {stats.topDestinations.map((dest, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-gray-800">{dest.title}</span>
                  </div>
                  <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full font-mono">
                    {dest.count}x disimpan
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Duration & Device Preferences */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Preferensi Durasi Liburan Wisatawan</span>
            </h4>
            <span className="text-[11px] text-gray-400 font-mono">AI Planner</span>
          </div>

          {Object.keys(stats.durationCounts).length === 0 ? (
            <p className="text-xs text-gray-400 italic py-4 text-center">
              Belum ada data pembuatan itinerary yang terekam.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(stats.durationCounts).map(([days, count]) => (
                <div key={days} className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 text-center space-y-1">
                  <div className="text-xs font-bold text-blue-950">{days} Hari Trip</div>
                  <div className="text-lg font-orbitron font-bold text-blue-700">{count}x</div>
                  <div className="text-[10px] text-blue-600/80">Pilihan Liburan</div>
                </div>
              ))}
            </div>
          )}

          {/* Device Distribution */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span className="font-semibold text-gray-700">Akses Perangkat:</span>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="flex items-center gap-1 text-slate-700">
                <Smartphone className="w-3.5 h-3.5 text-blue-500" />
                Mobile: {stats.mobileCount} ({stats.totalSignals ? Math.round((stats.mobileCount / stats.totalSignals) * 100) : 0}%)
              </span>
              <span className="flex items-center gap-1 text-slate-700">
                <Monitor className="w-3.5 h-3.5 text-indigo-500" />
                Desktop: {stats.desktopCount} ({stats.totalSignals ? Math.round((stats.desktopCount / stats.totalSignals) * 100) : 0}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Data Stream Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden space-y-0">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gray-700" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Log Rekaman Sinyal Real-Time ({filteredSignals.length})
            </h4>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1 flex-wrap text-[11px]">
            {[
              { key: 'all', label: 'Semua Sinyal' },
              { key: 'session_start', label: 'Sesi Cookie' },
              { key: 'save_bookmark', label: 'Bookmark' },
              { key: 'generate_itinerary', label: 'Itinerary' },
              { key: 'download_pdf', label: 'Download PDF' },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilterType(f.key)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  filterType === f.key
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-400 space-y-2">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto text-blue-600" />
            <p className="text-xs">Memuat aliran data sinyal dari Cloud Firestore...</p>
          </div>
        ) : filteredSignals.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <span className="text-2xl">📊</span>
            <p className="text-xs font-semibold">Belum ada rekaman sinyal untuk filter ini.</p>
            <p className="text-[11px] text-gray-400">
              Klik tombol <strong>"Tes Sinyal"</strong> di kanan atas untuk membuat sinyal uji coba pertama Anda.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto max-h-96 custom-scrollbar">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100/80 text-gray-600 font-bold uppercase text-[10px] border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="p-3">Waktu</th>
                  <th className="p-3">Jenis Sinyal</th>
                  <th className="p-3">Detail / Target Wisata</th>
                  <th className="p-3">Perangkat</th>
                  <th className="p-3">ID Sesi Anonim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSignals.map((sig, idx) => {
                  let badgeColor = 'bg-gray-100 text-gray-700';
                  let badgeLabel: string = sig.eventType;

                  if (sig.eventType === 'session_start') {
                    badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
                    badgeLabel = 'Cookie Active / Sesi';
                  } else if (sig.eventType === 'save_bookmark') {
                    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                    badgeLabel = 'Bookmark Destinasi';
                  } else if (sig.eventType === 'generate_itinerary') {
                    badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-200';
                    badgeLabel = `Itinerary (${sig.durationDays || 3} Hari)`;
                  } else if (sig.eventType === 'download_pdf') {
                    badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
                    badgeLabel = 'Unduh PDF A4';
                  }

                  const timeFormatted = sig.timestamp
                    ? new Date(sig.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', day: 'numeric', month: 'short' })
                    : '-';

                  return (
                    <tr key={sig.id || idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-3 font-mono text-[11px] text-gray-500 whitespace-nowrap">
                        {timeFormatted}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                          {badgeLabel}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-gray-800">
                        {sig.title || sig.targetId || (sig.landingPage ? `Kunjungan ${sig.landingPage}` : '-')}
                      </td>
                      <td className="p-3 text-gray-500 text-[11px] whitespace-nowrap">
                        {sig.screen === 'mobile' ? '📱 Mobile' : '💻 Desktop'}
                      </td>
                      <td className="p-3 font-mono text-[10px] text-gray-400 whitespace-nowrap truncate max-w-[120px]" title={sig.visitorId}>
                        {sig.visitorId ? sig.visitorId.slice(0, 14) + '...' : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

