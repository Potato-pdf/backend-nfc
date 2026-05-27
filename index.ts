import { handleRoutes } from "./src/infraestructure/http/router";

// Nos aseguramos de tener un fallback si Bun.env.PORT es undefined
const PORT = Bun.env.PORT || 3000;

export const appFetch = async (request: Request) => {
    return handleRoutes(request);
};

if (process.env.NODE_ENV !== "test") {
    Bun.serve({
        port: PORT,
        fetch: appFetch
    });
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}
