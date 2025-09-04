const fs = require('fs');
const path = require('path');

console.log('🚀 Running copilot-project postinstall script...');

// More robust directory detection
let destDir = process.cwd();
console.log('📍 Current working directory:', destDir);
console.log('📍 __dirname:', __dirname);
console.log('📍 npm_config_prefix:', process.env.npm_config_prefix);
console.log('📍 INIT_CWD:', process.env.INIT_CWD);

// Try different methods to find the correct destination
if (process.env.INIT_CWD && process.env.INIT_CWD !== destDir) {
  destDir = process.env.INIT_CWD;
  console.log('📍 Using INIT_CWD as destination:', destDir);
} else if (destDir.includes('node_modules')) {
  destDir = destDir.split('node_modules')[0];
  console.log('📍 Detected installation in node_modules, using project root:', destDir);
}

let srcDir = path.join(__dirname, '..', '.github');
const destGithub = path.join(destDir, '.github');

console.log('📂 Source directory:', srcDir);
console.log('📂 Destination directory:', destGithub);

// Verify source directory exists
if (!fs.existsSync(srcDir)) {
  console.error('❌ Source .github directory not found at:', srcDir);
  console.log('📍 Trying alternative source location...');

  // Try alternative location
  const altSrcDir = path.join(__dirname, '..', '..', '..', 'copilot-project', '.github');
  if (fs.existsSync(altSrcDir)) {
    console.log('✅ Found alternative source:', altSrcDir);
    srcDir = altSrcDir;
  } else {
    console.error('❌ No .github directory found in any expected location');
    process.exit(0); // Don't fail installation
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
    console.log('📁 Created directory:', dest);
  }

  fs.readdirSync(src).forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      copyRecursive(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
      console.log('✅ Copied:', destFile);
    }
  });
}

try {
  copyRecursive(srcDir, destGithub);
  console.log('🎉 Copilot configuration files have been set up successfully!');
  console.log('📁 Location:', destGithub);
} catch (error) {
  console.error('❌ Error during setup:', error instanceof Error ? error.message : String(error));
  // Don't fail the installation
  process.exit(0);
}
