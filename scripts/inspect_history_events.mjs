import { execSync } from 'child_process';
import fs from 'fs';

const commits = ['67981f8', '4c0ac19', '84a33f7', 'c4e4a51', 'b4efc80', 'HEAD~2', 'HEAD~3'];

for (const commit of commits) {
  try {
    const raw = execSync(`git show ${commit}:src/data/firestore_backup.json`, { maxBuffer: 10 * 1024 * 1024 }).toString();
    const parsed = JSON.parse(raw);
    if (parsed.eventItems && parsed.eventItems.length > 0) {
      console.log(`\n=== COMMIT ${commit} (${parsed.eventItems.length} events) ===`);
      for (const ev of parsed.eventItems) {
        console.log(`- [${ev.id}] ${ev.title}: ${ev.imageUrl}`);
      }
    }
  } catch (e) {
    // try next
  }
}
