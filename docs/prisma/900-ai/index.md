---
title: 'Build faster with Prisma + AI'
metaTitle: 'AI'
metaDescription: 'AI'
staticLink: true
---

Grid,
LinkCard,
} from '@site/src/components/GettingStarted';

CardHeading,
HomepageCard,
} from '@site/src/components/ProductBlock';

In the era of AI, where code is increasingly written by agents, ensuring clarity, type safety, and reliable infrastructure is essential. With 5+ years of leadership in the TypeScript ecosystem, Prisma ORM and Prisma Postgres provide the proven foundation for AI-assisted development.

### Get started

Run the following command to bootstrap your database with a prompt:

```bash
npx prisma init --prompt "Create a habit tracker application"
```

### AI Coding Tools

Prisma ORM and Prisma Postgres integrate seamlessly with your AI coding tools. Check out our documentation with tips and tricks for working with Prisma in various AI editors.

<!-- Grid -->
  <!-- LinkCard -->
  <!-- LinkCard -->

<!-- Grid -->
  <!-- LinkCard -->
  <!-- LinkCard -->

### MCP server

With Prisma’s MCP server, your AI tool can take database actions on your behalf: Provisioning a new Prisma Postgres instance, creating database backups and executing SQL queries are just a few of its capabilities.

<!-- TabbedContent -->
<!-- TabItem -->

```json
{
  "mcpServers": {
    "Prisma-Remote": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.prisma.io/mcp"]
    }
  }
}
```

<!-- TabItem -->

```bash
npx -y mcp-remote https://mcp.prisma.io/mcp
```

<!-- Grid -->
<!-- HomepageCard -->and tools" icon="fa-regular fa-screwdriver-wrench" light />

}
href={{
    text: "Read now",
    url: "https://www.prisma.io/docs/postgres/integrations/mcp-server#tools"
  }}
body={`Discover all the tools that make up the capabilities of the Prisma MCP server.`}
/>

<!-- HomepageCard -->in AI tools" icon="fa-regular fa-gear" light />

}
href={{
    text: "Read now",
    url: "https://www.prisma.io/docs/postgres/integrations/mcp-server#integrating-in-ai-tools"
  }}
body={`Learn how to integrate Prisma’s MCP server in your favorite AI tool, such as Cursor, Claude, Warp, and more.`}
/>

<!-- HomepageCard -->

}
href={{
    text: "Read now",
    url: "https://www.prisma.io/blog/about-mcp-servers-and-how-we-built-one-for-prisma"
  }}
body={`Read this technical deep dive about the MCP protocol and how we built the Prisma MCP server.`}
/>

### Resources

<!-- Grid -->
<!-- HomepageCard -->

}
href={{
    text: "Read now",
    url: "https://www.prisma.io/blog/vibe-coding-with-limits-how-to-build-apps-in-the-age-of-ai"
  }}
body={`Software development is rapidly changing with AI coding tools. This article shows how to harness productivity gains while staying in control — and why understanding your code still matters.`}
/>

<!-- HomepageCard -->

}
href={{
    text: "Read now",
    url: "https://www.prisma.io/blog/vibe-coding-with-prisma-mcp-and-nextjs"
  }}
body={`Learn how we used the Prisma MCP server to build a Next.js e-commerce app with AI. We also share tips for effective prompting and avoiding common pitfalls.`}
/>

<!-- HomepageCard -->

}
href={{
    text: "Read now",
    url: "https://www.prisma.io/docs/guides/ai-sdk-nextjs"
  }}
body={`Learn how to build a chat application using the Vercel AI SDK with Next.js and Prisma ORM to store chat sessions and messages in a Prisma Postgres database.`}
/>

### Integrations

<!-- Grid -->
<!-- HomepageCard -->

}
href={{
    text: "Get started",
    url: "https://pipedream.com/apps/prisma-management-api"
  }}
body={`Connect Prisma Postgres to other apps to create powerful automations and data workflows, such as automatically spinning up a new database when a customer signs up in Stripe or connecting your database with Slack, Notion, Airtable, or any other app in the Pipedream ecosystem.`}
/>

<!-- HomepageCard -->

}
href={{
    text: "Get started",
    url: "https://www.prisma.io/docs/postgres/integrations/idx"
  }}
body={`Google's <!-- a -->Firebase Studio is a fully-fledged online IDE with a native AI integration. Prompt and build apps directly in your browser and deploy them by connecting with a powerful Prisma Postgres database in just a few clicks.`}
/>
