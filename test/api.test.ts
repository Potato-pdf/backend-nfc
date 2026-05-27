import { describe, expect, test, mock } from "bun:test";

// Mock del controlador para evitar conectarse a la base de datos real durante pruebas de la API
mock.module("../src/aplication/controller", () => ({
    handleNfcScan: async (uid: string) => {
        if (uid === "VALID-UID-1234") {
            return { 
                success: true, 
                message: "Acceso permitido para el usuario: Test User", 
                user: { id: "0000-0000-0000-0000", uid: "VALID-UID-1234", nombre: "Test User", fechaCreacion: new Date().toISOString() } 
            };
        }
        return { success: false, message: `Acceso denegado para UID: ${uid}`, user: null };
    }
}));

import { appFetch } from "../index";

describe("NFC API Integracion C# - Pruebas", () => {
    
    test("POST /api/scan - UID valido debe devolver 200 y acceso permitido", async () => {
        const req = new Request("http://localhost/api/scan", {
            method: "POST",
            body: JSON.stringify({ uid: "VALID-UID-1234" })
        });
        
        const res = await appFetch(req);
        expect(res.status).toBe(200);
        
        const data = await res.json() as any;
        expect(data.success).toBe(true);
        expect(data.user).not.toBeNull();
        expect(data.user.nombre).toBe("Test User");
    });

    test("POST /api/scan - UID invalido debe devolver 403 y acceso denegado", async () => {
        const req = new Request("http://localhost/api/scan", {
            method: "POST",
            body: JSON.stringify({ uid: "UNKNOWN-UID" })
        });
        
        const res = await appFetch(req);
        expect(res.status).toBe(403);
        
        const data = await res.json() as any;
        expect(data.success).toBe(false);
        expect(data.user).toBeNull();
    });

    test("POST /api/scan - Falta UID en el body debe devolver 400", async () => {
        const req = new Request("http://localhost/api/scan", {
            method: "POST",
            body: JSON.stringify({ otherField: "test" })
        });
        
        const res = await appFetch(req);
        expect(res.status).toBe(400);
        
        const data = await res.json() as any;
        expect(data.error).toBe("UID es requerido");
    });

    test("POST /api/scan - JSON invalido debe devolver 400", async () => {
        const req = new Request("http://localhost/api/scan", {
            method: "POST",
            body: "invalid-json{"
        });
        
        const res = await appFetch(req);
        expect(res.status).toBe(400);
        
        const data = await res.json() as any;
        expect(data.error).toBe("Invalid JSON");
    });

    test("Ruta no encontrada - 404", async () => {
        const req = new Request("http://localhost/api/other-route", {
            method: "GET"
        });
        
        const res = await appFetch(req);
        expect(res.status).toBe(404);
    });
});
