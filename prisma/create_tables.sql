-- Drop all tables in the correct order to avoid dependency issues
DROP TABLE IF EXISTS "IntegrationSync" CASCADE;
DROP TABLE IF EXISTS "IntegrationSettings" CASCADE;
DROP TABLE IF EXISTS "Integration" CASCADE;
DROP TABLE IF EXISTS "IntegrationProvider" CASCADE;
DROP TABLE IF EXISTS "ServiceBooking" CASCADE;
DROP TABLE IF EXISTS "Service" CASCADE;
DROP TABLE IF EXISTS "Photo" CASCADE;
DROP TABLE IF EXISTS "InsuranceClaim" CASCADE;
DROP TABLE IF EXISTS "DamageReport" CASCADE;
DROP TABLE IF EXISTS "Review" CASCADE;
DROP TABLE IF EXISTS "CarAvailability" CASCADE;
DROP TABLE IF EXISTS "Booking" CASCADE;
DROP TABLE IF EXISTS "Car" CASCADE;
DROP TABLE IF EXISTS "Staff" CASCADE;
DROP TABLE IF EXISTS "Location" CASCADE;
DROP TABLE IF EXISTS "AuditLog" CASCADE;
DROP TABLE IF EXISTS "LoginSession" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- Table: User
CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    name VARCHAR,
    role VARCHAR NOT NULL DEFAULT 'USER',
    "phoneNumber" VARCHAR,
    address VARCHAR,
    "profileImage" VARCHAR,
    "emailVerified" BOOLEAN DEFAULT FALSE,
    "isActive" BOOLEAN DEFAULT TRUE,
    "lastLogin" TIMESTAMP,
    "googleId" VARCHAR UNIQUE,
    "appleId" VARCHAR UNIQUE,
    "resetPasswordToken" VARCHAR,
    "tokenExpiry" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: LoginSession
CREATE TABLE "LoginSession" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    token VARCHAR UNIQUE NOT NULL,
    "deviceInfo" VARCHAR,
    "ipAddress" VARCHAR,
    "lastActive" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP NOT NULL,
    "isValid" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Car
CREATE TABLE "Car" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    make VARCHAR NOT NULL,
    model VARCHAR NOT NULL,
    year INT NOT NULL,
    color VARCHAR NOT NULL,
    "licensePlate" VARCHAR UNIQUE NOT NULL,
    price FLOAT NOT NULL,
    "isAvailable" BOOLEAN DEFAULT TRUE,
    images JSONB NOT NULL,
    category VARCHAR NOT NULL,
    features JSONB NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Booking
CREATE TABLE "Booking" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "carId" UUID NOT NULL REFERENCES "Car"(id) ON DELETE CASCADE,
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP NOT NULL,
    "totalPrice" FLOAT NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Review
CREATE TABLE "Review" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rating INT NOT NULL,
    comment VARCHAR,
    "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "carId" UUID NOT NULL REFERENCES "Car"(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: CarAvailability
CREATE TABLE "CarAvailability" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "carId" UUID NOT NULL REFERENCES "Car"(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    "isAvailable" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("carId", date)
);

-- Table: DamageReport
CREATE TABLE "DamageReport" (
    id SERIAL PRIMARY KEY,
    "carId" UUID NOT NULL REFERENCES "Car"(id) ON DELETE CASCADE,
    "rentalId" UUID NOT NULL REFERENCES "Booking"(id) ON DELETE CASCADE,
    "dateOfIncident" TIMESTAMP NOT NULL,
    "locationOfIncident" VARCHAR NOT NULL,
    "driverStatement" TEXT NOT NULL,
    "damageDescription" TEXT NOT NULL,
    "weatherConditions" TEXT NOT NULL,
    "policeReportFiled" BOOLEAN NOT NULL,
    "policeReportNumber" VARCHAR,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: InsuranceClaim
CREATE TABLE "InsuranceClaim" (
    id SERIAL PRIMARY KEY,
    "damageReportId" INT NOT NULL REFERENCES "DamageReport"(id) ON DELETE CASCADE UNIQUE,
    "claimNumber" VARCHAR UNIQUE NOT NULL,
    status VARCHAR NOT NULL,
    "estimatedDamage" FLOAT NOT NULL,
    "deductibleAmount" FLOAT NOT NULL,
    "insuranceProvider" VARCHAR NOT NULL,
    "adjusterName" VARCHAR,
    "adjusterContact" VARCHAR,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Photo
CREATE TABLE "Photo" (
    id SERIAL PRIMARY KEY,
    "damageReportId" INT NOT NULL REFERENCES "DamageReport"(id) ON DELETE CASCADE,
    url VARCHAR NOT NULL,
    caption VARCHAR,
    "dateUploaded" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Service
CREATE TABLE "Service" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    description VARCHAR,
    price FLOAT NOT NULL,
    "durationMinutes" INT NOT NULL,
    availability INT DEFAULT 1,
    "serviceType" VARCHAR NOT NULL,
    status VARCHAR DEFAULT 'ACTIVE',
    "reasonInactive" VARCHAR,
    "lastActiveDate" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: ServiceBooking
CREATE TABLE "ServiceBooking" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "bookingId" UUID NOT NULL REFERENCES "Booking"(id) ON DELETE CASCADE,
    "serviceId" UUID NOT NULL REFERENCES "Service"(id) ON DELETE CASCADE,
    "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    status VARCHAR DEFAULT 'PENDING',
    "scheduledDate" TIMESTAMP NOT NULL,
    "completedDate" TIMESTAMP,
    notes VARCHAR,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: IntegrationProvider
CREATE TABLE "IntegrationProvider" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR UNIQUE NOT NULL,
    description VARCHAR,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Integration
CREATE TABLE "Integration" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    "providerId" UUID NOT NULL REFERENCES "IntegrationProvider"(id) ON DELETE CASCADE,
    enabled BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: IntegrationSettings
CREATE TABLE "IntegrationSettings" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "integrationId" UUID NOT NULL REFERENCES "Integration"(id) ON DELETE CASCADE,
    "apiKey" VARCHAR,
    "webhookUrl" VARCHAR,
    "customConfig" JSONB,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: IntegrationSync
CREATE TABLE "IntegrationSync" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "integrationId" UUID NOT NULL REFERENCES "Integration"(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR NOT NULL,
    details VARCHAR,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: AuditLog
CREATE TABLE "AuditLog" (
    id SERIAL PRIMARY KEY,
    "user_id" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    action VARCHAR NOT NULL,
    "entity_type" VARCHAR NOT NULL,
    "entity_id" VARCHAR NOT NULL,
    changes JSONB,
    "ip_address" VARCHAR,
    "user_agent" VARCHAR,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Location
CREATE TABLE "Location" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    zipCode VARCHAR NOT NULL,
    "phoneNumber" VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    "openingHours" VARCHAR NOT NULL,
    "isActive" BOOLEAN DEFAULT TRUE,
    notes VARCHAR,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Staff
CREATE TABLE "Staff" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    role VARCHAR NOT NULL,
    "locationId" UUID NOT NULL REFERENCES "Location"(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
