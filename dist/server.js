import 'dotenv/config'; // Carga de variables de .env
import { buildApp } from './app.js';
async function start() {
    const app = await buildApp();
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    try {
        await app.listen({ host: '0.0.0.0', port });
        app.log.info(`El servidor arrancó en http://localhost:${port}`);
    }
    catch (err) {
        app.log.fatal(err);
        process.exit(1);
    }
}
// Iniciar aplicación
start().catch((err) => {
    console.error(err);
    process.exit(1);
});
