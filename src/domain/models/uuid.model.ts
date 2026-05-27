import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const uuidModel = pgTable("nfc_keys", {
    id: uuid("id").primaryKey(),
    uid: varchar("uid", { length: 50 }).notNull().unique(),
    fechaCreacion: timestamp("fecha_creacion", { mode: "date" }).defaultNow(),
});