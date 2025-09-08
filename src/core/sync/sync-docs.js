const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables from .env file
try {
  require('dotenv').config();
} catch {
  // dotenv is optional, continue without it
}

// Load documentation configurations with error handling
function loadDocsConfig() {
  try {
    const configPath = path.resolve('config/docs-config.json');
    if (!fs.existsSync(configPath)) {
      throw new Error(
        'docs-config.json not found. Please ensure the file exists in the config/ directory.'
      );
    }
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (error) {
    console.error('❌ Error loading docs-config.json:', error.message);
    process.exit(1);
  }
}

const docsConfig = loadDocsConfig();

/**
 * Cross-platform path handling
 */
function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

/**
 * Create directory recursively (cross-platform)
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Validate framework configuration
 */
function validateFrameworkConfig(config, frameworkKey) {
  const requiredFields = ['name', 'repository', 'sourcePath', 'targetPath'];
  const missingFields = requiredFields.filter((field) => !config[field]);

  if (missingFields.length > 0) {
    throw new Error(
      `Framework '${frameworkKey}' is missing required fields: ${missingFields.join(', ')}`
    );
  }

  // Validate repository format (owner/repo)
  if (!config.repository.includes('/') || config.repository.split('/').length !== 2) {
    throw new Error(
      `Framework '${frameworkKey}' has invalid repository format. Expected: 'owner/repo'`
    );
  }

  // Set default values
  config.convertMdx = config.convertMdx !== undefined ? config.convertMdx : false;
  config.type = config.type || 'documentation';
  config.fileExtensions = config.fileExtensions || ['.md', '.mdx'];
  config.excludePatterns = config.excludePatterns || [];
  config.includePatterns = config.includePatterns || [];

  return config;
}

/**
 * Check if file should be included based on patterns
 */
function shouldIncludeFile(filePath, config) {
  const fileName = path.basename(filePath);
  const fileExt = path.extname(fileName);

  // Check file extension
  if (!config.fileExtensions.includes(fileExt)) {
    return false;
  }

  // Check exclude patterns
  if (
    config.excludePatterns.some(
      (pattern) => filePath.includes(pattern) || fileName.includes(pattern)
    )
  ) {
    return false;
  }

  // Check include patterns (if specified, file must match at least one)
  if (config.includePatterns.length > 0) {
    return config.includePatterns.some(
      (pattern) => filePath.includes(pattern) || fileName.includes(pattern)
    );
  }

  return true;
}

/**
 * Enhanced MDX to Markdown converter with better error handling
 */
function convertMdxToMd(content, filePath = '') {
  console.log(`🔄 Converting MDX to Markdown: ${filePath}`);
  return preprocessMdxContent(content);
}

/**
 * Preprocess MDX content to remove JSX and imports
 */
function preprocessMdxContent(content) {
  return (
    content
      // Remove import statements
      .replace(/^import\s+.*?from\s+['""].*?['""]\s*;?\s*$/gm, '')
      // Remove export statements
      .replace(/^export\s+.*?;?\s*$/gm, '')
      // Remove JSX components (simple cases)
      .replace(/<([A-Z][A-Za-z0-9]*)[^>]*>[\s\S]*?<\/\1>/g, '')
      // Remove self-closing JSX components
      .replace(/<([A-Z][A-Za-z0-9]*)[^>]*\/>/g, '')
      // Remove JSX expressions in curly braces (basic)
      .replace(/\{[^}]*\}/g, '')
      // Remove JSX comments
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      // Clean up extra whitespace
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim()
  );
}

/**
 * Download file from GitHub repository with retry and timeout
 */
