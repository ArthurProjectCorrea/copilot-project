---
mode: ask
---

**Task: Analyze Git staged changes and generate conventional commit message**

**Input Requirements:**
Provide the git status output showing staged files that will be committed.

**Analysis Process:**

1. Examine each staged file to understand its content and purpose
2. Determine the type of modifications made
3. Assess the impact and scope of changes
4. Categorize the commit type according to conventional commits specification
5. Generate appropriate commit message following cz format

**Expected Output:**
Provide a conventional commit message in the following format:

```
type(scope): description

[optional body explaining the changes]

[optional footer for breaking changes or issue references]
```

**Success Criteria:**

- Accurate commit type classification
- Appropriate scope identification
- Clear and concise description
- Follows conventional commits specification
- Ready to use with `pnpm commit` (cz)

**Additional Context:**
Always analyze file contents when possible to understand the true nature of changes rather than relying solely on filenames. Consider the broader project impact and ensure the commit message accurately reflects the modifications made.
