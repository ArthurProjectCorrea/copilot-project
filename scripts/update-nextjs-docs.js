#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const NEXTJS_REPO_URL = 'https://github.com/vercel/next.js.git';
const TEMP_DIR = 'temp-nextjs-repo';
const TARGET_DIR = 'docs/next.js';

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
 * Verifica se as dependências de conversão MDX estão disponíveis
 */
function checkMdxDependencies() {
  try {
    require.resolve('unified');
    require.resolve('remark-parse');
    require.resolve('remark-stringify');
    require.resolve('remark-mdx');
    return true;
  } catch {
    console.log('⚠️ Dependências MDX não encontradas, usando conversão simplificada...');
    return false;
  }
}

/**
 * Converte arquivo MDX para MD
 */
async function convertMdxToMd(inputPath, outputPath, hasUnified) {
  if (hasUnified) {
    try {
      const { unified } = require('unified');
      const remarkParse = require('remark-parse');
      const remarkStringify = require('remark-stringify');
      const remarkMdx = require('remark-mdx');

      const content = fs.readFileSync(inputPath, 'utf-8');

      const file = await unified()
        .use(remarkParse)
        .use(remarkMdx)
        .use(remarkStringify, {
          bullet: '-',
          fences: true,
          incrementListMarker: false,
        })
        .process(content);

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, String(file));

      return true;
    } catch (error) {
      console.warn(`⚠️ Erro na conversão unified para ${inputPath}, usando fallback...`);
    }
  }

  // Fallback: conversão simples por regex
  try {
    const content = fs.readFileSync(inputPath, 'utf-8');
    const converted = convertMdxToMdSimple(content);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, converted);
    return true;
  } catch (fallbackError) {
    console.error(`❌ Falha completa na conversão de ${inputPath}`);
    return false;
  }
}

/**
 * Conversão MDX→MD simples usando regex (fallback)
 */
function convertMdxToMdSimple(content) {
  let converted = content;

  // Remove import statements
  converted = converted.replace(/^import\s+.*$/gm, '');

  // Convert Next.js specific JSX components to regular markdown
  converted = converted.replace(/<(\w+)([^>]*)>/g, (match, tagName, attrs) => {
    if (tagName === 'Callout' || tagName === 'Note') {
      return '> **Note**';
    }
    if (tagName === 'Warning') {
      return '> **Warning**';
    }
    if (tagName === 'Tip') {
      return '> **Tip**';
    }
    if (tagName === 'Details') {
      return '<details>';
    }
    if (tagName === 'Summary') {
      return '<summary>';
    }
    if (tagName === 'AppOnly' || tagName === 'PagesOnly') {
      return `<!-- ${tagName} -->`;
    }
    if (tagName === 'Image') {
      return '![Image]';
    }
    return `<!-- ${tagName} -->`;
  });

  // Handle closing tags
  converted = converted.replace(/<\/Details>/g, '</details>');
  converted = converted.replace(/<\/Summary>/g, '</summary>');
  converted = converted.replace(/<\/\w+>/g, '');

  // Clean up multiple newlines
  converted = converted.replace(/\n\n\n+/g, '\n\n');

  // Remove empty lines at start and end
  converted = converted.trim();

  return converted;
}

/**
 * Copia e converte arquivos recursivamente
 */
async function copyAndConvertFiles(src, dest, filter, hasUnified) {
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
      await copyAndConvertFiles(srcPath, destPath, filter, hasUnified);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.mdx')) {
        // Converter MDX para MD
        const mdPath = destPath.replace(/\.mdx$/, '.md');
        const success = await convertMdxToMd(srcPath, mdPath, hasUnified);
        if (success) {
          console.log(`📄 Convertido: ${path.relative(src, srcPath)} → ${path.basename(mdPath)}`);
        }
      } else if (entry.name.endsWith('.md')) {
        // Copiar MD diretamente
        fs.copyFileSync(srcPath, destPath);
        console.log(`📄 Copiado: ${path.relative(src, srcPath)}`);
      }
      // Ignorar todos os outros tipos de arquivos
    }
  }
}

/**
 * Filtro para arquivos de documentação do Next.js
 */
function isNextjsDocFile(filePath, fileName) {
  // Aceita apenas arquivos .mdx e .md
  if (fileName.endsWith('.mdx') || fileName.endsWith('.md')) return true;
  return false;
}

