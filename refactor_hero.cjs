const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf-8').replace(/\r\n/g, '\n');

// Import MessageCircle
if (!code.includes('MessageCircle')) {
  code = code.replace(
    /import \{ ArrowUpRight, Sparkles(.*?) \} from 'lucide-react';/,
    "import { ArrowUpRight, Sparkles$1, MessageCircle } from 'lucide-react';"
  );
}

// Add Floating Bubble right before </main>
const bubbleCode = `
        {/* Tanya Uni Mala Guide Floating Bubble */}
        <div className="absolute bottom-8 right-8 z-50 animate-fade-in hidden lg:block">
          <button
            onClick={() => {
              onOpenDrawer('formai');
              window.dispatchEvent(new Event('open-ai-chat'));
            }}
            className="group relative bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-3 rounded-[2rem] rounded-br-md shadow-2xl flex items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse border-2 border-white">
              Online
            </div>
            <MessageCircle className="w-6 h-6" />
            <span className="font-jakarta font-bold tracking-wide">Tanya Uni Mala Guide</span>
          </button>
        </div>
`;

code = code.replace(/      <\/main>/, bubbleCode + '\n      </main>');

fs.writeFileSync('src/components/Hero.tsx', code);
console.log("Hero refactored!");
