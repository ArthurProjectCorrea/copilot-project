---
applyTo: '**'
---

Project Context:
This project provides an automated documentation generation system that can adapt to any software project type. The AI must analyze the project structure, identify technology stack, and generate appropriate documentation following the project's existing patterns and conventions.

Guidelines:

**Mandatory Project Analysis:** ALWAYS begin by thoroughly analyzing the complete project structure to understand: technology stack and frameworks used, project type (npm package, web app, library, API, etc.), existing documentation patterns and conventions, development tools and workflows, target audience (users vs developers), current project state and maturity level. Base all documentation decisions on this analysis.

**Universal Documentation Approach:** Adapt documentation strategy based on project characteristics:

- **Technology Detection:** Identify frameworks, languages, build tools, testing frameworks, deployment methods, and package managers from project files
- **Project Type Recognition:** Determine if it's a library, application, plugin, CLI tool, web service, or other project type
- **Audience Identification:** Understand if documentation should target end users, developers, contributors, or mixed audiences
- **Convention Adaptation:** Follow existing documentation patterns, naming conventions, and organizational structures found in the project
- **Scope Determination:** Generate appropriate documentation depth and breadth based on project complexity and requirements

**Flexible Documentation Categories:** Determine appropriate documentation structure based on project needs:

- **Public Documentation:** User guides, API documentation, installation instructions, tutorials, examples (when project serves external users)
- **Private Documentation:** Developer setup, architecture, workflows, maintenance procedures (when project needs internal documentation)
- **Technical Documentation:** API references, configuration guides, troubleshooting, deployment procedures
- **Community Documentation:** Contributing guidelines, code of conduct, issue templates (for open source projects)
- **Operational Documentation:** Monitoring, maintenance, deployment, security procedures (for production systems)

**Content Adaptation Standards:**

- **Language Selection:** Use appropriate technical language level for the identified audience
- **Structure Organization:** Follow patterns established in existing project documentation or industry standards
- **Example Relevance:** Provide examples that match the project's actual use cases and technology stack
- **Integration Awareness:** Reference actual project files, commands, and configurations
- **Consistency Maintenance:** Match existing documentation tone, format, and organizational patterns
- **Completeness Assessment:** Ensure documentation covers all aspects relevant to the specific project type

**Technology-Specific Knowledge:** Apply appropriate expertise based on detected technologies:

- **Web Frameworks:** React, Vue, Angular, Next.js, Nuxt, SvelteKit patterns and conventions
- **Backend Frameworks:** Express, NestJS, FastAPI, Django, Spring Boot documentation approaches
- **Build Tools:** Webpack, Vite, Rollup, Parcel configuration and workflow documentation
- **Package Managers:** npm, yarn, pnpm, pip, composer installation and usage patterns
- **Testing Frameworks:** Jest, Mocha, Pytest, JUnit testing documentation standards
- **Deployment Platforms:** Vercel, Netlify, AWS, Docker, Kubernetes deployment procedures
- **Database Technologies:** SQL, NoSQL, ORM documentation requirements

**Intelligent Content Generation:**

1. **Project Discovery:** Examine package.json, README.md, file structure, configuration files, and existing documentation
2. **Pattern Recognition:** Identify existing documentation conventions, naming patterns, and organizational structures
3. **Gap Analysis:** Determine what documentation is missing or needs improvement
4. **Content Planning:** Plan documentation structure appropriate for the specific project type and audience
5. **Generation Strategy:** Create documentation that complements existing materials and fills identified gaps
6. **Quality Validation:** Ensure generated content aligns with project standards and serves the intended audience

**Response Quality Standards:**

- Always begin with thorough project analysis before generating any documentation
- Adapt documentation style, depth, and focus to match project characteristics and audience needs
- Reference actual project files, commands, and configurations rather than generic examples
- Maintain consistency with existing project conventions and documentation patterns
- Provide practical, actionable guidance relevant to the specific technology stack and project type
- Ensure generated documentation integrates seamlessly with existing project materials
- Include appropriate cross-references and navigation aids suitable for the project structure

**Local Context Navigation:**
Dynamically identify relevant project files based on detected project type:

- Configuration files → package.json, composer.json, pyproject.toml, Cargo.toml, etc.
- Build/deployment → Dockerfile, docker-compose.yml, .github/workflows/, netlify.toml, vercel.json
- Documentation → README.md, docs/, documentation/, wiki/, existing .md files
- Development tools → .eslintrc, .prettierrc, tsconfig.json, jest.config.js, etc.
- Project structure → src/, lib/, app/, components/, pages/, api/, tests/, etc.

**Quality Assurance:** Ensure all generated documentation accurately reflects the actual project implementation, follows detected conventions, serves the appropriate audience, and maintains professional quality standards. Always prioritize project-specific accuracy over generic templates.
