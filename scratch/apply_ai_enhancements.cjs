const fs = require('fs');

// 1. Update server.ts
let serverCode = fs.readFileSync('server.ts', 'utf8');

if (!serverCode.includes('DESTINATIONS')) {
  serverCode = serverCode.replace(
    'import { GoogleGenAI } from "@google/genai";',
    'import { GoogleGenAI } from "@google/genai";\nimport { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE } from "./src/data/content";'
  );
}

const chatEndpoint = `  // API Route: AI Smart Chatbot (UNI MALA AI Minangkabau)
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
          reply: \`**Salamaik Datang di Ranah Minang!** 🙏✨\\n\\nSaya **UNI MALA AI**, asisten pemandu wisata resmi Sumatera Barat. Anda menanyakan: *"\${cleanMsg}"*.\\n\\nSumatera Barat menawarkan pesona 38+ destinasi alam & geopark (seperti Lembah Harau, Ngarai Sianok, Danau Singkarak, dan Kepulauan Mandeh), 26+ kuliner legendaris (Rendang, Nasi Kapau, Sate Padang), dan kekayaan budaya Minangkabau.\\n\\n💡 *Tips:* Gunakan fitur **Rencanakan AI** untuk membuat jadwal perjalanan harian (1–7 hari) otomatis yang disesuaikan dengan kebutuhan Anda.\`
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

      // Format multi-turn conversation history
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

      // Append current user message
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
  });

`;

if (!serverCode.includes('/api/ai/chat')) {
  serverCode = serverCode.replace(
    '  // API Route: AI Travel Planner (UNI MALA AI Minangkabau)',
    chatEndpoint + '  // API Route: AI Travel Planner (UNI MALA AI Minangkabau)'
  );
  fs.writeFileSync('server.ts', serverCode, 'utf8');
  console.log('✅ server.ts updated with /api/ai/chat endpoint');
} else {
  console.log('ℹ️ server.ts already contains /api/ai/chat');
}

// 2. Update src/utils/ai.ts
let aiUtilCode = fs.readFileSync('src/utils/ai.ts', 'utf8');

const oldFetchAiChat = `export async function fetchAiChat(message: string) {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.reply && !data.reply.includes('Terkait "')) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Server API chat endpoint unavailable, falling back to client Gemini / local smart conversational engine", e);
  }

  // Client side Gemini API fallback if VITE_GEMINI_API_KEY is available and has quota
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  if (viteApiKey) {
    const modelsToTry = ['gemini-flash-latest', 'gemini-flash-latest'];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey: viteApiKey });
        const prompt = \`Anda adalah 'UNI MALA AI Sumbar' - Pemandu Wisata & Budaya Resmi Sumatera Barat (Wonderful West Sumatra) yang super pintar, ramah, berwawasan luas, dan menyenangkan.
Jawablah pertanyaan wisatawan berikut dengan akurat, komprehensif, terstruktur (gunakan bullet points, tips, dan emoji), serta dengan kehangatan khas Ranah Minang:
Pertanyaan Wisatawan: "\${message}"\`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            temperature: 0.5,
            tools: [{ googleSearch: {} } as any]
          }
        });

        if (response && response.text && response.text.trim()) {
          return { reply: response.text.trim() };
        }
      } catch (err) {
        console.warn(\`Client Gemini API chat with \${modelName} encountered rate-limit / quota, activating Smart Conversational Engine:\`, err);
      }
    }
  }

  // Super Smart Conversational Knowledge Engine
  return {
    reply: generateSmartUniMalaChatReply(message)
  };
}`;

const newFetchAiChat = `export interface ChatMessageItem {
  sender: 'user' | 'ai';
  text: string;
}

export async function fetchAiChat(message: string, history: ChatMessageItem[] = []) {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.reply && !data.reply.includes('Terkait "')) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Server API chat endpoint unavailable, falling back to client Gemini / local smart conversational engine", e);
  }

  // Client side Gemini API fallback if VITE_GEMINI_API_KEY is available and has quota
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  if (viteApiKey) {
    const modelsToTry = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-pro-latest'];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey: viteApiKey });
        
        // Multi-turn context
        const formattedContents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          const recent = history.slice(-10);
          for (const h of recent) {
            formattedContents.push({
              role: h.sender === 'user' ? 'user' : 'model',
              parts: [{ text: h.text }]
            });
          }
        }
        formattedContents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const systemInstruction = \`Anda adalah 'UNI MALA AI Sumbar' - Asisten Virtual & Pemandu Wisata Resmi Sumatera Barat (Wonderful West Sumatra).
Karakter: Ramah, anggun, berwawasan luas, membanggakan budaya Minangkabau (Adat Basandi Syarak, Syarak Basandi Kitabullah).
Panduan: Berikan rekomendasi rute searah per koridor geografis, perhitungkan waktu tempuh realistis antar-kabupaten/kota di Sumbar, serta rekomendasikan kuliner otentik halal.\`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.5,
            tools: [{ googleSearch: {} } as any]
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

if (aiUtilCode.includes('export async function fetchAiChat(message: string)')) {
  aiUtilCode = aiUtilCode.replace(oldFetchAiChat, newFetchAiChat);
  fs.writeFileSync('src/utils/ai.ts', aiUtilCode, 'utf8');
  console.log('✅ src/utils/ai.ts updated with multi-turn fetchAiChat');
} else {
  console.log('ℹ️ src/utils/ai.ts already updated or pattern matched differently');
}

// 3. Update src/components/Drawers.tsx
let drawersCode = fs.readFileSync('src/components/Drawers.tsx', 'utf8');

const oldHandleChat = `  // Handle UNI MALA AI Chat Submit
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
  };`;

const newHandleChat = `  // Handle UNI MALA AI Chat Submit (Multi-Turn Session Context)
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isChatLoading) return;

    const userText = chatMessage.trim();
    const currentHistory = [...chatHistory];
    setChatMessage('');
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);
    setIsChatLoading(true);

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
  };`;

if (drawersCode.includes(oldHandleChat)) {
  drawersCode = drawersCode.replace(oldHandleChat, newHandleChat);
  fs.writeFileSync('src/components/Drawers.tsx', drawersCode, 'utf8');
  console.log('✅ src/components/Drawers.tsx updated with history passing in handleChatSubmit');
} else {
  console.log('ℹ️ src/components/Drawers.tsx handleChatSubmit pattern check');
}
