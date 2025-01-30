/*
  Warnings:

  - You are about to drop the `NoteShare` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NoteShare" DROP CONSTRAINT "NoteShare_noteId_fkey";

-- DropForeignKey
ALTER TABLE "NoteShare" DROP CONSTRAINT "NoteShare_userId_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "token" TEXT;

-- DropTable
DROP TABLE "NoteShare";
