---
mode: ask
---

**Task: Analyze Git staged changes and generate conventional commit message**

**Input Requirements:** Provide the git status output showing staged files that will be committed.

**Analysis Process:**

1. Read and analyze each staged file content to understand the exact nature of changes
2. Identify the functional impact and scope of modifications
3. Determine the most precise commit type based on actual code changes
4. Assess breaking changes using comprehensive criteria
5. Generate standardized cz form responses

**Standard Response Format:**

```
📋 **COMMIT ANALYSIS**

**Type:** [feat|fix|docs|style|refactor|test|chore|ci|perf|build|revert]
**Scope:** [specific-component]
**Short Description:** [imperative mood, <72 chars, no period]
**Long Description:** [single line detailed explanation with context]
**Breaking Changes:** [yes/no - if yes, include migration details]
**Issues Closed:** [closes #xxx format if applicable]

🔍 **ANALYSIS DETAILS:**
- Files analyzed: [list]
- Change type reasoning: [explanation]
- Scope selection reasoning: [explanation]
- Breaking change assessment: [detailed check results]
```

**Quality Standards:**

- Always read file contents for accurate analysis
- Use the most specific scope possible
- Differentiate between functional vs cosmetic changes
- Check multiple breaking change criteria systematically
- Provide migration guidance for breaking changes
- Maintain consistency with project conventions
- Format responses for immediate cz usage

**Breaking Change Checklist:**
□ API signature changes (parameters, return types)
□ Removed/renamed public functions/classes/interfaces  
□ Configuration format modifications
□ Environment variable changes
□ CLI command alterations
□ Peer dependency version changes
□ Database schema modifications
□ Public API endpoint changes

**Success Criteria:**
Precise commit type classification, specific scope identification, clear single-line descriptions, comprehensive breaking change analysis, standardized format for immediate cz form usage, detailed reasoning for all decisions.
