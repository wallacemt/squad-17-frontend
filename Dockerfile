FROM oven/bun:canary-alpine AS base

# Evita problemas com libs nativas
RUN apk add --no-cache libc6-compat

WORKDIR /app

FROM base AS deps

COPY package.json bun.lock* package-lock.json* ./

RUN bun install

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

FROM oven/bun:canary-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copia apenas o necessário (imagem menor)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["bun", "start"]