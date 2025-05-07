/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `isPrivate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `participations` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `participations` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `participations` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `participations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `participations` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `reviews` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[event_id,user_id]` on the table `participations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creator_id` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_time` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_paid` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_private` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `participations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `participations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "participations" DROP CONSTRAINT "participations_eventId_fkey";

-- DropForeignKey
ALTER TABLE "participations" DROP CONSTRAINT "participations_userId_fkey";

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "createdAt",
DROP COLUMN "isDeleted",
DROP COLUMN "paymentId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "creatorId",
DROP COLUMN "dateTime",
DROP COLUMN "isDeleted",
DROP COLUMN "isPaid",
DROP COLUMN "isPrivate",
ADD COLUMN     "creator_id" TEXT NOT NULL,
ADD COLUMN     "date_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_paid" BOOLEAN NOT NULL,
ADD COLUMN     "is_private" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "participations" DROP COLUMN "createdAt",
DROP COLUMN "eventId",
DROP COLUMN "isDeleted",
DROP COLUMN "paymentStatus",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "event_id" TEXT NOT NULL,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "payment_status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "isDeleted",
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "participations_event_id_idx" ON "participations"("event_id");

-- CreateIndex
CREATE INDEX "participations_user_id_idx" ON "participations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "participations_event_id_user_id_key" ON "participations"("event_id", "user_id");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "participations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "participations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