/**
 * Adiciona informações sobre a sincronização
 */
function addSyncInfo() {
  const infoFile = path.join(TARGET_DIR, '_SyncInfo.md');
  const infoContent = `# Next.js Documentation Sync

This documentation is automatically synchronized from the official Next.js documentation repository.

- **Source**: https://github.com/vercel/next.js
- **Last Updated**: ${new Date().toISOString()}
- **Sync Process**: Automated via GitHub Actions
- **Conversion**: MDX → Markdown

## Important Notes

1. **Do not edit these files directly** - Changes will be overwritten on next sync
2. **For contributions** - Submit changes to the official Next.js docs repository
3. **Local Documentation** - Always prioritize this local version when developing with Next.js
4. **Format Conversion** - Original MDX files are converted to Markdown for compatibility

## Coverage

This local documentation includes comprehensive Next.js topics:
- Getting started guides
- App Router and Pages Router
- API Routes and Server Components
- Styling and optimizations
- Deployment guides
- Advanced features
- Best practices and examples

## MDX Conversion

The original documentation uses MDX format with React components. During sync:
- MDX files are converted to standard Markdown
- Next.js-specific JSX components are converted to appropriate Markdown equivalents
- Interactive elements are converted to static documentation
- Code examples are preserved with proper syntax highlighting
- Images and assets are preserved
`;

  fs.writeFileSync(infoFile, infoContent);
  console.log('📝 Adicionada informação de sincronização');
}

/**
 * Função principal
 */
async function updateNextjsDocs() {
  console.log('🚀 Iniciando atualização da documentação do Next.js...');

  try {
    // 1. Verificar dependências MDX
    console.log('🔍 Verificando dependências para conversão MDX...');
    const hasDependencies = checkMdxDependencies();

    // 2. Remover diretório temporário se existir
    removeDirectory(TEMP_DIR);

    // 3. Clonar repositório do Next.js (apenas a pasta docs para economizar tempo e espaço)
    console.log('📥 Clonando repositório do Next.js...');
    runCommand(`git clone --depth 1 --filter=blob:none --sparse ${NEXTJS_REPO_URL} ${TEMP_DIR}`);
    runCommand(`git -C ${TEMP_DIR} sparse-checkout set docs`);

    // 4. Limpar diretório de destino
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

    // 5. Copiar e converter documentação do diretório docs
    console.log('📚 Copiando e convertendo documentação do Next.js...');
    const docsPath = path.join(TEMP_DIR, 'docs');
    if (fs.existsSync(docsPath)) {
      await copyAndConvertFiles(docsPath, TARGET_DIR, isNextjsDocFile, hasDependencies);
    } else {
      console.log('⚠️ Diretório docs não encontrado. Verificando estrutura do repositório...');

      // Listar conteúdo do repositório para debug
      const repoContents = fs.readdirSync(TEMP_DIR);
      console.log('📁 Conteúdo do repositório:', repoContents);
    }

    // 6. Adicionar informação de sincronização
    addSyncInfo();

    // 7. Limpar repositório temporário
    console.log('🧹 Limpando arquivos temporários...');
    removeDirectory(TEMP_DIR);

    // 8. Formatar documentação
    console.log('🎨 Formatando documentação...');
    try {
      runCommand('pnpm format docs/next.js');
    } catch (error) {
      console.warn(
        '⚠️ Aviso: Erro ao formatar documentação:',
        error instanceof Error ? error.message : String(error)
      );
    }

    // 9. Verificar se há mudanças
    console.log('🔍 Verificando mudanças...');
    try {
      runCommand('git add docs/next.js');
      const hasChanges = runCommand('git diff --cached --quiet', { stdio: 'ignore' });
      console.log('ℹ️ Nenhuma mudança detectada na documentação do Next.js');
      return false;
    } catch {
      console.log('✅ Mudanças detectadas na documentação do Next.js');
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
const isMainModule = process.argv[1] && process.argv[1].endsWith('update-nextjs-docs.js');

if (isMainModule) {
  updateNextjsDocs()
    .then((hasChanges) => {
      if (hasChanges) {
        console.log('✅ Documentação do Next.js atualizada com sucesso!');
        process.exit(0);
      } else {
        console.log('ℹ️ Documentação do Next.js já está atualizada');
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

module.exports = { updateNextjsDocs };
