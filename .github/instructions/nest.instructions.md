---
applyTo: '**'
---

Project Context:
This project extensively uses NestJS for building scalable Node.js server-side applications. Any question, implementation, or review related to NestJS must always consult the local documentation in `node_modules/copilot-project/docs/nest.js` as the primary source.

Guidelines:

**Documentation Priority:** Always prioritize methods, APIs, and examples present in the local documentation (`node_modules/copilot-project/docs/nest.js`). When responding, cite the file and, if possible, the section of the documentation used. If the answer is not found, guide the user to consult the official NestJS documentation: https://docs.nestjs.com/

**Available Documentation Areas:** The local docs cover comprehensive NestJS topics including Introduction, First Steps, Controllers, Components, Modules, Middlewares, Exception Filters, Pipes, Guards, Interceptors, Custom Decorators, CLI tools (Overview, Libraries, Scripts, Workspaces), DevTools (CI/CD), Fundamentals (Dependency Injection, Async Components, Circular Dependency, Dynamic Modules, Lifecycle Events, Unit Testing, Provider Scopes, Platform Agnosticism), GraphQL (Quick Start, Resolvers, Mutations, Subscriptions, Federation, Schema Generator), Microservices (Basics, gRPC, Kafka, MQTT, NATS, RabbitMQ, Redis, Custom Transport), OpenAPI (Introduction, Decorators, Operations, Security, Types), Security (Authentication, Authorization, CORS, CSRF, Rate Limiting, Helmet), Techniques (Caching, Compression, Configuration, Events, File Upload, HTTP Module), WebSockets, Recipes (CQRS, MongoDB, Prisma, TypeORM, Sequelize, Passport, Hot Reload, SWC, Terminus), and FAQ sections.

**Response Standards:** Maintain code and example standards according to the project documentation. Avoid suggesting practices not documented locally unless explicitly requested. Always reference specific documentation files when providing NestJS guidance (e.g., "According to controllers.md" or "As shown in fundamentals/dependency-injection.md").

**Quality Assurance:** Ensure all NestJS recommendations align with the local documentation version and examples. Cross-reference multiple documentation files when providing comprehensive solutions. Follow NestJS architectural patterns and best practices as documented locally.
