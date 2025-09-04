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

## Usage

1. Install in your project:
   ```sh
   pnpm add copilot-project
   # or
   npm install copilot-project
   ```
2. After installation, the configuration files in `.github` will be automatically created/updated.
3. Use GitHub Copilot chat modes:
   - Type `@workspace /jest` for Jest assistance
   - Type `@workspace /commit-analyzer` when using Commitizen
   - Type `@workspace /changeset-analyzer` when creating changesets
   - Type `@workspace /dev` for general development help
4. Access comprehensive local documentation for Jest and NestJS in `node_modules/copilot-project/docs/`

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
