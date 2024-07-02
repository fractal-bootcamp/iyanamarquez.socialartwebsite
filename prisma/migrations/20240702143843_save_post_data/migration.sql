/*
  Warnings:

  - Added the required column `postData` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "postData" JSONB NOT NULL;
