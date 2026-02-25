/*
  Warnings:

  - You are about to drop the column `time_added` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `region_id` on the `WebsiteTick` table. All the data in the column will be lost.
  - You are about to drop the column `response_time_ms` on the `WebsiteTick` table. All the data in the column will be lost.
  - You are about to drop the column `website_id` on the `WebsiteTick` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `WebsiteTick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseTimeMs` to the `WebsiteTick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteId` to the `WebsiteTick` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_user_id_fkey";

-- DropForeignKey
ALTER TABLE "WebsiteTick" DROP CONSTRAINT "WebsiteTick_region_id_fkey";

-- DropForeignKey
ALTER TABLE "WebsiteTick" DROP CONSTRAINT "WebsiteTick_website_id_fkey";

-- AlterTable
ALTER TABLE "Website" DROP COLUMN "time_added",
DROP COLUMN "user_id",
ADD COLUMN     "timeAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WebsiteTick" DROP COLUMN "region_id",
DROP COLUMN "response_time_ms",
DROP COLUMN "website_id",
ADD COLUMN     "regionId" TEXT NOT NULL,
ADD COLUMN     "responseTimeMs" INTEGER NOT NULL,
ADD COLUMN     "websiteId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteTick" ADD CONSTRAINT "WebsiteTick_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteTick" ADD CONSTRAINT "WebsiteTick_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
