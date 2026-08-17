import * as fs from 'fs';
import * as path from 'path';

// Load user provided JSON
const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');

// Let's read and merge into content.ts
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE } from '../src/data/content';

const raw = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));

// Build image map
const destImageMap = new Map<string, string>();
if (raw.destinations) {
  raw.destinations.forEach((d: any) => {
    if (d.id && d.imageUrl) destImageMap.set(d.id, d.imageUrl);
  });
}

const cultImageMap = new Map<string, string>();
if (raw.cultureItems) {
  raw.cultureItems.forEach((c: any) => {
    if (c.id && c.imageUrl) cultImageMap.set(c.id, c.imageUrl);
  });
}

const culImageMap = new Map<string, string>();
if (raw.culinaryItems) {
  raw.culinaryItems.forEach((cu: any) => {
    if (cu.id && cu.imageUrl) culImageMap.set(cu.id, cu.imageUrl);
  });
}

const evtImageMap = new Map<string, string>();
if (raw.eventItems) {
  raw.eventItems.forEach((e: any) => {
    if (e.id && e.imageUrl) evtImageMap.set(e.id, e.imageUrl);
  });
}

let contentStr = fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'content.ts'), 'utf-8');

// Replace imageUrls in content.ts
destImageMap.forEach((imgUrl, id) => {
  // Regex to find item by id and update its imageUrl
  const regex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?imageUrl:\\s*['"])([^'"]*)(['"])`, 'g');
  if (regex.test(contentStr)) {
    contentStr = contentStr.replace(regex, `$1${imgUrl}$3`);
    console.log(`Updated destination ${id} -> ${imgUrl}`);
  }
});

cultImageMap.forEach((imgUrl, id) => {
  const regex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?imageUrl:\\s*['"])([^'"]*)(['"])`, 'g');
  if (regex.test(contentStr)) {
    contentStr = contentStr.replace(regex, `$1${imgUrl}$3`);
    console.log(`Updated culture ${id} -> ${imgUrl}`);
  }
});

fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'content.ts'), contentStr, 'utf-8');
console.log("Successfully updated src/data/content.ts with all Cloudinary URLs!");
