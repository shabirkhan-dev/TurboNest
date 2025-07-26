FROM oven/bun:1.2-alpine AS base

FROM base AS deps
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile --production

FROM base AS build
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM base AS runtime
WORKDIR /app

RUN addgroup --system --gid 1001 bunuser
RUN adduser --system --uid 1001 bunuser

COPY --from=deps --chown=bunuser:bunuser /app/node_modules ./node_modules
COPY --from=build --chown=bunuser:bunuser /app ./app

USER bunuser

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "run", "start"]