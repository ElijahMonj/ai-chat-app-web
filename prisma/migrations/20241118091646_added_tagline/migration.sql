/*
  Warnings:

  - Added the required column `tagline` to the `AI` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AI" ADD COLUMN     "tagline" TEXT NOT NULL;
