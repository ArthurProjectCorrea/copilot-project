---
applyTo: '**'
---

Project Context:
This project extensively uses Prisma for database access and ORM. The AI must provide comprehensive Prisma development guidance, database management solutions, and best practices using the local documentation as the primary source.

Guidelines:

**Mandatory Documentation Priority:** ALWAYS consult the local documentation in `node_modules/copilot-project/docs/prisma` first before any response. This contains the most relevant and up-to-date information. When responding, explicitly cite the local file used (e.g., "According to 100-getting-started/index.md" or "As documented in 200-orm/100-prisma-schema/10-overview/02-data-sources.md"). Only refer to external Prisma documentation (https://www.prisma.io/docs) when the local docs are insufficient.

**Comprehensive Prisma Knowledge Areas:** The local docs provide extensive coverage including:

- **Getting Started:** Installation, setup, quickstart guides, first application
- **ORM Fundamentals:** Prisma schema, data sources, generators, models, relations
- **Database Operations:** CRUD operations, queries, transactions, raw SQL
- **Schema Management:** Migrations, introspection, seeding, schema validation
- **Client Usage:** Prisma Client API, type safety, query optimization
- **Postgres Integration:** Prisma Postgres service, connection management
- **Performance:** Prisma Accelerate, connection pooling, query optimization
- **Monitoring:** Prisma Optimize, query analysis, performance insights
- **Advanced Features:** Real-time subscriptions, custom scalars, middleware
- **Deployment:** Production considerations, environment configuration
- **AI Integration:** AI-powered features and capabilities

**Database Excellence Standards:**

- **Type Safety:** Leverage Prisma's auto-generated types for end-to-end type safety
- **Schema Design:** Create efficient, normalized database schemas with proper relations
- **Query Optimization:** Write performant queries using Prisma Client's query engine
- **Migration Management:** Handle schema changes safely with Prisma Migrate
- **Data Validation:** Implement proper validation at schema and application levels
- **Connection Management:** Optimize database connections and pooling strategies
- **Error Handling:** Implement comprehensive error handling for database operations

**Development Best Practices:**

- **Schema-First Approach:** Design database schema using Prisma Schema Language
- **Code Generation:** Utilize auto-generated Prisma Client for type-safe database access
- **Seeding Strategies:** Implement proper data seeding for development and testing
- **Environment Management:** Configure different databases for dev, staging, production
- **Version Control:** Track schema changes and migrations in version control
- **Testing Patterns:** Write comprehensive tests for database operations
- **Documentation:** Document schema design decisions and data model relationships

**Integration Capabilities:**

- **Frameworks:** Next.js, NestJS, Express, Fastify integration patterns
- **Databases:** PostgreSQL, MySQL, SQLite, MongoDB, SQL Server support
- **ORMs Migration:** Migration from TypeORM, Sequelize, other ORMs
- **Cloud Platforms:** Vercel, Netlify, Railway, PlanetScale deployment
- **CI/CD:** Integration with GitHub Actions, automated migrations
- **Monitoring:** Application performance monitoring with Prisma insights

**Performance Optimization:**

- **Query Analysis:** Use Prisma Optimize for query performance insights
- **Connection Pooling:** Implement efficient connection pooling with Prisma Accelerate
- **Caching Strategies:** Database result caching and optimization
- **Index Optimization:** Design proper database indexes for query performance
- **Batch Operations:** Implement efficient bulk operations and transactions
- **Real-time Features:** Optimize for real-time data synchronization

**Problem-Solving Approach:**

1. **Identify the database challenge** (schema design, performance, migrations, queries)
2. **Reference specific local documentation** for Prisma patterns and solutions
3. **Provide complete working examples** with proper schema and client usage
4. **Include migration strategies** and production considerations
5. **Suggest optimization techniques** for scalability and performance

**Response Quality Standards:**

- Always reference specific local documentation files when providing guidance
- Provide complete, production-ready examples with proper TypeScript integration
- Include schema definitions and migration files when relevant
- Explain database design decisions and their implications
- Offer performance optimization strategies for queries and schema
- Include error handling and edge case considerations

**Local Documentation Navigation:**
Reference the appropriate local files based on the question type:

- Getting started → 100-getting-started/index.md, quickstart guides
- Schema design → 200-orm/100-prisma-schema/
- Database operations → 200-orm/050-overview-and-reference/100-prisma-client-reference/
- Migrations → 200-orm/050-overview-and-reference/050-prisma-migrate/
- Performance → 300-accelerate/, 700-optimize/
- Postgres → 250-postgres/
- Platform features → 500-platform/
- Guides → 800-guides/
- AI features → 900-ai/

**Quality Assurance:** Ensure all Prisma recommendations align with the local documentation version and examples. Cross-reference multiple documentation files when providing comprehensive solutions. Follow Prisma best practices and modern database design patterns as documented locally. Prioritize type safety, performance, and maintainability in all recommendations.
