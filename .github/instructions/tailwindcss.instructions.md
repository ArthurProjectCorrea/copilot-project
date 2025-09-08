---
applyTo: '**'
---

Project Context:
This project extensively uses Tailwind CSS for web interface styling. The AI must provide comprehensive guidance on utilities, configuration, integration, and best practices using the local documentation as the primary source.

Guidelines:

**Mandatory Documentation Priority:** ALWAYS consult the local documentation in `node_modules/copilot-project/docs/tailwindcss/` first before any response. This contains the most relevant and up-to-date information. When responding, explicitly cite the local file used (e.g., "According to background-repeat.md" or "As documented in responsive-design.md"). Only refer to external Tailwind CSS documentation (https://tailwindcss.com/docs) when the local docs are insufficient.

**Comprehensive Tailwind CSS Knowledge Areas:** The local docs provide extensive coverage including:

- **Fundamentals:** Installation, configuration, project structure, editor setup
- **Utilities:** All utility classes (color, spacing, typography, layout, responsiveness, pseudo-classes)
- **Customization:** Themes, variants, plugins, directives, custom styles
- **Components:** Patterns for reusable components, framework integration
- **Performance:** Build optimization, purge, tree-shaking, compatibility
- **Integration:** Usage with React, Next.js, Vue, Svelte, bundling tools integration
- **Accessibility:** Recommended practices for accessible interfaces
- **Migration:** Upgrade guides, version compatibility, troubleshooting

**Development Excellence Standards:**

- **Utility-First Approach:** Guide users in utility-first methodology for rapid UI development
- **Design Systems:** Implement consistent design tokens and component patterns
- **Performance Optimization:** Configure efficient builds with minimal CSS output
- **Responsive Design:** Utilize mobile-first breakpoint system for adaptive interfaces
- **Accessibility:** Ensure components follow WCAG guidelines and semantic HTML
- **Developer Experience:** Leverage IntelliSense, editor plugins, and debugging tools

**Best Practices Implementation:**

- **File Structure:** Organize stylesheets and components following Tailwind conventions
- **Class Composition:** Use @apply directive and component classes effectively
- **Configuration:** Customize tailwind.config.js for project-specific needs
- **Build Process:** Integrate with PostCSS, PurgeCSS, and modern build tools
- **Testing:** Implement visual regression testing and component validation
- **Documentation:** Maintain design system documentation with Tailwind patterns

**Framework Integration Expertise:**

- **React/Next.js:** Component styling patterns, CSS-in-JS integration, server-side rendering
- **Vue/Nuxt:** Template-based styling, scoped styles, SSR considerations
- **Angular:** Component architecture, ViewEncapsulation, CLI integration
- **Svelte/SvelteKit:** Compiled styles, CSS variables, build optimization
- **Build Tools:** Webpack, Vite, Parcel, esbuild configuration and optimization

**Performance Optimization:**

- **Bundle Analysis:** Minimize CSS output through effective purging strategies
- **JIT Mode:** Utilize Just-In-Time compilation for development speed
- **Critical CSS:** Implement above-the-fold styling for faster page loads
- **Caching:** Configure proper cache headers and versioning strategies
- **Tree Shaking:** Remove unused utilities and optimize final bundle size

**Problem-Solving Approach:**

1. **Identify the styling challenge** (utility selection, customization, integration, performance)
2. **Reference specific local documentation** for Tailwind features and patterns
3. **Provide complete working examples** with proper class composition and configuration
4. **Include performance and accessibility considerations** in all recommendations
5. **Suggest migration and upgrade strategies** for version compatibility

**Response Quality Standards:**

- Always reference specific local documentation files when providing guidance
- Provide complete, production-ready examples with proper utility usage
- Include configuration snippets and setup instructions when relevant
- Explain design decisions and their impact on performance and maintainability
- Offer alternative approaches when multiple solutions are valid
- Include troubleshooting tips for common integration issues

**Local Documentation Navigation:**
Reference the appropriate local files based on the question type:

- Setup and configuration → editor-setup.md, compatibility.md, adding-custom-styles.md
- Utility classes → [utility-name].md (e.g., background-repeat.md, flex.md, color.md)
- Layout and spacing → margin.md, padding.md, gap.md, width.md, height.md
- Typography → font-family.md, font-size.md, line-height.md, text-align.md
- Colors and theming → colors.md, theme.md, dark-mode.md
- Responsive design → responsive-design.md, hover-focus-and-other-states.md
- Customization → functions-and-directives.md, theme.md, plugins.md
- Performance → preflight.md, upgrade-guide.md
- Integration → compatibility.md, editor-setup.md
- Migration → upgrade-guide.md

**Quality Assurance:** Ensure all Tailwind CSS recommendations align with the local documentation version and examples. Cross-reference multiple documentation files when providing comprehensive solutions. Follow Tailwind CSS best practices and modern CSS architecture patterns as documented locally.
