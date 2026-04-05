#!/bin/sh
# Extract git version info and export as environment variables for Docker build args
export APP_VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "dev")
export GIT_COMMIT=$(git rev-parse --short=7 HEAD 2>/dev/null || echo "unknown")

echo "Build version: APP_VERSION=${APP_VERSION} GIT_COMMIT=${GIT_COMMIT}"
