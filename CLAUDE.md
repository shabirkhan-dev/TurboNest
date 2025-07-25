# Drive Connect - Project Documentation

## Project Structure

This is a monorepo project built with Turbo containing:

### Frontend (`apps/front-end/`)
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **Testing**: Vitest + Playwright for E2E
- **Package Manager**: Bun
- **Key Features**: 
  - React 19
  - Tailwind with shadcn/ui components
  - TypeScript configuration
  - ESLint + Biome for code quality

### Backend (`apps/backend/`)
- **Framework**: Express.js with TypeScript
- **Runtime**: Bun
- **Database**: Currently configured for MongoDB (Mongoose), but Docker setup uses PostgreSQL
- **Key Features**:
  - Authentication module with JWT
  - User management
  - Session handling
  - CORS support
  - Zod validation

### Shared Configuration (`packages/`)
- **tsconfig**: Shared TypeScript configurations
- Base, Next.js specific configs

## Docker Setup

### Services
1. **PostgreSQL Database** (`postgres:16-alpine`)
   - Port: 5432
   - Database: `drive_connect`
   - Credentials: postgres/postgres123
   - Persistent volume for data

2. **Backend API** (Bun-based Express server)
   - Port: 8000
   - Health checks enabled
   - Environment: production

3. **Frontend** (Next.js with standalone output)
   - Port: 3000
   - Optimized multi-stage build
   - Environment: production

### Commands
- **Development**: `bun dev` (uses Turbo)
- **Build**: `bun run build`
- **Docker**: `docker-compose up -d`
- **Tests**: `bun test` (unit), `bun test:e2e` (E2E)

### Development Workflow
1. Install dependencies: `bun install`
2. Start development: `bun dev`
3. Run tests: `bun test`
4. Docker development: `docker-compose up -d`

### Database Migration Note
The backend currently uses Mongoose (MongoDB) but Docker setup provides PostgreSQL. You may need to:
1. Update backend to use PostgreSQL with a client like `pg` or `drizzle-orm`
2. Or modify docker-compose.yml to use MongoDB instead

### Key Scripts
- `turbo run dev`: Start all apps in development
- `turbo run build`: Build all apps
- `turbo run lint`: Lint all code
- `turbo run test`: Run all tests