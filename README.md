# 🚗 Drive Connect – Full-Stack Monorepo

**Drive Connect** is a modern, scalable monorepo built with [Turborepo](https://turbo.build/), [Next.js](https://nextjs.org/), [Express.js](https://expressjs.com/), [Bun](https://bun.sh/), and [TypeScript](https://www.typescriptlang.org/). Complete with Docker containerization, PostgreSQL database, and enterprise-grade tooling—CI, Git hooks, semantic releases, security scans, and commit standards.

---

## ⚙️ Features

- 🧠 **Turborepo** – monorepo orchestration
- ⚡️ **Bun** – super-fast runtime & package manager
- ✨ **Next.js (App Router)** – modern frontend with React 19
- 🚀 **Express.js** – robust backend API with Bun runtime
- 🐘 **PostgreSQL** – reliable database with Docker
- 🐳 **Docker** – full containerization with multi-stage builds
- 📚 **Storybook** – component development and documentation
- 🔒 **Lefthook** – commit linting, typechecks, and more via Git hooks
- 🧪 **TypeScript strict mode** – shared config across apps
- 🧰 **Commitlint + Commitizen** – clean commit history
- 🚀 **Semantic Release** – changelogs, tags, and releases auto-magically
- 🧼 **Manypkg + Knip** – workspace integrity and dead-code cleanup
- 🧪 **SonarQube + CodeQL** – code quality and security scanning
- 🤖 **Dependabot** – automatic dependency updates
- 🛠️ **GitHub Actions** – fully automated CI

---

## 🏗️ Folder Structure

```
drive-connect/
├── apps/
│   ├── front-end/     # Next.js frontend (React 19, Tailwind)
│   └── backend/       # Express.js API (Bun runtime)
├── packages/
│   └── tsconfig/      # Shared TypeScript configurations
├── .github/
│   ├── workflows/     # CI, CodeQL, SonarQube, Playwright
├── tests/             # E2E tests with Playwright
├── docker-compose.yml # Docker orchestration
├── init.sql          # PostgreSQL initialization
├── CLAUDE.md         # AI assistant context
├── lefthook.yml      # Git hooks config
├── turbo.json        # Turborepo pipeline
└── bun.lockb
```

---

## 🚀 Getting Started

### Development Setup

```bash
git clone https://github.com/shabirkhan-dev/drive-connect.git
cd drive-connect
bun install
bun run dev
```

### Docker Setup (Recommended)

```bash
# Start all services (PostgreSQL + Backend + Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Individual Services

```bash
# Frontend (Next.js) - http://localhost:3000
cd apps/front-end && bun dev

# Backend (Express) - http://localhost:8000
cd apps/backend && bun run start

# Database
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres123 postgres:16-alpine
```

---

## 🧪 Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start all apps in dev mode |
| `bun run build` | Build all apps and packages |
| `bun run lint` | Run Biome linting across the monorepo |
| `bun run test` | Run all unit tests |
| `bun run test:watch` | Run tests in watch mode |
| `bun run test:coverage` | Run tests with coverage reports |
| `bun run test:e2e` | Run Playwright e2e tests |
| `bun run test:e2e:ui` | Run tests with Playwright UI |
| `bun run test:e2e:debug` | Run tests in debug mode |
| `bun run storybook` | Start Storybook development server |
| `bun run build-storybook` | Build Storybook for production |
| `bun run typecheck` | Type-check only (no emit) |
| `bun run commit` | Commit using commitizen prompts |
| `bun run deps:update` | Update all dependencies |
| `bun run deps:check` | Show outdated dependencies |
| `bun run manypkg` | Validate workspace consistency |
| `bun run knip` | Find unused files/exports |

### 🐳 Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start all services in background |
| `docker-compose down` | Stop and remove containers |
| `docker-compose logs -f` | Follow logs from all services |
| `docker-compose ps` | Show running containers |
| `docker-compose exec postgres psql -U postgres -d drive_connect` | Connect to PostgreSQL |

---

## 🔁 CI/CD Overview

TurboNest uses **GitHub Actions** to automate everything:

### ✅ **CI Workflow Includes**

- Lint, typecheck, test, build on every push
- Run across **Linux, macOS, and Windows**
- **Matrix builds** for full coverage

### 🔒 **Security & Code Quality**

- ✅ [CodeQL](https://codeql.github.com/) – static code scanning
- ✅ [SonarQube](https://www.sonarsource.com/) – code quality + test coverage
- ✅ [Dependabot](https://docs.github.com/en/code-security/dependabot) – auto PRs for outdated packages

### 🚀 **Semantic Release**

- Creates GitHub releases from commit messages
- Auto-changelog, tagging, and version bumps

> 🧠 Just write commits properly (`feat:`, `fix:`, `chore:`), and releases happen automatically!

---

## 🧪 Testing

TurboNest includes comprehensive testing with **Playwright** for end-to-end testing:

### **E2E Testing with Playwright**

- ✅ **Cross-browser testing** (Chrome, Firefox, Safari, Mobile)
- ✅ **Parallel execution** for fast test runs
- ✅ **Visual regression testing** with screenshots and videos
- ✅ **Accessibility testing** with semantic selectors
- ✅ **CI/CD integration** with GitHub Actions
- ✅ **Debug mode** for troubleshooting

### **Quick Test Commands**

```bash
# Run all e2e tests
bun run test:e2e

# Run tests with UI (interactive)
bun run test:e2e:ui

# Run tests in debug mode
bun run test:e2e:debug

# View test reports
bun run test:e2e:report
```

### **Test Structure**

Tests are organized within each application for better maintainability:

```
apps/
├── front-end/
│   ├── src/test/           # Unit tests with Vitest
│   │   ├── setup.ts        # Test setup and globals
│   │   └── example.test.tsx # Component tests
│   └── tests/              # E2E tests with Playwright
│       ├── example.spec.ts
│       └── drive-connect.spec.ts
└── backend/
    └── src/test/           # API tests with Vitest + Supertest
        ├── setup.ts        # Test setup and mocks
        └── auth.test.ts    # Authentication tests
```

Each app has its own testing configuration and can be run independently or as part of the monorepo.

---

## 🧩 Git Hooks

Using [Lefthook](https://github.com/evilmartians/lefthook) for fast and reliable Git hooks:

- ✅ Linting and formatting
- ✅ Commit message enforcement via Commitlint
- ✅ TypeScript checks before commit

Install hooks:

```bash
bun run prepare
```

---

## 🧠 Commit Convention

Follows [Conventional Commits](https://www.conventionalcommits.org):

```bash
bun run commit
# or
git commit -m "feat(auth): add OAuth login"
```

Examples:
- `feat(api): add user endpoint`
- `fix(build): resolve Docker crash`
- `chore: update deps`

---

## 🛠 Tools Used

| Tool | Purpose |
|------|---------|
| **Next.js** | Frontend framework |
| **Express.js** | Backend API |
| **PostgreSQL** | Database |
| **Docker** | Containerization |
| **Turborepo** | Monorepo orchestration |
| **Bun** | Fast runtime & package manager |
| **TypeScript** | Static typing |
| **Commitlint + Commitizen** | Commit standardization |
| **Semantic Release** | Automated changelogs & releases |
| **Lefthook** | Git hooks |
| **CodeQL** | Vulnerability scanning |
| **SonarQube** | Code quality scanning |
| **Manypkg + Knip** | Workspace validation & cleanup |

---

## 📦 Workspaces

This repo uses Bun workspaces:

```json
"workspaces": [
  "apps/*",
  "packages/*"
]
```

Use aliases like:

```ts
import { Button } from "@/components/ui/button";
```

> TS paths are configured via shared `@vendora/tsconfig` package.

---

## 👨‍💻 Author

**Shabir Khan**  
📧 [shabirkhan.dev@gmail.com](mailto:shabirkhan.dev@gmail.com)  
🌐 [https://shabirkhan.dev](https://shabirkhan.dev)

---

## 📄 License

MIT © [Shabir Khan](https://github.com/shabirkhan-dev)
