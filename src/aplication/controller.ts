import { db } from "../infraestructure/conection.db";
import { uuidModel } from "../domain/models/uuid.model";
import { logsModel } from "../domain/models/logs.model";
import { eq } from "drizzle-orm";

export const handleNfcScan = async (uid: string) => {
    try {
        const users = await db.select().from(uuidModel).where(eq(uuidModel.uid, uid));
        
        const isAuthorized = users.length > 0;
        const message = isAuthorized ? `Acceso permitido para el usuario: ${users[0].nombre}` : `Acceso denegado para UID: ${uid}`;
        
        await db.insert(logsModel).values({
            id: crypto.randomUUID(),
            mensaje: message,
        });

        return {
            success: isAuthorized,
            message,
            user: isAuthorized ? users[0] : null
        };
    } catch (error) {
        console.error("Error al procesar el escaneo NFC:", error);
        return {
            success: false,
            message: "Error interno del servidor",
            error: error instanceof Error ? error.message : "Error desconocido"
        };
    }
};
