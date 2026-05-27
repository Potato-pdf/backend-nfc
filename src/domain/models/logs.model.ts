import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const logsModel = pgTable("logs", {
    id: uuid("id").primaryKey(),
    mensaje: varchar("mensaje", { length: 255 }).notNull(),
    fechaCreacion: timestamp("fecha_creacion", { mode: "date" }).defaultNow()
});