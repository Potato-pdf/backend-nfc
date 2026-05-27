import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/domain/models/**/*.model.ts",
    out: "./src/infraestructure/db/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});