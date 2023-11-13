import express from 'express';
import indexRoutes from './routes/index.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import preguntasRoutes from './routes/preguntas.routes.js';
import contactoRoutes from './routes/contacto.routes.js';
import tarjetaRoutes from './routes/tarjeta.routes.js';
import tasaRoutes from './routes/tasas.routes.js';
import filialRoutes from './routes/filiales.routes.js';
import categoriaComercioRoutes from './routes/categoriaComercio.routes.js';
import promocionRoutes from './routes/promociones.routes.js';
import comercioRoutes from './routes/comercios.routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: "500mb" }))
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));

app.use(indexRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', preguntasRoutes);
app.use('/api', contactoRoutes);
app.use('/api', tarjetaRoutes);
app.use('/api', tasaRoutes);
app.use('/api', filialRoutes);
app.use('/api', categoriaComercioRoutes);
app.use('/api', promocionRoutes);
app.use('/api', comercioRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app;