function downloadFile(url, callback, retries = 5, timeout = 60000) {
  const attemptDownload = (remainingRetries) => {
    const requestOptions = {
      headers: {
        'User-Agent': 'copilot-project-docs-sync',
      },
      timeout,
    };

    // Add GitHub token if available
    const githubToken = process.env.GITHUB_TOKEN || process.env.PAT_TOKEN;
    if (githubToken) {
      requestOptions.headers.Authorization = `token ${githubToken}`;
    }

    const request = https.get(url, requestOptions, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        if (response.statusCode === 200) {
          callback(null, data);
        } else if (response.statusCode === 404) {
          callback(new Error(`File not found (404): ${url}`));
        } else if (response.statusCode === 403) {
          callback(
            new Error(`Access forbidden (403): ${url}. You may have hit the GitHub API rate limit.`)
          );
        } else {
          callback(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        }
      });
    });

    request.on('timeout', () => {
      request.destroy();
      if (remainingRetries > 0) {
        console.log(
          `⏳ Timeout downloading ${url}, retrying... (${remainingRetries} attempts left)`
        );
        setTimeout(() => attemptDownload(remainingRetries - 1), 1000);
      } else {
        callback(new Error(`Timeout downloading file after ${retries} attempts: ${url}`));
      }
    });

    request.on('error', (error) => {
      if (remainingRetries > 0) {
        console.log(`❌ Error downloading ${url}, retrying... (${remainingRetries} attempts left)`);
        setTimeout(() => attemptDownload(remainingRetries - 1), 1000);
      } else {
        callback(new Error(`Failed to download after ${retries} attempts: ${error.message}`));
      }
    });
  };

  attemptDownload(retries);
}

/**
 * Get list of files from GitHub repository with enhanced error handling
 */
