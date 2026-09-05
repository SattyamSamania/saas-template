-- CreateEnum
CREATE TYPE "EntryStatus" AS ENUM ('PENDING','PAID','FAILED','CANCELLED','EXPIRED');
CREATE TYPE "Visibility" AS ENUM ('VISIBLE','HIDDEN');
CREATE TABLE "LeaderboardEntry" (
 "id" TEXT NOT NULL, "name" VARCHAR(80) NOT NULL, "walletName" VARCHAR(80) NOT NULL, "walletAddress" VARCHAR(180), "websiteUrl" VARCHAR(500), "twitterUrl" VARCHAR(500), "imageUrl" VARCHAR(500), "tagline" VARCHAR(180), "amount" INTEGER NOT NULL, "currency" VARCHAR(3) NOT NULL DEFAULT 'USD', "status" "EntryStatus" NOT NULL DEFAULT 'PENDING', "visibility" "Visibility" NOT NULL DEFAULT 'VISIBLE', "dodoPaymentId" TEXT, "dodoCheckoutSessionId" TEXT, "webhookProcessedAt" TIMESTAMP(3), "expiresAt" TIMESTAMP(3), "paidAt" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
 CONSTRAINT "LeaderboardEntry_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "CheckoutLock" ("id" INTEGER NOT NULL DEFAULT 1,"version" INTEGER NOT NULL DEFAULT 0,"updatedAt" TIMESTAMP(3) NOT NULL,CONSTRAINT "CheckoutLock_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "LeaderboardEntry_dodoPaymentId_key" ON "LeaderboardEntry"("dodoPaymentId");
CREATE UNIQUE INDEX "LeaderboardEntry_dodoCheckoutSessionId_key" ON "LeaderboardEntry"("dodoCheckoutSessionId");
CREATE INDEX "LeaderboardEntry_status_visibility_amount_paidAt_idx" ON "LeaderboardEntry"("status","visibility","amount","paidAt");
CREATE INDEX "LeaderboardEntry_status_expiresAt_idx" ON "LeaderboardEntry"("status","expiresAt");
