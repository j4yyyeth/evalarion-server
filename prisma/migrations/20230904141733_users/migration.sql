/*
  Warnings:

  - Added the required column `githubUsername` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leetCodeUsername` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CodeSnippet" ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "githubUsername" TEXT NOT NULL,
ADD COLUMN     "isGithubAccount" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isGoogleAccount" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "leetCodeUsername" TEXT NOT NULL;
