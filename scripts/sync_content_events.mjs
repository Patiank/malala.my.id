import fs from 'fs';
import path from 'path';

const contentPath = path.resolve('src/data/content.ts');
let content = fs.readFileSync(contentPath, 'utf8');

const backupPath = path.resolve('src/data/firestore_backup.json');
const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
const events = backupData.eventItems;

const formattedEventsCode = `export const EVENTS_SCHEDULE: EventItem[] = ${JSON.stringify(events, null, 2)};`;

const startIndex = content.indexOf('export const EVENTS_SCHEDULE: EventItem[] = [');
const nextSectionIndex = content.indexOf('export const SOUVENIR_ITEMS', startIndex);

if (startIndex !== -1 && nextSectionIndex !== -1) {
  const before = content.slice(0, startIndex);
  const after = content.slice(nextSectionIndex);
  const newContent = before + formattedEventsCode + '\n\n' + after;
  fs.writeFileSync(contentPath, newContent, 'utf8');
  console.log('✓ src/data/content.ts EVENTS_SCHEDULE updated successfully with restored Cloudinary URLs!');
} else {
  console.warn('Indices not found:', { startIndex, nextSectionIndex });
}
