import { handleNfcScan } from "../../aplication/controller";
import type { NfcScanRequest } from "../../domain/types/nfc.types";

export const scanNfcController = async (request: Request): Promise<Response> => {
    try {
        const body = (await request.json()) as Partial<NfcScanRequest>;
        
        if (!body.uid) {
            return new Response(JSON.stringify({ error: "UID es requerido" }), { 
                status: 400, 
                headers: { "Content-Type": "application/json" } 
            });
        }
        
        const result = await handleNfcScan(body.uid);
        return new Response(JSON.stringify(result), { 
            status: result.success ? 200 : 403,
            headers: { "Content-Type": "application/json" } 
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), { 
            status: 400,
            headers: { "Content-Type": "application/json" } 
        });
    }
};
