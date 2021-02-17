set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "Users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Post" (
	"postId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"tags" jsonb NOT NULL,
	"content" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "Post_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Comments" (
	"commentId" serial NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"content" TEXT NOT NULL,
	CONSTRAINT "Comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "likes" (
	"userId" integer NOT NULL,
	"postId" integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Post" ADD CONSTRAINT "Post_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");

ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk1" FOREIGN KEY ("postId") REFERENCES "Post"("postId");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("postId") REFERENCES "Post"("postId");
