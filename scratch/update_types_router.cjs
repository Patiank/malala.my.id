const fs = require('fs');

// 1. Update types.ts
let typesTs = fs.readFileSync('src/types.ts', 'utf8');
typesTs = typesTs.replace(
  /\| null;/,
  "| 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact'\n  | null;"
);
fs.writeFileSync('src/types.ts', typesTs, 'utf8');

// 2. Update urlRouter.ts
let routerTs = fs.readFileSync('src/utils/urlRouter.ts', 'utf8');
routerTs = routerTs.replace(
  /const routeMap: Record<string, DrawerType> = \{/,
  `const routeMap: Record<string, DrawerType> = {
  '/about': 'about',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/disclaimer': 'disclaimer',
  '/contact': 'contact',`
);
routerTs = routerTs.replace(
  /case 'destinations': return '\/destinasi';/,
  `case 'about': return '/about';
    case 'privacy': return '/privacy';
    case 'terms': return '/terms';
    case 'disclaimer': return '/disclaimer';
    case 'contact': return '/contact';
    case 'destinations': return '/destinasi';`
);
fs.writeFileSync('src/utils/urlRouter.ts', routerTs, 'utf8');

console.log('Types and Router updated.');
