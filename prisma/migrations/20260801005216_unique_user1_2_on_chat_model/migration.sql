/*
  Warnings:

  - A unique constraint covering the columns `[user1_id,user2_id]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chat_user1_id_user2_id_key" ON "Chat"("user1_id", "user2_id");
