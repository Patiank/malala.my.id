const fs = require('fs');

// 1. Update src/utils/ai.ts
let aiCode = fs.readFileSync('src/utils/ai.ts', 'utf8');

aiCode = aiCode.replace(/gemini-3\.6-flash/g, 'gemini-3.7-flash');
aiCode = aiCode.replace(/\['gemini-3\.6-flash'/g, "['gemini-3.7-flash', 'gemini-3.6-flash'");

fs.writeFileSync('src/utils/ai.ts', aiCode, 'utf8');
console.log('✅ src/utils/ai.ts upgraded to Gemini 3.7 Flash!');

// 2. Update server.ts
let serverCode = fs.readFileSync('server.ts', 'utf8');

serverCode = serverCode.replace(/gemini-3\.6-flash/g, 'gemini-3.7-flash');

fs.writeFileSync('server.ts', serverCode, 'utf8');
console.log('✅ server.ts upgraded to Gemini 3.7 Flash!');
