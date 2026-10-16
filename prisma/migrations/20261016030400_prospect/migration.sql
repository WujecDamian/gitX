-- CreateTable
CREATE TABLE "Prospect" (
    "id" TEXT NOT NULL,
    "recruiterId" TEXT NOT NULL,
    "candidateProfileId" TEXT NOT NULL,

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prospect_recruiterId_candidateProfileId_key" ON "Prospect"("recruiterId", "candidateProfileId");

-- AddForeignKey
ALTER TABLE "Prospect" ADD CONSTRAINT "Prospect_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prospect" ADD CONSTRAINT "Prospect_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
