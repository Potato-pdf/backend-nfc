import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "../conection.db";
import { sql } from "drizzle-orm";

async function runMigrations() {
    console.log("[MIGRATE] Iniciando ejecución de migraciones...");
    try {
        // Limpiar tablas antiguas creadas por 'drizzle-kit push' que no tienen historial de migración
        console.log("[MIGRATE] Limpiando tablas anteriores si existen...");
        await db.execute(sql`DROP TABLE IF EXISTS logs CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS usuarios_nfc CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS nfc_keys CASCADE`);
        await db.execute(sql`DROP SCHEMA IF EXISTS drizzle CASCADE`);
        console.log("[MIGRATE] Limpieza completada.");

        await migrate(db, { migrationsFolder: "./src/infraestructure/db/migrations" });
        console.log("[MIGRATE] ✅ Migraciones ejecutadas exitosamente.");
        process.exit(0);
    } catch (error) {
        console.error("[MIGRATE] ❌ Error ejecutando migraciones:", error);
        process.exit(1);
    }
}

runMigrations();
