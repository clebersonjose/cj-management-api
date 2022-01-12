-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('admin', 'visitor', 'editor');

-- CreateEnum
CREATE TYPE "StatusPost" AS ENUM ('draft', 'published', 'deleted');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "RoleUser" NOT NULL DEFAULT E'visitor',
    "createdAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blockListAccessToken" (
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blockListAccessToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "allowListRefreshToken" (
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "inspireIn" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allowListRefreshToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "StatusPost" NOT NULL DEFAULT E'draft',
    "createdAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "blockListAccessToken_token_key" ON "blockListAccessToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "allowListRefreshToken_token_key" ON "allowListRefreshToken"("token");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
