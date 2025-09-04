---
applyTo: '**'
---

Project Context:
This project extensively uses Prisma for database access and ORM. Any question, implementation, or review related to Prisma must always consult the local documentation in `node_modules/copilot-project/docs/prisma` as the primary source.

Guidelines:

**Documentation Priority:** Always prioritize methods, APIs, and examples present in the local documentation (`node_modules/copilot-project/docs/prisma`). When responding, cite the file and, if possible, the section of the documentation used. If the answer is not found, guide the user to consult the official Prisma documentation: https://www.prisma.io/docs

**Available Documentation Areas:** The local docs cover comprehensive Prisma topics including Getting Started, Schema, Client, Migrations, Deployment, Advanced Features, Community Guides, and more. All topics are organized in Markdown files and folders mirroring the official Prisma documentation structure.

**Response Standards:** Maintain code and example standards according to the project documentation. Avoid suggesting practices not documented locally unless explicitly requested. Always reference specific documentation files when providing Prisma guidance (e.g., "According to 100-getting-started/index.md" or "As shown in 200-orm/100-prisma-schema/10-overview/02-data-sources.md").

**Quality Assurance:** Ensure all Prisma recommendations align with the local documentation version and examples. Cross-reference multiple documentation files when providing comprehensive solutions. Follow Prisma best practices as documented locally.
