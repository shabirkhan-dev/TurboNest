# 🪺 TurboNest – The All-in-One Monorepo Starter Kit

**TurboNest** is a modern, scalable monorepo boilerplate built on top of [Turborepo](https://turbo.build/), [Next.js](https://nextjs.org/), [Bun](https://bun.sh/), and [TypeScript](https://www.typescriptlang.org/). With enterprise-grade tooling out of the box—CI, Git hooks, semantic releases, security scans, and commit standards—TurboNest lets your team focus on shipping features, not configuring them.

---

## ⚙️ Features

- 🧠 **Turborepo** – monorepo orchestration
- ⚡️ **Bun** – super-fast runtime & package manager
- ✨ **Next.js (App Router)** – modern frontend foundation
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
turbonest/
├── apps/
│   ├── gateway/       # Main Next.js app
│   └── admin/         # Optional admin panel
├── packages/
│   ├── ui/            # Shared design system
│   ├── types/         # Global TS types
│   └── config/        # Shared tooling config (tsconfig, eslint, etc.)
├── .github/
│   ├── workflows/     # CI, CodeQL, SonarQube
├── .lefthook.yml      # Git hooks config
├── turbo.json         # Turborepo pipeline
├── commitlint.config.js
└── bun.lockb
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-org/turbonest.git
cd turbonest
bun install
bun run dev
```

---

## 🧪 Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start all apps in dev mode |
| `bun run build` | Build all apps and packages |
| `bun run lint` | Run ESLint across the monorepo |
| `bun run typecheck` | Type-check only (no emit) |
| `bun run commit` | Commit using commitizen prompts |
| `bun run deps:update` | Update all dependencies |
| `bun run deps:check` | Show outdated dependencies |
| `bun run manypkg` | Validate workspace consistency |
| `bun run knip` | Find unused files/exports |

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
| **Next.js** | Frontend / SSR |
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
import { Button } from "@vendora/ui";
```

> TS paths are configured via `@vendora/tsconfig`.

---

## 👨‍💻 Author

**Shabir Khan**  
📧 [shabirkhan.dev@gmail.com](mailto:shabirkhan.dev@gmail.com)  
🌐 [https://shabirkhan.dev](https://shabirkhan.dev)

---

## 📄 License

MIT © [Shabir Khan](https://github.com/shabirkhan-dev)
