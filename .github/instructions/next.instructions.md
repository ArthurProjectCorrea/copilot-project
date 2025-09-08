---
applyTo: '**'
---

Project Context:
This project extensively uses Next.js for building React-based web applications. The AI must provide comprehensive Next.js development guidance, optimization strategies, and best practices using the local documentation as the primary source.

Guidelines:

**Mandatory Documentation Priority:** ALWAYS consult the local documentation in `node_modules/copilot-project/docs/next.js` first before any response. This contains the most relevant and up-to-date information. When responding, explicitly cite the local file used (e.g., "According to 01-getting-started/index.md" or "As documented in 03-api-reference/01-directives/use-client.md"). Only refer to external Next.js documentation (https://nextjs.org/docs) when the local docs are insufficient.

**Comprehensive Next.js Knowledge Areas:** The local docs provide extensive coverage including:

- **Getting Started:** Installation, project creation, folder structure, first application
- **App Router:** Modern routing system with Server Components, layouts, pages, loading UI
- **Pages Router:** Traditional routing system for backward compatibility
- **Architecture:** File-based routing, React Server Components, client components
- **API Routes:** Server-side API endpoints, middleware, request handling
- **Data Fetching:** Server-side rendering (SSR), static site generation (SSG), incremental static regeneration (ISR)
- **Styling:** CSS Modules, Tailwind CSS, styled-jsx, CSS-in-JS solutions
- **Optimization:** Image optimization, font optimization, bundle analysis, performance metrics
- **Deployment:** Vercel deployment, static exports, Docker, custom server configurations
- **Authentication:** NextAuth.js integration, session management, route protection
- **Database Integration:** Prisma, MongoDB, PostgreSQL, serverless databases
- **Advanced Features:** Middleware, internationalization (i18n), progressive web apps (PWA)

**Development Excellence Standards:**

- **Full-Stack Development:** Build complete applications with frontend and backend capabilities
- **Performance Optimization:** Implement automatic code splitting, image optimization, and caching strategies
- **SEO Excellence:** Leverage SSR and SSG for optimal search engine optimization
- **Developer Experience:** Utilize hot reloading, TypeScript integration, and built-in ESLint
- **Production Readiness:** Configure deployment, monitoring, and error handling
- **Accessibility:** Implement WCAG guidelines and semantic HTML structures

**Architecture Best Practices:**

- **App Router vs Pages Router:** Choose appropriate routing system based on project requirements
- **Server vs Client Components:** Optimize component placement for performance and user experience
- **Layout Patterns:** Implement nested layouts, loading states, and error boundaries
- **Code Organization:** Structure projects with proper folder hierarchy and component separation
- **API Design:** Create RESTful and GraphQL endpoints with proper error handling
- **State Management:** Integrate with Redux, Zustand, or React Context for complex state

**Performance Optimization Expertise:**

- **Bundle Analysis:** Optimize bundle size and implement code splitting strategies
- **Image Optimization:** Use Next.js Image component for automatic optimization
- **Font Optimization:** Implement Google Fonts and custom font loading strategies
- **Caching Strategies:** Configure ISR, CDN caching, and browser caching
- **Core Web Vitals:** Optimize for LCP, FID, and CLS metrics
- **Loading Strategies:** Implement lazy loading, prefetching, and progressive enhancement

**Integration Capabilities:**

- **Authentication Systems:** NextAuth.js, Auth0, Firebase Auth, custom solutions
- **Database Connections:** Prisma ORM, direct database connections, serverless databases
- **Payment Processing:** Stripe, PayPal, and other payment gateway integrations
- **Content Management:** Headless CMS integration (Contentful, Sanity, Strapi)
- **Analytics:** Google Analytics, Vercel Analytics, custom tracking solutions
- **Monitoring:** Error tracking with Sentry, performance monitoring, logging

**Problem-Solving Approach:**

1. **Identify the development challenge** (routing, data fetching, performance, deployment)
2. **Reference specific local documentation** for Next.js patterns and solutions
3. **Provide complete working examples** with proper file structure and configuration
4. **Include optimization recommendations** for performance and SEO
5. **Suggest deployment strategies** and production considerations

**Response Quality Standards:**

- Always reference specific local documentation files when providing guidance
- Provide complete, production-ready examples with proper TypeScript typing
- Include configuration files and setup instructions when relevant
- Explain architectural decisions and their impact on performance
- Offer optimization strategies for Core Web Vitals and user experience
- Include testing strategies and debugging techniques

**Local Documentation Navigation:**
Reference the appropriate local files based on the question type:

- Getting started → index.md, 01-app/01-building-your-application/01-routing/
- Routing → 01-app/01-building-your-application/01-routing/
- Data fetching → 01-app/01-building-your-application/02-data-fetching/
- Styling → 01-app/01-building-your-application/04-styling/
- API routes → 01-app/01-building-your-application/01-routing/10-route-handlers.md
- Deployment → 01-app/01-building-your-application/09-deploying/
- Performance → 01-app/01-building-your-application/06-optimizing/
- Authentication → 01-app/01-building-your-application/08-authentication.md

**Quality Assurance:** Ensure all Next.js recommendations align with the local documentation version and examples. Cross-reference multiple documentation files when providing comprehensive solutions. Follow Next.js best practices and modern React patterns as documented locally. Prioritize performance, SEO, and developer experience in all recommendations.
