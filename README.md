# Copilot Project

A comprehensive npm plugin for optimizing GitHub Copilot chat experience with intelligent documentation integration and specialized chat modes.

## Features

- **Automated Configuration**: Copies .github configuration files on install
- **Documentation Integration**: Jest and NestJS local documentation referencing
- **Specialized Chat Modes**:
  - `jest` - Jest testing framework assistance
  - `commit-analyzer` - Conventional commit message generation
  - `changeset-analyzer` - Semantic versioning and changelog generation
  - `dev` - Universal development assistance with framework detection
- **Development Tools**: ESLint, Prettier, TypeScript, Husky, Commitizen ready
- **CI/CD Ready**: GitHub Actions workflows for validation and automated releases

## Chat Modes

### Jest Mode (`jest`)

Expert assistance for Jest testing framework with local documentation integration.

### Commit Analyzer (`commit-analyzer`)

Analyzes Git staged changes to generate conventional commit messages using Commitizen.

### Changeset Analyzer (`changeset-analyzer`)

Analyzes commit history to generate semantic versioning changesets and release notes.

### Dev Mode (`dev`)

Universal development assistance with intelligent framework detection and contextual guidance.

## Installation & Auto-Configuration

### Automatic Setup

The package automatically configures GitHub Copilot in your project:

```bash
# Install the package
npm install copilot-project
# or
pnpm add copilot-project
# or
yarn add copilot-project
```

**What happens automatically:**

- ✅ Creates `.github/chatmodes/`, `.github/instructions/`, and `.github/prompts/` directories
- ✅ Copies all GitHub Copilot configuration files
- ✅ Sets up specialized chat modes for development
- ✅ Maintains version control and automatic updates

### Manual Configuration

You can also run the configuration manually:

```bash
# Via npm script
npm run init-config

# Via direct execution
npx copilot-config

# With options
npx copilot-config --help
npx copilot-config --force
```

### Auto-Update System

The configuration automatically updates when you:

- **Install** the package (`postinstall`)
- **Update** the package (`postupdate`)
- **Build/Package** your project (`prepack`)

The system intelligently detects changes and only updates files that need updating.

## Usage

### Using GitHub Copilot Chat Modes

1. **Install in your project** (see Installation section above)
2. **Use GitHub Copilot chat modes:**
   - Type `@workspace /jest` for Jest testing assistance
   - Type `@workspace /commit-analyzer` when using Commitizen
   - Type `@workspace /changeset-analyzer` when creating changesets
   - Type `@workspace /dev` for general development help
3. **Access local documentation** in `node_modules/copilot-project/docs/`
   - Jest documentation and examples
   - NestJS comprehensive guides
   - Framework-specific tutorials

## Development

### Local Development

- Edit the templates in `.github` and the documentation in `docs`
- The script `init-github-config.js` handles the automatic copying of files
- Use `pnpm dev` scripts for development workflow

### Scripts Available

```bash
pnpm run lint          # Run ESLint
pnpm run format        # Format code with Prettier
pnpm run check-types   # TypeScript type checking
pnpm run commit        # Interactive commit with Commitizen
pnpm run changeset     # Create a changeset for versioning
```

## Publishing

### Automated Publishing (Recommended)

1. Create a changeset: `pnpm changeset`
2. Commit and push to `main` branch
3. GitHub Actions will automatically:
   - Create a release PR with version bumps
   - Publish to npm when PR is merged

### Manual Publishing

Use GitHub Actions workflow for emergency releases:

1. Go to **Actions** → **Manual npm Publish**
2. Select version bump type (patch/minor/major)
3. Run workflow (supports dry-run)

### Setup Requirements

- Configure `NPM_TOKEN` in GitHub Secrets
- See `docs/npm-publishing-setup.md` for detailed instructions

## License

MIT
