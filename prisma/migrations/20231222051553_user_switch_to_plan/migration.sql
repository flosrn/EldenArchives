/*
  Warnings:

  - You are about to drop the column `isPremium` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserPlan" AS ENUM ('FREE', 'PREMIUM');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPremium",
ADD COLUMN     "plan" "UserPlan" NOT NULL DEFAULT 'FREE';
