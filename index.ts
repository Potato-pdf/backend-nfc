import { db } from "./src/infraestructure/conection.db";
import { handleNfcScan } from "./src/aplication/controller";

const PORT = Bun.env.PORT || 3000;

const server = Bun.serve({
    port: PORT,
    async fetch(request: Request) {
        const url = new URL(request.url);
        
        if (request.method === "POST" && url.pathname === "/api/scan") {
            try {
                const body = await request.json();
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
        }

        return new Response("Not Found", { status: 404 });
    }
})

console.log(`Servidor corriendo en el puerto ${PORT}`);
