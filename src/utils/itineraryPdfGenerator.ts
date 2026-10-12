import { jsPDF } from 'jspdf';
import { FormAIResponse } from '../types';
import { cleanPdfText } from './pdfGenerator';

/**
 * Pilihan 1: ENGINE HTML BOOK COMPONENT (Precision Centered Boxes & Interactive Clickable Links)
 * - Format Kertas Buku Panduan: 127 x 233.36 mm (360 x 661.5 pt, rasio 9:16.5)
 * - Dimensi Render: 480px x 882px (skala presisi rasio 1 : 1.8375)
 * - Fitur Tautan Interaktif Nyata di Dokumen PDF:
 *   1. Tombol 'BUKA MAPS ↗' & area peta rute di Halaman 2 difungsikan menjadi link aktif PDF (doc.link)
 *      yang membuka rute navigasi Google Maps terencana di peramban atau aplikasi smartphone.
 *   2. Seluruh pin lokasi destinasi pada lembar hari dapat diklik untuk membuka pencarian GPS langsung di Google Maps.
 *   3. Seluruh 8 tombol kemitraan resmi (Traveloka & tiket.com) dapat diklik langsung untuk booking hotel,
 *      rental mobil, tiket pesawat, dan atraksi wisata.
 *   4. Penataan teks di dalam seluruh boks, pill waktu, nomor hari, dan tombol 100% rata tengah simetris.
 */

