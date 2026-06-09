import express from 'express'
import fs from 'fs'
import path from 'path'
import cancionesRoutes from './routes/canciones.routes.js'
import db from './models/db.js'
import './models/cancion.model.js'
import authRoutes from './routes/auth.routes.js'

const port = process.env.PORT || 3000

const app = express()

const logger = (req, res, next) => {
    const log = (`${new Date().toLocaleString()} - ${req.method} en ${req.url} \n`);
    const ruta = path.join(import.meta.dirname, 'log.txt');
    fs.writeFileSync(ruta, log, { flag: 'a' });
    next();
};

const validarApiKey = (req, res, next) => {
    const apiKey = req.query.key;

    if (apiKey === '12345') {
        next();
    } else {
        res.status(403).send('Acceso Prohibido: API Key inválida');
    }
};

app.use(express.json())
app.use(logger)
app.use(validarApiKey)

app.use('/auth', authRoutes)
app.use('/canciones', cancionesRoutes)

try {
    await db.authenticate();
    console.log('Conexión con PostgreSQL establecida correctamente.');

    await db.sync();
    console.log('Modelos sincronizados.');

    app.listen(port, () => {
        console.log(`Servicio iniciado en puerto ${port}`);
    });

} catch (error) {
    console.error('Error al inicializar la base de datos:', error);
}