// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import route modules
const indexRoutes = require('./routes/index.routes.js');
const usuariosRoutes = require('./routes/usuarios.routes.js');
const preguntasRoutes = require('./routes/preguntas.routes.js');
const contactoRoutes = require('./routes/contacto.routes.js');
const tarjetaRoutes = require('./routes/tarjeta.routes.js');
const tasaRoutes = require('./routes/tasas.routes.js');
const filialRoutes = require('./routes/filiales.routes.js');
const categoriaComercioRoutes = require('./routes/categoriaComercio.routes.js');
const promocionRoutes = require('./routes/promociones.routes.js');
const promocionesEspecialesRoutes = require('./routes/promocionesEspeciales.routes.js');
const habilitarFuncionesRoutes = require('./routes/habilitarFuncion.routes.js');
const comercioRoutes = require('./routes/comercios.routes.js');
const costoFinancieroRoutes = require('./routes/costoFinanciero.routes.js');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));

// Use route modules
app.use(indexRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', preguntasRoutes);
app.use('/api', contactoRoutes);
app.use('/api', tarjetaRoutes);
app.use('/api', tasaRoutes);
app.use('/api', filialRoutes);
app.use('/api', categoriaComercioRoutes);
app.use('/api', promocionRoutes);
app.use('/api', promocionesEspecialesRoutes);
app.use('/api', habilitarFuncionesRoutes);
app.use('/api', comercioRoutes);
app.use('/api', costoFinancieroRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

module.exports = app;
