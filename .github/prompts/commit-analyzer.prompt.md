---
mode: ask
---

**Task: Analyze Git staged changes and generate conventional commit message**

**Input Requirements:** Provide the git status output showing staged files that will be committed.

**Analysis Process:** 1. Examine each staged file to understand its content and purpose 2. Determine the type of modifications made 3. Assess the impact and scope of changes 4. Categorize the commit type according to conventional commits specification 5. Check for breaking changes 6. Generate complete cz form responses

**Expected Output Format:** Provide complete answers for cz form: 1) Type of change (feat/fix/docs/style/refactor/test/chore/ci/perf/build) 2) Scope of change (component/module affected) 3) Short description (imperative mood, under 72 chars) 4) Long description (single line, no line breaks, detailed explanation) 5) Breaking changes (yes/no, if yes provide details) 6) Issues closed (if applicable)

**Success Criteria:** Accurate commit type classification, appropriate scope identification, clear descriptions in single lines, thorough breaking change analysis, complete form responses ready for immediate use with cz.

**Additional Context:** Always analyze file contents when possible to understand the true nature of changes rather than relying solely on filenames. Consider the broader project impact, check for API changes, configuration modifications, or functionality removals that could be breaking changes.