function getRepositoryFiles(owner, repo, sourcePath, callback, retries = 5) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${sourcePath}`;
  console.log(`📂 Fetching repository contents: ${sourcePath}`);

  const attemptRequest = (requestUrl, remainingRetries) => {
    // Prepare headers
    const headers = {
      'User-Agent': 'copilot-project-docs-sync',
      Accept: 'application/vnd.github.v3+json',
    };

    // Add GitHub token if available (for GitHub Actions or local development)
    const githubToken = process.env.GITHUB_TOKEN || process.env.PAT_TOKEN;
    if (githubToken) {
      headers.Authorization = `token ${githubToken}`;
      console.log(`🔑 Using GitHub token for authentication`);
    }

    const request = https.get(
      requestUrl,
      {
        headers,
        timeout: 45000, // Increased to 45 seconds
      },
      (response) => {
        let data = '';

        console.log(`📡 Response status: ${response.statusCode}`);

        // Handle redirects
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          console.log(`🔄 Following redirect to: ${response.headers.location}`);
          return attemptRequest(response.headers.location, remainingRetries);
        }

        // Handle non-200 responses
        if (response.statusCode !== 200) {
          if (response.statusCode === 404) {
            return callback(
              new Error(`Repository or path not found (404): ${owner}/${repo}/${sourcePath}`)
            );
          }
          if (response.statusCode === 403) {
            return callback(
              new Error(
                `Access forbidden (403): ${requestUrl}. You may have hit the GitHub API rate limit.`
              )
            );
          }
          return callback(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        }

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          try {
            if (!data || data.trim() === '') {
              return callback(new Error(`Empty response from GitHub API for path: ${sourcePath}`));
            }

            const parsed = JSON.parse(data);

            // Check for GitHub API errors
            if (parsed.message) {
              if (parsed.message.includes('API rate limit')) {
                return callback(
                  new Error(`GitHub API rate limit exceeded. Please try again later.`)
                );
              }
              if (parsed.message.includes('Not Found')) {
                return callback(
                  new Error(`Repository or path not found: ${owner}/${repo}/${sourcePath}`)
                );
              }
              return callback(new Error(`GitHub API Error: ${parsed.message}`));
            }

            // Ensure we have an array
            if (!Array.isArray(parsed)) {
              return callback(
                new Error(`Expected array response from GitHub API, got: ${typeof parsed}`)
              );
            }

            console.log(`✅ Successfully parsed ${parsed.length} items`);
            callback(null, parsed);
          } catch (error) {
            console.error('❌ JSON Parse Error for URL:', requestUrl);
            console.error('Raw response (first 500 chars):', data.substring(0, 500));
            callback(
              new Error(
                `JSON Parse Error: ${error instanceof Error ? error.message : String(error)}`
              )
            );
          }
        });
      }
    );

    request.on('timeout', () => {
      request.destroy();
      if (remainingRetries > 0) {
        console.log(
          `⏳ Request timeout for ${sourcePath}, retrying... (${remainingRetries} attempts left)`
        );
        // Exponential backoff: wait longer between retries
        const delay = (retries - remainingRetries + 1) * 5000; // 5s, 10s, 15s, etc.
        setTimeout(() => attemptRequest(url, remainingRetries - 1), delay);
      } else {
        callback(new Error(`Request timeout after ${retries} attempts for path: ${sourcePath}`));
      }
    });

    request.on('error', (error) => {
      if (remainingRetries > 0) {
        console.log(
          `❌ Request error for ${sourcePath}, retrying... (${remainingRetries} attempts left)`
        );
        // Exponential backoff for errors too
        const delay = (retries - remainingRetries + 1) * 3000; // 3s, 6s, 9s, etc.
        setTimeout(() => attemptRequest(url, remainingRetries - 1), delay);
      } else {
        callback(new Error(`Request failed after ${retries} attempts: ${error.message}`));
      }
    });
  };

  attemptRequest(url, retries);
}

/**
 * Process directory recursively with enhanced error handling and filtering
 */
function processDirectory(owner, repo, sourcePath, targetPath, config, processedFiles = []) {
  return new Promise((resolve, reject) => {
    console.log(`📁 Processing directory: ${sourcePath}`);

    getRepositoryFiles(owner, repo, sourcePath, (error, files) => {
      if (error) {
        console.error(`❌ Error getting files from ${sourcePath}:`, error.message);
        return reject(error);
      }

      if (!Array.isArray(files)) {
        console.error('❌ Received non-array response from GitHub API');
        return reject(new Error('Invalid response from GitHub API'));
      }

      console.log(`📄 Found ${files.length} items in ${sourcePath}`);

      const promises = files
        .filter((file) => {
          // Filter for directories and supported file types
          if (file.type === 'dir') {
            return true;
          }

          // Check if file should be included based on configuration
          return shouldIncludeFile(file.path, config);
        })
        .map((file) => {
          const relativePath = path.relative(sourcePath, file.path);
          const targetFilePath = path.join(targetPath, relativePath);

          if (file.type === 'dir') {
            // Process subdirectory
            ensureDirectoryExists(targetFilePath);
            return processDirectory(owner, repo, file.path, targetPath, config, processedFiles);
          } else {
            // Process file
            return new Promise((/** @type {(value?: any) => void} */ resolveFile, rejectFile) => {
              console.log(`📥 Downloading: ${file.path}`);

              downloadFile(file.download_url, (downloadError, content) => {
                if (downloadError) {
                  console.error(`❌ Error downloading ${file.path}:`, downloadError.message);
                  return rejectFile(downloadError);
                }

                try {
                  let processedContent = content;
                  let outputFileName = file.name;

                  // Convert MDX to MD if needed
                  if (config.convertMdx && file.name.endsWith('.mdx')) {
                    processedContent = convertMdxToMd(content, file.path);
                    outputFileName = file.name.replace('.mdx', '.md');
                  }

                  const outputPath = path.join(path.dirname(targetFilePath), outputFileName);
                  ensureDirectoryExists(path.dirname(outputPath));

                  // Write file with error handling
                  fs.writeFileSync(outputPath, processedContent, 'utf8');

                  const relativeOutputPath = normalizePath(
                    path.relative(process.cwd(), outputPath)
                  );
                  processedFiles.push(relativeOutputPath);

                  console.log(`✅ Processed: ${file.path} → ${relativeOutputPath}`);
                  resolveFile();
                } catch (processError) {
                  console.error(
                    `❌ Error processing ${file.path}:`,
                    processError instanceof Error ? processError.message : String(processError)
                  );
                  rejectFile(processError);
                }
              });
            });
          }
        });

      if (promises.length === 0) {
        console.log(`ℹ️  No files to process in ${sourcePath}`);
        return resolve(processedFiles);
      }

      Promise.all(promises)
        .then(() => {
          console.log(`✅ Completed processing directory: ${sourcePath}`);
          resolve(processedFiles);
        })
        .catch(reject);
    });
  });
}

/**
 * Sync documentation for a specific framework with comprehensive validation
 */
async function syncFramework(frameworkKey) {
  const config = docsConfig[frameworkKey];

  if (!config) {
    throw new Error(
      `Framework '${frameworkKey}' not found in configuration. Available frameworks: ${Object.keys(docsConfig).join(', ')}`
    );
  }

  // Validate and enhance configuration
  const validatedConfig = validateFrameworkConfig(config, frameworkKey);

  console.log(`\n🚀 Syncing ${validatedConfig.name} documentation...`);
  console.log(`📁 Repository: ${validatedConfig.repository}`);
  console.log(`📂 Source: ${validatedConfig.sourcePath}`);
  console.log(`🎯 Target: ${validatedConfig.targetPath}`);
  console.log(`🔄 Convert MDX: ${validatedConfig.convertMdx ? 'Yes' : 'No'}`);
  console.log(`📋 File Extensions: ${validatedConfig.fileExtensions.join(', ')}`);

  const [owner, repo] = validatedConfig.repository.split('/');
  const startTime = Date.now();

  try {
    // Clean target directory
    if (fs.existsSync(validatedConfig.targetPath)) {
      console.log(`🧹 Cleaning target directory: ${validatedConfig.targetPath}`);
      fs.rmSync(validatedConfig.targetPath, { recursive: true, force: true });
    }

    // Create target directory
    ensureDirectoryExists(validatedConfig.targetPath);

    // Create comprehensive sync info file
    const syncInfo = {
      framework: validatedConfig.name,
      frameworkKey,
      repository: validatedConfig.repository,
      repositoryUrl: `https://github.com/${validatedConfig.repository}`,
      sourcePath: validatedConfig.sourcePath,
      syncDate: new Date().toISOString(),
      convertMdx: validatedConfig.convertMdx,
      fileExtensions: validatedConfig.fileExtensions,
      type: validatedConfig.type,
      excludePatterns: validatedConfig.excludePatterns,
      includePatterns: validatedConfig.includePatterns,
    };

    const syncInfoContent = `# ${validatedConfig.name} Documentation Sync

## Configuration
- **Framework:** ${validatedConfig.name} (${validatedConfig.type})
- **Repository:** [${validatedConfig.repository}](https://github.com/${validatedConfig.repository})
- **Source Path:** \`${validatedConfig.sourcePath}\`
- **Last Sync:** ${syncInfo.syncDate}
- **MDX Conversion:** ${validatedConfig.convertMdx ? 'Enabled' : 'Disabled'}
- **File Extensions:** ${validatedConfig.fileExtensions.join(', ')}

## Sync Settings
- **Exclude Patterns:** ${validatedConfig.excludePatterns.length > 0 ? validatedConfig.excludePatterns.join(', ') : 'None'}
- **Include Patterns:** ${validatedConfig.includePatterns.length > 0 ? validatedConfig.includePatterns.join(', ') : 'All files'}

## About
This documentation is automatically synchronized from the official repository using the copilot-project documentation sync system.

For more information about this sync process, see the [documentation sync guide](../documentation-sync.md).
`;

    fs.writeFileSync(
      path.join(validatedConfig.targetPath, '_SyncInfo.md'),
      syncInfoContent,
      'utf8'
    );

    console.log(`📝 Created sync info file`);

    // Process documentation with enhanced configuration
    const processedFiles = await processDirectory(
      owner,
      repo,
      validatedConfig.sourcePath,
      validatedConfig.targetPath,
      validatedConfig
    );

    const duration = Math.round((Date.now() - startTime) / 1000);
    const summary = {
      framework: frameworkKey,
      name: validatedConfig.name,
      filesProcessed: processedFiles.length,
      targetPath: validatedConfig.targetPath,
      duration: `${duration}s`,
      repository: validatedConfig.repository,
      syncDate: new Date().toISOString(),
    };

    console.log(`\n🎉 Successfully synced ${validatedConfig.name}!`);
    console.log(`📊 Files processed: ${processedFiles.length}`);
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`📁 Target directory: ${validatedConfig.targetPath}`);

    // Save sync summary
    const summaryPath = path.join(validatedConfig.targetPath, '_SyncSummary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');

    // Formatar arquivos automaticamente
    console.log('\n🎨 Formatando arquivos sincronizados...');
    try {
      const { execSync } = require('child_process');
      execSync(`npx prettier --write "${validatedConfig.targetPath}/**/*.md"`, {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '..'),
      });
      console.log('✅ Formatação concluída com sucesso!');
    } catch {
      console.warn(
        '⚠️  Aviso: Não foi possível formatar automaticamente. Execute manualmente: pnpm run format'
      );
    }

    return summary;
  } catch (error) {
    const duration = Math.round((Date.now() - startTime) / 1000);
    console.error(`\n💥 Error syncing ${validatedConfig.name} after ${duration}s:`);
    console.error(error instanceof Error ? error.message : String(error));

    // Log error details for debugging
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack);
    }

    throw error;
  }
}

