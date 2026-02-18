# ── Stage 1: Install dependencies ────────────────────────────────────────────
FROM node:20-alpine AS deps

RUN apk add --no-cache python3 make g++
RUN npm install -g pnpm@10.13.1

WORKDIR /app

# Copy workspace manifests first for layer caching
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/components/package.json packages/components/
COPY apps/storybook/package.json         apps/storybook/
COPY apps/landing/package.json           apps/landing/

RUN pnpm install --frozen-lockfile

# ── Stage 2: Build ────────────────────────────────────────────────────────────
FROM deps AS builder

COPY . .

# Turbo resolves the dependency order automatically:
# ens-components → landing + storybook (in parallel)
RUN pnpm turbo run build --filter=landing --filter=storybook --no-daemon

# Verify outputs exist
RUN test -f apps/landing/dist/index.html            || (echo "Landing build missing" && exit 1)
RUN test -f apps/storybook/storybook-static/index.html || (echo "Storybook build missing" && exit 1)

# ── Stage 3: Serve ────────────────────────────────────────────────────────────
FROM nginx:alpine

# Fix permissions for non-root nginx user
RUN chown -R nginx:nginx \
      /var/cache/nginx \
      /var/log/nginx \
      /etc/nginx/conf.d \
      /usr/share/nginx/html && \
    touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chown nginx:nginx /etc/nginx/conf.d/default.conf

# Landing page → served at /
COPY --from=builder /app/apps/landing/dist \
     /usr/share/nginx/html

# Storybook → served at /storybook/
COPY --from=builder /app/apps/storybook/storybook-static \
     /usr/share/nginx/html/storybook

RUN chown -R nginx:nginx /usr/share/nginx/html

USER nginx
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
