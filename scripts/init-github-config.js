const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuração dos diretórios e arquivos
const CONFIG = {
  directories: ['chatmodes', 'instructions', 'prompts'],
  packageName: 'copilot-project',
};

/**
 * Utilitários
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('📁 Created directory:', dir);
  }
}

function calculateFileHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  return crypto.createHash('sha256').update(content).digest('hex');
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log('✅ Created/Updated:', dest);
}

/**
 * Carrega informações de versão
 */
function loadVersionInfo(sourcePath, targetPath) {
  const sourceVersionPath = path.join(sourcePath, '.github', 'version.json');
  const targetVersionPath = path.join(targetPath, '.github', 'version.json');

  let sourceVersion = null;
  let targetVersion = null;

  try {
    if (fs.existsSync(sourceVersionPath)) {
      sourceVersion = JSON.parse(fs.readFileSync(sourceVersionPath, 'utf8'));
    }
  } catch (error) {
    console.warn(
      '⚠️ Could not read source version.json:',
      error instanceof Error ? error.message : String(error)
    );
  }

  try {
    if (fs.existsSync(targetVersionPath)) {
      targetVersion = JSON.parse(fs.readFileSync(targetVersionPath, 'utf8'));
    }
  } catch (error) {
    console.warn(
      '⚠️ Could not read target version.json:',
      error instanceof Error ? error.message : String(error)
    );
  }

  return { sourceVersion, targetVersion };
}

/**
 * Verifica se um arquivo precisa ser atualizado
 */
function needsUpdate(sourceFile, targetFile, sourceVersion, targetVersion) {
  // Se o arquivo de destino não existe, precisa ser criado
  if (!fs.existsSync(targetFile)) {
    return true;
  }

  // Se temos informação de versão e a fonte é mais nova
  if (sourceVersion && targetVersion) {
    if (sourceVersion.version !== targetVersion.version) {
      return true;
    }
    if (sourceVersion.lastUpdated > targetVersion.lastUpdated) {
      return true;
    }
  }

  // Comparação por hash dos arquivos
  const sourceHash = calculateFileHash(sourceFile);
  const targetHash = calculateFileHash(targetFile);

  return sourceHash !== targetHash;
}

/**
 * Copia arquivos de configuração de um diretório para outro
 */
function copyConfigFiles(sourceDir, targetDir, sourceVersion, targetVersion) {
  let updatedFiles = 0;
  let createdFiles = 0;

  CONFIG.directories.forEach((dir) => {
    const sourceDirPath = path.join(sourceDir, dir);
    const targetDirPath = path.join(targetDir, dir);

    if (!fs.existsSync(sourceDirPath)) {
      console.warn(`⚠️ Source directory not found: ${sourceDirPath}`);
      return;
    }

    ensureDir(targetDirPath);

    const files = fs.readdirSync(sourceDirPath);
    files.forEach((file) => {
      if (file.endsWith('.md')) {
        const sourceFile = path.join(sourceDirPath, file);
        const targetFile = path.join(targetDirPath, file);

        const fileExists = fs.existsSync(targetFile);

        if (needsUpdate(sourceFile, targetFile, sourceVersion, targetVersion)) {
          copyFile(sourceFile, targetFile);
          if (fileExists) {
            updatedFiles++;
          } else {
            createdFiles++;
          }
        } else {
          console.log('ℹ️ File up to date:', targetFile);
        }
      }
    });
  });

  return { updatedFiles, createdFiles };
}

/**
 * Função principal
 */
function initGithubConfig(forceRun = false) {
  const base = process.cwd();
  const packagePath = path.join(base, 'node_modules', CONFIG.packageName);
  const targetGithubPath = path.join(base, '.github');

  // Detecta contexto de execução
  const isUpdate = process.env.npm_lifecycle_event === 'postupdate';
  const isPrepack = process.env.npm_lifecycle_event === 'prepack';
  const isInstall = process.env.npm_lifecycle_event === 'postinstall';

  const context = isUpdate
    ? 'Update'
    : isPrepack
      ? 'Package preparation'
      : isInstall
        ? 'Installation'
        : 'Manual execution';

  console.log(`🚀 Initializing GitHub Copilot configuration... (${context})`);
  console.log('📍 Working directory:', base);

  // Verifica se estamos no próprio projeto copilot-project
  // Checka se existe package.json com nome "copilot-project" e as pastas necessárias
  let isSourceProject = false;
  const packageJsonPath = path.join(base, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const hasCopilotProjectName = packageJson.name === CONFIG.packageName;
      const hasConfigDirs = CONFIG.directories.every((dir) =>
        fs.existsSync(path.join(base, '.github', dir))
      );
      isSourceProject = hasCopilotProjectName && hasConfigDirs;
    } catch (error) {
      // Ignore package.json parsing errors
    }
  }

  // Durante desenvolvimento do copilot-project, pula a execução a menos que seja forçada
  if (isSourceProject && !forceRun && !isInstall) {
    console.log('💡 This appears to be the source copilot-project. Skipping initialization.');
    console.log('💡 Use --force flag to run anyway for testing purposes.');
    return;
  }

  // Se estivermos no projeto fonte com --force, use os arquivos locais para teste
  let sourceGithubPath;
  if (isSourceProject && forceRun) {
    sourceGithubPath = path.join(base, '.github');
    console.log('🧪 Force mode: Using local .github files for testing');
  } else {
    sourceGithubPath = path.join(packagePath, '.github');
  }

  // Verifica se os arquivos fonte existem
  if (!fs.existsSync(sourceGithubPath)) {
    console.error('❌ Source .github configuration not found.');
    console.error(`Expected path: ${sourceGithubPath}`);
    if (!isSourceProject) {
      console.log('💡 Make sure copilot-project is properly installed as a dependency.');
    }
    process.exit(1);
  }

  // Carrega informações de versão
  const versionSourcePath = isSourceProject && forceRun ? base : packagePath;
  const { sourceVersion, targetVersion } = loadVersionInfo(versionSourcePath, base);

  // Cria diretório .github se não existir
  ensureDir(targetGithubPath);

  // Copia arquivos de configuração
  const { updatedFiles, createdFiles } = copyConfigFiles(
    sourceGithubPath,
    targetGithubPath,
    sourceVersion,
    targetVersion
  );

  // Copia o arquivo version.json
  const sourceVersionFile = path.join(versionSourcePath, '.github', 'version.json');
  const targetVersionFile = path.join(targetGithubPath, 'version.json');

  if (fs.existsSync(sourceVersionFile)) {
    if (needsUpdate(sourceVersionFile, targetVersionFile, sourceVersion, targetVersion)) {
      copyFile(sourceVersionFile, targetVersionFile);
    }
  }

  // Relatório final
  console.log('\n📊 Summary:');
  console.log(`📄 Files created: ${createdFiles}`);
  console.log(`🔄 Files updated: ${updatedFiles}`);

  if (sourceVersion) {
    console.log(`📦 Package version: ${sourceVersion.version} (${sourceVersion.lastUpdated})`);
  }

  if (isUpdate && updatedFiles > 0) {
    console.log('🎉 Configuration updated successfully after package update!');
  } else if (isInstall && createdFiles > 0) {
    console.log('🎉 GitHub Copilot configuration installed successfully!');
  } else {
    console.log('✨ GitHub Copilot configuration completed successfully!');
  }
}

// Executa apenas se chamado diretamente
if (require.main === module) {
  const forceRun = process.argv.includes('--force');
  initGithubConfig(forceRun);
}

module.exports = { initGithubConfig };
