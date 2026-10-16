-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" TEXT;

-- CreateTable
CREATE TABLE "CommentBookmark" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommentBookmark_comment_id_user_id_key" ON "CommentBookmark"("comment_id", "user_id");

-- AddForeignKey
ALTER TABLE "CommentBookmark" ADD CONSTRAINT "CommentBookmark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentBookmark" ADD CONSTRAINT "CommentBookmark_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
