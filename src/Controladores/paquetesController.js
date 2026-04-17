const db = require('../Config/db');

exports.listar = (req,res)=>{
    db.query("SELECT * FROM paquetes",(err,data)=>{
        if(err) return res.json(err);
        res.json(data);
    });
};

exports.crear = (req,res)=>{
    const { nombre, descripcion, precio, duracion_dias } = req.body;

    db.query(
        "INSERT INTO paquetes (nombre,descripcion,precio,duracion_dias) VALUES (?,?,?,?)",
        [nombre,descripcion,precio,duracion_dias],
        ()=> res.send("creado")
    );
};

exports.actualizar = (req,res)=>{
    const { id } = req.params;
    const { nombre, descripcion, precio, duracion_dias } = req.body;

    db.query(
        "UPDATE paquetes SET nombre=?,descripcion=?,precio=?,duracion_dias=? WHERE id_paquete=?",
        [nombre,descripcion,precio,duracion_dias,id],
        ()=> res.send("actualizado")
    );
};

exports.eliminar = (req,res)=>{
    db.query(
        "DELETE FROM paquetes WHERE id_paquete=?",
        [req.params.id],
        ()=> res.send("eliminado")
    );
};