export async function generateExclusiveItineraryPdf(
  aiResponse: FormAIResponse,
  arg2?: any,
  arg3?: any
): Promise<void> {
  if (typeof window === 'undefined' || !aiResponse) return;

  const lang: 'id' | 'en' = (typeof arg2 === 'string' ? arg2 : typeof arg3 === 'string' ? arg3 : 'id') as any;
  const appSettings: any = (typeof arg2 === 'object' ? arg2 : typeof arg3 === 'object' ? arg3 : undefined);
  const isEn = lang === 'en';

  const itineraryDays = aiResponse.itinerary || [];
  const rawTotalDays = itineraryDays.length > 0 ? itineraryDays.length : 3;

  // Tunggu kesiapan web fonts
  try {
    if (document.fonts) {
      await document.fonts.ready;
    }
  } catch {}

  // Buat Overlay Progress Modern untuk Pengguna (Light, Bersih, Tanpa Warna Overlay Gelap)
  const overlay = document.createElement('div');
  overlay.id = 'malala-pdf-export-overlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999999;
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #0f172a;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    padding: 24px;
    text-align: center;
    transition: all 0.3s ease;
  `;

  overlay.innerHTML = `
    <style>
      @keyframes malalaBookFloat {
        0%, 100% { transform: translateY(0px) scale(1); filter: drop-shadow(0 4px 10px rgba(0,0,0,0.08)); }
        50% { transform: translateY(-7px) scale(1.03); filter: drop-shadow(0 12px 20px rgba(220,38,38,0.15)); }
      }
      @keyframes malalaPagePulse {
        0%, 100% { opacity: 0.95; }
        50% { opacity: 0.55; }
      }
      @keyframes malalaBarShimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .malala-book-anim {
        animation: malalaBookFloat 2.4s ease-in-out infinite;
      }
      .malala-page-pulse {
        animation: malalaPagePulse 1.4s ease-in-out infinite;
      }
    </style>
    <div style="background: rgba(255, 255, 255, 0.92); border: 1.5px solid rgba(226, 232, 240, 0.9); border-radius: 28px; padding: 32px 36px; max-width: 440px; width: 90%; box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset; display: flex; flex-direction: column; align-items: center; gap: 16px;">
      
      <!-- Animasi Buku Lottie Asli (Vector Animated dari JSON User) -->
      <div 
        id="malala-lottie-book-box"
        style="width: 140px; height: 75px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;"
      ></div>

      <div>
        <h3 style="font-family: 'Orbitron', sans-serif; font-size: 14.5px; font-weight: 900; color: #0F172A; margin: 0 0 6px; letter-spacing: 0.06em; text-transform: uppercase;">
          ${isEn ? 'PREPARING ITINERARY PDF BOOK' : 'MENYIAPKAN BUKU PDF ITINERARY'}
        </h3>
        <p id="pdf-progress-text" style="font-size: 12.5px; color: #64748B; margin: 0; line-height: 1.5; font-weight: 500;">
          ${isEn ? 'Formatting pages & activating interactive map links...' : 'Menyusun halaman & mengaktifkan navigasi Google Maps...'}
        </p>
      </div>

      <div style="width: 100%; height: 7px; background: #E2E8F0; border-radius: 9999px; overflow: hidden; margin-top: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.06);">
        <div id="pdf-progress-bar" style="width: 15%; height: 100%; background: linear-gradient(90deg, #DC2626, #F59E0B, #DC2626); background-size: 200% 100%; border-radius: 9999px; transition: width 0.3s ease; animation: malalaBarShimmer 2s linear infinite;"></div>
      </div>

      <div style="display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 11px;">✨</span>
        <span style="font-size: 10.5px; color: #94A3B8; font-family: 'Orbitron', sans-serif; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">
          MALALA AI WEST SUMATRA TRIP PLANNER
        </span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Inisialisasi Player Lottie Web untuk Memutar Animasi Buku User secara Mulus
  let lottieAnimationInstance: any = null;
  try {
    const lottieModule = await import('lottie-web');
    const lottie = (lottieModule as any).default || lottieModule;
    const lottieContainer = document.getElementById('malala-lottie-book-box');
    if (lottieContainer) {
      lottieAnimationInstance = lottie.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/book-flip.json',
      });
    }
  } catch (lottieErr) {
    console.warn('Lottie player fallback:', lottieErr);
    const box = document.getElementById('malala-lottie-book-box');
    if (box) {
      box.innerHTML = `<img src="/book-flipping.gif" style="max-width: 100%; max-height: 100%; object-fit: contain;" alt="Loading Book" />`;
    }
  }

  // Wadah Render Khusus (Ukuran tepat 480px)
  const renderContainer = document.createElement('div');
  renderContainer.id = 'malala-pdf-book-dom-engine';
  renderContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 480px;
    z-index: 999999;
    pointer-events: none;
    opacity: 0.001;
    background: #ffffff;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  `;
  document.body.appendChild(renderContainer);

  try {
    // Kumpulkan lokasi kunjungan unik
    const visitedLocations: string[] = [];
    itineraryDays.forEach((d) => {
      (d.activities || []).forEach((act) => {
        const loc = cleanPdfText(act.location || '');
        if (loc && !visitedLocations.includes(loc)) {
          visitedLocations.push(loc);
        }
      });
    });

    const displayWaypoints = visitedLocations.length > 0
      ? visitedLocations.slice(0, 8)
      : ['Bandara Minangkabau (BIM)', 'Lembah Anai', 'Jam Gadang Bukittinggi', 'Ngarai Sianok', 'Lembah Harau', 'Danau Singkarak', 'Istano Pagaruyung', 'Pantai Padang'];

    const originQuery = 'Bandara Internasional Minangkabau';
    const destQuery = visitedLocations[visitedLocations.length - 1] || 'Padang';
    const waypointsQuery = visitedLocations.slice(0, 5).map((l) => encodeURIComponent(l)).join('|');
    const googleMapsUrl = visitedLocations.length > 0
      ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originQuery)}&destination=${encodeURIComponent(destQuery)}&waypoints=${waypointsQuery}&travelmode=driving`
      : 'https://www.google.com/maps/search/?api=1&query=Wisata+Sumatera+Barat';

    // Link Mitra Logistik (Robust Valid Service Paths & Full Tracking URL Support)
    const tiketAffId = (appSettings?.tiketAffiliateId || '6a893170239c5bf8a8b71930').trim();
    const travelokaAffId = (appSettings?.travelokaAffiliateId || '').trim();

    const buildTiketUrl = (baseUrl: string): string => {
      const token = (tiketAffId || '6a893170239c5bf8a8b71930').trim();
      if (token.startsWith('http://') || token.startsWith('https://')) {
        try {
          const parsed = new URL(token);
          if (parsed.search) {
            return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${parsed.search.replace(/^\?/, '')}`;
          }
        } catch {
          return token;
        }
        return token;
      }
      const sep = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${sep}aff_id=${encodeURIComponent(token)}&partner=${encodeURIComponent(token)}&tracking_id=malala_sumbar&utm_source=malala_sumbar`;
    };

    const buildTravelokaUrl = (baseUrl: string): string => {
      const trimmed = (travelokaAffId || '').trim();
      if (!trimmed) return baseUrl;
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        try {
          const parsed = new URL(trimmed);
          const search = parsed.search;
          if (search) {
            return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${search.replace(/^\?/, '')}`;
          }
        } catch {
          return trimmed;
        }
        return trimmed;
      }
      const sep = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${sep}referral-code=${encodeURIComponent(trimmed)}&aff_id=${encodeURIComponent(trimmed)}&partner=${encodeURIComponent(trimmed)}&tracking_id=malala_sumbar&utm_source=malala_sumbar`;
    };

    const tiketHotelUrl = buildTiketUrl('https://www.tiket.com/hotel/search?q=Sumatera+Barat');
    const tiketCarUrl = buildTiketUrl('https://www.tiket.com/sewa-mobil');
    const tiketFlightUrl = buildTiketUrl('https://www.tiket.com/pesawat');
    const tiketActivityUrl = buildTiketUrl('https://www.tiket.com/to-do/search?keyword=Sumatera+Barat');

    const travelokaHotelUrl = buildTravelokaUrl('https://www.traveloka.com/id-id/hotel');
    const travelokaCarUrl = buildTravelokaUrl('https://www.traveloka.com/id-id/car-rental');
    const travelokaFlightUrl = buildTravelokaUrl('https://www.traveloka.com/id-id/flight');
    const travelokaActivityUrl = buildTravelokaUrl('https://www.traveloka.com/id-id/activities');



    const safeTitle = cleanPdfText(aiResponse.title || 'Eksplorasi Ranah Minang');
    const safeSummary = cleanPdfText(
      aiResponse.summary ||
      (isEn
        ? 'Explore the breathtaking harmony of highland landscapes, authentic Minangkabau heritage, and legendary culinary delights with optimized linear routes.'
        : 'Jelajahi perpaduan megah antara lanskap alam pegunungan, kekayaan warisan budaya Minangkabau, dan kelezatan kuliner legendaris dengan rute terencana searah tanpa bolak-balik.')
    );

    // Kumpulan HTML lembaran buku
    const pagesHtml: string[] = [];

    // =========================================================================
    // 1. HALAMAN COVER: BACKGROUND PUTIH ELEGAN (LIGHT) + TIPOGRAFI EMAS & MARAWA
    // =========================================================================
    pagesHtml.push(`
      <div class="pdf-book-page" style="width: 480px; height: 882px; background: #FFFFFF; color: #0F172A; padding: 26px 24px; box-sizing: border-box; position: relative; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; flex-direction: column; justify-content: space-between;">
        
        <!-- Bingkai Ganda Emas Minang -->
        <div style="position: absolute; inset: 12px; border: 1.5px solid #D97706; border-radius: 14px; pointer-events: none;"></div>
        <div style="position: absolute; inset: 16px; border: 0.8px solid rgba(217, 119, 6, 0.35); border-radius: 11px; pointer-events: none;"></div>

        <!-- Corner Ornaments Emas Minang -->
        <div style="position: absolute; top: 18px; left: 18px; color: #D97706; font-size: 11px; opacity: 0.85;">✦</div>
        <div style="position: absolute; top: 18px; right: 18px; color: #D97706; font-size: 11px; opacity: 0.85;">✦</div>
        <div style="position: absolute; bottom: 18px; left: 18px; color: #D97706; font-size: 11px; opacity: 0.85;">✦</div>
        <div style="position: absolute; bottom: 18px; right: 18px; color: #D97706; font-size: 11px; opacity: 0.85;">✦</div>

        <div>
          <!-- Pita Tricolor Marawa Minangkabau -->
          <div style="display: flex; height: 5px; width: 140px; margin: 0 auto 14px; border-radius: 3px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.15);">
            <div style="flex: 1; background: #0F172A;"></div>
            <div style="flex: 1; background: #DC2626;"></div>
            <div style="flex: 1; background: #F59E0B;"></div>
          </div>

          <!-- Header Badge Pill -->
          <div style="text-align: center; margin-bottom: 16px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; height: 26px; padding: 0 16px 4.5px 16px; background: #FFFBEB; border: 1.2px solid #FCD34D; color: #92400E; font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 9.5px; letter-spacing: 0.15em; border-radius: 9999px; text-transform: uppercase; box-shadow: 0 1px 3px rgba(0,0,0,0.04); white-space: nowrap; line-height: 1; box-sizing: border-box;">
              MALALA AI WEST SUMATRA TRIP PLANNER
            </span>
          </div>

          <!-- Series Title -->
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-family: 'Orbitron', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: 0.16em; color: #0F172A; margin: 0; line-height: 1.15; word-break: break-word;">
              RANAH MINANG
            </h1>
            <div style="font-size: 10px; font-weight: 700; color: #DC2626; letter-spacing: 0.22em; text-transform: uppercase; margin-top: 6px;">
              ${isEn ? 'WEST SUMATRA TRAVEL ITINERARY GUIDE' : 'PANDUAN EKSKLUSIF PERJALANAN SUMATERA BARAT'}
            </div>
          </div>

          <!-- Judul Itinerary Card -->
          <div style="background: #F8FAFC; border: 1.2px solid #E2E8F0; border-radius: 16px; padding: 16px 14px; text-align: center; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <div style="text-align: center; margin-bottom: 8px;">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 24px; padding: 0 14px 4.5px 14px; background: #0F172A; color: #F59E0B; font-family: 'Orbitron', sans-serif; font-weight: 900; font-size: 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap; line-height: 1; box-sizing: border-box;">
                ${isEn ? `${rawTotalDays} DAYS EXPLORATION` : `${rawTotalDays} HARI EKSPLORASI`}
              </span>
            </div>
            <h2 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14.5px; font-weight: 800; color: #0F172A; line-height: 1.45; margin: 0 0 6px; word-break: break-word; overflow-wrap: break-word; padding-bottom: 2px;">
              ${safeTitle}
            </h2>
            <p style="font-size: 10px; color: #64748B; margin: 0; font-weight: 500; line-height: 1.4; word-break: break-word;">
              ${isEn ? 'Verified Directional Linear Routes • Zero Backtracking' : 'Rute Terencana Searah Tanpa Bolak-Balik • Terverifikasi GPS'}
            </p>
          </div>

          <!-- Stats Grid Profil Perjalanan -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: center; min-height: 52px; box-sizing: border-box; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
              <div style="font-family: 'Orbitron', sans-serif; font-size: 8px; font-weight: 800; color: #D97706; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 3px; line-height: 1;">
                ${isEn ? 'TOUR DURATION:' : 'DURASI TUR:'}
              </div>
              <div style="font-size: 10.5px; font-weight: 700; color: #0F172A; line-height: 1.35; padding-bottom: 2px;">
                ${isEn 
                  ? `${rawTotalDays} Days / ${rawTotalDays > 1 ? rawTotalDays - 1 : 1} Night${rawTotalDays > 2 ? 's' : ''}` 
                  : `${rawTotalDays} Hari / ${rawTotalDays > 1 ? rawTotalDays - 1 : 1} Malam`}
              </div>
            </div>

            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: center; min-height: 52px; box-sizing: border-box; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
              <div style="font-family: 'Orbitron', sans-serif; font-size: 8px; font-weight: 800; color: #D97706; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 3px; line-height: 1;">
                ${isEn ? 'ENTRY GATEWAY:' : 'GERBANG MASUK:'}
              </div>
              <div style="font-size: 10.5px; font-weight: 700; color: #0F172A; line-height: 1.35; word-break: break-word; padding-bottom: 2px;">
                ${isEn ? "Minangkabau Int'l Airport (BIM)" : 'Bandara Minangkabau (BIM)'}
              </div>
            </div>

            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: center; min-height: 52px; box-sizing: border-box; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
              <div style="font-family: 'Orbitron', sans-serif; font-size: 8px; font-weight: 800; color: #D97706; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 3px; line-height: 1;">
                ${isEn ? 'ROUTE CORRIDOR:' : 'KORIDOR RUTE:'}
              </div>
              <div style="font-size: 10.5px; font-weight: 700; color: #0F172A; line-height: 1.35; word-break: break-word; padding-bottom: 2px;">
                Bukittinggi • Harau • Singkarak
              </div>
            </div>

            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: center; min-height: 52px; box-sizing: border-box; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
              <div style="font-family: 'Orbitron', sans-serif; font-size: 8px; font-weight: 800; color: #D97706; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 3px; line-height: 1;">
                ${isEn ? 'GASTRONOMY:' : 'GASTRONOMI:'}
              </div>
              <div style="font-size: 10.5px; font-weight: 700; color: #0F172A; line-height: 1.35; word-break: break-word; padding-bottom: 2px;">
                ${isEn ? 'Rendang & Heritage Cuisine' : 'Rendang & Warisan Kuliner'}
              </div>
            </div>
          </div>
        </div>

        <div>
          <!-- Falsafah Luhur Minangkabau -->
          <div style="text-align: center; margin-bottom: 12px; border-top: 1px solid #FCD34D; padding-top: 10px;">
            <div style="font-size: 10.5px; font-style: italic; color: #92400E; font-weight: 700; margin-bottom: 3px; line-height: 1.4; padding-bottom: 2px;">
              "Adat Basandi Syarak, Syarak Basandi Kitabullah"
            </div>
            <div style="font-size: 9.5px; font-style: italic; color: #64748B; line-height: 1.4; padding-bottom: 2px;">
              ${isEn ? '"Nature Unfolded as Supreme Teacher"' : '"Alam Takambang Jadi Guru"'}
            </div>
          </div>

          <!-- Cover Running Footer dengan Tautan Aktif -->
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 9px; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 8px;">
            <a href="https://malala.my.id" target="_blank" data-pdf-link="https://malala.my.id" style="font-family: 'Orbitron', sans-serif; font-weight: 700; color: #0F172A; text-decoration: none;">
              MALALA.MY.ID
            </a>
            <span style="font-family: 'Orbitron', sans-serif; font-weight: 800; color: #D97706;">COVER</span>
          </div>
        </div>
      </div>
    `);

    // =========================================================================
    // 2. HALAMAN RINGKASAN EKSEKUTIF & PETA RUTE TERENCANA (BUKA MAPS INTERAKTIF)
    // =========================================================================
    pagesHtml.push(`
      <div class="pdf-book-page" style="width: 480px; height: 882px; background: #F8FAFC; color: #0F172A; padding: 20px 22px; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; flex-direction: column; justify-content: space-between;">
        
        <!-- Header Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 28px; height: 28px; background: #0F172A; border-radius: 7px; display: inline-flex; align-items: center; justify-content: center; color: #F59E0B; font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 11px; padding-bottom: 4.5px; line-height: 1; box-sizing: border-box;">
              ★
            </div>
            <div>
              <div style="font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 10.5px; color: #0F172A; letter-spacing: 0.05em; line-height: 1.2;">
                ${isEn ? 'EXECUTIVE TRIP SUMMARY & MAP' : 'RINGKASAN PERJALANAN & PETA RUTE'}
              </div>
              <div style="font-size: 9px; color: #64748B; line-height: 1.2; margin-top: 2px;">
                ${isEn ? 'Linear Route Overview' : 'Ikhtisar Rute Terencana & Koridor Wisata'}
              </div>
            </div>
          </div>
          <span style="display: inline-flex; align-items: center; justify-content: center; height: 24px; padding: 0 11px 4.5px 11px; background: #FEF3C7; border: 1px solid #FCD34D; color: #92400E; font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 9.5px; border-radius: 9999px; white-space: nowrap; line-height: 1; box-sizing: border-box;">
            ${isEn ? `${rawTotalDays} DAYS` : `${rawTotalDays} HARI`}
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px; margin: 8px 0;">
          <!-- Top Card: Summary Narasi Eksekutif -->
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 12px 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 22px; padding: 0 10px 4.5px 10px; background: #0F172A; color: #FBBF24; font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 9px; border-radius: 9999px; letter-spacing: 0.05em; white-space: nowrap; line-height: 1; box-sizing: border-box;">
                ${isEn ? `${rawTotalDays} DAYS • WEST SUMATRA` : `${rawTotalDays} HARI • SUMATERA BARAT`}
              </span>
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 22px; padding: 0 10px 4.5px 10px; background: #F1F5F9; border: 1px solid #CBD5E1; color: #334155; font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 9px; border-radius: 9999px; white-space: nowrap; line-height: 1; box-sizing: border-box;">
                ${isEn ? 'HUB: BIM AIRPORT PADANG' : 'HUB: BANDARA BIM PADANG'}
              </span>
            </div>

            <h3 style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 12.5px; color: #0F172A; margin: 0; line-height: 1.4; word-break: break-word; padding-bottom: 2px;">
              ${safeTitle}
            </h3>

            <p style="text-align: justify; text-justify: inter-word; line-height: 1.55; font-size: 10.5px; color: #475569; margin: 0; font-weight: 400; word-break: break-word; overflow-wrap: break-word; padding-bottom: 3px;">
              ${safeSummary}
            </p>
          </div>

          <!-- Peta Rute Terencana (Top-Down 2D Orthogonal View • Close-Up Focus Pin • Zero Perspective Distortion) -->
          <div style="background: #0F172A; border: 1px solid #1E293B; border-radius: 14px; padding: 10px 12px; color: #FFFFFF; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 13px;">🧭</span>
                <span style="font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 9.5px; color: #FFFFFF; letter-spacing: 0.04em; line-height: 1;">
                  ${isEn ? 'PLANNED ROUTE MAP (TOP-DOWN VIEW)' : 'PETA RUTE TERENCANA (TOP-DOWN VIEW)'}
                </span>
              </div>
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 20px; padding: 0 8px 4.5px 8px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); color: #FBBF24; font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 8.5px; border-radius: 5px; white-space: nowrap; line-height: 1; box-sizing: border-box;">
                ${isEn ? `${rawTotalDays} DAYS • ${displayWaypoints.length} PINS` : `${rawTotalDays} HARI • ${displayWaypoints.length} PIN`}
              </span>
            </div>

            <!-- Kontainer Peta 2D Tegak Lurus dari Sudut Atas (Close-Up Fokus Pin) -->
            <div style="height: 155px; border-radius: 10px; position: relative; overflow: hidden; border: 1.2px solid #334155; background: #F1F5F9;">
              
              <!-- Peta Vektor Kartografi 2D Orthogonal Murni (Bebas Distorsi 3D & Sudut Kemiringan) -->
              <svg style="position: absolute; inset: 0; width: 100%; height: 100%;" viewBox="0 0 436 155">
                <!-- Grid Koordinat Kartografi Halus (Tegak Lurus Top-Down) -->
                <line x1="110" y1="0" x2="110" y2="155" stroke="#CBD5E1" stroke-width="0.7" stroke-dasharray="3 3"/>
                <line x1="220" y1="0" x2="220" y2="155" stroke="#CBD5E1" stroke-width="0.7" stroke-dasharray="3 3"/>
                <line x1="330" y1="0" x2="330" y2="155" stroke="#CBD5E1" stroke-width="0.7" stroke-dasharray="3 3"/>
                <line x1="0" y1="50" x2="436" y2="50" stroke="#CBD5E1" stroke-width="0.7" stroke-dasharray="3 3"/>
                <line x1="0" y1="105" x2="436" y2="105" stroke="#CBD5E1" stroke-width="0.7" stroke-dasharray="3 3"/>

                <!-- Samudra Hindia di Pesisir Barat (Sisi Kiri Datar Tegak Lurus) -->
                <path d="M 0 0 L 72 0 C 65 35, 52 75, 66 115 C 74 135, 82 148, 92 155 L 0 155 Z" fill="#BAE6FD"/>
                <text x="14" y="142" font-family="'Orbitron', sans-serif" font-size="7" font-weight="800" fill="#0284C7" letter-spacing="0.1em" opacity="0.8">${isEn ? 'INDIAN OCEAN' : 'SAMUDRA HINDIA'}</text>

                <!-- Kawasan Dataran Tinggi Bukit Barisan & Cagar Alam Geopark Hijau (Top-Down 2D) -->
                <path d="M 120 12 C 160 5, 200 18, 260 14 C 310 10, 360 6, 436 22 L 436 92 C 380 82, 330 72, 290 58 C 240 62, 190 68, 150 42 Z" fill="#DCFCE7" stroke="#BBF7D0" stroke-width="1"/>
                <path d="M 300 14 C 340 10, 380 14, 436 25 L 436 75 C 390 60, 350 48, 300 14 Z" fill="#BBF7D0" opacity="0.6"/>

                <!-- Danau Maninjau (Top-Down Kaldera Kawah Biru) -->
                <ellipse cx="132" cy="54" rx="14" ry="18" fill="#7DD3FC" stroke="#0284C7" stroke-width="1.2"/>
                <text x="132" y="57" font-family="'Orbitron', sans-serif" font-size="6.5" font-weight="800" fill="#0369A1" text-anchor="middle">${isEn ? 'LAKE MANINJAU' : 'D. MANINJAU'}</text>

                <!-- Danau Singkarak (Top-Down Danau Tektonik Memanjang) -->
                <ellipse cx="236" cy="118" rx="15" ry="24" transform="rotate(-25 236 118)" fill="#7DD3FC" stroke="#0284C7" stroke-width="1.2"/>
                <text x="236" y="122" font-family="'Orbitron', sans-serif" font-size="6.5" font-weight="800" fill="#0369A1" text-anchor="middle">${isEn ? 'LAKE SINGKARAK' : 'D. SINGKARAK'}</text>

                <!-- Jaringan Jalan Raya Arteri Utama (Kuning/Oranye Khas Google Maps Top-Down) -->
                <!-- Jalur Padang - Padang Panjang via Lembah Anai -->
                <path d="M 98 126 Q 135 108 160 84 Q 176 68 196 48" fill="none" stroke="#FDE047" stroke-width="4.5"/>
                <path d="M 98 126 Q 135 108 160 84 Q 176 68 196 48" fill="none" stroke="#F59E0B" stroke-width="2"/>
                
                <!-- Jalur Bukittinggi - Payakumbuh - Lembah Harau -->
                <path d="M 196 48 Q 256 38 316 34 Q 356 28 382 30" fill="none" stroke="#FDE047" stroke-width="4.5"/>
                <path d="M 196 48 Q 256 38 316 34 Q 356 28 382 30" fill="none" stroke="#F59E0B" stroke-width="2"/>

                <!-- Jalur Bukittinggi - Batusangkar - Istano Pagaruyung -->
                <path d="M 196 48 Q 236 66 276 80 Q 292 86 306 96" fill="none" stroke="#FDE047" stroke-width="3.5"/>
                <path d="M 196 48 Q 236 66 276 80 Q 292 86 306 96" fill="none" stroke="#F59E0B" stroke-width="1.8"/>

                <!-- Jalur Batusangkar ke Danau Singkarak -->
                <path d="M 306 96 Q 276 106 250 114" fill="none" stroke="#FDE047" stroke-width="3.5"/>
                <path d="M 306 96 Q 276 106 250 114" fill="none" stroke="#F59E0B" stroke-width="1.8"/>

                <!-- Polyline Navigasi Jalur Wisata Inti (Biru Navigasi GPS Tebal + Strip Putih) -->
                <path d="M 98 126 L 196 48 L 382 30 L 306 96 L 250 114" fill="none" stroke="#1D4ED8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M 98 126 L 196 48 L 382 30 L 306 96 L 250 114" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 4"/>
              </svg>

              <!-- Kompas Arah Mata Angin Top-Down (Pojok Kanan Atas) -->
              <div style="position: absolute; right: 8px; top: 8px; background: rgba(255,255,255,0.92); border: 1px solid #CBD5E1; border-radius: 50%; width: 22px; height: 22px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.15); pointer-events: none;">
                <span style="font-size: 8px; font-weight: 900; color: #DC2626; line-height: 1; font-family: 'Orbitron', sans-serif;">▲</span>
                <span style="font-size: 6.5px; font-weight: 800; color: #0F172A; line-height: 1; font-family: 'Orbitron', sans-serif;">N</span>
              </div>

              <!-- Skala Navigasi GPS Top-Down (Pojok Kiri Bawah) -->
              <div style="position: absolute; left: 8px; bottom: 6px; background: rgba(255,255,255,0.85); border: 1px solid #CBD5E1; border-radius: 3px; padding: 1px 5px; font-size: 6.5px; font-family: 'Orbitron', sans-serif; font-weight: 800; color: #334155; line-height: 1.2; pointer-events: none;">
                ━ 10 KM ━
              </div>

              <!-- Pin-Pin Tetesan Air Merah (#EF4444) Berukuran Besar, Dekat, dan Jelas Sesuai Peta Malala AI -->
              <!-- Pin 1: Gerbang Masuk BIM Padang -->
              <div style="position: absolute; left: 86px; top: 110px; text-align: center;">
                <div style="background: #EF4444; width: 24px; height: 24px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #FFFFFF; box-shadow: 0 3px 6px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                  <div style="transform: rotate(45deg); color: #FFFFFF; font-weight: 900; font-size: 10.5px; line-height: 1; font-family: 'Plus Jakarta Sans', sans-serif;">1</div>
                </div>
                <span style="display: inline-block; background: #FFFFFF; padding: 1px 5px; border-radius: 3px; font-size: 7.5px; font-weight: 800; color: #0F172A; border: 1px solid #CBD5E1; margin-top: 2px; white-space: nowrap; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">${isEn ? 'BIM Airport' : 'BIM Padang'}</span>
              </div>

              <!-- Pin 2: Bukittinggi (Pusat Wisata Ranah Minang) -->
              <div style="position: absolute; left: 184px; top: 32px; text-align: center;">
                <div style="background: #EF4444; width: 24px; height: 24px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #FFFFFF; box-shadow: 0 3px 6px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                  <div style="transform: rotate(45deg); color: #FFFFFF; font-weight: 900; font-size: 10.5px; line-height: 1; font-family: 'Plus Jakarta Sans', sans-serif;">2</div>
                </div>
                <span style="display: inline-block; background: #FFFFFF; padding: 1px 5px; border-radius: 3px; font-size: 7.5px; font-weight: 800; color: #0F172A; border: 1px solid #CBD5E1; margin-top: 2px; white-space: nowrap; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">Bukittinggi</span>
              </div>

              <!-- Pin 3: Lembah Harau / Payakumbuh -->
              <div style="position: absolute; left: 370px; top: 14px; text-align: center;">
                <div style="background: #EF4444; width: 24px; height: 24px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #FFFFFF; box-shadow: 0 3px 6px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                  <div style="transform: rotate(45deg); color: #FFFFFF; font-weight: 900; font-size: 10.5px; line-height: 1; font-family: 'Plus Jakarta Sans', sans-serif;">3</div>
                </div>
                <span style="display: inline-block; background: #FFFFFF; padding: 1px 5px; border-radius: 3px; font-size: 7.5px; font-weight: 800; color: #0F172A; border: 1px solid #CBD5E1; margin-top: 2px; white-space: nowrap; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">${isEn ? 'Harau Valley' : 'Lembah Harau'}</span>
              </div>

              <!-- Pin 4: Istano Basa Pagaruyung -->
              <div style="position: absolute; left: 294px; top: 80px; text-align: center;">
                <div style="background: #EF4444; width: 24px; height: 24px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #FFFFFF; box-shadow: 0 3px 6px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                  <div style="transform: rotate(45deg); color: #FFFFFF; font-weight: 900; font-size: 10.5px; line-height: 1; font-family: 'Plus Jakarta Sans', sans-serif;">4</div>
                </div>
                <span style="display: inline-block; background: #FFFFFF; padding: 1px 5px; border-radius: 3px; font-size: 7.5px; font-weight: 800; color: #0F172A; border: 1px solid #CBD5E1; margin-top: 2px; white-space: nowrap; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">Pagaruyung</span>
              </div>
            </div>

            <!-- Tombol Interaktif Google Maps (Klik Langsung Buka Rute di Browser/App) -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 6px 12px; color: #FFFFFF;">
              <span style="font-size: 9px; color: #CBD5E1; font-weight: 500;">
                ${isEn ? 'Open turn-by-turn driving route on Google Maps:' : 'Buka navigasi rute lengkap di Google Maps:'}
              </span>
              <a href="${googleMapsUrl}" target="_blank" data-pdf-link="${googleMapsUrl}" style="display: inline-flex; align-items: center; justify-content: center; height: 26px; padding: 0 12px 4.5px 12px; background: #FFFFFF; color: #0F172A; font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 8.5px; border-radius: 6px; text-decoration: none; text-transform: uppercase; white-space: nowrap; line-height: 1; box-sizing: border-box; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">
                ${isEn ? 'OPEN MAPS ↗' : 'BUKA MAPS ↗'}
              </a>
            </div>
          </div>

          <!-- Direktori Titik Singgah Utama -->
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 12px 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
            <div style="font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 10px; color: #0F172A; margin-bottom: 8px;">
              ${isEn ? 'PRIMARY WAYPOINTS & STOPOVERS DIRECTORY:' : 'DAFTAR KORIDOR TITIK SINGGAH UTAMA:'}
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px;">
              ${displayWaypoints.map((wp, i) => {
                const cleanWpName = cleanPdfText(wp);
                const wpMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanWpName + ' Sumatera Barat')}`;
                return `
                  <a href="${wpMapUrl}" target="_blank" data-pdf-link="${wpMapUrl}" style="display: flex; align-items: center; gap: 7px; font-size: 9.5px; font-weight: 600; color: #334155; line-height: 1.35; padding-bottom: 2px; text-decoration: none;">
                    <span style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 18px; padding: 0 4px 4px 4px; background: #FEE2E2; color: #DC2626; border-radius: 4px; font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 8.5px; line-height: 1; shrink-0; box-sizing: border-box;">
                      #0${i + 1}
                    </span>
                    <span style="word-break: break-word; overflow-wrap: break-word;">${cleanWpName}</span>
                  </a>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 9px; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 6px;">
          <span>Malala.my.id - ${isEn ? 'Route Overview & Map' : 'Ikhtisar & Peta Rute'}</span>
          <span style="font-family: 'Orbitron', sans-serif; font-weight: 700; color: #0F172A;">${isEn ? 'SUMMARY & MAP' : 'RINGKASAN & PETA'}</span>
        </div>
      </div>
    `);

    // =========================================================================
    // 3. HALAMAN LEMBAR HARI (LOKASI PIN KLIK KE GOOGLE MAPS)
    // =========================================================================
    itineraryDays.forEach((day, dayIndex) => {
      const dayNum = day.day || dayIndex + 1;

      const rawDayTitle = cleanPdfText(day.title || `Eksplorasi Hari Ke-${dayNum}`);
      const cleanDayTitle = rawDayTitle
        .replace(/^(?:Hari|Day)\s*\d+\s*[:\-–]\s*/i, '')
        .trim();

      const activities = day.activities || [];
      const defaultTimes = ['08:30 - 11:30', '12:00 - 13:30', '14:30 - 17:30', '18:00 - 20:30'];

      // Maksimal 4 aktivitas per halaman dapat tertampung dengan sangat longgar
      const activityChunks = activities.length > 4
        ? [activities.slice(0, 3), activities.slice(3)]
        : [activities.slice(0, 4)];

        activityChunks.forEach((chunkActs, chunkIdx) => {
          const isPart2 = chunkIdx > 0;
          const pageSubtitle = isPart2
            ? `${cleanDayTitle} ${isEn ? '(Part 2)' : '(Bagian 2)'}`
            : cleanDayTitle;

          pagesHtml.push(`
            <div class="pdf-book-page" style="width: 480px; height: 882px; background: #F8FAFC; color: #0F172A; padding: 20px 22px; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; flex-direction: column; justify-content: space-between;">
              
              <!-- Header Bar -->
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="width: 28px; height: 28px; background: #0F172A; border-radius: 7px; display: inline-flex; align-items: center; justify-content: center; color: #F59E0B; font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 11px; padding-bottom: 4.5px; line-height: 1; box-sizing: border-box;">
                    ${dayNum < 10 ? '0' + dayNum : dayNum}
                  </div>
                  <div>
                    <div style="font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 10.5px; color: #0F172A; letter-spacing: 0.05em; line-height: 1.2;">
                      ${isEn ? `EXPLORATION SHEET DAY ${dayNum}` : `LEMBAR EKSPLORASI HARI KE-${dayNum}`} ${isPart2 ? (isEn ? '(PART 2)' : '(BAGIAN 2)') : ''}
                    </div>
                    <div style="font-size: 9px; color: #64748B; word-break: break-word; line-height: 1.2; margin-top: 2px;">
                      ${pageSubtitle}
                    </div>
                  </div>
                </div>
                <span style="display: inline-flex; align-items: center; justify-content: center; height: 24px; padding: 0 11px 4.5px 11px; background: #F1F5F9; border: 1px solid #CBD5E1; color: #334155; font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 9.5px; border-radius: 9999px; white-space: nowrap; line-height: 1; box-sizing: border-box;">
                  DAY ${dayNum}
                </span>
              </div>

              <!-- Main Card Container -->
              <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 14px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); margin: 8px 0; display: flex; flex-direction: column; justify-content: space-between;">
                
                <div>
                  <!-- Inner Header: DAY X Pill & Title & Single-Line Page Number Pill -->
                  <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F1F5F9; padding-bottom: 8px; margin-bottom: 10px; gap: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="display: inline-flex; align-items: center; justify-content: center; height: 24px; padding: 0 10px 4.5px 10px; background: #0F172A; color: #FFFFFF; font-family: 'Orbitron', sans-serif; font-weight: 900; font-size: 10px; border-radius: 8px; letter-spacing: 0.05em; white-space: nowrap; line-height: 1; shrink-0; box-sizing: border-box;">
                        DAY ${dayNum}
                      </span>
                      <div>
                        <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 12px; color: #0F172A; margin: 0; line-height: 1.35; word-break: break-word; overflow-wrap: break-word; padding-bottom: 1px;">
                          ${cleanDayTitle} ${isPart2 ? (isEn ? '(Continuation)' : '(Lanjutan)') : ''}
                        </h4>
                        <div style="font-size: 9px; color: #64748B; font-weight: 500;">
                          ${isEn ? 'Linear Route • 08:30 - 20:00' : 'Rute Terencana • 08:30 - 20:00'}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Nomer Halaman 1/3: Lebar Pas, Tengah Sempurna, Anti Patah 2 Baris -->
                    <span style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; min-width: 48px; height: 24px; padding: 0 10px 4.5px 10px; background: #F1F5F9; border: 1px solid #CBD5E1; color: #334155; font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 9.5px; border-radius: 6px; line-height: 1; shrink-0; box-sizing: border-box;">
                      ${dayNum} / ${rawTotalDays}
                    </span>
                  </div>

                  <!-- Vertical Timeline Kegiatan Hari -->
                  <div style="position: relative; padding-left: 18px; border-left: 2px solid #E2E8F0; margin-left: 6px; display: flex; flex-direction: column; gap: 10px;">
                    ${chunkActs.map((act, actIdx) => {
                      const globalIdx = (chunkIdx * 4) + actIdx;
                      const rawTime = act.time || defaultTimes[globalIdx] || '09:00 - 12:00';
                      const cleanTime = cleanPdfText(rawTime);
                      const cleanActTitle = cleanPdfText(act.activity || '');
                      const cleanLoc = cleanPdfText(act.location || '');
                      const cleanTip = cleanPdfText(act.tips || '');
                      const locMapUrl = cleanLoc
                          ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanLoc + ' Sumatera Barat')}`
                        : '';

                      return `
                        <div style="position: relative;">
                          <!-- Timeline Bullet Dot (Sejajar Vertikal Sempurna dengan Time Pill) -->
                          <div style="position: absolute; left: -25px; top: 5px; width: 12px; height: 12px; border-radius: 50%; background: #0F172A; border: 2px solid #FFFFFF; box-shadow: 0 0 0 2px #E2E8F0;"></div>
                          
                          <!-- Pill Waktu (Centering Tengah Sempurna & Terangkat Sedikit ke Atas Sesuai Permintaan) -->
                          <div style="display: inline-flex; align-items: center; justify-content: center; height: 22px; padding: 0 9px 4.5px 9px; background: #F8FAFC; border: 1px solid #CBD5E1; color: #1E293B; font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 9px; border-radius: 6px; margin-bottom: 3px; white-space: nowrap; line-height: 1; box-sizing: border-box;">
                            ${cleanTime}
                          </div>

                          <!-- Judul Aktivitas -->
                          <h5 style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 11px; color: #0F172A; margin: 0 0 2px; line-height: 1.4; word-break: break-word; overflow-wrap: break-word; padding-bottom: 2px;">
                            ${cleanActTitle}
                          </h5>

                          <!-- Lokasi Pin Oranye dengan Tautan Klik Google Maps (Tanpa Underline) -->
                          ${cleanLoc ? `
                            <a href="${locMapUrl}" target="_blank" data-pdf-link="${locMapUrl}" style="display: flex; align-items: flex-start; gap: 4px; font-size: 9.5px; color: #0284C7; font-weight: 600; margin-bottom: 4px; line-height: 1.35; padding-bottom: 2px; text-decoration: none; cursor: pointer;">
                              <span style="color: #F97316; shrink-0;">📍</span>
                              <span style="word-break: break-word;">${cleanLoc} ↗</span>
                            </a>
                          ` : ''}

                          <!-- Kotak Kuning Tips Wisata -->
                          ${cleanTip ? `
                            <div style="background: #FEFCE8; border: 1px solid #FDE047; border-radius: 8px; padding: 8px 10px;">
                              <div style="font-weight: 800; font-size: 9px; color: #78350F; margin-bottom: 3px; line-height: 1;">
                                ${isEn ? '💡 Travel Tips:' : '💡 Tips Wisata:'}
                              </div>
                              <div style="text-align: justify; text-justify: inter-word; line-height: 1.55; font-size: 9.5px; color: #78350F; word-break: break-word; overflow-wrap: break-word; padding-bottom: 2px;">
                                ${cleanTip}
                              </div>
                            </div>
                          ` : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>

                <!-- Rekomendasi Kuliner Autentik Minang (Muncul di Akhir Lembar Hari) -->
                ${(!isPart2 || chunkIdx === activityChunks.length - 1) ? `
                  <div style="background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 10px; padding: 8px 10px; display: flex; align-items: flex-start; gap: 8px; margin-top: 10px;">
                    <span style="font-size: 16px; line-height: 1; shrink-0;">🍲</span>
                    <div style="flex: 1;">
                      <div style="font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 9px; color: #78350F; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px; line-height: 1;">
                        ${isEn ? 'AUTHENTIC MINANG CULINARY' : 'KULINER AUTENTIK MINANG'}
                      </div>
                      <div style="text-align: justify; text-justify: inter-word; line-height: 1.5; font-size: 9.5px; color: #334155; word-break: break-word; overflow-wrap: break-word; padding-bottom: 2px;">
                        ${cleanPdfText(day.culinaryRecommendation || (isEn ? 'Authentic Minang beef rendang, savory sate padang, and refreshing iced talua.' : 'Rendang daging autentik bumbu rempah kelapa, sate padang & teh talua.'))}
                      </div>
                    </div>
                  </div>
                ` : ''}
              </div>

              <!-- Footer -->
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 9px; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 6px;">
                <span>Malala.my.id - ${isEn ? 'Daily Exploration Sheet' : 'Lembar Eksplorasi Harian'}</span>
                <span style="font-family: 'Orbitron', sans-serif; font-weight: 700; color: #0F172A;">DAY ${dayNum}</span>
              </div>
            </div>
          `);
      });
    });

    // =========================================================================
    // 4. HALAMAN TERAKHIR: PANEL MITRA RESMI & KEARIFAN LOKAL (LINK KLIK AKTIF)
    // =========================================================================
    pagesHtml.push(`
      <div class="pdf-book-page" style="width: 480px; height: 882px; background: #F8FAFC; color: #0F172A; padding: 20px 22px; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; flex-direction: column; justify-content: space-between;">
        
        <!-- Header Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 28px; height: 28px; background: #0F172A; border-radius: 7px; display: inline-flex; align-items: center; justify-content: center; color: #F59E0B; font-size: 12px; padding-bottom: 4.5px; line-height: 1; box-sizing: border-box;">
              ★
            </div>
            <div>
              <div style="font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 10.5px; color: #0F172A; letter-spacing: 0.05em; line-height: 1.2;">
                ${isEn ? 'SERVICES & LOCAL WISDOM' : 'LAYANAN WISATAWAN & KEARIFAN LOKAL'}
              </div>
              <div style="font-size: 9px; color: #64748B; line-height: 1.2; margin-top: 2px;">
                ${isEn ? 'Official Partners & Cultural Etiquette' : 'Mitra Resmi Perjalanan & Etika Minangkabau'}
              </div>
            </div>
          </div>
          <span style="display: inline-flex; align-items: center; justify-content: center; height: 24px; padding: 0 11px 4.5px 11px; background: #FEF3C7; border: 1px solid #FCD34D; color: #92400E; font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 9.5px; border-radius: 9999px; white-space: nowrap; line-height: 1; box-sizing: border-box;">
            ${isEn ? 'OFFICIAL PARTNERS' : 'MITRA RESMI'}
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px; margin: 8px 0;">
          <!-- Dark Box Container: LAYANAN WISATAWAN & LOGISTIK -->
          <div style="background: #0A0F1D; border: 1px solid #1E293B; border-radius: 16px; padding: 12px 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 22px; padding: 0 9px 4.5px 9px; background: #FFC700; color: #0A0F1D; font-family: 'Orbitron', sans-serif; font-weight: 900; font-size: 8.5px; border-radius: 9999px; text-transform: uppercase; white-space: nowrap; line-height: 1; box-sizing: border-box;">
                ${isEn ? '★ OFFICIAL' : '★ MITRA RESMI'}
              </span>
              <span style="font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 10.5px; color: #FFFFFF; letter-spacing: 0.05em; line-height: 1;">
                ${isEn ? 'TOURIST SERVICES & LOGISTICS' : 'LAYANAN WISATAWAN & LOGISTIK'}
              </span>
            </div>
            <p style="font-size: 9.5px; color: #94A3B8; margin: 0; line-height: 1.4; padding-bottom: 2px;">
              ${isEn ? 'Book verified accommodation & transport along West Sumatra routes:' : 'Pesan akomodasi & transportasi resmi rute perjalanan Sumatera Barat:'}
            </p>

            <!-- Traveloka Card (Sky Blue Resmi Traveloka) -->
            <div style="background: #0194F3; border: 1px solid rgba(255,255,255,0.7); border-radius: 12px; padding: 10px 11px; color: #FFFFFF; display: flex; flex-direction: column; gap: 6px;">
              <div style="display: justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <!-- Logo Burung Godwit Resmi Traveloka -->
                  <svg style="width: 18px; height: 18px; shrink-0;" viewBox="0 0 24 24" fill="none">
                    <path d="M21.5 4.5C19.2 6.8 15.8 8.6 12.3 8.9C9.8 9.1 7.4 8.2 5.5 6.8C4.8 6.3 3.8 6.8 3.8 7.7C4.1 10.4 5.7 13.5 8.5 15.1C10.7 16.4 13.4 16.6 15.8 15.8C18.5 14.9 20.8 12.9 22.2 10.4C22.8 9.3 22.4 8.1 21.6 7.2L21.5 4.5Z" fill="#FFFFFF"/>
                    <path d="M12.5 8.8C10.2 5.5 8.1 3.2 5.2 2.1C4.3 1.8 3.4 2.5 3.5 3.4C3.8 5.8 5.2 8.5 7.4 10.3C9.1 11.7 11.2 12.5 13.4 12.3C13.8 12.3 14.1 11.9 13.9 11.5L12.5 8.8Z" fill="#FFFFFF" opacity="0.85"/>
                  </svg>
                  <!-- Tipografi Resmi Traveloka: Plus Jakarta Sans, lowercase, bold -->
                  <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 13.5px; letter-spacing: -0.02em; color: #FFFFFF; line-height: 1;">traveloka</span>
                </div>
                <span style="display: inline-flex; align-items: center; justify-content: center; height: 20px; padding: 0 8px 4.5px 8px; background: rgba(255,255,255,0.2); font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 8px; border-radius: 4px; white-space: nowrap; line-height: 1; box-sizing: border-box; letter-spacing: 0.02em;">
                  OFFICIAL PARTNER
                </span>
              </div>
              <p style="font-size: 9px; color: #E0F2FE; margin: 0; line-height: 1.35; padding-bottom: 2px;">
                ${isEn ? 'Book hotels, airport transfers at BIM, and curated experiences.' : 'Pesan akomodasi hotel, airport transfer BIM & tiket atraksi wisata via Traveloka.'}
              </p>
              <!-- 4 Tombol Aksi Traveloka (Klik Aktif di PDF) -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
                <a href="${travelokaHotelUrl}" target="_blank" data-pdf-link="${travelokaHotelUrl}" style="display: flex; align-items: center; justify-content: center; height: 28px; padding: 0 8px 3px 8px; background: #FFFFFF; color: #0194F3; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 9.5px; border-radius: 6px; text-decoration: none; white-space: nowrap; line-height: 1; box-sizing: border-box; cursor: pointer;">
                  <span>🏨 ${isEn ? 'Find Hotels ↗' : 'Cari Hotel ↗'}</span>
                </a>
                <a href="${travelokaCarUrl}" target="_blank" data-pdf-link="${travelokaCarUrl}" style="display: flex; align-items: center; justify-content: center; height: 28px; padding: 0 8px 3px 8px; background: #0264A6; border: 1px solid rgba(255,255,255,0.4); color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 9.5px; border-radius: 6px; text-decoration: none; white-space: nowrap; line-height: 1; box-sizing: border-box; cursor: pointer;">
                  <span>🚗 ${isEn ? 'Rent a Car ↗' : 'Sewa Mobil ↗'}</span>
                </a>
                <a href="${travelokaFlightUrl}" target="_blank" data-pdf-link="${travelokaFlightUrl}" style="display: flex; align-items: center; justify-content: center; height: 28px; padding: 0 8px 3px 8px; background: #0264A6; border: 1px solid rgba(255,255,255,0.4); color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 9.5px; border-radius: 6px; text-decoration: none; white-space: nowrap; line-height: 1; box-sizing: border-box; cursor: pointer;">
                  <span>✈️ ${isEn ? 'Flight Tickets ↗' : 'Tiket Pesawat ↗'}</span>
                </a>
                <a href="${travelokaActivityUrl}" target="_blank" data-pdf-link="${travelokaActivityUrl}" style="display: flex; align-items: center; justify-content: center; height: 28px; padding: 0 8px 3px 8px; background: #0264A6; border: 1px solid rgba(255,255,255,0.4); color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 9.5px; border-radius: 6px; text-decoration: none; white-space: nowrap; line-height: 1; box-sizing: border-box; cursor: pointer;">
                  <span>🎡 ${isEn ? 'Attractions ↗' : 'Atraksi Wisata ↗'}</span>
                </a>
              </div>
            </div>

            <!-- tiket.com Card (Royal Blue Resmi tiket.com) -->
            <div style="background: #0064D2; border: 1.5px solid #FEDD00; border-radius: 12px; padding: 10px 11px; color: #FFFFFF; display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <!-- Logo Resmi tiket.com Bulat Kuning dengan Titik & Tiket Biru -->
                  <svg style="width: 18px; height: 18px; shrink-0;" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" fill="#FEDD00" />
                    <circle cx="12" cy="7.5" r="2.2" fill="#0064D2" />
                    <path d="M7.5 12C7.5 11.2 8.1 10.6 8.9 10.6H15.1C15.9 10.6 16.5 11.2 16.5 12V15.5C16.5 16.3 15.9 16.9 15.1 16.9H8.9C8.1 16.9 7.5 16.3 7.5 15.5V12Z" fill="#0064D2" />
                  </svg>
                  <!-- Tipografi Resmi tiket.com: Plus Jakarta Sans, lowercase, .com Kuning -->
                  <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 13.5px; letter-spacing: -0.02em; color: #FFFFFF; line-height: 1;">tiket<span style="color: #FEDD00;">.com</span></span>
                </div>
                <!-- Badge Resmi tiket.com: Kuning Emas dengan Tulisan Biru Tua -->
                <span style="display: inline-flex; align-items: center; justify-content: center; height: 20px; padding: 0 8px 4.5px 8px; background: #FEDD00; color: #002B66; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 8px; border-radius: 4px; white-space: nowrap; line-height: 1; box-sizing: border-box; letter-spacing: 0.02em;">
                  ${isEn ? '★ OFFICIAL TIKET' : '★ RESMI TIKET'}
                </span>
              </div>
              <p style="font-size: 9px; color: #DBEAFE; margin: 0; line-height: 1.35; padding-bottom: 2px;">
                ${isEn ? 'Best price guarantee for star hotels, rental cars & event passes.' : 'Jaminan harga jujur hotel bintang Padang-Bukittinggi, rental mobil & tiket event.'}
              </p>
              <!-- 4 Tombol Aksi tiket.com (Klik Aktif di PDF) -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
                <a href="${tiketHotelUrl}" target="_blank" data-pdf-link="${tiketHotelUrl}" style="display: flex; align-items: center; justify-content: center; height: 28px; padding: 0 8px 3px 8px; background: #FEDD00; color: #0064D2; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 9.5px; border-radius: 6px; text-decoration: none; white-space: nowrap; line-height: 1; box-sizing: border-box; cursor: pointer;">
                  <span>🏨 ${isEn ? 'Find Hotels ↗' : 'Hotel Sumbar ↗'}</span>
                </a>
                <a href="${tiketCarUrl}" target="_blank" data-pdf-link="${tiketCarUrl}" style="display: flex; align-items: center; justify-content: center; height: 28px; padding: 0 8px 3px 8px; background: #004FA8; border: 1px solid rgba(254,221,0,0.5); color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 9.5px; border-radius: 6px; text-decoration: none; white-space: nowrap; line-height: 1; box-sizing: border-box; cursor: pointer;">
                  <span>🚗 ${isEn ? 'Car Rental ↗' : 'Rental Mobil ↗'}</span>
                </a>
                <a href="${tiketFlightUrl}" target="_blank" data-pdf-link="${tiketFlightUrl}" style="display: flex; align-items: center; justify-content: center; height: 28px; padding: 0 8px 3px 8px; background: #004FA8; border: 1px solid rgba(254,221,0,0.5); color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 9.5px; border-radius: 6px; text-decoration: none; white-space: nowrap; line-height: 1; box-sizing: border-box; cursor: pointer;">
                  <span>✈️ ${isEn ? 'Flight Tickets ↗' : 'Tiket Pesawat ↗'}</span>
                </a>
                <a href="${tiketActivityUrl}" target="_blank" data-pdf-link="${tiketActivityUrl}" style="display: flex; align-items: center; justify-content: center; height: 28px; padding: 0 8px 3px 8px; background: #004FA8; border: 1px solid rgba(254,221,0,0.5); color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 9.5px; border-radius: 6px; text-decoration: none; white-space: nowrap; line-height: 1; box-sizing: border-box; cursor: pointer;">
                  <span>🎡 ${isEn ? 'Event Passes ↗' : 'To-Do Event ↗'}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Card Kearifan Lokal & Etika Minangkabau -->
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 10px 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; gap: 5px;">
              <span style="font-size: 13px;">🏺</span>
              <span style="font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 10px; color: #92400E; line-height: 1;">
                ${isEn ? 'LOCAL WISDOM & CULTURAL ETIQUETTE' : 'KEARIFAN LOKAL & ETIKA MINANGKABAU'}
              </span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: 9.5px; color: #475569;">
              <div style="display: flex; gap: 5px;">
                <span style="color: #92400E; font-weight: 700;">•</span>
                <span style="text-align: justify; text-justify: inter-word; line-height: 1.5; word-break: break-word; padding-bottom: 2px;">
                  <strong>${isEn ? 'Polite Attire:' : 'Busana Sopan:'}</strong> ${isEn ? 'Wear modest and respectful clothing when visiting sacred villages and cultural halls.' : 'Kenakan busana tertutup saat berkunjung ke surau, istano, dan nagari adat.'}
                </span>
              </div>
              <div style="display: flex; gap: 5px;">
                <span style="color: #92400E; font-weight: 700;">•</span>
                <span style="text-align: justify; text-justify: inter-word; line-height: 1.5; word-break: break-word; padding-bottom: 2px;">
                  <strong>${isEn ? 'Baso-Basi Hospitality:' : 'Baso-Basi Adat:'}</strong> ${isEn ? 'Greet locals with smiles and respect as Minangkabau warmly honors every visiting guest.' : 'Awali sapaan dengan senyum dan keramahan khas Ranah Minang yang memuliakan tamu.'}
                </span>
              </div>
              <div style="display: flex; gap: 5px;">
                <span style="color: #92400E; font-weight: 700;">•</span>
                <span style="text-align: justify; text-justify: inter-word; line-height: 1.5; word-break: break-word; padding-bottom: 2px;">
                  <strong>${isEn ? 'Halal Culinary:' : 'Kuliner Halal:'}</strong> ${isEn ? 'All authentic Minang cuisine is genuinely guaranteed Halal with rich, natural coconut spices.' : 'Seluruh kuliner Minang autentik terjamin halal (thayyib) dengan cita rasa rempah alami.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 9px; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 6px;">
          <span>Malala.my.id - ${isEn ? 'Services & Local Wisdom' : 'Mitra Layanan & Kearifan Lokal'}</span>
          <span style="font-family: 'Orbitron', sans-serif; font-weight: 700; color: #0F172A;">${isEn ? 'LOGISTICS & CULTURE' : 'LOGISTIK & ADAT'}</span>
        </div>
      </div>
    `);

    // Masukkan seluruh halaman HTML ke dalam container render
    renderContainer.innerHTML = pagesHtml.join('');

    // Beri jeda agar browser menyelesaikan seluruh kalkulasi font metrics & reflow layout DOM
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Dynamic import html2canvas secara aman
    const html2canvasModule = await import('html2canvas');
    const html2canvas = (html2canvasModule as any).default || html2canvasModule;

    // Inisialisasi dokumen jsPDF dengan ukuran buku tepat [127, 233.36] mm
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [127, 233.36],
    });

    const pageElements = renderContainer.querySelectorAll('.pdf-book-page');
    const actualPagesCount = pageElements.length;

    const updateProgress = (pageIdx: number, pageTitle: string) => {
      const textEl = document.getElementById('pdf-progress-text');
      const barEl = document.getElementById('pdf-progress-bar');
      const percent = Math.min(100, Math.round(((pageIdx + 1) / actualPagesCount) * 100));
      if (textEl) {
        textEl.textContent = isEn
          ? `Rendering Page ${pageIdx + 1} of ${actualPagesCount}: ${pageTitle}...`
          : `Menyusun Halaman ${pageIdx + 1} dari ${actualPagesCount}: ${pageTitle}...`;
      }
      if (barEl) {
        barEl.style.width = `${percent}%`;
      }
    };

    for (let i = 0; i < pageElements.length; i++) {
      const pageEl = pageElements[i] as HTMLElement;
      updateProgress(
        i,
        i === 0
          ? (isEn ? 'Front Cover' : 'Sampul Depan (Cover)')
          : i === 1
          ? (isEn ? 'Summary & Map' : 'Ringkasan & Peta')
          : i === pageElements.length - 1
          ? (isEn ? 'Services & Logistics' : 'Layanan & Logistik')
          : (isEn ? `Day ${i}` : `Hari ke-${i}`)
      );

      // Berikan jeda napas ke browser event loop agar animasi Lottie / CSS tetap berputar 60fps dengan mulus
      await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 40)));

      // Capture halaman ke canvas resolusi tinggi (scale 2.0 = ~960 x 1764 px - tajam & efisien)
      const canvas = await html2canvas(pageEl, {
        scale: 2.0,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 480,
        windowHeight: 882,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.92);

      if (i > 0) {
        doc.addPage([127, 233.36], 'portrait');
      }

      doc.addImage(imgData, 'JPEG', 0, 0, 127, 233.36, undefined, 'FAST');

      // DAFTARKAN TAUTAN KLIK AKTIF (Interactive PDF Hyperlinks)
      // Mendaftarkan Buka Maps, Pin Lokasi Google Maps, dan Link Mitra Resmi
      try {
        const pageRect = pageEl.getBoundingClientRect();
        const linkElements = pageEl.querySelectorAll('a[href], [data-pdf-link]');

        linkElements.forEach((el) => {
          const rawUrl = (el as HTMLAnchorElement).href || el.getAttribute('data-pdf-link');
          if (!rawUrl || rawUrl.startsWith('javascript:')) return;

          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;

          // Hitung posisi relatif tombol/link terhadap kontainer halaman
          const relX = rect.left - pageRect.left;
          const relY = rect.top - pageRect.top;

          // Konversi koordinat dari pixel DOM ke ukuran kertas milimeter jsPDF
          const x_mm = (relX / pageRect.width) * 127;
          const y_mm = (relY / pageRect.height) * 233.36;
          const w_mm = (rect.width / pageRect.width) * 127;
          const h_mm = (rect.height / pageRect.height) * 233.36;

          // Daftarkan link area ke layer PDF aktif
          doc.link(x_mm, y_mm, w_mm, h_mm, { url: rawUrl });
        });
      } catch (linkErr) {
        console.warn('Error attaching PDF link annotations:', linkErr);
      }
    }

    // Unduh berkas PDF ke perangkat pengguna
    const cleanTitleSlug = safeTitle
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 35);
    const filename = isEn
      ? `${cleanTitleSlug}-Travel-Guide-MALALA.pdf`
      : `${cleanTitleSlug}-Buku-Panduan-MALALA.pdf`;

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

  } catch (err) {
    console.error('Error generating HTML book PDF:', err);
    alert(isEn ? 'Failed to generate PDF book. Please try again.' : 'Gagal menghasilkan buku PDF. Silakan coba lagi.');
  } finally {
    // Hentikan dan bersihkan instance animasi Lottie
    try {
      if (lottieAnimationInstance && typeof lottieAnimationInstance.destroy === 'function') {
        lottieAnimationInstance.destroy();
      }
    } catch {}

    // Bersihkan elemen overlay dan render container dari DOM
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
    if (document.body.contains(renderContainer)) {
      document.body.removeChild(renderContainer);
    }
  }
}

/**
 * Backward compatibility alias
 */
export { generateExclusiveItineraryPdf as generateItineraryPDF };
