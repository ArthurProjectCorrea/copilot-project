# Copilot Project

A plugin for automating .github configuration and documentation referencing for Jest and project standards.

## Features
- Automatically copies/updates .github configuration files on install
- Guides users to consult documentation in `node_modules/copilot-project/docs/jest.js`
- Ready for use with pnpm and npm

## Usage
1. Install in your project:
	```sh
	pnpm add copilot-project
	# or
	npm install copilot-project
	```
2. After installation, the configuration files in `.github` will be automatically created/updated.
3. Always consult the documentation in `node_modules/copilot-project/docs/jest.js` for Jest-related questions.

## Development
- Edit the templates in `.github` and the documentation in `docs`.
- The script `scripts/postinstall.js` handles the automatic copying of files.

## Publishing
- Update the version in `package.json` as needed.
- Run `pnpm publish` or `npm publish` to publish to npm.

## License
MIT