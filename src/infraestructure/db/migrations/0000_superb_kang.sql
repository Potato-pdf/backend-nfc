CREATE TABLE "logs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"mensaje" varchar(255) NOT NULL,
	"fecha_creacion" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "nfc_keys" (
	"id" uuid PRIMARY KEY NOT NULL,
	"uid" varchar(50) NOT NULL,
	"fecha_creacion" timestamp DEFAULT now(),
	CONSTRAINT "nfc_keys_uid_unique" UNIQUE("uid")
);
