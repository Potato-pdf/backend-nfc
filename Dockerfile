# Usar la imagen oficial de Bun
FROM oven/bun:1 AS base

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json bun.lock ./

# Instalar las dependencias
RUN bun install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
# Ejecuta las migraciones primero y luego inicia el servidor
CMD bunx drizzle-kit push --config=src/infraestructure/db/drizzle.config.ts --force && bun run index.ts
