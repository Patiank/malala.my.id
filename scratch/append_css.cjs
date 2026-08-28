const fs = require('fs');

const cssToAdd = `
/* ========================================================================== */
/* KINETIC SQUASH & BOUNCE ANIMATION SUITE (LOTTIE-INSPIRED MICRO-INTERACTION) */
/* ========================================================================== */

/* 1. ANIMASI MEMBAL KENYAL PADA TOMBOL / KARTU SAAT DI-HOVER / DIKLIK */
@keyframes elasticJellyBounce {
  0% { transform: scale(1, 1) translateY(0); }
  28% { transform: scale(1.08, 0.91) translateY(2px); }
  48% { transform: scale(0.93, 1.10) translateY(-6px); }
  68% { transform: scale(1.04, 0.97) translateY(1.5px); }
  84% { transform: scale(0.98, 1.02) translateY(-1px); }
  100% { transform: scale(1, 1) translateY(0); }
}

/* 2. ANIMASI GOYANG ELASTIS PADA IKON DI DALAM TOMBOL */
@keyframes iconWobbleSpring {
  0% { transform: scale(1) translateY(0) rotate(0deg); }
  26% { transform: scale(1.18, 0.86) translateY(2px) rotate(-8deg); }
  50% { transform: scale(0.9, 1.2) translateY(-5px) rotate(8deg); }
  74% { transform: scale(1.06, 0.97) translateY(1px) rotate(-3deg); }
  100% { transform: scale(1) translateY(0) rotate(0deg); }
}

/* 3. ANIMASI LOOPING UNTUK PANEL NAVIGASI / KONTAINER MENU (CALL-TO-ACTION) */
@keyframes panelAttentionLoop {
  0% { transform: scale(0.94, 0.94) translateY(6px); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); }
  6% { transform: scale(1.05, 0.93) translateY(3px); box-shadow: 0 8px 25px rgba(234, 88, 12, 0.28), 0 0 0 2px rgba(234, 88, 12, 0.45); }
  14% { transform: scale(0.95, 1.075) translateY(-9px); box-shadow: 0 22px 50px rgba(16, 185, 129, 0.4), 0 0 30px rgba(16, 185, 129, 0.5), 0 0 0 2.5px rgba(16, 185, 129, 0.7); }
  22% { transform: scale(1.03, 0.978) translateY(2.5px); box-shadow: 0 14px 30px rgba(16, 185, 129, 0.22), 0 0 16px rgba(16, 185, 129, 0.32); }
  28% { transform: scale(0.99, 1.012) translateY(-1px); box-shadow: 0 12px 35px rgba(0, 0, 0, 0.14); }
  34%, 100% { transform: scale(1, 1) translateY(0); box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(229, 231, 235, 0.8); }
}

/* 4. ANIMASI LOOPING BERSIH TANPA GLOW/SHADOW (KHUSUS CHAT BUBBLE / FLOATING LOGO) */
@keyframes chatBubbleAttentionLoop {
  0% { transform: scale(0.92, 0.92) translateY(6px) rotate(0deg); }
  6% { transform: scale(1.09, 0.89) translateY(4px) rotate(-5deg); }
  14% { transform: scale(0.91, 1.14) translateY(-14px) rotate(7deg); }
  22% { transform: scale(1.04, 0.96) translateY(3px) rotate(-3deg); }
  28% { transform: scale(0.985, 1.015) translateY(-1px) rotate(1deg); }
  34%, 100% { transform: scale(1, 1) translateY(0) rotate(0deg); }
}

/* ========================================================================== */
/* UTILITY CLASSES                                                           */
/* ========================================================================== */

.hover-elastic-bounce { transform-origin: center bottom; will-change: transform; }
.hover-elastic-bounce:hover { animation: elasticJellyBounce 0.58s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.hover-elastic-bounce:active { transform: scale(0.92, 0.88) translateY(2px); transition: transform 0.1s ease; }

.group-hover-elastic-icon { transform-origin: center center; will-change: transform; }
.group:hover .group-hover-elastic-icon { animation: iconWobbleSpring 0.58s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

.active-elastic-pop { animation: elasticJellyBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

.animate-panel-attention-loop { animation: panelAttentionLoop 3.8s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; transform-origin: center center; will-change: transform, box-shadow; }
.animate-panel-attention-loop:hover { animation-play-state: paused !important; }

.animate-chat-bubble-loop { animation: chatBubbleAttentionLoop 3.6s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; transform-origin: center bottom; will-change: transform; }
.animate-chat-bubble-loop:hover { animation-play-state: paused !important; }
`;

fs.appendFileSync('src/index.css', '\n' + cssToAdd + '\n');
console.log('CSS Appended.');
