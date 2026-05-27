import { db } from "../infraestructure/conection.db";
import { uuidModel } from "../domain/models/uuid.model";
import { logsModel } from "../domain/models/logs.model";
import { eq } from "drizzle-orm";
import type { NfcScanResponse, NfcKey } from "../domain/types/nfc.types";

export const handleNfcScan = async (uid: string): Promise<NfcScanResponse> => {
    try {
        console.log(`[SCAN] Procesando lectura de UID: ${uid}`);
        const keys = await db.select().from(uuidModel).where(eq(uuidModel.uid, uid));
        
        const isAuthorized = keys.length > 0;
        const message = isAuthorized ? `Acceso permitido para UID: ${uid}` : `Acceso denegado para UID: ${uid}`;
        
        console.log(isAuthorized ? `[ACCESO APROBADO] ${message}` : `[ACCESO RECHAZADO] ${message}`);
        
        await db.insert(logsModel).values({
            id: crypto.randomUUID(),
            mensaje: message,
        });

        let nfcKey = null;
        if (isAuthorized) {
            nfcKey = {
                ...keys[0],
                fechaCreacion: keys[0].fechaCreacion ? new Date(keys[0].fechaCreacion) : null
            };
        }

        return {
            success: isAuthorized,
            message,
            nfcKey
        };
    } catch (error) {
        console.error(`[ERROR] Fallo al procesar el escaneo NFC para UID ${uid}:`, error);
        return {
            success: false,
            message: "Error interno del servidor",
            nfcKey: null
        };
    }
};

export const registerNfcKey = async (uid: string) => {
    try {
        console.log(`[REGISTER] Intentando registrar nuevo UID: ${uid}`);
        
        const existing = await db.select().from(uuidModel).where(eq(uuidModel.uid, uid));
        if (existing.length > 0) {
            console.log(`[REGISTER] El UID ${uid} ya estaba registrado en el sistema.`);
            return { success: false, message: `El UID ${uid} ya está registrado.` };
        }

        await db.insert(uuidModel).values({
            id: crypto.randomUUID(),
            uid
        });

        console.log(`[REGISTER] UID ${uid} registrado exitosamente.`);
        return { success: true, message: `UID ${uid} registrado exitosamente.` };
    } catch (error) {
        console.error(`[ERROR] Fallo al registrar UID ${uid}:`, error);
        return { success: false, message: "Error interno al registrar UID" };
    }
};
