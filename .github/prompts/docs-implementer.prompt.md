---
mode: agent
---

**Task: Integrate new documentation into the unified sync system**

**Input Requirements:**

- GitHub repository URL
- Documentation folder path in the repository
- MDX to MD conversion required (yes/no)
- Framework/tool name

**Mandatory process:**

1. Update the `docs-config.json` file with the provided data
2. Run the unified script to:

- Create the local documentation folder
- Synchronize files from the remote repository
- Generate the instructions file `.github/instructions/[framework].instructions.md` based on the synchronized documentation
- Format all synchronized files according to project standards

3. Update `.github/instructions/dev.instructions.md` to include the new framework in the Documentation Integration section
4. Confirm that the documentation is accessible and properly formatted

**Critical Pattern Requirements for .instructions.md files:**
All generated instruction files MUST follow the EXACT pattern established by Jest, Next.js, NestJS, Prisma, and Tailwind CSS:

1. **Header:** `---\napplyTo: '**'\n---`
2. **Project Context:** Framework description and AI expert role
3. **Mandatory Documentation Priority:** MUST specify `node_modules/copilot-project/docs/[framework]/` as the PRIMARY source
4. **Comprehensive Knowledge Areas:** Detailed framework capabilities breakdown
5. **Development Excellence Standards:** 6-8 best practices and quality guidelines
6. **Best Practices Implementation:** 5-6 practical implementation patterns
7. **Framework Integration Expertise:** Integration with other tools and frameworks
8. **Performance Optimization:** Speed and efficiency strategies
9. **Problem-Solving Approach:** Numbered 5-step methodology
10. **Response Quality Standards:** Clear formatting and citation requirements
11. **Local Documentation Navigation:** File-specific guidance for different question types
12. **Quality Assurance:** Cross-referencing and consistency requirements

**Expected Response Format:**

```
📚 **NEW DOCUMENTATION INTEGRATION**

1. Updated `docs-config.json`:
  - name: [Framework Name]
  - repository: [owner/repo]
  - sourcePath: [docs path]
  - targetPath: [local path]
  - convertMdx: [true/false]
  - schedule: [cron]
  - type: [type]

2. Sync executed:
  - Folder created: [local path]
  - Files synchronized: [quantity]
  - Instructions file generated: .github/instructions/[framework].instructions.md
  - Files formatted

3. Dev instructions updated:
  - Added [framework] to Documentation Integration section in dev.instructions.md
  - Framework now available for universal development assistance

4. Documentation ready for npm packaging and node_modules distribution

**Pattern Compliance Verified:**
✅ Header structure matches established pattern
✅ Mandatory Documentation Priority specifies node_modules path
✅ All 12 required sections included
✅ Technical English throughout
✅ Local documentation navigation included
✅ Quality assurance standards met
```

**Mandatory sequence:**

- Update config → Sync → Generate instructions following EXACT pattern → Update dev.instructions.md → Format files

**Success criteria:**

- Local documentation updated and formatted
- Instructions file generated following the EXACT 12-section pattern used by Jest/Next.js/NestJS/Prisma/Tailwind CSS
- Documentation path correctly references `node_modules/copilot-project/docs/[framework]/`
- Dev instructions updated to include new framework for universal development assistance
- All content in technical English
- Ready for npm distribution and consumption by other projects

**Quality standards:**

- Always base the instructions file on the generated local documentation
- Ensure all files are formatted according to project standards
- Instructions file MUST match the established pattern exactly
- All generated files must be written in technical English
- Documentation paths must reference node_modules structure for portability
