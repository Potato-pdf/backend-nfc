import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/domain/models/**/*.model.ts",
    out: "./src/infraestructure/db/migrations",
    dbCredentials: {
        url: Bun.env.DATABASE_URL!,
    },
});