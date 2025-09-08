---
title: Project structure and organization
nav_title: Project Structure
description: Learn the folder and file conventions in Next.js, and how to organize your project.
---

This page provides an overview of **all** the folder and file conventions in Next.js, and recommendations for organizing your project.

## Folder and file conventions

### Top-level folders

Top-level folders are used to organize your application's code and static assets.

|                                                                    |                                    |
| ------------------------------------------------------------------ | ---------------------------------- |
| [`app`](/docs/app)                                                 | App Router                         |
| [`pages`](/docs/pages/building-your-application/routing)           | Pages Router                       |
| [`public`](/docs/app/api-reference/file-conventions/public-folder) | Static assets to be served         |
| [`src`](/docs/app/api-reference/file-conventions/src-folder)       | Optional application source folder |

### Top-level files

Top-level files are used to configure your application, manage dependencies, run middleware, integrate monitoring tools, and define environment variables.

|                                                                              |                                         |
| ---------------------------------------------------------------------------- | --------------------------------------- |
| **Next.js**                                                                  |                                         |
| [`next.config.js`](/docs/app/api-reference/config/next-config-js)            | Configuration file for Next.js          |
| [`package.json`](/docs/app/getting-started/installation#manual-installation) | Project dependencies and scripts        |
| [`instrumentation.ts`](/docs/app/guides/instrumentation)                     | OpenTelemetry and Instrumentation file  |
| [`middleware.ts`](/docs/app/api-reference/file-conventions/middleware)       | Next.js request middleware              |
| [`.env`](/docs/app/guides/environment-variables)                             | Environment variables                   |
| [`.env.local`](/docs/app/guides/environment-variables)                       | Local environment variables             |
| [`.env.production`](/docs/app/guides/environment-variables)                  | Production environment variables        |
| [`.env.development`](/docs/app/guides/environment-variables)                 | Development environment variables       |
| [`.eslintrc.json`](/docs/app/api-reference/config/eslint)                    | Configuration file for ESLint           |
| `.gitignore`                                                                 | Git files and folders to ignore         |
| `next-env.d.ts`                                                              | TypeScript declaration file for Next.js |
| `tsconfig.json`                                                              | Configuration file for TypeScript       |
| `jsconfig.json`                                                              | Configuration file for JavaScript       |