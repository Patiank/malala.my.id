const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf-8');

// 1. Move to left and add animation
code = code.replace(
  'className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 animate-fade-in block"',
  'className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-50 animate-fade-in block"'
);

// 2. Add floating animation to the button and fix layout
code = code.replace(
  'className="group relative flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none"',
  'className="group relative flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none animate-[bounce_3s_infinite]"'
);

// 3. Remove circle styling and use the transparent PNG
code = code.replace(
  'className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 drop-shadow-2xl rounded-full overflow-hidden border-[3px] border-white shadow-[0_10px_20px_rgba(0,0,0,0.5)]"',
  'className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 drop-shadow-2xl"'
);

code = code.replace(
  'img src="/chat-bubble-new.jpg" alt="Tanya Uni Mala" className="w-full h-full object-cover scale-[1.15]"',
  'img src="/chat-bubble-transparent.png" alt="Tanya Uni Mala" className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"'
);

// 4. Move the 'Online' badge positioning slightly
code = code.replace(
  'className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse border-2 border-white shadow-md"',
  'className="absolute top-0 right-0 sm:top-1 sm:right-1 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse border-2 border-white shadow-md z-10"'
);

fs.writeFileSync('src/components/Hero.tsx', code);
console.log('Hero updated');
