/*
  Warnings:

  - You are about to drop the `CodeSnippets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CodeSnippets" DROP CONSTRAINT "CodeSnippets_userId_fkey";

-- DropTable
DROP TABLE "CodeSnippets";

-- CreateTable
CREATE TABLE "CodeSnippet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "codeBlock" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "CodeSnippet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodeSnippet" ADD CONSTRAINT "CodeSnippet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
