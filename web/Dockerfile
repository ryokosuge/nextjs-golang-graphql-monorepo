# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.8

################################################################################
# base
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app

################################################################################
# deps
FROM base as deps

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

################################################################################
# builder
FROM base as builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build && mv .next/static .next/standalone/.next/static

################################################################################
# runner
FROM base as runner

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone .

USER nextjs

CMD [ "node", "server.js" ]
