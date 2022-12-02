-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ideaId" TEXT,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_reactionCreator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_reactionCreator_AB_unique" ON "_reactionCreator"("A", "B");

-- CreateIndex
CREATE INDEX "_reactionCreator_B_index" ON "_reactionCreator"("B");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reactionCreator" ADD CONSTRAINT "_reactionCreator_A_fkey" FOREIGN KEY ("A") REFERENCES "Reaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reactionCreator" ADD CONSTRAINT "_reactionCreator_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
