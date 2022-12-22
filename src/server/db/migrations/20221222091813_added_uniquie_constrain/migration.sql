/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ApiConnectorRoute` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ApiConnectorRoute_name_key" ON "ApiConnectorRoute"("name");
