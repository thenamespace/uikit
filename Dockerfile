FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++
RUN npm install -g pnpm@10.13.1

WORKDIR /app

# .npmrc must be present before pnpm install so shamefully-hoist applies
COPY .npmrc pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/components/package.json packages/components/
COPY apps/storybook/package.json       apps/storybook/
COPY apps/landing/package.json         apps/landing/

RUN pnpm install --frozen-lockfile

COPY . .

ENV CI=true
ENV STORYBOOK_DISABLE_TELEMETRY=1

# Build in dependency order
RUN pnpm --filter @thenamespace/ens-components build
RUN pnpm --filter landing build
RUN pnpm --filter storybook build

# ── Serve ─────────────────────────────────────────────────────────────────────
FROM nginx:alpine

RUN chown -R nginx:nginx \
      /var/cache/nginx \
      /var/log/nginx \
      /etc/nginx/conf.d \
      /usr/share/nginx/html && \
    touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chown nginx:nginx /etc/nginx/conf.d/default.conf

COPY --from=builder /app/apps/landing/dist              /usr/share/nginx/html
COPY --from=builder /app/apps/storybook/storybook-static /usr/share/nginx/html/storybook

RUN chown -R nginx:nginx /usr/share/nginx/html

USER nginx
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
