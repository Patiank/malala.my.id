import { jsPDF } from 'jspdf';
import { cleanPdfText } from './pdfGenerator';

export interface IntelligenceStats {
  totalSignals?: number;
  uniqueVisitors?: number;
  sessionStarts?: number;
  totalBookmarks?: number;
  totalItineraries?: number;
  pdfDownloads?: number;
  topDestinations?: Array<{ title: string; count: number }>;
  durationCounts?: Record<string | number, number>;
  durationDistribution?: Record<string | number, number>;
  mobileCount?: number;
  desktopCount?: number;
  deviceDistribution?: { mobile?: number; desktop?: number };
}

/**
 * GENERATOR LAPORAN INFOGRAFIS INTELIJEN PARIWISATA & SINYAL COOKIE
 * Menghasilkan dokumen A4 Infografis Resmi untuk Dinas Pariwisata Sumatera Barat
 */
export function generateTourismIntelligenceReportPDF(
  signals: any[] = [],
  stats: any = {}
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  // Safe Stats extraction with resilient fallbacks
  const safeTotalSignals = stats?.totalSignals ?? (Array.isArray(signals) ? signals.length : 0);
  const safeUniqueVisitors = stats?.uniqueVisitors ?? 0;
  const safeSessionStarts = stats?.sessionStarts ?? 0;
  const safeTotalBookmarks = stats?.totalBookmarks ?? 0;
  const safeTotalItineraries = stats?.totalItineraries ?? 0;
  const safePdfDownloads = stats?.pdfDownloads ?? 0;
  const topDestinations = Array.isArray(stats?.topDestinations) ? stats.topDestinations : [];

  const durations = stats?.durationCounts || stats?.durationDistribution || {};
  const durationEntries = Object.entries(durations);

  const mobileCount = stats?.mobileCount ?? stats?.deviceDistribution?.mobile ?? 0;
  const desktopCount = stats?.desktopCount ?? stats?.deviceDistribution?.desktop ?? 0;
  const totalDev = (mobileCount + desktopCount) || 1;
  const mobPct = Math.round((mobileCount / totalDev) * 100);
  const dskPct = 100 - mobPct;

  // =========================================================================
  // 1. HEADER / MASTHEAD INFOGRAFIS EKSEKUTIF
  // =========================================================================
  // Header Background (Deep Slate Blue)
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Decorative Accent Bars (Minangkabau Gold & Crimson)
  doc.setFillColor(217, 119, 6); // amber-600
  doc.rect(0, 42, pageWidth, 2.5, 'F');
  doc.setFillColor(220, 38, 38); // red-600
  doc.rect(0, 44.5, pageWidth, 1, 'F');

  // Brand Tagline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(251, 191, 36); // amber-400
  doc.text('MALALA 2026 | SISTEM INTELIJEN KEPUTUSAN PARIWISATA DIGITAL', margin, 11);

  // Main Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15.5);
  doc.setTextColor(255, 255, 255);
  doc.text('LAPORAN INFOGRAFIS SINYAL & PREFERENSI WISATAWAN', margin, 20);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text(
    'Analisis Data Penjelajahan, Minat Destinasi, & Cookie Anonim | Dinas Pariwisata Provinsi Sumatera Barat',
    margin,
    27
  );

  // Metadata Strip
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const timeFormatted = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  }) + ' WIB';

  doc.setFillColor(30, 41, 59); // slate-800
  doc.roundedRect(margin, 31, contentWidth, 7, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('TANGGAL DITERBITKAN: ', margin + 3, 35.5);
  doc.setTextColor(241, 245, 249);
  doc.text(`${dateFormatted}, ${timeFormatted}`, margin + 35, 35.5);

  doc.setTextColor(148, 163, 184);
  doc.text('STATUS REGULASI: ', margin + 95, 35.5);
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text('UU PDP No. 27/2022 (Anonim & Agregat)', margin + 125, 35.5);

  // =========================================================================
  // 2. EXECUTIVE KPI CARDS (6 INFOGRAPHIC TILES)
  // =========================================================================
  let currentY = 52;

  // Section Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('1. RINGKASAN METRIK KUNCI INTERAKSI PENGUNJUNG (KPI OVERVIEW)', margin, currentY);

  currentY += 4;

  const cardW = (contentWidth - 8) / 3;
  const cardH = 20;

  const kpis = [
    {
      title: 'TOTAL SINYAL TERREKAM',
      val: safeTotalSignals.toLocaleString(),
      sub: 'Interaksi digital tercatat',
      bg: [239, 246, 255],
      border: [191, 219, 254],
      textColor: [30, 64, 175]
    },
    {
      title: 'WISATAWAN UNIK (REACH)',
      val: safeUniqueVisitors.toLocaleString(),
      sub: 'Perangkat penjelajah unik',
      bg: [250, 245, 255],
      border: [233, 213, 255],
      textColor: [107, 33, 168]
    },
    {
      title: 'SESI KUNJUNGAN COOKIE',
      val: safeSessionStarts.toLocaleString(),
      sub: 'Persetujuan cookie aktif',
      bg: [254, 252, 232],
      border: [254, 240, 138],
      textColor: [146, 64, 14]
    },
    {
      title: 'MINAT DESTINASI (BOOKMARK)',
      val: safeTotalBookmarks.toLocaleString(),
      sub: 'Objek wisata disimpan',
      bg: [236, 253, 245],
      border: [167, 243, 208],
      textColor: [6, 95, 70]
    },
    {
      title: 'ITINERARY AI DIGENERATE',
      val: safeTotalItineraries.toLocaleString(),
      sub: 'Perencanaan rute dibuat',
      bg: [238, 242, 255],
      border: [199, 210, 254],
      textColor: [55, 48, 163]
    },
    {
      title: 'PANDUAN PDF DIUNDUH',
      val: safePdfDownloads.toLocaleString(),
      sub: 'Wisatawan siap berangkat',
      bg: [255, 241, 242],
      border: [254, 205, 211],
      textColor: [159, 18, 57]
    }
  ];

  kpis.forEach((kpi, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = margin + col * (cardW + 4);
    const y = currentY + row * (cardH + 3.5);

    doc.setFillColor(kpi.bg[0], kpi.bg[1], kpi.bg[2]);
    doc.setDrawColor(kpi.border[0], kpi.border[1], kpi.border[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, cardW, cardH, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(100, 116, 139);
    doc.text(kpi.title, x + 3.5, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(kpi.textColor[0], kpi.textColor[1], kpi.textColor[2]);
    doc.text(kpi.val, x + 3.5, y + 12.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(kpi.sub, x + 3.5, y + 17);
  });

  currentY += (cardH * 2) + 9;

  // =========================================================================
  // 3. INFOGRAFIS TOP DESTINASI PALING DIMINATI (BAR CHART)
  // =========================================================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('2. DESTINASI DENGAN MINAT TERTINGGI (TOP WISHED DESTINATIONS)', margin, currentY);

  currentY += 4;

  const topDestBoxH = 50;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, topDestBoxH, 2.5, 2.5, 'FD');

  const maxBookmarks = topDestinations.length > 0
    ? Math.max(...topDestinations.map(d => d.count || 0), 1)
    : 1;

  if (topDestinations.length === 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Belum ada sinyal bookmark destinasi yang terekam dalam periode ini.', margin + 10, currentY + 25);
  } else {
    topDestinations.slice(0, 5).forEach((item, idx) => {
      const rowY = currentY + 7 + idx * 8.2;
      const cleanTitle = cleanPdfText(item.title || 'Destinasi Favorit').slice(0, 32);

      // Rank Circle
      doc.setFillColor(idx === 0 ? 217 : 241, idx === 0 ? 119 : 245, idx === 0 ? 6 : 249);
      doc.circle(margin + 6, rowY - 1, 2.8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(idx === 0 ? 255 : 71, idx === 0 ? 255 : 85, idx === 0 ? 255 : 105);
      doc.text(String(idx + 1), margin + 4.9, rowY);

      // Destination Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.text(cleanTitle, margin + 12, rowY);

      // Bar Chart visualizer
      const maxBarWidth = 72;
      const barWidth = Math.max(6, ((item.count || 1) / maxBookmarks) * maxBarWidth);
      const barStartX = margin + 82;

      doc.setFillColor(226, 232, 240);
      doc.roundedRect(barStartX, rowY - 3.2, maxBarWidth, 4.5, 1, 1, 'F');

      const barColors = [
        [16, 185, 129],
        [14, 165, 233],
        [168, 85, 247],
        [245, 158, 11],
        [239, 68, 68]
      ];
      const color = barColors[idx % barColors.length];
      doc.setFillColor(color[0], color[1], color[2]);
      doc.roundedRect(barStartX, rowY - 3.2, barWidth, 4.5, 1, 1, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${item.count || 0} Sinyal`, barStartX + maxBarWidth + 4, rowY);
    });
  }

  currentY += topDestBoxH + 7;

  // =========================================================================
  // 4. DISTRIBUSI DURASI & AKSES PERANGKAT (2 COLUMNS)
  // =========================================================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('3. PROFIL PERJALANAN & AKSESIBILITAS TEKNOLOGI', margin, currentY);

  currentY += 4;

  const colW = (contentWidth - 5) / 2;
  const sec3BoxH = 38;

  // Left Box: Preferensi Durasi
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, colW, sec3BoxH, 2, 2, 'FD');

  // Decorative Accent Pill
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.roundedRect(margin + 4, currentY + 4, 2, 3.5, 0.5, 0.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);
  doc.text('PREFERENSI DURASI LIBURAN (TRIP DAYS)', margin + 8, currentY + 6.5);

  const totalDurations = durationEntries.reduce((acc, [, val]) => acc + (Number(val) || 0), 0) || 1;

  if (durationEntries.length === 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('Belum ada data perencanaan rute tercatat.', margin + 4, currentY + 18);
  } else {
    durationEntries.slice(0, 3).forEach(([dur, count], i) => {
      const dy = currentY + 13 + i * 7.5;
      const numCount = Number(count) || 0;
      const pct = Math.round((numCount / totalDurations) * 100);
      const label = dur === '1' ? '1 Hari (Ekskursi Singkat)' : dur === '2' ? '2-3 Hari (Short Stay)' : dur === '3' ? '4-7 Hari (Eksplorasi Lengkap)' : `${dur} Hari`;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.2);
      doc.setTextColor(30, 41, 59);
      doc.text(label, margin + 4, dy);

      const durBarW = 30;
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin + colW - durBarW - 14, dy - 2.8, durBarW, 3.5, 0.8, 0.8, 'F');
      doc.setFillColor(79, 70, 229);
      doc.roundedRect(margin + colW - durBarW - 14, dy - 2.8, Math.max(2, (pct / 100) * durBarW), 3.5, 0.8, 0.8, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(79, 70, 229);
      doc.text(`${pct}%`, margin + colW - 11, dy);
    });
  }

  // Right Box: Sebaran Perangkat
  const rightX = margin + colW + 5;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rightX, currentY, colW, sec3BoxH, 2, 2, 'FD');

  // Decorative Accent Pill
  doc.setFillColor(14, 165, 233); // sky-500
  doc.roundedRect(rightX + 4, currentY + 4, 2, 3.5, 0.5, 0.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);
  doc.text('SEBARAN PERANGKAT PENJELAJAH (DEVICE SPLIT)', rightX + 8, currentY + 6.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`Mobile (Smartphone): ${mobPct}%`, rightX + 4, currentY + 14);
  doc.text(`Desktop / Laptop: ${dskPct}%`, rightX + 4, currentY + 22);

  const meterW = colW - 8;
  const mobW = Math.max(3, (mobPct / 100) * meterW);
  doc.setFillColor(14, 165, 233);
  doc.roundedRect(rightX + 4, currentY + 26, mobW, 5, 1, 1, 'F');
  doc.setFillColor(100, 116, 139);
  doc.roundedRect(rightX + 4 + mobW, currentY + 26, meterW - mobW, 5, 1, 1, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(100, 116, 139);
  doc.text('Biru: Mobile | Abu-abu: Desktop', rightX + 4, currentY + 35);

  currentY += sec3BoxH + 7;

  // =========================================================================
  // 5. REKOMENDASI KEBIJAKAN STRATEGIS DINAS PARIWISATA
  // =========================================================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('4. REKOMENDASI STRATEGIS & KESIMPULAN KEBIJAKAN DINAS', margin, currentY);

  currentY += 4;

  const policyBoxH = 43;
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, currentY, contentWidth, policyBoxH, 2.5, 2.5, 'FD');

  const policies = [
    {
      label: 'Alokasi Promosi & Event Prioritas:',
      desc: 'Destinasi peringkat teratas memperlihatkan intensitas minat tertinggi. Disarankan mengalokasikan agenda festival dan perbaikan fasilitas pendukung di lokasi-lokasi tersebut.'
    },
    {
      label: 'Optimalisasi Paket Wisata 2-3 Hari:',
      desc: 'Wisatawan menunjukkan preferensi dominan pada durasi liburan short-stay (akhir pekan). Asosiasi travel dan Pokdarwis perlu didorong menyusun rute terintegrasi 2-3 hari.'
    },
    {
      label: 'Pemasaran Digital Mobile-First:',
      desc: 'Akses pengunjung didominasi oleh perangkat ponsel pintar. Seluruh materi kampanye media sosial, pamflet digital, dan panduan wisata wajib berorientasi format vertikal responsif.'
    },
    {
      label: 'Kepatuhan Regulasi & Privasi Data:',
      desc: 'Seluruh data dihimpun berbasis sinyal telemetri agregat tanpa data pribadi (UU PDP No. 27/2022). Aman digunakan sebagai rujukan perumusan kebijakan dinas pariwisata.'
    }
  ];

  policies.forEach((pol, pIdx) => {
    const py = currentY + 5.5 + pIdx * 9.2;
    doc.setFillColor(16, 185, 129);
    doc.circle(margin + 4.5, py - 1, 1.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(6, 95, 70);
    doc.text(pol.label, margin + 8, py);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(30, 41, 59);
    const splitDesc = doc.splitTextToSize(pol.desc, contentWidth - 10);
    doc.text(splitDesc, margin + 8, py + 3.2);
  });

  // Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Dihasilkan secara otomatis oleh Malala Tourism Decision Support System | https://malala.my.id',
    margin,
    pageHeight - 7
  );

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('DOKUMEN EKSEKUTIF A4 | INFOGRAFIS RESMI', pageWidth - margin, pageHeight - 7, { align: 'right' });

  // Download via Blob (Browser environment)
  const filenameDate = now.toISOString().slice(0, 10);
  const filename = `Laporan-Infografis-Intelijen-Wisata-Sumbar-${filenameDate}.pdf`;

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = blobUrl;
    downloadAnchor.download = filename;
    downloadAnchor.style.display = 'none';
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();

    setTimeout(() => {
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(blobUrl);
    }, 3000);
  }
}
