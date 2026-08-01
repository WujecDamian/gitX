/*
  Warnings:

  - You are about to drop the column `user_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `_ChatToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user1_id` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2_id` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_B_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "user1_id" TEXT NOT NULL,
ADD COLUMN     "user2_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "user_id",
ADD COLUMN     "group_chat_id" TEXT,
ADD COLUMN     "senderId" TEXT NOT NULL,
ALTER COLUMN "chat_id" DROP NOT NULL;

-- DropTable
DROP TABLE "_ChatToUser";

-- CreateTable
CREATE TABLE "GroupChat" (
    "id" TEXT NOT NULL,
    "groupId" TEXT,

    CONSTRAINT "GroupChat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupChat" ADD CONSTRAINT "GroupChat_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_group_chat_id_fkey" FOREIGN KEY ("group_chat_id") REFERENCES "GroupChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
