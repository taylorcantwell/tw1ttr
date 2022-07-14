-- CreateEnum
CREATE TYPE "ReplyPermission" AS ENUM ('EVERYONE', 'FOLLOWERS');

-- CreateTable
CREATE TABLE "tweet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "deleted" TIMESTAMP(3),
    "reply_permissions" "ReplyPermission" NOT NULL DEFAULT E'EVERYONE',

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweet_media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tweet_id" UUID NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "tweet_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "phone_number" TEXT,
    "bio" TEXT,
    "banner_url" TEXT,
    "avatar_url" TEXT,
    "user_id" UUID NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "email" TEXT,
    "deleted" TIMESTAMP(3),
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follow" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "followee_id" UUID NOT NULL,
    "follower_id" UUID NOT NULL,
    "deleted" TIMESTAMP(3),
    "unfollowed" BOOLEAN,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "save_tweet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "unsaved" BOOLEAN NOT NULL DEFAULT false,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "save_tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retweet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "unretweeted" BOOLEAN NOT NULL DEFAULT false,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "retweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweet_like" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "deleted" TIMESTAMP(3),
    "unliked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tweet_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweet_comment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "tweet_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_like" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_comment_id" UUID NOT NULL,
    "deleted" TIMESTAMP(3),
    "unliked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "comment_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hash_tag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "hash_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweet_hash_tag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tweet_id" UUID NOT NULL,
    "hash_tag_id" UUID NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "tweet_hash_tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tweet_media_url_key" ON "tweet_media"("url");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "follow_followee_id_follower_id_key" ON "follow"("followee_id", "follower_id");

-- CreateIndex
CREATE UNIQUE INDEX "save_tweet_tweet_id_user_id_key" ON "save_tweet"("tweet_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "retweet_tweet_id_user_id_key" ON "retweet"("tweet_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tweet_like_tweet_id_user_id_key" ON "tweet_like"("tweet_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "comment_like_user_id_tweet_comment_id_key" ON "comment_like"("user_id", "tweet_comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "hash_tag_name_key" ON "hash_tag"("name");

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweet_media" ADD CONSTRAINT "tweet_media_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followee_id_fkey" FOREIGN KEY ("followee_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "save_tweet" ADD CONSTRAINT "save_tweet_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "save_tweet" ADD CONSTRAINT "save_tweet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweet" ADD CONSTRAINT "retweet_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweet" ADD CONSTRAINT "retweet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweet_like" ADD CONSTRAINT "tweet_like_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweet_like" ADD CONSTRAINT "tweet_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweet_comment" ADD CONSTRAINT "tweet_comment_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweet_comment" ADD CONSTRAINT "tweet_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_like" ADD CONSTRAINT "comment_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_like" ADD CONSTRAINT "comment_like_tweet_comment_id_fkey" FOREIGN KEY ("tweet_comment_id") REFERENCES "tweet_comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweet_hash_tag" ADD CONSTRAINT "tweet_hash_tag_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweet_hash_tag" ADD CONSTRAINT "tweet_hash_tag_hash_tag_id_fkey" FOREIGN KEY ("hash_tag_id") REFERENCES "hash_tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
