/*
  Warnings:

  - Made the column `user_id` on table `CandidateProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `candidateProfileId` on table `Certification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `candidateProfileId` on table `Education` required. This step will fail if there are existing NULL values in that column.
  - Made the column `candidateProfileId` on table `Experience` required. This step will fail if there are existing NULL values in that column.
  - Made the column `candidateProfileId` on table `Language` required. This step will fail if there are existing NULL values in that column.
  - Made the column `candidateProfileId` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `candidateProfileId` on table `Skill` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CandidateProfile" DROP CONSTRAINT "CandidateProfile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_candidateProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_candidateProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_candidateProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_candidateProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_candidateProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_candidateProfileId_fkey";

-- AlterTable
ALTER TABLE "CandidateProfile" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Certification" ALTER COLUMN "candidateProfileId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "candidateProfileId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "candidateProfileId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Language" ALTER COLUMN "candidateProfileId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "candidateProfileId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "candidateProfileId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "CandidateProfile" ADD CONSTRAINT "CandidateProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
