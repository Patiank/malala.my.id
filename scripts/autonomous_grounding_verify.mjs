/**
 * scripts/autonomous_grounding_verify.mjs
 * Autonomous event schedule verification with Google Search Grounding
 * Uses Firebase client SDK (same as the rest of the project)
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY diperlukan. Tidak ditemukan di environment.');
  process.exit(1);
}

const NOW = new Date().toISOString();

async function geminiSearchGrounding(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    tools: [{ googleSearch: {} }],
    generationConfig: { temperature: 0.1 }
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function safeParseJSON(text) {
  try {
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return null;
  } catch { return null; }
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function loadCurrentEvents() {
  console.log('📂 Memuat semua event dari Firestore...');
  const snap = await getDocs(collection(db, 'events'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function verifyEvent(event) {
  process.stdout.write(`🔍 [${event.id}] ${event.title.substring(0, 50)}... `);

  const prompt = `Kamu adalah Analis Pariwisata Indonesia yang sangat akurat. Gunakan Google Search untuk mencari informasi RESMI terbaru tentang event berikut.

EVENT:
- Nama: ${event.title}
- Jadwal Terdaftar: ${event.schedule}
- Lokasi: ${event.location || ''}

INSTRUKSI PENTING:
1. Cari di Google: jadwal resmi event ini tahun 2026 (sumber: Kemenparekraf, Dispar Sumbar, website resmi, liputan media terpercaya).
2. Jika event VAKUM / DITUNDA / DIBATALKAN sebutkan dengan jelas.
3. JANGAN mengarang tanggal. Jika tidak ada informasi resmi yang ditemukan, tulis "Belum Terkonfirmasi 2026".
4. Tour de Singkarak: sudah dikonfirmasi VAKUM sejak COVID dan baru rencana kembali 2027.

Output HANYA JSON valid tanpa markdown:
{
  "eventId": "${event.id}",
  "verifiedSchedule": "Jadwal terverifikasi atau 'Belum Terkonfirmasi 2026'",
  "verifiedScheduleEn": "Verified schedule in English",
  "status": "active | postponed | cancelled | unconfirmed",
  "statusNote": "Catatan resmi singkat",
  "isChanged": true atau false,
  "sourceFound": "Nama sumber",
  "confidence": "high | medium | low"
}`;

  try {
    const rawText = await geminiSearchGrounding(prompt);
    const parsed = safeParseJSON(rawText);
    if (parsed) {
      const changed = parsed.isChanged ? '🔄 BERUBAH' : '✓ OK';
      console.log(`${changed} | ${parsed.verifiedSchedule?.substring(0, 40)} (${parsed.confidence})`);
      return { event, verification: parsed };
    }
    console.log('⚠️ Gagal parse');
    return { event, verification: null };
  } catch (e) {
    console.log(`❌ Error: ${e.message.substring(0, 60)}`);
    return { event, verification: null };
  }
}

async function applyCorrections(results) {
  const backupPath = path.resolve(__dirname, '../src/data/firestore_backup.json');
  const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  let updatedCount = 0;
  const changeLog = [];

  console.log('\n📝 MENERAPKAN KOREKSI KE FIRESTORE & BACKUP...');
  console.log('================================================');

  for (const { event, verification } of results) {
    if (!verification) continue;
    const { isChanged, verifiedSchedule, verifiedScheduleEn, status, statusNote, sourceFound, confidence } = verification;

    // Apply if changed and not low confidence and has a real schedule
    const isRealSchedule = verifiedSchedule && !verifiedSchedule.includes('Belum Terkonfirmasi');
    const shouldUpdate = isChanged && confidence !== 'low' && isRealSchedule;

    if (shouldUpdate) {
      const oldSchedule = event.schedule;
      const updatePayload = {
        ...event,
        schedule: verifiedSchedule,
        scheduleEn: verifiedScheduleEn || event.scheduleEn,
        verifiedAt: NOW,
        verificationSource: sourceFound || 'Google Search Grounding (Gemini)',
      };
      if (status === 'postponed' || status === 'cancelled') {
        updatePayload.statusNote = statusNote;
      }

      try {
        await setDoc(doc(db, 'events', event.id), updatePayload, { merge: true });
        console.log(`   ✅ [${event.id}] "${oldSchedule}"\n      → "${verifiedSchedule}" (${status}, ${confidence})`);
        updatedCount++;
        changeLog.push({ id: event.id, title: event.title, oldSchedule, newSchedule: verifiedSchedule, status, sourceFound });

        // Update backup JSON
        const idx = backupData.eventItems?.findIndex(e => e.id === event.id);
        if (idx !== undefined && idx !== -1 && backupData.eventItems) {
          backupData.eventItems[idx] = {
            ...backupData.eventItems[idx],
            schedule: verifiedSchedule,
            scheduleEn: verifiedScheduleEn || backupData.eventItems[idx].scheduleEn,
          };
        }
      } catch (err) {
        console.error(`   ❌ Gagal update ${event.id}:`, err.message);
      }
    } else if (!isChanged || !isRealSchedule) {
      console.log(`   ✓  [${event.id}] Jadwal sudah benar / tidak ada data baru`);
    } else {
      console.log(`   ⚠️  [${event.id}] Kepercayaan terlalu rendah – tidak diterapkan`);
    }
  }

  // Save backup
  backupData.timestamp = NOW;
  fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf8');

  // Save log
  const logPath = path.resolve(__dirname, 'verification_log.json');
  fs.writeFileSync(logPath, JSON.stringify({ runAt: NOW, totalEvents: results.length, totalUpdated: updatedCount, changes: changeLog }, null, 2), 'utf8');

  return { updatedCount, changeLog };
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('🚀 Malala Autonomous Grounding Verifier v2.0');
  console.log('==============================================');
  console.log(`⏰ ${NOW}\n`);

  const events = await loadCurrentEvents();
  console.log(`📋 ${events.length} event ditemukan.\n`);

  const results = [];
  for (let i = 0; i < events.length; i++) {
    const result = await verifyEvent(events[i]);
    results.push(result);
    if (i < events.length - 1) await sleep(3500); // rate limit
  }

  const { updatedCount, changeLog } = await applyCorrections(results);

  console.log('\n\n🎉 SELESAI!');
  console.log(`✅ Diverifikasi: ${events.length} event`);
  console.log(`✏️  Diperbarui: ${updatedCount} event`);
  if (changeLog.length > 0) {
    console.log('\n📋 PERUBAHAN YANG DITERAPKAN:');
    changeLog.forEach(c => {
      console.log(`  [${c.id}] ${c.title}`);
      console.log(`   Sebelum: ${c.oldSchedule}`);
      console.log(`   Sesudah: ${c.newSchedule} (${c.status})`);
    });
  }

  process.exit(0);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
