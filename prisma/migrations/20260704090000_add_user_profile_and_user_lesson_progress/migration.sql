-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "fullName" VARCHAR(255),
    "age" INTEGER,
    "location" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "isNew" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_clerkId_key" ON "UserProfile"("clerkId");

-- CreateIndex
CREATE INDEX "UserProfile_email_idx" ON "UserProfile"("email");

-- AlterTable
ALTER TABLE "LessonProgress"
ADD COLUMN "userId" TEXT;

-- Backfill existing LessonProgress rows with a placeholder user profile
INSERT INTO "UserProfile" ("id", "clerkId", "fullName", "email", "isNew", "createdAt", "updatedAt")
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'legacy-local-user',
    'Legacy User',
    'legacy@example.local',
    false,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("clerkId") DO NOTHING;

UPDATE "LessonProgress"
SET "userId" = '00000000-0000-0000-0000-000000000001'
WHERE "userId" IS NULL;

ALTER TABLE "LessonProgress"
ALTER COLUMN "userId" SET NOT NULL;

-- Drop old unique index then create new one by lesson and user
DROP INDEX IF EXISTS "LessonProgress_lessonId_key";
CREATE UNIQUE INDEX "LessonProgress_lessonId_userId_key" ON "LessonProgress"("lessonId", "userId");

-- CreateIndex
CREATE INDEX "LessonProgress_userId_idx" ON "LessonProgress"("userId");

-- AddForeignKey
ALTER TABLE "LessonProgress"
ADD CONSTRAINT "LessonProgress_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
