# Yoga GraphQL API (Test)

Esta es una API robusta y escalable desarrollada con **Node.js, Fastify, Yoga-GraphQL y Prisma**.

## Requisitos

- Node.js v24+
- Docker y Docker Compose (para levantar la base de datos PostgreSQL)

## Configuración del Entorno

1. Copiar y verificar las env vars:
El archivo \`.env\` ya contiene la cadena de conexión por defecto adecuada para el contenedor de docker-compose.
Asegúrate de tener un \`JWT_SECRET\` seguro en producción.

2. Levantar la base de datos de desarrollo:
\`\`\`bash
docker-compose up -d
\`\`\`

3. Instalar dependencias e Inicializar Prisma:
\`\`\`bash
npm install
npx prisma migrate dev --name init
npx prisma generate
\`\`\`

## Ejecutar el Servidor

Modo Desarrollo (con recarga automática):
\`\`\`bash
npm run dev
\`\`\`

Modo Producción:
\`\`\`bash
npm run build
npm start
\`\`\`

## Características

- Base de datos **PostgreSQL** mediante **Prisma ORM**.
- Autenticación con **JWT** y encriptación de contraseñas usando **Argon2**.
- Validación de datos rápida y tipada con **Zod**.
- Soporte para la subida de archivos (imágenes jpg/png) usando el scalar nativo \`File\`.
- Soporte de subscripciones usando Graphql-Yoga.

Servidor disponible en: \`http://localhost:4000/graphql\`
