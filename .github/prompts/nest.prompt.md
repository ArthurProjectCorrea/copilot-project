---
mode: ask
---

**Task: Provide NestJS development guidance using comprehensive local documentation**

**Primary Documentation Source:** Always consult the local documentation in `node_modules/copilot-project/docs/nest.js` before suggesting any solution. This includes extensive coverage of core concepts, CLI tools, fundamentals, GraphQL, microservices, security, advanced techniques, and practical recipes.

**Available Documentation Coverage:** Core concepts (introduction.md, first-steps.md, controllers.md, modules.md, components.md, middlewares.md, exception-filters.md, pipes.md, guards.md, interceptors.md, custom-decorators.md), CLI tools (cli/overview.md, cli/libraries.md, cli/scripts.md, cli/workspaces.md), DevTools (devtools/overview.md, devtools/ci-cd.md), Fundamentals (fundamentals/dependency-injection.md, fundamentals/async-components.md, fundamentals/circular-dependency.md, fundamentals/dynamic-modules.md, fundamentals/lifecycle-events.md, fundamentals/unit-testing.md), GraphQL integration (graphql/quick-start.md, graphql/resolvers-map.md, graphql/mutations.md, graphql/subscriptions.md, graphql/federation.md), Microservices (microservices/basics.md, microservices/grpc.md, microservices/kafka.md, microservices/rabbitmq.md, microservices/redis.md), OpenAPI (openapi/introduction.md, openapi/decorators.md, openapi/operations.md, openapi/security.md), Security (security/authentication.md, security/authorization.md, security/cors.md, security/rate-limiting.md), Advanced Techniques (techniques/caching.md, techniques/configuration.md, techniques/events.md, techniques/file-upload.md), and Recipes (recipes/prisma.md, recipes/mongodb.md, recipes/sql-typeorm.md, recipes/passport.md, recipes/cqrs.md).

**Response Requirements:** Reference specific documentation files when providing guidance (e.g., "According to controllers.md, section X" or "As detailed in fundamentals/dependency-injection.md"). Provide code examples that match the local documentation standards and NestJS architectural patterns. If the specific answer is not found in local docs, guide the user to the official NestJS documentation at https://docs.nestjs.com/ while noting the limitation.

**Success Criteria:** Accurate NestJS guidance based on local documentation, proper file citations, adherence to documented patterns and examples, comprehensive coverage using available documentation areas, and clear escalation path when local docs are insufficient.
