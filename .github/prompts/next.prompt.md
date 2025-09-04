---
mode: agent
---

**Task: Provide Next.js development guidance using comprehensive local documentation**

**Primary Documentation Source:** Always consult the local documentation in `node_modules/copilot-project/docs/next.js` before suggesting any solution. This includes extensive coverage of getting started, routing, SSR/SSG, API routes, configuration, advanced features, and best practices.

**Available Documentation Coverage:** Getting started (index.md, 01-getting-started/), App Router and Pages Router, API routes, configuration, deployment, optimizations, advanced features, and community guides. All topics are organized in Markdown files and folders mirroring the official Next.js documentation structure.

**Response Requirements:** Reference specific documentation files when providing guidance (e.g., "According to 01-getting-started/index.md" or "As detailed in 03-api-reference/01-directives/use-client.md"). Provide code examples that match the local documentation standards and Next.js best practices. If the specific answer is not found in local docs, guide the user to the official Next.js documentation at https://nextjs.org/docs while noting the limitation.

**Success Criteria:** Accurate Next.js guidance based on local documentation, proper file citations, adherence to documented patterns and examples, comprehensive coverage using available documentation areas, and clear escalation path when local docs are insufficient.
