const fs = require('fs');

// 1. Update server.ts
let serverCode = fs.readFileSync('server.ts', 'utf8');

if (!serverCode.includes('DESTINATIONS')) {
  serverCode = serverCode.replace(
    'import { GoogleGenAI } from "@google/genai";',
    'import { GoogleGenAI } from "@google/genai";\nimport { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE } from "./src/data/content";'
  );
}

const oldServerChatBlock = `  // API Route: UNI MALA AI Chatbot / Quick Answers
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const { message } = req.body;

      if (!apiKey) {
        return res.json({
          reply: \`**Salamaik Datang di Ranah Minang!** 🙏✨\\n\\nSaya **UNI MALA AI**, pemandu virtual resmi pariwisata Sumatera Barat. Terkait pertanyaan Anda mengenai *"\${message}"*:\\n\\nSumatera Barat menawarkan pesona luar biasa dari Geopark Lembah Harau, Puncak Lawang Danau Maninjau, Istano Pagaruyung, hingga kuliner legendaris Rendang & Nasi Kapau. Silakan gunakan menu **Rencanakan AI** untuk membuat itinerary kustom 1–7 hari atau tanyakan rute & rekomendasi spesifik lainnya!\`
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = \`Anda adalah 'UNI MALA AI Sumbar' - Pemandu Wisata & Budaya Resmi Sumatera Barat (Wonderful West Sumatra) yang super pintar, ramah, berwawasan luas, dan menyenangkan.
Jawablah pertanyaan wisatawan berikut dengan akurat, komprehensif, terstruktur (gunakan bullet points, tips, dan emoji), serta dengan kehangatan khas Ranah Minang.\`;

      const prompt = \`\${systemInstruction}\\n\\nPertanyaan Wisatawan: \${message}\`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      return res.json({ reply: response.text });
    } catch (error: any) {
      console.error("AI Chat error:", error);
      return res.status(500).json({ error: error.message || "Gagal menjawab pertanyaan AI" });
    }
  });`;

