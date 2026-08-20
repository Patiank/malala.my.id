const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf-8');

code = code.replace(
  'img src="/chat-bubble.png" alt="Tanya Uni Mala" className="w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"',
  'img src="/chat-bubble-new.jpg" alt="Tanya Uni Mala" className="w-full h-full object-cover scale-[1.15]"'
);

code = code.replace(
  'className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 drop-shadow-2xl"',
  'className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 drop-shadow-2xl rounded-full overflow-hidden border-[3px] border-white shadow-[0_10px_20px_rgba(0,0,0,0.5)]"'
);

fs.writeFileSync('src/components/Hero.tsx', code);
console.log("Updated to new image!");
