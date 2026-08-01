/*
  Warnings:

  - You are about to drop the column `chatId` on the `Group` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Group_chatId_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "chatId";
