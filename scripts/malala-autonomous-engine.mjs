/**
 * scripts/malala-autonomous-engine.mjs
 * ====================================================
 * MALALA AUTONOMOUS ENGINE — Berjalan mandiri 24/7
 * ====================================================
 * Fungsi otonom yang dijalankan setiap hari:
 *
 * 1. 🔍 AI Event Scanner (Google Search Grounding)
 *    — Scan event baru dari KEN, Dispar Sumbar, Kemenparekraf
 *    — Deteksi perubahan jadwal event yang ada
 *    — Update Firestore otomatis
 *
 * 2. 📰 Hot Info Updater
 *    — Generate berita pariwisata Sumbar terbaru (30 hari terakhir)
 *    — Simpan ke Firestore collection 'hotInfo'
 *
 * 3. 📊 Health Check & Self-Audit
 *    — Cek event yang belum punya imageUrl Cloudinary
 *    — Deteksi data yang kosong / tidak valid
 *    — Catat laporan ke Firestore 'system_logs'
 *
 * 4. ⚡ SEO Auto-Ping (IndexNow)
 *    — Kirim ping ke Google & Bing setiap kali ada perubahan data
 *
 * 5. 📋 Sync Content.ts Backup
 *    — Tulis ringkasan status ke Firestore 'settings/autonomous'
 *
 * Cara menjalankan manual:
 *   node scripts/malala-autonomous-engine.mjs
 *
 * Untuk otomatisasi harian, gunakan Windows Task Scheduler:
 *   scripts/setup-task-scheduler.bat
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, addDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const START_TIME = new Date();
const NOW_ISO = START_TIME.toISOString();

// ============================================================
// FIREBASE INIT
// ============================================================
const firebaseConfig = {
  projectId: "malala-my-id",
  appId: "1:150503186564:web:64af24b2edc852fb23a2d1",
  apiKey: "AIzaSyBAizWQnaNb-EX-BcjoZt9BSRctFGyMEnE",
  authDomain: "malala-my-id.firebaseapp.com",
  storageBucket: "malala-my-id.firebasestorage.app",
  messagingSenderId: "150503186564",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================================
// GEMINI API — WITH GOOGLE SEARCH GROUNDING
// ============================================================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY
  || "AQ.Ab8RN6L6YdQ1D5yiwawCr73Xqsd3nr9gLQ1AAG0xsKRfe8W9Uw";

const MODELS = ['gemini-flash-latest', 'gemini-pro-latest', 'gemini-flash-lite-latest'];

async function callGeminiWithGrounding(prompt, useGrounding = true, retries = 3) {
  for (const model of MODELS) {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const body = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: useGrounding ? 0.1 : 0.5 }
        };
        if (useGrounding) body.tools = [{ googleSearch: {} }];

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
        );
        if (!res.ok) {
          const err = await res.json();
          if (err.error?.code === 429 || err.error?.code === 503) {
            log(`⏳ Rate limit pada ${model}, tunggu 10 detik...`);
            await sleep(10000);
            continue;
          }
          if (err.error?.code === 404) break; // Try next model
          throw new Error(`API ${res.status}: ${JSON.stringify(err.error)}`);
        }
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (text) return text;
      } catch (e) {
        log(`⚠️ ${model} attempt ${attempt + 1}: ${e.message.substring(0, 80)}`);
        await sleep(5000);
      }
    }
  }
  return null;
}

function safeParseJSON(text) {
  if (!text) return null;
  try {
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const obj = clean.match(/\{[\s\S]*\}/);
    if (obj) return JSON.parse(obj[0]);
    const arr = clean.match(/\[[\s\S]*\]/);
    if (arr) return JSON.parse(arr[0]);
    return null;
  } catch { return null; }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const logs = [];
function log(msg) {
  const ts = new Date().toISOString().substring(11, 19);
  console.log(`[${ts}] ${msg}`);
  logs.push({ ts, msg });
}

// ============================================================
// MODULE 1: AI EVENT SCANNER (Google Search Grounding)
// ============================================================
async function runEventScanner(currentEvents) {
  log('\n🔍 ═══ MODULE 1: AI EVENT SCANNER (Google Search Grounding) ═══');

  const eventList = currentEvents.map(e => `${e.id}: ${e.title} | Jadwal: ${e.schedule}`).join('\n');

  const prompt = `Anda adalah Analis Pariwisata Otonom Indonesia. Gunakan Google Search untuk riset terbaru.

DATABASE EVENT SAAT INI:
${eventList}

TUGAS OTONOM:
1. Cari update jadwal resmi terbaru 2026/2027 untuk event yang sudah ada (Kemenparekraf KEN, Dispar Sumbar, indonesia.travel, situs resmi daerah).
2. Cari event wisata Sumbar BARU yang BELUM ADA dalam daftar di atas (KEN baru, festival daerah baru yang viral/resmi).
3. HANYA laporkan perubahan yang benar-benar dikonfirmasi dari sumber kredibel. JANGAN mengarang.

Output JSON murni tanpa markdown:
{
  "scheduleUpdates": [
    { "id": "ev3", "newSchedule": "...", "newScheduleEn": "...", "source": "nama sumber", "confidence": "high/medium" }
  ],
  "newDiscoveries": [
    { "title": "...", "titleEn": "...", "schedule": "...", "location": "...", "category": "Event", "tag": "KEN 2026", "isKEN": true/false, "description": "..." }
  ],
  "summary": "Ringkasan temuan singkat"
}`;

  const raw = await callGeminiWithGrounding(prompt, true);
  const parsed = safeParseJSON(raw);

  if (!parsed) {
    log('⚠️ Tidak dapat mem-parse respons AI Event Scanner');
    return { updates: 0, discoveries: 0 };
  }

  log(`📊 AI Event Scanner: ${parsed.summary || 'Analisis selesai'}`);
  let updates = 0, discoveries = 0;

  // Apply schedule updates
  if (Array.isArray(parsed.scheduleUpdates) && parsed.scheduleUpdates.length > 0) {
    log(`🔄 ${parsed.scheduleUpdates.length} pembaruan jadwal ditemukan:`);
    for (const upd of parsed.scheduleUpdates) {
      const target = currentEvents.find(e => e.id === upd.id);
      if (target && upd.newSchedule && upd.confidence !== 'low') {
        // Never overwrite high-confidence manual data with low-confidence AI guess
        if (target.verificationConfidence === 'high' && upd.confidence !== 'high') {
          log(`   ⏭️ Skip ${upd.id}: data manual sudah high-confidence`);
          continue;
        }
        await setDoc(doc(db, 'events', upd.id), {
          ...target,
          schedule: upd.newSchedule,
          scheduleEn: upd.newScheduleEn || target.scheduleEn,
          lastAIUpdate: NOW_ISO,
          aiUpdateSource: upd.source
        }, { merge: true });
        log(`   ✅ [${upd.id}] ${target.title?.substring(0, 40)} → "${upd.newSchedule}"`);
        updates++;
        await sleep(500);
      }
    }
  } else {
    log('   ✓ Tidak ada pembaruan jadwal (semua sudah akurat)');
  }

  // Save new discoveries to pending_events for admin review
  if (Array.isArray(parsed.newDiscoveries) && parsed.newDiscoveries.length > 0) {
    log(`📥 ${parsed.newDiscoveries.length} event baru ditemukan (menunggu review admin):`);
    for (const ev of parsed.newDiscoveries) {
      if (!ev.title) continue;
      await setDoc(doc(db, 'pending_events', `ai-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`), {
        ...ev,
        status: 'pending_review',
        discoveredAt: NOW_ISO,
        discoveredBy: 'Malala Autonomous AI Engine (Google Search Grounding)',
        imageUrl: ''
      });
      log(`   📌 Draf: ${ev.title} (${ev.schedule})`);
      discoveries++;
      await sleep(500);
    }
  } else {
    log('   ✓ Tidak ada event baru ditemukan');
  }

  return { updates, discoveries };
}

// ============================================================
// MODULE 2: HOT INFO / BERITA PARIWISATA AUTO-UPDATE
// ============================================================
async function runHotInfoUpdater() {
  log('\n📰 ═══ MODULE 2: HOT INFO UPDATER (Berita Pariwisata Terbaru) ═══');

  const prompt = `Anda adalah Jurnalis Pariwisata Otonom Indonesia. Gunakan Google Search untuk mencari BERITA NYATA.

Hasilkan 4 berita pariwisata nasional Indonesia dan Sumatera Barat yang benar-benar terjadi dalam 30 hari terakhir.
Waktu sekarang: ${NOW_ISO}

Setiap berita harus:
- Benar-benar terjadi/diumumkan (bukan karangan)
- Topik berbeda satu sama lain
- Relevan dengan wisatawan yang hendak ke Sumbar / Indonesia

Format JSON array murni tanpa markdown:
[
  {
    "id": "news-${Date.now()}-1",
    "title": "...",
    "titleEn": "...",
    "category": "...",
    "categoryEn": "...",
    "date": "YYYY-MM-DD",
    "dateEn": "Month DD, YYYY",
    "tag": "...",
    "tagEn": "...",
    "description": "3 paragraf informatif",
    "descriptionEn": "3 informative paragraphs",
    "imageUrl": "",
    "actionUrl": "",
    "highlights": ["poin 1", "poin 2", "poin 3"],
    "highlightsEn": ["point 1", "point 2", "point 3"],
    "tips": "...",
    "tipsEn": "...",
    "locationName": "...",
    "locationNameEn": "..."
  }
]`;

  const raw = await callGeminiWithGrounding(prompt, true);
  const parsed = safeParseJSON(raw);

  if (!Array.isArray(parsed) || parsed.length === 0) {
    log('⚠️ Tidak dapat menghasilkan hot info baru');
    return 0;
  }

  // Store to Firestore hotInfo collection
  const batch = [];
  for (const item of parsed) {
    if (!item.title) continue;
    const docId = `hotinfo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    batch.push(setDoc(doc(db, 'hotInfo', docId), {
      ...item,
      id: docId,
      generatedAt: NOW_ISO,
      generatedBy: 'Malala Autonomous AI (Google Search Grounding)',
      isAIGenerated: true
    }));
    log(`   ✅ Berita: ${item.title?.substring(0, 60)}`);
    await sleep(300);
  }
  await Promise.allSettled(batch);
  log(`   📰 ${parsed.length} berita baru disimpan ke Firestore`);
  return parsed.length;
}

// ============================================================
// MODULE 3: HEALTH CHECK & SELF-AUDIT
// ============================================================
async function runHealthCheck(currentEvents) {
  log('\n📊 ═══ MODULE 3: HEALTH CHECK & DATA AUDIT ═══');

  const issues = [];
  let healthy = 0;

  for (const event of currentEvents) {
    const eventIssues = [];
    if (!event.title) eventIssues.push('Tidak ada judul');
    if (!event.schedule) eventIssues.push('Tidak ada jadwal');
    if (!event.imageUrl) eventIssues.push('Tidak ada imageUrl');
    if (!event.description) eventIssues.push('Tidak ada deskripsi');
    if (event.schedule?.includes('Tidak Masuk KEN') || event.schedule?.includes('Dikonfirmasi Ulang')) {
      eventIssues.push('Status perlu konfirmasi manual');
    }

    if (eventIssues.length > 0) {
      issues.push({ id: event.id, title: event.title, problems: eventIssues });
      log(`   ⚠️ [${event.id}] ${event.title?.substring(0, 35)}: ${eventIssues.join(', ')}`);
    } else {
      healthy++;
    }
  }

  log(`   ✅ ${healthy} event sehat | ⚠️ ${issues.length} event butuh perhatian`);
  return issues;
}

// ============================================================
// MODULE 4: SEO INDEXNOW AUTO-PING
// ============================================================
async function runSEOPing(hasChanges) {
  log('\n⚡ ═══ MODULE 4: SEO AUTO-PING (IndexNow) ═══');
  if (!hasChanges) {
    log('   ✓ Tidak ada perubahan data — SEO ping dilewati');
    return;
  }
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'malala.my.id',
        key: 'malala-sumbar-2026-seo-token',
        keyLocation: 'https://malala.my.id/malala-sumbar-2026-seo-token.txt',
        urlList: [
          'https://malala.my.id/',
          'https://malala.my.id/downloads/kalender-event-sumbar-2026.pdf'
        ]
      })
    });
    log('   ✅ IndexNow SEO Ping terkirim ke Google & Bing!');
  } catch (e) {
    log(`   ⚠️ SEO Ping: ${e.message}`);
  }
}

// ============================================================
// MODULE 5: WRITE AUTONOMOUS REPORT TO FIRESTORE
// ============================================================
async function writeAutonomousReport({ eventUpdates, newsAdded, issues, duration }) {
  log('\n📋 ═══ MODULE 5: AUTONOMOUS REPORT ═══');

  const report = {
    runAt: NOW_ISO,
    durationMs: duration,
    engine: 'Malala Autonomous Engine v3.0 (Google Search Grounding)',
    modules: {
      eventScanner: { status: 'OK', updatesApplied: eventUpdates.updates, newDiscoveries: eventUpdates.discoveries },
      hotInfoUpdater: { status: 'OK', newsAdded },
      healthCheck: { status: 'OK', issueCount: issues.length, issues },
      seoIndexNow: { status: 'OK' }
    },
    log: logs.map(l => `[${l.ts}] ${l.msg}`)
  };

  await setDoc(doc(db, 'settings', 'autonomous'), {
    lastRunAt: NOW_ISO,
    lastRunDurationMs: duration,
    lastRunStatus: 'success',
    isAutonomousModeActive: true,
    totalRunsToday: 1,
    engineVersion: 'v3.0',
    googleSearchGroundingEnabled: true
  }, { merge: true });

  // Store full report log
  await setDoc(doc(db, 'system_logs', `run-${NOW_ISO.replace(/[:.]/g, '-')}`), report);
  log(`   ✅ Laporan disimpan ke Firestore system_logs`);

  return report;
}

// ============================================================
// MAIN — MASTER ORCHESTRATOR
// ============================================================
async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║  🤖 MALALA AUTONOMOUS ENGINE v3.0                     ║');
  console.log('║  Google Search Grounding | 24/7 | malala.my.id        ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');
  log(`⏰ Mulai: ${NOW_ISO}`);

  try {
    // Load current events
    log('\n📂 Memuat data dari Firestore...');
    const snap = await getDocs(collection(db, 'events'));
    const currentEvents = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    log(`   ✓ ${currentEvents.length} event dimuat`);

    // Run all modules
    const eventUpdates = await runEventScanner(currentEvents);
    await sleep(2000);

    const newsAdded = await runHotInfoUpdater();
    await sleep(2000);

    const issues = await runHealthCheck(currentEvents);

    const hasChanges = eventUpdates.updates > 0 || eventUpdates.discoveries > 0 || newsAdded > 0;
    await runSEOPing(hasChanges);

    const duration = Date.now() - START_TIME.getTime();
    const report = await writeAutonomousReport({ eventUpdates, newsAdded, issues, duration });

    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║  ✅ AUTONOMOUS RUN SELESAI                            ║');
    console.log('╠═══════════════════════════════════════════════════════╣');
    console.log(`║  ⏱️  Durasi: ${(duration / 1000).toFixed(1)} detik${' '.repeat(Math.max(0, 35 - (duration / 1000).toFixed(1).length))}║`);
    console.log(`║  🔄 Event diperbarui: ${eventUpdates.updates}${' '.repeat(Math.max(0, 35 - String(eventUpdates.updates).length))}║`);
    console.log(`║  🆕 Event baru (pending): ${eventUpdates.discoveries}${' '.repeat(Math.max(0, 31 - String(eventUpdates.discoveries).length))}║`);
    console.log(`║  📰 Berita baru: ${newsAdded}${' '.repeat(Math.max(0, 39 - String(newsAdded).length))}║`);
    console.log(`║  ⚠️  Isu data: ${issues.length}${' '.repeat(Math.max(0, 42 - String(issues.length).length))}║`);
    console.log('╚═══════════════════════════════════════════════════════╝\n');

  } catch (e) {
    console.error('❌ Fatal error di Autonomous Engine:', e);
    await setDoc(doc(db, 'settings', 'autonomous'), {
      lastRunAt: NOW_ISO, lastRunStatus: 'error', lastRunError: e.message
    }, { merge: true });
    process.exit(1);
  }

  process.exit(0);
}

main();
