import * as fs from 'fs';
import * as path from 'path';

// Load user provided JSON
const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');

const raw = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));

// Build unified image map
const allItemsMap = new Map<string, string>();

const checkAndAdd = (list: any[]) => {
  if (Array.isArray(list)) {
    list.forEach((item: any) => {
      if (item.id && item.imageUrl) {
        allItemsMap.set(item.id, item.imageUrl);
      }
    });
  }
};

checkAndAdd(raw.destinations);
checkAndAdd(raw.cultureItems);
checkAndAdd(raw.culinaryItems);
checkAndAdd(raw.souvenirItems);
checkAndAdd(raw.eventItems);
checkAndAdd(raw.downloadItems);

let contentStr = fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'content.ts'), 'utf-8');

let updatedCount = 0;
allItemsMap.forEach((imgUrl, id) => {
  // Pattern 1: id comes before imageUrl
  const regex1 = new RegExp(`(["']?id["']?\\s*:\\s*["']${id}["'][\\s\\S]*?["']?imageUrl["']?\\s*:\\s*["'])([^"']*)(["'])`);
  if (regex1.test(contentStr)) {
    contentStr = contentStr.replace(regex1, `$1${imgUrl}$3`);
    updatedCount++;
    return;
  }
  // Pattern 2: imageUrl comes before id
  const regex2 = new RegExp(`(["']?imageUrl["']?\\s*:\\s*["'])([^"']*)(["'][\\s\\S]*?["']?id["']?\\s*:\\s*["']${id}["'])`);
  if (regex2.test(contentStr)) {
    contentStr = contentStr.replace(regex2, `$1${imgUrl}$3`);
    updatedCount++;
    return;
  }
});

fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'content.ts'), contentStr, 'utf-8');
console.log(`✅ Berhasil memperbarui ${updatedCount} gambar banner di src/data/content.ts dari backup Firestore!`);
