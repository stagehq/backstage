-- CreateTable
CREATE TABLE "Extension" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeExtensionId" TEXT NOT NULL,

    CONSTRAINT "Extension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Api" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refreshToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "storeApiId" TEXT NOT NULL,

    CONSTRAINT "Api_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiResponses" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response" TEXT NOT NULL,
    "apiId" TEXT NOT NULL,
    "storeRouteId" TEXT NOT NULL,

    CONSTRAINT "ApiResponses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreAPI" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "markdown" TEXT,

    CONSTRAINT "StoreAPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreRoute" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "storeApiId" TEXT NOT NULL,

    CONSTRAINT "StoreRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreExtension" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "markdown" TEXT,

    CONSTRAINT "StoreExtension_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoreAPI_name_key" ON "StoreAPI"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StoreExtension_name_key" ON "StoreExtension"("name");

-- AddForeignKey
ALTER TABLE "Extension" ADD CONSTRAINT "Extension_storeExtensionId_fkey" FOREIGN KEY ("storeExtensionId") REFERENCES "StoreExtension"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_storeApiId_fkey" FOREIGN KEY ("storeApiId") REFERENCES "StoreAPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiResponses" ADD CONSTRAINT "ApiResponses_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "Api"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiResponses" ADD CONSTRAINT "ApiResponses_storeRouteId_fkey" FOREIGN KEY ("storeRouteId") REFERENCES "StoreRoute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreRoute" ADD CONSTRAINT "StoreRoute_storeApiId_fkey" FOREIGN KEY ("storeApiId") REFERENCES "StoreAPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
