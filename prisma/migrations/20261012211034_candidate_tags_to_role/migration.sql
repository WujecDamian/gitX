/*
  Warnings:

  - You are about to drop the column `tags` on the `CandidateProfile` table. All the data in the column will be lost.
  - Added the required column `role` to the `CandidateProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CandidateProfile" DROP COLUMN "tags",
ADD COLUMN     "role" TEXT NOT NULL;
