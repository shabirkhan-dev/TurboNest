# Frontend App Structure

This document outlines the organized folder structure for the frontend application, following feature-based architecture principles.

## 📁 Folder Structure

```
src/
├── app/                          # Next.js app router pages
│   ├── dashboard/               # Dashboard pages
│   ├── login/                   # Auth pages
│   ├── signup/                  # Auth pages
│   ├── otp/                     # Auth pages
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── features/                    # Feature-based modules
│   ├── auth/                    # Authentication feature
│   │   ├── components/          # Auth-specific components
│   │   │   ├── login-form.tsx
│   │   │   ├── signup-form.tsx
│   │   │   ├── otp-form.tsx
│   │   │   └── index.ts
│   │   ├── services/            # Auth API services
│   │   │   └── auth-service.ts
│   │   ├── hooks/               # Auth-specific hooks
│   │   │   └── use-auth.ts
│   │   ├── types/               # Auth type definitions
│   │   │   └── index.ts
│   │   └── constants/           # Auth constants
│   │       └── index.ts
│   ├── dashboard/               # Dashboard feature
│   │   ├── components/          # Dashboard-specific components
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── chart-area-interactive.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── section-cards.tsx
│   │   │   └── index.ts
│   │   ├── services/            # Dashboard API services
│   │   │   └── dashboard-service.ts
│   │   ├── hooks/               # Dashboard-specific hooks
│   │   │   └── index.ts
│   │   ├── types/               # Dashboard type definitions
│   │   │   └── index.ts
│   │   └── constants/           # Dashboard constants
│   │       └── index.ts
│   └── landing/                 # Landing page feature
│       ├── components/          # Landing-specific components
│       │   ├── analytics.tsx
│       │   ├── mobile-nav.tsx
│       │   ├── feature-card.tsx
│       │   ├── testimonial-card.tsx
│       │   ├── loading-components.tsx
│       │   ├── icon-map.tsx
│       │   └── index.ts
│       ├── services/            # Landing data services
│       │   └── landing-data.ts
│       ├── hooks/               # Landing-specific hooks
│       │   └── index.ts
│       ├── types/               # Landing type definitions
│       │   └── index.ts
│       └── constants/           # Landing constants
│           └── index.ts
├── shared/                      # Shared utilities and components
│   ├── components/              # Reusable components
│   │   ├── nav-documents.tsx
│   │   ├── nav-main.tsx
│   │   ├── nav-secondary.tsx
│   │   ├── nav-user.tsx
│   │   ├── site-header.tsx
│   │   └── index.ts
│   ├── hooks/                   # Shared hooks
│   │   ├── use-mobile.ts
│   │   └── index.ts
│   ├── types/                   # Shared type definitions
│   │   └── index.ts
│   ├── constants/               # Shared constants
│   │   └── index.ts
│   └── services/                # Shared services
│       └── api-service.ts
└── test/                        # Test files
    ├── login-form.test.tsx
    ├── setup.ts
    └── use-mobile.test.ts
```

## 🏗️ Architecture Principles

### Feature-Based Organization
- Each feature is self-contained with its own components, services, hooks, types, and constants
- Features can be developed, tested, and maintained independently
- Clear separation of concerns between different application domains

### Shared Resources
- Common utilities, components, and services are placed in the `shared` folder
- Shared resources are used across multiple features
- Prevents code duplication and ensures consistency

### Component Organization
- Each feature has its own `components` folder
- Components are specific to that feature's domain
- Reusable components are moved to `shared/components`

### Service Layer
- Each feature has its own `services` folder for API calls and data management
- Services handle business logic and data transformation
- Shared services provide common functionality across features

### Type Safety
- Each feature defines its own types in the `types` folder
- Shared types are defined in `shared/types`
- Ensures type safety across the application

### Constants Management
- Feature-specific constants are defined in each feature's `constants` folder
- Shared constants are defined in `shared/constants`
- Centralized configuration and magic number management

## 🚀 Benefits

1. **Scalability**: Easy to add new features without affecting existing ones
2. **Maintainability**: Clear structure makes it easy to find and modify code
3. **Team Collaboration**: Different team members can work on different features independently
4. **Code Reusability**: Shared components and utilities prevent duplication
5. **Type Safety**: Comprehensive type definitions ensure code reliability
6. **Testing**: Each feature can be tested in isolation

## 📝 Usage Guidelines

### Adding New Features
1. Create a new folder under `features/`
2. Add the standard folder structure: `components/`, `services/`, `hooks/`, `types/`, `constants/`
3. Create an `index.ts` file in each folder for clean exports
4. Follow the established patterns for consistency

### Moving Components
- Feature-specific components go in `features/[feature]/components/`
- Reusable components go in `shared/components/`
- Update import paths when moving components

### Import Paths
- Use `@/features/[feature]/...` for feature-specific imports
- Use `@/shared/...` for shared resource imports
- Use `@/` for app-level imports

This structure follows modern React/Next.js best practices and ensures the codebase remains organized and maintainable as it grows.
