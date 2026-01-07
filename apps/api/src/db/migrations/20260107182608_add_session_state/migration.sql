-- AlterTable
ALTER TABLE "Message" ADD COLUMN "intent" TEXT;
ALTER TABLE "Message" ADD COLUMN "isFallback" BOOLEAN;
ALTER TABLE "Message" ADD COLUMN "source" TEXT;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN "stateJson" JSONB;
