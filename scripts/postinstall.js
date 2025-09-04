const fs = require('fs');
const path = require('path');

// Detect root project directory even if running from node_modules
let destDir = process.cwd();
if (destDir.includes('node_modules')) {
  destDir = destDir.split('node_modules')[0];
}
const srcDir = path.join(__dirname, '..', '.github');
const destGithub = path.join(destDir, '.github');

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    if (fs.lstatSync(srcFile).isDirectory()) {
      copyRecursive(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

copyRecursive(srcDir, destGithub);
console.log('Copilot plugin: .github configuration files have been set up in', destGithub);
