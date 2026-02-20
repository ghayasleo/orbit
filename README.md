# Orbit

A modern, production-ready React application built with TypeScript, Vite, and a clean feature-based architecture.

## Tech Stack

- **[Vite](https://vite.dev/)** - Next generation frontend tooling
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful and accessible component library
- **[TanStack Query](https://tanstack.com/query/latest)** - Powerful data fetching and caching
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[React Router](https://reactrouter.com/)** - Client-side routing

## Features

✅ **Type-Safe** - Full TypeScript with strict mode enabled  
✅ **Modern Styling** - Tailwind CSS with dark mode support  
✅ **Component Library** - shadcn/ui components pre-installed  
✅ **State Management** - Zustand for global state  
✅ **Data Fetching** - TanStack Query with optimized defaults  
✅ **Routing** - React Router v6 with layouts  
✅ **Feature-Based Architecture** - Clean and maintainable code organization  
✅ **Developer Experience** - ESLint, hot reload, path aliases  

## Project Structure

```
orbit/
├── src/
│   ├── app/                    # Application layer
│   │   ├── providers/          # Context providers (Query, Theme, etc.)
│   │   ├── routes/             # Route definitions
│   │   └── layouts/            # Layout components (Root, Auth, Dashboard)
│   ├── features/               # Business logic modules
│   │   └── home/               # Example: Home feature
│   │       ├── components/     # Feature-specific components
│   │       ├── hooks/          # Feature-specific hooks
│   │       ├── api/            # Feature-specific API calls
│   │       └── store/          # Feature-specific Zustand stores
│   ├── shared/                 # Shared across features
│   │   ├── components/         # Reusable UI components
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── hooks/              # Shared custom hooks
│   │   ├── stores/             # Global Zustand stores
│   │   ├── utils/              # Utility functions
│   │   └── types/              # Shared TypeScript types
│   ├── lib/                    # Third-party configurations
│   │   ├── queryClient.ts      # TanStack Query setup
│   │   └── utils.ts            # shadcn utils (cn helper)
│   └── styles/                 # Global styles
│       └── index.css           # Tailwind directives & CSS variables
└── config files                # Vite, Tailwind, TypeScript, etc.
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository or use this as a template

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Architecture Principles

### Feature-Based Organization

Each feature is self-contained with its own components, hooks, API calls, and stores:

```
features/
└── home/
    ├── components/       # UI components specific to this feature
    ├── hooks/           # Custom hooks for this feature
    ├── api/             # API calls and mutations
    └── store/           # Feature-specific state (if needed)
```

### Shared Resources

Common utilities and components live in the `shared/` directory:

- **components/ui/** - shadcn/ui components
- **components/** - Custom reusable components
- **hooks/** - Shared React hooks
- **stores/** - Global Zustand stores (theme, user, etc.)
- **types/** - TypeScript interfaces and types
- **utils/** - Helper functions

### Application Layer

The `app/` directory contains infrastructure code:

- **providers/** - React context providers
- **routes/** - Route definitions and lazy loading
- **layouts/** - Page layouts (root, auth, dashboard)

## Adding New Features

1. Create a new feature directory:
```bash
mkdir -p src/features/my-feature/components
```

2. Add feature components, hooks, and stores

3. Create routes in `src/app/routes/index.tsx`

4. Import and use in your application

## Dark Mode

Dark mode is implemented using:
- Tailwind's `class` strategy
- Zustand for theme persistence
- CSS variables for dynamic theming

Toggle theme using the `ThemeToggle` component in the header.

## Path Aliases

TypeScript path aliases are configured for clean imports:

```typescript
import { Button } from '@/shared/components/ui/button'
import { HomePage } from '@/features/home/components/HomePage'
import { queryClient } from '@/lib/queryClient'
```

## Adding shadcn/ui Components

To add more shadcn/ui components, use the CLI:

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add table
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Best Practices

- **Colocation** - Keep related files close together
- **Type Safety** - Use TypeScript for all new code
- **Component Composition** - Build complex UIs from simple components
- **Custom Hooks** - Extract reusable logic into hooks
- **Error Boundaries** - Handle errors gracefully
- **Lazy Loading** - Code split routes for better performance

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linting: `npm run lint`
4. Build to check for errors: `npm run build`
5. Submit a pull request

## License

MIT

## Learn More

- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Router Documentation](https://reactrouter.com/)
