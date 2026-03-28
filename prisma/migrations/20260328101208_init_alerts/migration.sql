-- CreateTable
CREATE TABLE "alerts" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "message" TEXT,
    "amount" TEXT,
    "image" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "alerts_isRead_createdAt_idx" ON "alerts"("isRead", "createdAt");
