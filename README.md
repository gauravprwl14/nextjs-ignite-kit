# Next.js Ignite Kit 🚀

A premium Next.js 15+ starter kit for high-performance SaaS and personal portfolios.

## 🛠 Features

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Documentation**: Nextra 4
- **Testing**: Vitest + React Testing Library
- **Architecture**: Domain-Driven Design / Features-first approach
- **CI/CD**: Husky + lint-staged
- **Internationalization**: Custom backend-driven i18n

## 🚀 Getting Started

### Local Development

```bash
npm install
npm run dev
```

### Containerized Development (Podman)

```bash
# Start dev environment with hot-reloading
npm run container:dev

# Test production build locally
npm run container:prod
```

## 📚 Documentation

Detailed documentation is available in the `docs/` folder:

- [Setup Guide](file:///Users/gauravporwal/Sites/projects/gp/nextjs-ignite-kit/docs/SETUP_GUIDE.md)
- [Architecture Overview](file:///Users/gauravporwal/Sites/projects/gp/nextjs-ignite-kit/docs/ARCHITECTURE_OVERVIEW.md)
- [Component System](file:///Users/gauravporwal/Sites/projects/gp/nextjs-ignite-kit/docs/COMPONENT_SYSTEM.md)
- [Testing Handbook](file:///Users/gauravporwal/Sites/projects/gp/nextjs-ignite-kit/docs/TESTING_HANDBOOK.md)
- [Container Guide](file:///Users/gauravporwal/Sites/projects/gp/nextjs-ignite-kit/docs/CONTAINER_GUIDE.md)

## 🌍 Internationalization (i18n)

The project includes a performant, remote-backend-ready i18n system.

- **Storage**: Translations are fetched via `src/lib/i18n/service.ts` (currently mocked).
- **Detection**: `middleware.ts` automatically detects locale from Cookies (`NEXT_LOCALE`) or Headers.
- **Usage**:
  ```tsx
  import { useTranslation } from "@/components/providers/I18nProvider";

  export function MyComponent() {
    const { t } = useTranslation();
    return <h1>{t('hero.title')}</h1>;
  }
  ```

## 🧪 Testing

```bash
npm run test           # Run all tests
npm run test:watch     # Interactive mode
npm run test:coverage  # Coverage report
```

## 🚢 Deployment

The project is optimized for deployment on **Vercel** and other platforms that support Next.js standalone output.

---
Built with ❤️ for rapid technical execution.
