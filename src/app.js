const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/clientes', require('./Rutas/clientesRoutes'));
app.use('/gimnasios', require('./Rutas/gimnasiosRoutes'));
app.use('/paquetes', require('./Rutas/paquetesRoutes'));
app.use('/entradas', require('./Rutas/entradasRoutes'));

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});