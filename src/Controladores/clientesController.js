const db = require('../Config/db');

exports.listar = (req,res)=>{
    db.query("SELECT * FROM clientes",(err,data)=>{
        if(err) return res.json(err);
        res.json(data);
    });
};

exports.crear = (req,res)=>{
    const { Cedula, Nombre_Usuario, Telefono, Correo } = req.body;

    db.query(
        "INSERT INTO clientes (Cedula,Nombre_Usuario,Telefono,Correo) VALUES (?,?,?,?)",
        [Cedula,Nombre_Usuario,Telefono,Correo],
        (err)=> res.send(err || "cliente creado")
    );
};

exports.actualizar = (req,res)=>{
    const { id } = req.params;
    const { Cedula, Nombre_Usuario, Telefono, Correo } = req.body;

    db.query(
        "UPDATE clientes SET Cedula=?,Nombre_Usuario=?,Telefono=?,Correo=? WHERE id_clientes=?",
        [Cedula,Nombre_Usuario,Telefono,Correo,id],
        ()=> res.send("actualizado")
    );
};

exports.eliminar = (req,res)=>{
    db.query(
        "DELETE FROM clientes WHERE id_clientes=?",
        [req.params.id],
        ()=> res.send("eliminado")
    );
};