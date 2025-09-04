const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log('Created:', dest);
}

function copyGithubFilesFromNodeModules() {
  // Caminho do pacote dentro do node_modules
  const pkgName = 'copilot-project';
  const base = process.cwd();
  const pkgPath = path.join(base, 'node_modules', pkgName, '.github');
  const destPath = path.join(base, '.github');

  if (!fs.existsSync(pkgPath)) {
    console.error('Source .github not found in node_modules. Aborting.');
    process.exit(1);
  }

  // Copia todos os arquivos e subpastas
  function copyRecursive(src, dest) {
    ensureDir(dest);
    fs.readdirSync(src).forEach((file) => {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);
      if (fs.lstatSync(srcFile).isDirectory()) {
        copyRecursive(srcFile, destFile);
      } else {
        copyFile(srcFile, destFile);
      }
    });
  }

  copyRecursive(pkgPath, destPath);
  console.log('All .github files have been created in', destPath);
}

copyGithubFilesFromNodeModules();
