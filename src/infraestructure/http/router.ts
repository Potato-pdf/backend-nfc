import { scanNfcController, registerNfcController } from "./nfc.controller";

export const handleRoutes = async (request: Request): Promise<Response> => {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/scan") {
        return scanNfcController(request);
    }

    if (request.method === "POST" && url.pathname === "/api/register") {
        return registerNfcController(request);
    }

    return new Response(JSON.stringify({ error: "Not Found" }), { 
        status: 404,
        headers: { "Content-Type": "application/json" } 
    });
};
