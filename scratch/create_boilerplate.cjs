const fs = require('fs');
const path = require('path');

const srcDir = 'd:\\Web Project\\Malala';
const destDir = 'd:\\Web Project\\Malala_Boilerplate';

const excludeDirs = ['.git', 'node_modules', 'dist', '.firebase', 'scratch'];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    const dirName = path.basename(src);
    if (excludeDirs.includes(dirName)) return;
    
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('Menyiapkan boilerplate...');
copyRecursiveSync(srcDir, destDir);
console.log('Selesai membuat duplikat di ' + destDir);