/**
 * Display help information
 */
function displayHelp() {
  console.log(`
📚 Copilot Project Documentation Sync Tool

USAGE:
  node sync-docs.js <command> [options]

COMMANDS:
  list                          List all available frameworks
  sync <framework>              Sync documentation for specific framework
  sync-all                      Sync documentation for all frameworks
  validate <framework>          Validate framework configuration
  help, -h, --help             Show this help message

EXAMPLES:
  node sync-docs.js list
  node sync-docs.js sync jest
  node sync-docs.js sync-all
  node sync-docs.js validate tailwindcss

AVAILABLE FRAMEWORKS:`);

  Object.entries(docsConfig).forEach(([key, config]) => {
    console.log(`  ${key.padEnd(15)} ${config.name} (${config.type})`);
  });

  console.log(`
RATE LIMITS:
  Without token: 60 requests/hour
  With PAT_TOKEN: 5,000 requests/hour
  
For token setup, see docs/GITHUB-TOKEN-SETUP.md
For more information, see docs/documentation-sync.md
`);
}

/**
 * List all available frameworks
 */
function listFrameworks() {
  console.log('\n📚 Available frameworks for documentation sync:\n');

  Object.entries(docsConfig).forEach(([key, config]) => {
    console.log(`🔹 ${key}`);
    console.log(`   Name: ${config.name}`);
    console.log(`   Type: ${config.type}`);
    console.log(`   Repository: https://github.com/${config.repository}`);
    console.log(`   Source: ${config.sourcePath}`);
    console.log(`   Target: ${config.targetPath}`);
    console.log(`   Convert MDX: ${config.convertMdx ? 'Yes' : 'No'}`);
    console.log('');
  });
}

