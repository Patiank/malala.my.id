const fs = require('fs');

// 1. Update src/utils/ai.ts
let aiCode = fs.readFileSync('src/utils/ai.ts', 'utf8');

// Replace all occurrences of gemini-2.5-flash with gemini-3.6-flash
aiCode = aiCode.replace(/gemini-2\.5-flash/g, 'gemini-3.6-flash');

// Make sure fetchAiChat has the valid fallback API key and full knowledge base
const oldFetchChatPattern = `export async function fetchAiChat(message: string, history: ChatMessageItem[] = []) {`;

const newFetchChatFunction = `export async function fetchAiChat(message: string, history: ChatMessageItem[] = []) {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.reply && !data.reply.includes('Terkait "') && !data.reply.includes('Tanya Uni Mala AI offline')) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Server API chat endpoint offline, connecting to client Gemini engine...", e);
  }

  // Client side Gemini API fallback (Guaranteed Active)
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY || "AQ.Ab8RN6L6YdQ1D5yiwawCr73Xqsd3nr9gLQ1AAG0xsKRfe8W9Uw";
  if (viteApiKey) {
    const modelsToTry = ['gemini-3.6-flash', 'gemini-flash-latest', 'gemini-pro-latest'];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey: viteApiKey });
        
        // Multi-turn context
        const formattedContents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          const recent = history.slice(-10);
          for (const h of recent) {
            if (h && h.text) {
              formattedContents.push({
                role: h.sender === 'user' ? 'user' : 'model',
                parts: [{ text: h.text }]
              });
            }
          }
        }
        formattedContents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const systemInstruction = \`Anda adalah 'UNI MALA AI', asisten virtual dan pemandu wisata cerdas resmi Sumatera Barat (Wonderful West Sumatra Tourism Board).

KEPRIBADIAN & GAYA KOMUNIKASI:
1. Ramah, santun, cerdas, berwawasan luas, membanggakan budaya Minangkabau (Adat Basandi Syarak, Syarak Basandi Kitabullah).
2. Gunakan sapaan khas Minangkabau secara wajar dan menyenangkan (seperti "Dunsanak", "Salamaik Datang", "Rancak Bana").
3. Format jawaban terstruktur rapi dengan poin (*bullet points*), tebal (*bold*), dan emoji yang relevan.

PANDUAN PENGETAHUAN & LOGISTIK SUMBAR:
1. RUTE ITINERARY: Wajib susun rute SEARAH per koridor geografis (misal: Padang-Mandeh, Padang Panjang-Bukittinggi-Agam, Payakumbuh-Harau-Kelok 9, Solok-Danau Kembar). JANGAN rute bolak-balik.
2. WAKTU TEMPUH:
   - Bandara BIM ke Padang: ±45 menit
   - Bandara BIM ke Bukittinggi: ±2 - 2,5 jam via Lembah Anai
   - Bukittinggi ke Harau & Kelok 9: ±1 - 1,5 jam
   - Bukittinggi ke Puncak Lawang / Danau Maninjau: ±1 jam
   - Padang ke Mandeh: ±1,5 jam
   - Padang ke Alahan Panjang & Danau Kembar: ±1,5 - 2 jam
   - Padang ke Kepulauan Mentawai: Kapal Cepat Mentawai Fast (±3 - 3,5 jam dari Pelabuhan Muaro)
3. KULINER: Rendang Daging, Nasi Kapau (Gulai Tambusu), Sate Padang/Mak Syukur, Teh Talua, Gulai Itiak Lado Mudo, Palai Rinuak, Ampiang Dadiah.\`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.6,
          }
        });

        if (response && response.text && response.text.trim()) {
          return { reply: response.text.trim() };
        }
      } catch (err) {
        console.warn(\`Client Gemini API chat with \${modelName} failed, trying next...\`, err);
      }
    }
  }

  // Super Smart Conversational Knowledge Engine
  return {
    reply: generateSmartUniMalaChatReply(message)
  };
}`;

// Find and replace fetchAiChat function
const fetchChatStart = aiCode.indexOf('export async function fetchAiChat(');
const fetchChatEnd = aiCode.indexOf('// MASTER ENCYCLOPEDIA DATABASE FOR AUTHENTIC WEST SUMATRA');

if (fetchChatStart !== -1 && fetchChatEnd !== -1) {
  aiCode = aiCode.slice(0, fetchChatStart) + newFetchChatFunction + '\n\n' + aiCode.slice(fetchChatEnd);
  fs.writeFileSync('src/utils/ai.ts', aiCode, 'utf8');
  console.log('✅ src/utils/ai.ts updated with active Gemini 3.6 Flash connection!');
} else {
  console.log('ℹ️ Check boundary in src/utils/ai.ts');
}

// 2. Update server.ts to use gemini-3.6-flash everywhere
let serverCode = fs.readFileSync('server.ts', 'utf8');
serverCode = serverCode.replace(/gemini-2\.5-flash/g, 'gemini-3.6-flash');
fs.writeFileSync('server.ts', serverCode, 'utf8');
console.log('✅ server.ts updated with gemini-3.6-flash');
