# Project Summary

## Overview

NextJS Ignite Kit is a premium portfolio and blog platform built with Next.js 16, featuring a modern, responsive design with multiple theme options.

## Recent Updates

### December 21, 2025

#### 1. Header Navigation Enhancement

- Added **Portfolio** section to the main navigation
- Navigation items now include: Home, Blog, Portfolio, About, Contact
- Portfolio link routes to `/portfolio` page displaying selected case studies

#### 2. Blog Image Path Fixes

- Fixed 404 errors for missing blog cover images
- Updated `content/blog.json` to use existing images:
  - `serverless.png` for the serverless article
  - `blog-placeholder.png` as fallback for other posts
- This resolves the following 404 errors:
  - `/images/blog/serverless.jpg` → `/images/blog/serverless.png`
  - `/images/blog/fintech-case.jpg` → `/images/blog-placeholder.png`
  - `/images/blog/distributed-teams.jpg` → `/images/blog-placeholder.png`
  - (and 9 other missing images)

#### 3. Global Error Handling with Instrumentation

- Created `src/instrumentation.ts` for comprehensive error handling
- Handles the following process events:
  - `uncaughtException`: Catches synchronous errors
  - `unhandledRejection`: Catches unhandled promise rejections
  - `warning`: Logs Node.js process warnings
  - `SIGTERM`/`SIGINT`: Graceful shutdown handlers
  - `exit`: Logs process exit codes
- Instrumentation is automatically enabled when the file exists (Next.js 13.2+)

#### 4. Metadata Base URL Configuration

- Added `metadataBase` to root layout metadata export
- Resolves warning: "metadataBase property in metadata export is not set"
- Environment-aware URL resolution:
  - Uses `NEXT_PUBLIC_SITE_URL` if set
  - Falls back to `VERCEL_URL` in Vercel deployments
  - Uses production URL from constants in production
  - Defaults to `http://localhost:3000` in development
- Enables proper Open Graph and Twitter card image resolution

## Project Structure

```
├── content/              # Content files (blog.json, portfolio.json, MDX posts)
├── docs/                 # Documentation
├── public/               # Static assets
│   └── images/          # Image assets
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── about/       # About page
│   │   ├── blog/        # Blog section
│   │   ├── contact/     # Contact page
│   │   └── portfolio/   # Portfolio/case studies page
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Common components (ErrorBoundary)
│   │   ├── home/        # Homepage components
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   └── ui/          # Shadcn UI components
│   ├── features/        # Feature-specific modules
│   │   ├── blog/        # Blog feature components and data
│   │   └── portfolio/   # Portfolio feature components
│   ├── lib/             # Utility functions
│   └── instrumentation.ts # Global error handlers
└── next.config.ts       # Next.js configuration
```

## Known Issues

### malloc Error (Node.js Native Memory Issue)

- **Symptom**: `malloc: *** error for object: pointer being freed was not allocated`
- **Cause**: This is a native Node.js/V8 memory corruption issue, often related to:
  - Turbopack (Next.js bundler)
  - Native module issues
  - Memory corruption in dependencies
- **Mitigation**: Added instrumentation for error logging
- **Recommendation**: If issue persists, try:
  1. Running without Turbopack: `npx next dev --no-turbopack`
  2. Clearing `.next` cache: `rm -rf .next`
  3. Reinstalling node_modules: `rm -rf node_modules && npm install`

## Tech Stack

- **Framework**: Next.js 16.0.8
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Content**: MDX with gray-matter
- **UI Components**: Shadcn/UI
- **Themes**: Multiple theme support (dark mode, neon noir, cyber nature, etc.)
