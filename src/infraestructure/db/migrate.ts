import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "../conection.db";
import postgres from "postgres";

import { sql } from "drizzle-orm";

async function runMigrations() {
    console.log("Iniciando ejecución de migraciones...");
    try {
        await migrate(db, { migrationsFolder: "./src/infraestructure/db/migrations" });
        console.log("✅ Migraciones ejecutadas exitosamente.");
        process.exit(0);
    } catch (error: any) {
        if (error.message?.includes('already exists') || error.code === '42P07') {
            console.log("⚠️ Detectado conflicto con tablas antiguas creadas por 'push'. Limpiando e intentando de nuevo...");
            await db.execute(sql`DROP TABLE IF EXISTS logs CASCADE;`);
            await db.execute(sql`DROP TABLE IF EXISTS usuarios_nfc CASCADE;`);
            await db.execute(sql`DROP TABLE IF EXISTS __drizzle_migrations CASCADE;`);
            
            console.log("Tablas antiguas limpias. Reintentando migración...");
            await migrate(db, { migrationsFolder: "./src/infraestructure/db/migrations" });
            console.log("✅ Migraciones ejecutadas exitosamente tras limpieza.");
            process.exit(0);
        } else {
            console.error("❌ Error ejecutando migraciones:", error);
            process.exit(1);
        }
    }
}

runMigrations();
