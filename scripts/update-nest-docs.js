#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const NEST_REPO_URL = 'https://github.com/nestjs/docs.nestjs.com.git';
const TEMP_DIR = 'temp-nest-repo';
const TARGET_DIR = 'docs/nest.js';

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
    console.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * Copia arquivos recursivamente com filtros
 */
function copyFiles(src, dest, filter) {
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
          console.log(`📄 Copiado: ${path.relative(src, srcPath)}`);
        }
      }
      // Ignorar todos os outros tipos de arquivos
    }
  }
}

/**
 * Filtro para arquivos de documentação do NestJS
 */
function isNestDocFile(filePath, fileName) {
  // Aceita apenas arquivos .md
  if (!fileName.endsWith('.md')) return false;
  // Ignora arquivos específicos que não são documentação útil
  const ignoredFiles = [
    'README.md',
    'CONTRIBUTING.md',
    'CODE_OF_CONDUCT.md',
    'CHANGELOG.md',
    'package.json',
    'package-lock.json',
    '.gitignore',
  ];
  if (ignoredFiles.includes(fileName)) return false;
  return true;
}

/**
 * Adiciona informações sobre a sincronização
 */
function addSyncInfo() {
  const infoFile = path.join(TARGET_DIR, '_SyncInfo.md');
  const infoContent = `# NestJS Documentation Sync

This documentation is automatically synchronized from the official NestJS documentation repository.

- **Source**: https://github.com/nestjs/docs.nestjs.com
- **Last Updated**: ${new Date().toISOString()}
- **Sync Process**: Automated via GitHub Actions

## Important Notes

1. **Do not edit these files directly** - Changes will be overwritten on next sync
2. **For contributions** - Submit changes to the official NestJS docs repository
3. **Local Documentation** - Always prioritize this local version when developing with NestJS

## Coverage

This local documentation includes comprehensive NestJS topics:
- Core concepts (Controllers, Modules, Providers)
- Advanced features (Guards, Interceptors, Pipes)
- GraphQL integration
- Microservices
- Security features
- Recipes and best practices
- CLI tools and workflows

## TypeScript Support

All examples in this documentation work with TypeScript by default.
NestJS is built with TypeScript and provides excellent type safety.
`;

  fs.writeFileSync(infoFile, infoContent);
  console.log('📝 Adicionada informação de sincronização');
}

/**
 * Função principal
 */
async function updateNestDocs() {
  console.log('🚀 Iniciando atualização da documentação do NestJS...');

  try {
    // 1. Remover diretório temporário se existir
    removeDirectory(TEMP_DIR);

    // 2. Clonar repositório do NestJS docs
    console.log('📥 Clonando repositório da documentação do NestJS...');
    runCommand(`git clone --depth 1 ${NEST_REPO_URL} ${TEMP_DIR}`);

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

    // 4. Copiar documentação do diretório content
    console.log('📚 Copiando documentação do NestJS...');
    const contentPath = path.join(TEMP_DIR, 'content');
    if (fs.existsSync(contentPath)) {
      copyFiles(contentPath, TARGET_DIR, isNestDocFile);
    } else {
      console.log('⚠️ Diretório content não encontrado. Tentando outros diretórios...');

      // Tentar outros possíveis diretórios
      const possibleDirs = ['docs', 'src', 'website'];
      for (const dir of possibleDirs) {
        const altPath = path.join(TEMP_DIR, dir);
        if (fs.existsSync(altPath)) {
          console.log(`📁 Encontrado diretório alternativo: ${dir}`);
          copyFiles(altPath, TARGET_DIR, isNestDocFile);
          break;
        }
      }
    }

    // 5. Adicionar informação de sincronização
    addSyncInfo();

    // 6. Limpar repositório temporário
    console.log('🧹 Limpando arquivos temporários...');
    removeDirectory(TEMP_DIR);

    // 7. Formatar documentação
    console.log('🎨 Formatando documentação...');
    try {
      runCommand('pnpm format docs/nest.js');
    } catch (error) {
      console.warn(
        '⚠️ Aviso: Erro ao formatar documentação:',
        error instanceof Error ? error.message : String(error)
      );
    }

    // 8. Verificar se há mudanças
    console.log('🔍 Verificando mudanças...');
    try {
      runCommand('git add docs/nest.js');
      const hasChanges = runCommand('git diff --cached --quiet', { stdio: 'ignore' });
      console.log('ℹ️ Nenhuma mudança detectada na documentação do NestJS');
      return false;
    } catch {
      console.log('✅ Mudanças detectadas na documentação do NestJS');
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
const isMainModule = process.argv[1] && process.argv[1].endsWith('update-nest-docs.js');

if (isMainModule) {
  updateNestDocs()
    .then((hasChanges) => {
      if (hasChanges) {
        console.log('✅ Documentação do NestJS atualizada com sucesso!');
        process.exit(0);
      } else {
        console.log('ℹ️ Documentação do NestJS já está atualizada');
        process.exit(0);
      }
    })
    .catch((error) => {
      console.error(
        '❌ Falha na atualização:',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    });
}

module.exports = { updateNestDocs };