const newServerChatBlock = `  // API Route: UNI MALA AI Chatbot / Real-Time Conversational Guide
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const { message, history = [] } = req.body;

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: "Pesan chat tidak boleh kosong." });
      }

      const cleanMsg = message.trim();

      if (!apiKey) {
        return res.json({
          reply: \`**Salamaik Datang di Ranah Minang!** 🙏✨\\n\\nSaya **UNI MALA AI**, pemandu virtual resmi pariwisata & kebudayaan Sumatera Barat. Menjawab pertanyaan Anda mengenai *"\${cleanMsg}"*:\\n\\nSumatera Barat menawarkan pesona 38+ destinasi alam & geopark (seperti Lembah Harau, Ngarai Sianok, Danau Singkarak, dan Kepulauan Mandeh), 26+ kuliner legendaris (Rendang, Nasi Kapau, Sate Padang), dan kekayaan budaya Minangkabau.\\n\\n💡 *Tips:* Gunakan fitur **Rencanakan AI** untuk membuat jadwal perjalanan harian (1–7 hari) otomatis yang disesuaikan dengan kebutuhan Anda.\`
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Build in-memory Knowledge Base (Simple RAG Grounding)
      const destList = DESTINATIONS.map((d: any) => \`- \${d.title} (\${d.regency}): Kategori \${d.category}, Tag: \${d.tag}. Keunggulan: \${d.highlights?.join(', ')}. Lokasi: \${d.locationDetails || d.regency}\`).join('\\n');
      const culList = CULINARY_ITEMS.map((c: any) => \`- \${c.title} (\${c.origin}): \${c.type}. Cita Rasa: \${c.flavorProfile}\`).join('\\n');
      const cultList = CULTURE_ITEMS.map((cu: any) => \`- \${cu.title} (\${cu.origin}): \${cu.category}. Filosofi: \${cu.philosophy}\`).join('\\n');
      const eventList = EVENTS_SCHEDULE.map((e: any) => \`- \${e.title} (\${e.schedule}): di \${e.location}. \${e.isKen ? '[Karisma Event Nusantara / KEN]' : '[Agenda Tahunan]'}\`).join('\\n');

      const systemInstruction = \`Anda adalah 'UNI MALA AI', asisten virtual dan pemandu wisata cerdas resmi Sumatera Barat (Wonderful West Sumatra Tourism Board).

KEPRIBADIAN & GAYA KOMUNIKASI:
1. Ramah, santun, hangat, berwawasan luas, dan membanggakan keluhuran budaya Minangkabau (Adat Basandi Syarak, Syarak Basandi Kitabullah).
2. Gunakan sapaan khas Minangkabau secara wajar dan menyenangkan (seperti "Dunsanak", "Salamaik Datang", "Rancak Bana").
3. Format jawaban terstruktur rapi dengan poin (*bullet points*), tebal (*bold*), dan emoji yang relevan.

PANDUAN PENGETAHUAN & LOGISTIK (GROUNDING):
1. RUTE ITINERARY: Jika wisatawan meminta saran rute atau itinerary, WAJIB susun rute SEARAH per koridor geografis (misal: Koridor Padang-Pesisir Selatan Mandeh, Koridor Padang Panjang-Bukittinggi-Agam, Koridor Payakumbuh-Lembah Harau-Kelok 9, Koridor Solok-Danau Kembar-Alahan Panjang). JANGAN membuat rute bolak-balik.
2. WAKTU TEMPUH REALISTIS:
   - Bandara BIM ke Kota Padang: ±45 menit (23 km)
   - Bandara BIM ke Bukittinggi: ±2 - 2,5 jam via Padang Panjang & Lembah Anai
   - Bukittinggi ke Payakumbuh & Lembah Harau / Kelok 9: ±1 - 1,5 jam (45 km)
   - Bukittinggi ke Puncak Lawang / Danau Maninjau (Kelok 44): ±1 jam
   - Padang ke Kawasan Wisata Bahari Mandeh: ±1,5 jam
   - Padang ke Danau Kembar & Kebun Teh Alahan Panjang: ±1,5 - 2 jam
   - Padang ke Kepulauan Mentawai: Kapal Cepat Mentawai Fast dari Pelabuhan Muaro (±3 - 3,5 jam)
3. KULINER & AKOMODASI: Berikan rekomendasi kuliner otentik halal dan spot penginapan terbaik sesuai koridor lokasi yang ditanyakan.
4. Gunakan data resmi berikut sebagai rujukan utama:

=== DATA RESMI PARIWISATA SUMATERA BARAT ===
[DESTINASI]:
\${destList}

[KULINER]:
\${culList}

[KEBUDAYAAN]:
\${cultList}

[EVENT 2026]:
\${eventList}
\`;

      // Multi-turn conversation history
      const formattedContents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-10);
        for (const item of recentHistory) {
          if (item && item.text) {
            formattedContents.push({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }]
            });
          }
        }
      }

      // Append current message
      formattedContents.push({
        role: 'user',
        parts: [{ text: cleanMsg }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.5,
          tools: [{ googleSearch: {} } as any],
        }
      });

      const reply = response.text || 'Maaf Dunsanak, Uni Mala tidak dapat memproses tanggapan saat ini.';
      return res.json({ reply });
    } catch (error: any) {
      console.error("AI Chat Server Error:", error);
      return res.status(500).json({ error: error.message || "Gagal memproses percakapan dengan AI." });
    }
  });`;

serverCode = serverCode.replace(oldServerChatBlock, newServerChatBlock);
fs.writeFileSync('server.ts', serverCode, 'utf8');
console.log('✅ server.ts updated with full RAG & multi-turn /api/ai/chat');

// 2. Update Drawers.tsx
let drawersCode = fs.readFileSync('src/components/Drawers.tsx', 'utf8');

const targetOld = `    try {
      const data = await fetchAiChat(userText);
      setChatHistory(prev => [...prev, { sender: 'ai', text: data.reply }]);`;

const targetNew = `    const currentHistory = [...chatHistory];
    try {
      const data = await fetchAiChat(userText, currentHistory);
      setChatHistory(prev => [...prev, { sender: 'ai', text: data.reply }]);`;

if (drawersCode.includes(targetOld)) {
  drawersCode = drawersCode.replace(targetOld, targetNew);
  fs.writeFileSync('src/components/Drawers.tsx', drawersCode, 'utf8');
  console.log('✅ Drawers.tsx updated with history passing!');
} else {
  console.log('ℹ️ Drawers.tsx target pattern check');
}
