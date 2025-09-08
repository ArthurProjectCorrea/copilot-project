---
applyTo: '**'
---

Project Context:
This project extensively uses NestJS for building scalable Node.js server-side applications. The AI must provide comprehensive NestJS development guidance, architectural solutions, and best practices using the local documentation as the primary source.

Guidelines:

**Mandatory Documentation Priority:** ALWAYS consult the local documentation in `node_modules/copilot-project/docs/nest.js` first before any response. This contains the most relevant and up-to-date information. When responding, explicitly cite the local file used (e.g., "According to controllers.md" or "As documented in fundamentals/dependency-injection.md"). Only refer to external NestJS documentation (https://docs.nestjs.com/) when the local docs are insufficient.

**Comprehensive NestJS Knowledge Areas:** The local docs provide extensive coverage including:

- **Core Concepts:** Introduction, First Steps, Controllers, Components, Modules, Middlewares
- **Advanced Features:** Exception Filters, Pipes, Guards, Interceptors, Custom Decorators
- **CLI Tools:** Overview, Libraries, Scripts, Workspaces, Usage patterns
- **DevTools:** CI/CD integration, Development tools overview
- **Fundamentals:** Dependency Injection, Async Components, Circular Dependencies, Dynamic Modules, Lifecycle Events, Provider Scopes, Platform Agnosticism, Unit Testing
- **GraphQL Integration:** Quick Start, Resolvers, Mutations, Subscriptions, Federation, Schema Generator
- **Microservices:** Basics, gRPC, Kafka, MQTT, NATS, RabbitMQ, Redis, Custom Transport
- **OpenAPI:** Introduction, Decorators, Operations, Security, Types and mapped types
- **Security:** Authentication, Authorization, CORS, CSRF Protection, Rate Limiting, Helmet integration
- **Advanced Techniques:** Caching, Compression, Configuration, Events, File Upload, HTTP Module
- **WebSockets:** Real-time communication patterns and implementation
- **Recipes:** CQRS, Database integration (MongoDB, Prisma, TypeORM, Sequelize), Passport authentication, Hot Reload, SWC, Health checks (Terminus)

**Enterprise Architecture Standards:**

- **Modular Design:** Structure applications using NestJS modules for separation of concerns
- **Dependency Injection:** Leverage NestJS DI container for loose coupling and testability
- **Decorator Pattern:** Use built-in and custom decorators for clean, declarative code
- **Provider System:** Implement services, repositories, and utilities as providers
- **Middleware Pipeline:** Configure request/response processing with middleware, guards, interceptors
- **Exception Handling:** Implement comprehensive error handling with exception filters
- **Configuration Management:** Use ConfigModule for environment-specific settings

**Development Excellence Practices:**

- **TypeScript Integration:** Leverage full TypeScript support with decorators and metadata
- **Testing Strategy:** Implement unit, integration, and e2e testing patterns
- **API Documentation:** Use OpenAPI/Swagger for comprehensive API documentation
- **Validation:** Implement DTOs with class-validator for request validation
- **Authentication & Authorization:** Secure applications with guards and strategies
- **Database Integration:** Connect with various databases using TypeORM, Prisma, or Mongoose

**Framework Integration Expertise:**

- **Express/Fastify:** Understand underlying HTTP framework integration
- **Database ORMs:** TypeORM, Prisma, Sequelize, Mongoose integration patterns
- **Authentication:** Passport strategies, JWT, OAuth implementation
- **Message Brokers:** RabbitMQ, Redis, Kafka, NATS integration
- **GraphQL:** Schema-first and code-first approaches with Apollo
- **Microservices:** Service communication patterns and transport layers

**Performance Optimization:**

- **Caching Strategies:** Redis, in-memory caching implementation
- **Compression:** Response compression and optimization
- **Hot Reload:** Development workflow optimization with SWC
- **Health Checks:** Application monitoring with Terminus
- **Lazy Loading:** Module lazy loading for better startup performance

**Problem-Solving Approach:**

1. **Identify the architectural challenge** (module design, service structure, data flow)
2. **Reference specific local documentation** for NestJS patterns and best practices
3. **Provide complete working examples** with proper decorators and module setup
4. **Include testing strategies** and error handling patterns
5. **Suggest scalability considerations** for enterprise applications

**Response Quality Standards:**

- Always reference specific local documentation files when providing guidance
- Provide complete, production-ready examples with proper TypeScript typing
- Include module configuration and dependency injection setup
- Explain architectural decisions and design patterns
- Offer performance and security considerations
- Include testing examples and best practices

**Local Documentation Navigation:**
Reference the appropriate local files based on the question type:

- Setup and basics → introduction.md, first-steps.md
- Architecture → modules.md, controllers.md, components.md
- Advanced features → guards.md, interceptors.md, pipes.md, exception-filters.md
- Database → recipes/prisma.md, recipes/typeorm.md, recipes/sequelize.md
- Authentication → security/, recipes/passport.md
- Testing → fundamentals/testing.md
- Performance → techniques/caching.md, techniques/compression.md
- Microservices → microservices/
- GraphQL → graphql/
- Configuration → techniques/configuration.md

**Quality Assurance:** Ensure all NestJS recommendations align with the local documentation version and examples. Cross-reference multiple documentation files when providing comprehensive solutions. Follow NestJS architectural patterns and enterprise-grade practices as documented locally.
