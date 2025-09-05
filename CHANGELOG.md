# copilot-project

## 1.2.0

### Minor Changes

- 3200fcc: Add comprehensive documentation synchronization system with Copilot Chat integration- Implement automated documentation sync for Jest, NestJS, Next.js, and Prisma frameworks- Add GitHub Actions workflows for scheduled documentation updates (MDX→MD conversion)- Create docs-implementer chatmode for standardized new framework implementation- Add Copilot Chat integration files (.instructions.md, .prompts.md) for all frameworks- Include cross-platform sync scripts with comprehensive error handling and logging- Provide manual sync commands and complete automation infrastructure- Update universal dev chatmode to support all documented frameworks

## 1.1.1

### Patch Changes

- 2bb7d80: Fix pnpm compatibility in postinstall script- Add package manager detection to handle pnpm and npm differently - Implement better directory resolution for pnpm environments - Add source project detection to prevent infinite loops - Improve fallback strategies for finding source files in pnpm store - Enhanced logging for better troubleshooting

## 1.2.0

### Minor Changes

- 0530f41: Improve package configuration and installation process- Add self-dependency for better development workflow - Enhance postinstall script with robust directory detection and detailed logging - Improve GitHub configuration initialization with smarter execution logic - Add better error handling and fallback mechanisms for various installation scenarios

### Patch Changes

- Updated dependencies [0530f41]
  - copilot-project@1.2.0

## 1.1.0

### Minor Changes

- 02519fd: Implementação do sistema completo de integração GitHub Copilot com chat modes especializados, documentação extensa Jest/NestJS, workflows CI/CD automatizados, e infraestrutura de publicação npm. Inclui novos modos: changeset-analyzer, dev universal, commit-analyzer, e documentação completa para desenvolvimento profissional.
