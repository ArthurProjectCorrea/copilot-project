---
mode: ask
---

**Task: Implement complete documentation synchronization system for new frameworks and tools**

**Primary Function:** When provided with a GitHub repository URL and local documentation folder path, automatically create a comprehensive documentation sync system including workflows, scripts, and Copilot Chat integration.

**Required Input Format:** User should specify: "implement documentation for [GitHub repository URL] using documentation in folder '[target folder path]'"

**Implementation Components:**

1. **GitHub Actions Workflow**: Create scheduled workflow (.github/workflows/{framework}-docs-sync.yml) with proper timing to avoid conflicts with existing workflows (avoid 02:00, 03:00, 04:00, 05:00 UTC)
2. **Sync Scripts**: Generate both automated (scripts/sync-{framework}-docs.js) and manual (scripts/manual-{framework}-sync.js) Node.js scripts with MDX→MD conversion
3. **Copilot Instructions**: Create framework-specific .github/instructions/{framework}.instructions.md following established documentation priority patterns
4. **Copilot Prompts**: Generate .github/prompts/{framework}.prompt.md with comprehensive task descriptions and success criteria
5. **Universal Integration**: Update .github/chatmodes/dev.chatmode.md to include new framework in documentation consultation list
6. **Package Scripts**: Add npm scripts to package.json for manual synchronization following the pattern `sync:{framework}:manual`

**Technical Standards:**

- All scripts must be cross-platform compatible (Windows/Unix)
- Use CommonJS module format for Node.js scripts
- Implement unified/remark for MDX conversion with regex fallback
- Filter files to copy only .md and convert .mdx to .md
- Preserve documentation folder structure during sync
- Include comprehensive error handling and logging
- Follow established naming conventions and file patterns

**Framework Detection:** Automatically identify framework type from repository structure (package.json, file patterns, documentation organization) and adjust templates accordingly for optimal integration.

**Quality Assurance Requirements:** Validate GitHub Actions workflow syntax, test Node.js script functionality, verify Copilot file formatting matches existing patterns, ensure all components integrate seamlessly with existing project infrastructure, and confirm cross-platform compatibility.

**Success Criteria:** Complete working documentation sync system ready for immediate use, proper integration with existing Copilot Chat infrastructure, consistent code quality and patterns across all generated files, and comprehensive documentation coverage following established project standards.