/**
 * Validate framework configuration
 */
function validateFramework(frameworkKey) {
  console.log(`\n🔍 Validating configuration for: ${frameworkKey}`);

  try {
    const config = docsConfig[frameworkKey];
    if (!config) {
      throw new Error(`Framework '${frameworkKey}' not found`);
    }

    const validatedConfig = validateFrameworkConfig(config, frameworkKey);

    console.log('✅ Configuration is valid!');
    console.log('\n📋 Configuration details:');
    console.log(`   Name: ${validatedConfig.name}`);
    console.log(`   Type: ${validatedConfig.type}`);
    console.log(`   Repository: ${validatedConfig.repository}`);
    console.log(`   Source Path: ${validatedConfig.sourcePath}`);
    console.log(`   Target Path: ${validatedConfig.targetPath}`);
    console.log(`   Convert MDX: ${validatedConfig.convertMdx}`);
    console.log(`   File Extensions: ${validatedConfig.fileExtensions.join(', ')}`);

    if (validatedConfig.excludePatterns.length > 0) {
      console.log(`   Exclude Patterns: ${validatedConfig.excludePatterns.join(', ')}`);
    }

    if (validatedConfig.includePatterns.length > 0) {
      console.log(`   Include Patterns: ${validatedConfig.includePatterns.join(', ')}`);
    }

    return true;
  } catch (error) {
    console.error('❌ Configuration validation failed:');
    console.error(error instanceof Error ? error.message : String(error));
    return false;
  }
}

