const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', '.github');
const destDir = path.join(process.cwd(), '.github');

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    if (fs.lstatSync(srcFile).isDirectory()) {
      copyRecursive(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

copyRecursive(srcDir, destDir);
console.log('Copilot plugin: .github configuration files have been set up.');
