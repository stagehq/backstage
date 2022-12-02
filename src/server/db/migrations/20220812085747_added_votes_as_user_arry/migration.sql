-- CreateTable
CREATE TABLE "_votedInIdea" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_votedInIdea_AB_unique" ON "_votedInIdea"("A", "B");

-- CreateIndex
CREATE INDEX "_votedInIdea_B_index" ON "_votedInIdea"("B");

-- AddForeignKey
ALTER TABLE "_votedInIdea" ADD CONSTRAINT "_votedInIdea_A_fkey" FOREIGN KEY ("A") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_votedInIdea" ADD CONSTRAINT "_votedInIdea_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
