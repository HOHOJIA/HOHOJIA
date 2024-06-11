FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN npm ci


COPY src ./src
COPY public ./public
COPY next.config.mjs tailwind.config.ts tsconfig.json postcss.config.mjs ./


# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG NEXT_PUBLIC_API_DOMAIN
ENV NEXT_PUBLIC_API_DOMAIN=${NEXT_PUBLIC_API_DOMAIN}

ARG NEXT_PUBLIC_S3_BUCKET_REGION
ENV NEXT_PUBLIC_S3_BUCKET_REGION=${NEXT_PUBLIC_S3_BUCKET_REGION}

ARG NEXT_PUBLIC_BUCKET_NAME
ENV NEXT_PUBLIC_BUCKET_NAME=${NEXT_PUBLIC_BUCKET_NAME}

# Debuggings
RUN echo $NEXT_PUBLIC_API_DOMAIN 

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN npm run no-lint-build


# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG NEXT_PUBLIC_API_DOMAIN
ENV NEXT_PUBLIC_API_DOMAIN=${NEXT_PUBLIC_API_DOMAIN}

ARG NEXT_PUBLIC_S3_BUCKET_REGION
ENV NEXT_PUBLIC_S3_BUCKET_REGION=${NEXT_PUBLIC_S3_BUCKET_REGION}

ARG NEXT_PUBLIC_BUCKET_NAME
ENV NEXT_PUBLIC_BUCKET_NAME=${NEXT_PUBLIC_BUCKET_NAME}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]