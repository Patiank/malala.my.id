import * as fs from 'fs';
import * as path from 'path';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, getDirectDriveUrl } from '../src/data/content';

async function checkAllImages() {
  const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
  let raw: any = {};
  if (fs.existsSync(backupPath)) {
    raw = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
  }

  const collections = [
    { name: 'destinations', items: raw.destinations || DESTINATIONS },
    { name: 'cultureItems', items: raw.cultureItems || CULTURE_ITEMS },
    { name: 'culinaryItems', items: raw.culinaryItems || CULINARY_ITEMS },
    { name: 'eventItems', items: raw.eventItems || EVENTS_SCHEDULE },
  ];

  console.log('=== CHECKING ALL IMAGE URLS ===');
  let emptyCount = 0;
  let driveCount = 0;
  let totalCount = 0;

  for (const col of collections) {
    console.log(`\nChecking ${col.name} (${col.items.length} items)...`);
    for (const item of col.items) {
      totalCount++;
      const rawUrl = item.imageUrl || '';
      const resolvedUrl = getDirectDriveUrl(rawUrl);

      if (!rawUrl.trim()) {
        console.log(`❌ [${col.name}] EMPTY URL: ${item.id} - ${item.title}`);
        emptyCount++;
      } else if (rawUrl.includes('drive.google.com')) {
        driveCount++;
        console.log(`🔍 [${col.name}] Google Drive link: ${item.id} - ${item.title} -> Resolved: ${resolvedUrl}`);
      }
    }
  }

  console.log(`\nTotal checked: ${totalCount}`);
  console.log(`Empty URLs: ${emptyCount}`);
  console.log(`Google Drive URLs: ${driveCount}`);
}

checkAllImages();
