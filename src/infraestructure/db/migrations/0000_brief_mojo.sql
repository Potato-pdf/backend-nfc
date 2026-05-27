CREATE TABLE "logs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"mensaje" varchar(255) NOT NULL,
	"fecha_creacion" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "usuarios_nfc" (
	"id" uuid PRIMARY KEY NOT NULL,
	"uid" varchar(50) NOT NULL,
	"nombre" varchar(100) NOT NULL,
	"fecha_creacion" timestamp DEFAULT now(),
	CONSTRAINT "usuarios_nfc_uid_unique" UNIQUE("uid")
);
