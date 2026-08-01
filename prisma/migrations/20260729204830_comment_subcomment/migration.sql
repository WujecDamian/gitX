-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "sub_comment_id" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_sub_comment_id_fkey" FOREIGN KEY ("sub_comment_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
