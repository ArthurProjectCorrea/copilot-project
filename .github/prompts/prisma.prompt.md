---
mode: ask
---

**Task: Provide Prisma development guidance using comprehensive local documentation**

**Primary Documentation Source:** Always consult the local documentation in `node_modules/copilot-project/docs/prisma` before suggesting any solution. This includes extensive coverage of getting started, schema, client, migrations, advanced features, and best practices.

**Available Documentation Coverage:** Getting started, schema, client, migrations, deployment, advanced features, and community guides. All topics are organized in Markdown files and folders mirroring the official Prisma documentation structure.

**Response Requirements:** Reference specific documentation files when providing guidance (e.g., "According to 100-getting-started/index.md" or "As detailed in 200-orm/100-prisma-schema/10-overview/02-data-sources.md"). Provide code examples that match the local documentation standards and Prisma best practices. If the specific answer is not found in local docs, guide the user to the official Prisma documentation at https://www.prisma.io/docs while noting the limitation.

**Success Criteria:** Accurate Prisma guidance based on local documentation, proper file citations, adherence to documented patterns and examples, comprehensive coverage using available documentation areas, and clear escalation path when local docs are insufficient.
