# Build stage
FROM --platform=$BUILDPLATFORM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies for better processing
RUN yum update -y && \
    yum groupinstall -y "Development Tools" && \
    yum install -y python3 make gcc-c++ && \
    yum clean all

# Copy package files
COPY package*.json ./

# Install dependencies with verbose logging
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

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM --platform=$TARGETPLATFORM node:18 AS runner

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_S3_BUCKET_URL=${NEXT_PUBLIC_S3_BUCKET_URL}
ENV DATABASE_URL=${DATABASE_URL}

# Install necessary dependencies for migrations
RUN yum update -y && \
    yum groupinstall -y "Development Tools" && \
    yum install -y gcc-c++ && \
    yum clean all

# Copy the built application and dependencies
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Apply Prisma database migrations
RUN npx prisma migrate deploy

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
