#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const JEST_REPO_URL = 'https://github.com/jestjs/jest.git';
const TEMP_DIR = 'temp-jest-repo';
const TARGET_DIR = 'docs/jest.js';

/**
 * Remove diretório recursivamente (compatível com Windows e Linux)
 */
function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`🗑️ Removido: ${dirPath}`);
  }
}

/**
 * Executa comandos do shell e loga o output
 */
function runCommand(command, options = {}) {
  console.log(`🔄 Executando: ${command}`);
  try {
    const output = execSync(command, {
      encoding: 'utf8',
      stdio: 'pipe',
      ...options,
    });
    return output;
  } catch (error) {
    console.error(`❌ Erro ao executar comando: ${command}`);
    console.error(error.message);
    throw error;
  }
}

/**
 * Copia arquivos recursivamente com filtros
 */
function copyFiles(src, dest, filter = (_filePath, _fileName) => true) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️ Diretório fonte não existe: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFiles(srcPath, destPath, filter);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.md')) {
        if (filter(srcPath, entry.name)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`📄 Copiado: ${entry.name}`);
        }
      }
      // Ignorar todos os outros tipos de arquivos
    }
  }
}

/**
 * Filtro para arquivos de documentação do Jest
 */
function isJestDocFile(filePath, fileName) {
  // Aceita apenas arquivos .md
  if (!fileName.endsWith('.md')) return false;
  // Ignora arquivos específicos que não são documentação útil
  const ignoredFiles = ['README.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'CHANGELOG.md'];
  if (ignoredFiles.includes(fileName)) return false;
  return true;
}

/**
 * Adiciona nota sobre TypeScript no início se necessário
 */
function addTypeScriptNote() {
  const noteFile = path.join(TARGET_DIR, '_TypeScriptExamplesNote.md');
  const noteContent = `# TypeScript Examples Note

This documentation includes examples that work with both JavaScript and TypeScript.
When using TypeScript, make sure to:

1. Install type definitions: \`npm install --save-dev @types/jest\`
2. Configure your \`tsconfig.json\` to include Jest globals
3. Use proper TypeScript syntax in your test files

For more TypeScript-specific guidance, refer to the Jest TypeScript documentation.
`;

  fs.writeFileSync(noteFile, noteContent);
  console.log('📝 Adicionada nota sobre TypeScript');
}

/**
 * Função principal
 */
async function updateJestDocs() {
  console.log('🚀 Iniciando atualização da documentação do Jest...');

  try {
    // 1. Remover diretório temporário se existir
    removeDirectory(TEMP_DIR);

    // 2. Clonar repositório do Jest
    console.log('📥 Clonando repositório do Jest...');
    runCommand(`git clone --depth 1 ${JEST_REPO_URL} ${TEMP_DIR}`);

    // 3. Limpar diretório de destino
    console.log('🧹 Limpando diretório de destino...');
    if (fs.existsSync(TARGET_DIR)) {
      const files = fs.readdirSync(TARGET_DIR);
      for (const file of files) {
        const filePath = path.join(TARGET_DIR, file);
        fs.rmSync(filePath, { recursive: true, force: true });
      }
    } else {
      fs.mkdirSync(TARGET_DIR, { recursive: true });
    }

    // 4. Copiar documentação principal
    console.log('📚 Copiando documentação principal...');
    const mainDocsPath = path.join(TEMP_DIR, 'docs');
    if (fs.existsSync(mainDocsPath)) {
      copyFiles(mainDocsPath, TARGET_DIR, isJestDocFile);
    }

    // 5. Copiar documentação do website (se existir)
    console.log('🌐 Verificando documentação do website...');
    const websiteDocsPath = path.join(TEMP_DIR, 'website', 'docs');
    if (fs.existsSync(websiteDocsPath)) {
      copyFiles(websiteDocsPath, TARGET_DIR, isJestDocFile);
    }

    // 6. Adicionar nota sobre TypeScript
    addTypeScriptNote();

    // 7. Limpar repositório temporário
    console.log('🧹 Limpando arquivos temporários...');
    removeDirectory(TEMP_DIR);

    // 8. Formatar documentação
    console.log('🎨 Formatando documentação...');
    try {
      runCommand('pnpm format docs/jest.js');
    } catch (error) {
      console.warn(
        '⚠️ Aviso: Erro ao formatar documentação:',
        error instanceof Error ? error.message : String(error)
      );
    }

    // 9. Verificar se há mudanças
    console.log('🔍 Verificando mudanças...');
    try {
      runCommand('git add docs/jest.js');
      const hasChanges = runCommand('git diff --cached --quiet', { stdio: 'ignore' });
      console.log('ℹ️ Nenhuma mudança detectada na documentação do Jest');
      return false;
    } catch {
      console.log('✅ Mudanças detectadas na documentação do Jest');
      return true;
    }
  } catch (error) {
    console.error(
      '❌ Erro durante a atualização:',
      error instanceof Error ? error.message : String(error)
    );

    // Cleanup em caso de erro
    removeDirectory(TEMP_DIR);

    throw error;
  }
}

/**
 * Execução se for chamado diretamente
 */
const isMainModule = process.argv[1] && process.argv[1].endsWith('update-jest-docs.js');
if (isMainModule) {
  updateJestDocs()
    .then((hasChanges) => {
      if (hasChanges) {
        console.log('✅ Documentação do Jest atualizada com sucesso!');
        process.exit(0);
      } else {
        console.log('ℹ️ Documentação do Jest já está atualizada');
        process.exit(0);
      }
    })
    .catch((error) => {
      console.error('❌ Falha na atualização:', error.message);
      process.exit(1);
    });
}

module.exports = { updateJestDocs };
