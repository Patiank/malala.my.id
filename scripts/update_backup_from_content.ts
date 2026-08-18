import * as fs from 'fs';
import * as path from 'path';
import {
  DESTINATIONS,
  CULTURE_ITEMS,
  CULINARY_ITEMS,
  EVENTS_SCHEDULE,
  DOWNLOAD_ITEMS,
  HOT_INFO_ITEMS,
  BG_IMAGE_1,
  BG_IMAGE_2
} from '../src/data/content';

const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');

const backupData = {
  timestamp: new Date().toISOString(),
  destinations: DESTINATIONS,
  cultureItems: CULTURE_ITEMS,
  culinaryItems: CULINARY_ITEMS,
  eventItems: EVENTS_SCHEDULE,
  downloadItems: DOWNLOAD_ITEMS,
  hotInfoItems: HOT_INFO_ITEMS,
  appSettings: {
    bgMediaType: 'image',
    baseImage: BG_IMAGE_1,
    revealImage: BG_IMAGE_2,
    baseVideo: '',
    allowedAdminEmails: ['aldoaldiles@gmail.com'],
    heroTextColor: '#000000',
    heroTextTheme: 'black',
    heroTextShadow: true
  }
};

fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf-8');
console.log('✅ firestore_backup.json berhasil diperbarui dengan data master terkini!');
console.log(`- Destinasi: ${DESTINATIONS.length}`);
console.log(`- Budaya: ${CULTURE_ITEMS.length}`);
console.log(`- Kuliner: ${CULINARY_ITEMS.length}`);
console.log(`- Event: ${EVENTS_SCHEDULE.length}`);
console.log(`- Download Items: ${DOWNLOAD_ITEMS.length}`);
console.log(`- Hot Info: ${HOT_INFO_ITEMS.length}`);
