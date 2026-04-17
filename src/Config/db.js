const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gimnasio-mejorado'
});

conexion.connect(err => {
    if (err) {
        console.log("Error de conexión:", err);
    } else {
        console.log("DB conectada correctamente");
    }
});

module.exports = conexion;