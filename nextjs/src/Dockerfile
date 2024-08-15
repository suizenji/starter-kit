# https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# https://github.com/vercel/next.js/blob/canary/examples/with-docker-compose/next-app/prod.Dockerfile
# docker build -t tag .
FROM node:latest AS base

# build
FROM base AS builder

WORKDIR /app

COPY . /app
RUN npm ci
RUN npm run build

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

ENV NODE_ENV production
ENV TZ Asia/Tokyo
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/.env* ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js
