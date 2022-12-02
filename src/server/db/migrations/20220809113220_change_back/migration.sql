-- CreateTable
CREATE TABLE "_IdeaToLabel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IdeaToLabel_AB_unique" ON "_IdeaToLabel"("A", "B");

-- CreateIndex
CREATE INDEX "_IdeaToLabel_B_index" ON "_IdeaToLabel"("B");

-- AddForeignKey
ALTER TABLE "_IdeaToLabel" ADD CONSTRAINT "_IdeaToLabel_A_fkey" FOREIGN KEY ("A") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IdeaToLabel" ADD CONSTRAINT "_IdeaToLabel_B_fkey" FOREIGN KEY ("B") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;
