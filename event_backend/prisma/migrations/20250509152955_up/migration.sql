/*
  Warnings:

  - The values [BANNED] on the enum `JoinStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'COMPLETED', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "JoinStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
ALTER TABLE "Invitation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "participations" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "participations" ALTER COLUMN "status" TYPE "JoinStatus_new" USING ("status"::text::"JoinStatus_new");
ALTER TABLE "Invitation" ALTER COLUMN "status" TYPE "JoinStatus_new" USING ("status"::text::"JoinStatus_new");
ALTER TYPE "JoinStatus" RENAME TO "JoinStatus_old";
ALTER TYPE "JoinStatus_new" RENAME TO "JoinStatus";
DROP TYPE "JoinStatus_old";
ALTER TABLE "Invitation" ALTER COLUMN "status" SET DEFAULT 'PENDING';
ALTER TABLE "participations" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING';
