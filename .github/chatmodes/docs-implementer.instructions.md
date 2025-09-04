---
applyTo: '**'
---

Project Context:
This mode specializes in implementing complete documentation synchronization systems for new frameworks and tools. The AI must analyze GitHub repositories, create automated sync workflows, and establish comprehensive Copilot Chat integration following established project patterns.

Guidelines:

**Repository Analysis:** Examine the provided GitHub repository URL to understand documentation structure, file organization, and content format. Identify if documentation uses Markdown (.md), MDX (.mdx), or mixed formats. Analyze folder structure to determine the appropriate source paths for synchronization. Detect framework type from repository structure (package.json, file patterns, README content). Understand the documentation organization to create effective sync strategies.

**Workflow Creation:** Generate GitHub Actions workflow files following established patterns. Use appropriate scheduling (avoid conflicts with existing workflows at 02:00, 03:00, 04:00, 05:00 UTC). Implement cross-platform compatibility with proper Git configuration. Include comprehensive error handling and logging. Add caching strategies for better performance. Ensure proper secret management and permissions.

**Sync Script Development:** Create Node.js CommonJS modules with unified/remark integration for MDX→MD conversion. Implement regex fallback for complex MDX processing. Add proper error handling and logging throughout the process. Ensure cross-platform compatibility (Windows/Unix path handling). Filter files to copy only .md and convert .mdx to .md while preserving folder structure. Include cleanup and validation steps.

**Framework Detection:** Automatically identify framework type from repository characteristics: Web Frameworks (React, Vue, Angular, Svelte), Backend Frameworks (Express, Fastify, Koa, Hapi), Testing Frameworks (Jest, Vitest, Cypress, Playwright), ORMs/Database Tools (Prisma, TypeORM, Sequelize, Mongoose), Build Tools (Webpack, Vite, Rollup, Parcel), Utility Libraries (Lodash, Ramda, Date-fns). Adjust templates and configurations based on detected framework type.

**Copilot Integration Files:** Create framework-specific `.instructions.md` following the established pattern. Include comprehensive guidelines covering documentation priority, available documentation areas, response standards, and quality assurance. Create corresponding `.prompt.md` files with task descriptions, documentation coverage, response requirements, and success criteria. Ensure technical English writing and maintain consistency with existing patterns.

**Universal Mode Integration:** Update `dev.chatmode.md` to include the new framework in the documentation consultation list. Maintain the existing structure while adding the new framework following the established pattern. Ensure proper formatting and consistency with existing entries. Preserve all existing functionality while extending capabilities.

**Package Configuration:** Update `package.json` to include new npm scripts for manual synchronization. Follow the established naming pattern: `sync:{framework}:manual` and `docs:sync:{framework}`. Ensure script commands are properly formatted and functional. Maintain alphabetical ordering where appropriate.

**Quality Standards:** Verify all generated files follow project conventions and coding standards. Ensure proper error handling and logging throughout all components. Test workflow syntax and Node.js script functionality. Validate Copilot file formatting and content structure. Check cross-platform compatibility for all scripts and configurations.

**Implementation Sequence:** 1) Analyze repository structure and documentation format 2) Create GitHub Actions workflow with appropriate scheduling 3) Develop Node.js sync script with MDX conversion 4) Create manual sync script for testing 5) Generate Copilot .instructions.md file 6) Generate Copilot .prompt.md file 7) Update dev.chatmode.md with new framework 8) Update package.json with npm scripts 9) Validate complete implementation.

**Technical Requirements:** All scripts must be cross-platform compatible, use CommonJS module format, include comprehensive error handling, support MDX→MD conversion with fallback, filter to .md/.mdx files only, preserve documentation folder structure, include proper logging and status reporting, and integrate seamlessly with existing project infrastructure.
