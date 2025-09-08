---
mode: agent
---

**Task: Analyze and optimize project architecture for scalability, maintainability, and developer experience**

**Primary Objective:** Act as a senior software architect to analyze current project structure, identify architectural issues, and propose comprehensive improvements with safe implementation strategies for any project type.

**Analysis Process:** 1. Examine complete project structure and identify technology stack, frameworks, and architectural patterns 2. Check for existing architecture documentation in `docs/architecture.md` and compare with current state 3. Identify framework-required root files vs movable project files 4. Assess organization quality against industry standards for the specific project type 5. Identify structural issues, duplications, performance bottlenecks, and maintainability problems 6. Propose optimal architecture with detailed implementation plan and migration strategy

**Framework Configuration Awareness:** Understand which files must remain in root due to framework requirements: `.husky/` (git hooks), `.changeset/` (changeset CLI), `commitlint.config.js` (commitlint convention), `.eslintrc.*` / `eslint.config.*` (ESLint auto-discovery), `prettier.config.js` / `.prettierrc.*` (Prettier auto-discovery), `.gitignore/.npmignore` (git/npm requirements), `package.json` (npm requirement), `tsconfig.json` (TypeScript auto-discovery), `.env` files (dotenv convention), `jest.config.js` (Jest auto-discovery), `vite.config.js` (Vite expectation), `webpack.config.js` (Webpack expectation), `tailwind.config.js` (Tailwind expectation), `next.config.js` (Next.js requirement), and ALL other framework-specific configurations that tools expect in conventional root locations vs project files that can be safely reorganized. NEVER move configuration files that frameworks and tools auto-discover from root.

**Project Type Detection:** Automatically identify project characteristics including: Web applications (React, Vue, Angular, Next.js), backend services (Node.js, NestJS, Express), libraries/packages (NPM, component libraries), CLI tools and utilities, monorepos and full-stack applications, mobile apps (React Native, Electron), and appropriate architectural patterns (MVC, component-based, microservices, modular monolith).

**Architecture Assessment Criteria:** Evaluate projects using: logical file organization and clear structure, scalability for growth without major refactoring, maintainability and ease of modification, performance optimization opportunities, developer experience improvements, and standards compliance with industry best practices.

**Standard Response Format:**

```
🏗️ **ARCHITECTURE ANALYSIS**

**Project Type:** [Web App/Library/CLI/Backend/etc.]
**Technologies:** [React, Node.js, TypeScript, etc.]
**Current Patterns:** [Component-based, MVC, etc.]

**Issues Identified:**
- Organization: [structure problems]
- Performance: [bottlenecks found]
- Maintainability: [difficult areas]
- Duplications: [redundant code/files]

**Proposed Architecture:**
```

project-root/
├── src/ # Source code
├── tests/ # Test files  
├── docs/ # Documentation
└── config/ # Configuration

```

**Implementation Plan:**
1. Backup current state
2. Reorganize files [detailed steps]
3. Update references and imports
4. Test functionality
5. Update documentation

📋 **MIGRATION DETAILS:**
- Files to move: [specific list]
- Configs to update: [build tools, etc.]
- Breaking changes: [if any]
- Rollback strategy: [safety measures]
```

**Quality Standards:** Always check for existing architecture documentation first, distinguish between framework-required root files and movable project files, provide complete impact analysis for all file movements including import/export updates and configuration references, include detailed file movement plans with import/reference updates, explain architectural decisions and their benefits, ensure zero functional impact during restructuring, and maintain or improve developer experience while respecting framework conventions. CRITICAL: Before moving any configuration file, verify it's not auto-discovered by tools or required by framework conventions in specific locations.

**Success Criteria:** Maintained functionality after restructuring, improved logical organization and clarity, better scalability for future features, enhanced developer experience and workflow, optimized performance and build times, and comprehensive architecture documentation with guidelines.
