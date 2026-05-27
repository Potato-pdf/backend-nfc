import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const uuidModel = pgTable("usuarios_nfc", {
    id: uuid("id").primaryKey(),
    uid: varchar("uid", { length: 50 }).notNull().unique(),
    nombre: varchar("nombre", { length: 100 }).notNull(),
    fechaCreacion: timestamp("fecha_creacion", { mode: "date" }).defaultNow(),
});