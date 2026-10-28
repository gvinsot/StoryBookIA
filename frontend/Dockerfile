# Build stage
# Node 25 is a non-supported line: it receives no fix for the October 2026
# security releases (CVE-2026-111497 Brotli RCE and the rest of the
# 2026-10-21 batch). 24.22.1 is the patched LTS line.
FROM --platform=linux/amd64 node:24.22.1-alpine AS builder

ARG APP_VERSION=dev
ARG GIT_COMMIT=unknown

ENV APP_VERSION=${APP_VERSION}
ENV GIT_COMMIT=${GIT_COMMIT}

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
# Pinned to 1.30.6, which fixes the 2026-10-14 nginx advisories
# (CVE-2026-15176, CVE-2026-93479, CVE-2026-97205).
FROM --platform=linux/amd64 nginx:1.30.6-alpine

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Install curl for healthcheck (not included in recent nginx:alpine)
RUN apk add --no-cache curl

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:80/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
