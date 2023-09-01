# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=16.20.2
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Nuxt"

# Nuxt app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV BASE_URL="https://nuxt-salads-demo.fly.dev"
ENV API_URL="https://dorianm.com/nuxt-recipes-api"
ENV CDN_URL="https://dorianm.com/nuxt-recipes-images"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
ENV HOST=0
CMD [ "npm", "run", "start" ]
