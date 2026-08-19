-- AlterTable
ALTER TABLE "GroupChat" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'No description.',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Group Chat',
ADD COLUMN     "picture_url" TEXT NOT NULL DEFAULT 'https://png.pngtree.com/png-clipart/20200225/original/pngtree-group-chat-icon-png-image_5282821.jpg';
