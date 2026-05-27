import { db } from "../infraestructure/conection.db";
import { uuidModel } from "../domain/models/uuid.model";
import { logsModel } from "../domain/models/logs.model";
import { eq } from "drizzle-orm";
import type { NfcScanResponse } from "../domain/types/nfc.types";

export const handleNfcScan = async (uid: string): Promise<NfcScanResponse> => {
    try {
        const users = await db.select().from(uuidModel).where(eq(uuidModel.uid, uid));
        
        const isAuthorized = users.length > 0;
        const message = isAuthorized ? `Acceso permitido para el usuario: ${users[0].nombre}` : `Acceso denegado para UID: ${uid}`;
        
        await db.insert(logsModel).values({
            id: crypto.randomUUID(),
            mensaje: message,
        });

        // Aseguramos que la fechaCreacion sea un objeto Date si viene como string desde DB
        let user = null;
        if (isAuthorized) {
            user = {
                ...users[0],
                fechaCreacion: users[0].fechaCreacion ? new Date(users[0].fechaCreacion) : null
            };
        }

        return {
            success: isAuthorized,
            message,
            user
        };
    } catch (error) {
        console.error("Error al procesar el escaneo NFC:", error);
        return {
            success: false,
            message: "Error interno del servidor",
            user: null
        };
    }
};
