const db = require('../Config/db');

exports.listar = (req,res)=>{
    db.query("SELECT * FROM gimnasios",(err,data)=>{
        if(err) return res.json(err);
        res.json(data);
    });
};

exports.crear = (req,res)=>{
    const { Nombre, Direccion, Telefono, capacidad } = req.body;

    db.query(
        "INSERT INTO gimnasios (Nombre,Direccion,Telefono,capacidad) VALUES (?,?,?,?)",
        [Nombre,Direccion,Telefono,capacidad],
        ()=> res.send("creado")
    );
};

exports.actualizar = (req,res)=>{
    const { id } = req.params;
    const { Nombre, Direccion, Telefono, capacidad } = req.body;

    db.query(
        "UPDATE gimnasios SET Nombre=?,Direccion=?,Telefono=?,capacidad=? WHERE id_Gimnasio=?",
        [Nombre,Direccion,Telefono,capacidad,id],
        ()=> res.send("actualizado")
    );
};

exports.eliminar = (req,res)=>{
    db.query(
        "DELETE FROM gimnasios WHERE id_Gimnasio=?",
        [req.params.id],
        ()=> res.send("eliminado")
    );
};