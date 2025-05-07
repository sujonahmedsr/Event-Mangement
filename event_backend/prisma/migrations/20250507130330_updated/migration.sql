/*
  Warnings:

  - You are about to drop the column `paymentId` on the `participations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "participations" DROP COLUMN "paymentId",
ADD COLUMN     "paymentStatus" BOOLEAN NOT NULL DEFAULT false;