/**
 * Sync all frameworks
 */
async function syncAllFrameworks() {
  const frameworks = Object.keys(docsConfig);
  console.log(`\n🚀 Syncing documentation for all ${frameworks.length} frameworks...\n`);

  const results = [];
  const errors = [];

  for (const frameworkKey of frameworks) {
    try {
      console.log(`\n${'='.repeat(60)}`);
      const result = await syncFramework(frameworkKey);
      results.push(result);
    } catch (error) {
      console.error(
        `❌ Failed to sync ${frameworkKey}:`,
        error instanceof Error ? error.message : String(error)
      );
      errors.push({
        framework: frameworkKey,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎉 Sync completed!`);
  console.log(`✅ Successful: ${results.length}/${frameworks.length}`);
  console.log(`❌ Failed: ${errors.length}/${frameworks.length}`);

  if (results.length > 0) {
    console.log('\n📊 Successful syncs:');
    results.forEach((result) => {
      console.log(`   ${result.framework}: ${result.filesProcessed} files (${result.duration})`);
    });
  }

  if (errors.length > 0) {
    console.log('\n💥 Failed syncs:');
    errors.forEach((error) => {
      console.log(`   ${error.framework}: ${error.error}`);
    });
  }

  return { results, errors };
}

/**
 * Enhanced main function with command support
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || ['help', '-h', '--help'].includes(args[0])) {
    displayHelp();
    return;
  }

  const command = args[0].toLowerCase();

  try {
    switch (command) {
      case 'list':
        listFrameworks();
        break;

      case 'validate':
        if (args.length < 2) {
          console.error('❌ Error: Framework key required for validate command');
          console.log('Usage: node sync-docs.js validate <framework>');
          process.exit(1);
        }
        const isValid = validateFramework(args[1]);
        process.exit(isValid ? 0 : 1);
        break;

      case 'sync':
        if (args.length < 2) {
          console.error('❌ Error: Framework key required for sync command');
          console.log('Usage: node sync-docs.js sync <framework>');
          process.exit(1);
        }
        console.log('🔄 Starting documentation synchronization...');
        const result = await syncFramework(args[1]);
        console.log('\n🎉 Synchronization completed successfully!');
        console.log(`📊 Summary: ${result.filesProcessed} files processed for ${result.name}`);
        break;

      case 'sync-all':
        console.log('🔄 Starting documentation synchronization for all frameworks...');
        await syncAllFrameworks();
        break;

      default:
        // Backward compatibility: treat unknown command as framework key
        console.log(`⚠️  Treating '${command}' as framework key (legacy mode)`);
        console.log('🔄 Starting documentation synchronization...');
        const legacyResult = await syncFramework(command);
        console.log('\n🎉 Synchronization completed successfully!');
        console.log(
          `📊 Summary: ${legacyResult.filesProcessed} files processed for ${legacyResult.name}`
        );
        break;
    }
  } catch (error) {
    console.error('\n💥 Operation failed:');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  syncFramework,
  docsConfig,
};
