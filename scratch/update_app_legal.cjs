const fs = require('fs');
let appTs = fs.readFileSync('src/App.tsx', 'utf8');

// Import LegalModal
if (!appTs.includes("import { LegalModal }")) {
  appTs = appTs.replace(
    /import \{ NewsModal \} from '\.\/components\/NewsModal';/,
    "import { NewsModal } from './components/NewsModal';\nimport { LegalModal } from './components/LegalModal';"
  );
}

// Add state for legal page inside App component
// Actually we can just use activeDrawer, since we added 'about', 'privacy', 'terms', etc. to DrawerType.
// So we can just check if activeDrawer is one of those.

const legalRenderCode = `
      {/* Legal Modal */}
      {(activeDrawer === 'about' || activeDrawer === 'privacy' || activeDrawer === 'terms' || activeDrawer === 'disclaimer' || activeDrawer === 'contact') && (
        <LegalModal
          type={activeDrawer as any}
          onClose={handleCloseDrawer}
        />
      )}

      {/* Tiny Legal Footer */}
      <div className="absolute bottom-1 w-full text-center z-40 pointer-events-auto px-4 flex justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-white/30 font-jakarta font-medium drop-shadow-md pb-1 sm:pb-0">
        <button onClick={() => handleOpenDrawer('about')} className="hover:text-white/80 transition-colors">About Us</button>
        <button onClick={() => handleOpenDrawer('privacy')} className="hover:text-white/80 transition-colors">Privacy Policy</button>
        <button onClick={() => handleOpenDrawer('terms')} className="hover:text-white/80 transition-colors">Terms of Service</button>
        <button onClick={() => handleOpenDrawer('disclaimer')} className="hover:text-white/80 transition-colors">Disclaimer</button>
        <button onClick={() => handleOpenDrawer('contact')} className="hover:text-white/80 transition-colors">Contact</button>
      </div>

      {/* Toast Notifications */}`;

appTs = appTs.replace(/\{\/\* Toast Notifications \*\/\}/, legalRenderCode);

fs.writeFileSync('src/App.tsx', appTs, 'utf8');
console.log('App.tsx updated.');
