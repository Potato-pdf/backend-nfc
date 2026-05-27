import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "../conection.db";
import postgres from "postgres";

async function runMigrations() {
    console.log("Iniciando ejecución de migraciones...");
    try {
        await migrate(db, { migrationsFolder: "./src/infraestructure/db/migrations" });
        console.log("✅ Migraciones ejecutadas exitosamente.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error ejecutando migraciones:", error);
        process.exit(1);
    }
}

runMigrations();
