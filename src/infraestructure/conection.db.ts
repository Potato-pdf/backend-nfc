import * as schema from "../domain/models/uuid.model";
import * as schemaLog from "../domain/models/logs.model";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const queryClient = postgres(Bun.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema: { ...schema, ...schemaLog } });