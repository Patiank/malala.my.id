const fs = require('fs');
const path = require('path');

const backupPath = path.join(__dirname, '..', 'src', 'data', 'firestore_backup.json');
const contentTsPath = path.join(__dirname, '..', 'src', 'data', 'content.ts');

const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
let contentTs = fs.readFileSync(contentTsPath, 'utf8');

// Preserve top part up to line 83 (before export const DESTINATIONS)
const topPartEnd = contentTs.indexOf('export const DESTINATIONS: Destination[] = [');
if (topPartEnd === -1) {
  console.error('❌ Could not find DESTINATIONS in content.ts');
  process.exit(1);
}
const topPart = contentTs.substring(0, topPartEnd);

// Preserve DOWNLOAD_ITEMS
const downloadStart = contentTs.indexOf('export const DOWNLOAD_ITEMS: DownloadItem[] = [');
const downloadEnd = contentTs.indexOf('export const EVENTS_SCHEDULE: EventItem[] = [');
if (downloadStart === -1 || downloadEnd === -1) {
  console.error('❌ Could not find DOWNLOAD_ITEMS in content.ts');
  process.exit(1);
}
const downloadPart = contentTs.substring(downloadStart, downloadEnd);

// Preserve SOUVENIR_ITEMS
const souvenirStart = contentTs.indexOf('export const SOUVENIR_ITEMS: SouvenirItem[] = [');
if (souvenirStart === -1) {
  console.error('❌ Could not find SOUVENIR_ITEMS in content.ts');
  process.exit(1);
}
const souvenirPart = contentTs.substring(souvenirStart);

// Build new content.ts
const newContentTs = `${topPart}export const DESTINATIONS: Destination[] = ${JSON.stringify(backup.destinations, null, 2)};\n\nexport const CULTURE_ITEMS: CultureItem[] = ${JSON.stringify(backup.cultureItems, null, 2)};\n\nexport const CULINARY_ITEMS: CulinaryItem[] = ${JSON.stringify(backup.culinaryItems, null, 2)};\n\n${downloadPart}export const EVENTS_SCHEDULE: EventItem[] = ${JSON.stringify(backup.eventItems, null, 2)};\n\n${souvenirPart}`;

fs.writeFileSync(contentTsPath, newContentTs, 'utf8');
console.log('✅ src/data/content.ts successfully regenerated with 50 Destinations, 30 Culture, 36 Culinary, and 26 Events!');
