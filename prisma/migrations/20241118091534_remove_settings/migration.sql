/*
  Warnings:

  - You are about to drop the column `settings` on the `AI` table. All the data in the column will be lost.
  - Added the required column `greeting` to the `AI` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `AI` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AI" DROP COLUMN "settings",
ADD COLUMN     "greeting" TEXT NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL;
