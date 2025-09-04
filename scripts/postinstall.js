const fs = require('fs');
const path = require('path');

console.log('🚀 Running copilot-project postinstall script...');

// More robust directory detection for both npm and pnpm
let destDir = process.cwd();
console.log('📍 Current working directory:', destDir);
console.log('📍 __dirname:', __dirname);
console.log('📍 npm_config_prefix:', process.env.npm_config_prefix);
console.log('📍 INIT_CWD:', process.env.INIT_CWD);
console.log('📍 PNPM_PACKAGE_NAME:', process.env.PNPM_PACKAGE_NAME);
console.log('📍 npm_package_name:', process.env.npm_package_name);

// Detect package manager
const isPnpm = process.env.npm_execpath && process.env.npm_execpath.includes('pnpm');
const isNpm = process.env.npm_execpath && process.env.npm_execpath.includes('npm');
console.log('📦 Package manager detected:', isPnpm ? 'pnpm' : isNpm ? 'npm' : 'unknown');

// Try different methods to find the correct destination
// For pnpm, INIT_CWD is more reliable than cwd
if (isPnpm && process.env.INIT_CWD) {
  destDir = process.env.INIT_CWD;
  console.log('📍 Using INIT_CWD for pnpm:', destDir);
} else if (process.env.INIT_CWD && process.env.INIT_CWD !== destDir) {
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

// Skip if we're installing in the source project itself
const packageJsonPath = path.join(destDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.name === 'copilot-project') {
      console.log('🔄 Detected installation in source project, skipping postinstall...');
      process.exit(0);
    }
  } catch (error) {
    console.log('⚠️ Could not read package.json, continuing with installation...');
  }
}

// Verify source directory exists
if (!fs.existsSync(srcDir)) {
  console.error('❌ Source .github directory not found at:', srcDir);
  console.log('📍 Trying alternative source location...');
  
  // Try alternative location for pnpm store structure
  const altSrcDir = path.join(__dirname, '..', '..', '..', 'copilot-project', '.github');
  const pnpmStoreSrcDir = path.resolve(__dirname, '../../..', 'registry.npmjs.org', 'copilot-project', '*/node_modules/copilot-project/.github');
  
  if (fs.existsSync(altSrcDir)) {
    console.log('✅ Found alternative source:', altSrcDir);
    srcDir = altSrcDir;
  } else {
    // For pnpm, try to find in the pnpm store
    try {
      const storePath = path.resolve(__dirname, '../../../..');
      const possiblePaths = [
        path.join(storePath, 'copilot-project', '1.1.0', 'node_modules', 'copilot-project', '.github'),
        path.join(storePath, 'copilot-project', '1.2.0', 'node_modules', 'copilot-project', '.github'),
      ];
      
      for (const possiblePath of possiblePaths) {
        if (fs.existsSync(possiblePath)) {
          console.log('✅ Found pnpm store source:', possiblePath);
          srcDir = possiblePath;
          break;
        }
      }
    } catch (error) {
      console.log('⚠️ Could not locate in pnpm store');
    }
    
    if (!fs.existsSync(srcDir)) {
      console.error('❌ No .github directory found in any expected location');
      process.exit(0); // Don't fail installation
    }
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
