-- AlterTable
ALTER TABLE "User" ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "languagesToLearn" TEXT[],
ADD COLUMN     "links" TEXT[],
ADD COLUMN     "projectIdeas" TEXT[];

-- CreateTable
CREATE TABLE "CodeSnippets" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "codeBlock" TEXT NOT NULL,

    CONSTRAINT "CodeSnippets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodeSnippets" ADD CONSTRAINT "CodeSnippets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
