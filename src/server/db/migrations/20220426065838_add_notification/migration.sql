-- CreateEnum
CREATE TYPE "PushNotification" AS ENUM ('never', 'same_as_notification', 'always');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "idea" BOOLEAN NOT NULL DEFAULT true,
    "initiative" BOOLEAN NOT NULL DEFAULT true,
    "meeting" BOOLEAN NOT NULL DEFAULT true,
    "chat" BOOLEAN NOT NULL DEFAULT false,
    "push" "PushNotification" NOT NULL DEFAULT E'same_as_notification',

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_key" ON "Notification"("userId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
