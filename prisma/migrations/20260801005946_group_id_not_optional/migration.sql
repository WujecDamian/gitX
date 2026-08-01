/*
  Warnings:

  - Made the column `groupId` on table `GroupChat` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GroupChat" DROP CONSTRAINT "GroupChat_groupId_fkey";

-- AlterTable
ALTER TABLE "GroupChat" ALTER COLUMN "groupId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "GroupChat" ADD CONSTRAINT "GroupChat_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
