const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf-8');

const oldBubble = `        {/* Tanya Uni Mala Guide Floating Bubble */}
        <div className="absolute bottom-8 right-8 z-50 animate-fade-in block">
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
        </div>`;

const newBubble = `        {/* Tanya Uni Mala Guide Floating Bubble */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 animate-fade-in block">
          <button
            onClick={() => {
              onOpenDrawer('formai');
              window.dispatchEvent(new Event('open-ai-chat'));
            }}
            className="group relative flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 drop-shadow-2xl">
              <img src="/chat-bubble.png" alt="Tanya Uni Mala" className="w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]" />
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse border-2 border-white shadow-md">
                Online
              </div>
            </div>
            <span className="mt-1 sm:mt-2 bg-black/80 backdrop-blur-sm text-white text-[9px] sm:text-xs font-jakarta font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg border border-white/20">
              Tanya Uni Mala
            </span>
          </button>
        </div>`;

code = code.replace(oldBubble, newBubble);
fs.writeFileSync('src/components/Hero.tsx', code);
