# Build stage
FROM --platform=$BUILDPLATFORM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for better processing
RUN apk add --no-cache libc6-compat python3 make g++

# Copy package files
COPY package*.json ./

# Clean install dependencies with verbose logging
RUN npm cache clean --force && \
    npm config set legacy-peer-deps true && \
    NEXT_TELEMETRY_DISABLED=1 npm install --verbose

# Copy all files
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ARG NEXT_PUBLIC_S3_BUCKET_URL
ENV NEXT_PUBLIC_S3_BUCKET_URL=${NEXT_PUBLIC_S3_BUCKET_URL}

# Build application
RUN npm run build

# Production stage
FROM --platform=$TARGETPLATFORM node:18-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_S3_BUCKET_URL=${NEXT_PUBLIC_S3_BUCKET_URL}

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
