/*
  Warnings:

  - You are about to drop the column `invitingId` on the `GroupInvite` table. All the data in the column will be lost.
  - Added the required column `inviteeId` to the `GroupInvite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GroupInvite" DROP CONSTRAINT "GroupInvite_invitingId_fkey";

-- AlterTable
ALTER TABLE "GroupInvite" DROP COLUMN "invitingId",
ADD COLUMN     "inviteeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "GroupInvite" ADD CONSTRAINT "GroupInvite_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
