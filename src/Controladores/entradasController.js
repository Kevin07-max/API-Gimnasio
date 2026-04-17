const db = require('../Config/db');

exports.listar = (req,res)=>{
    db.query("SELECT * FROM entradas",(err,data)=>{
        if(err) return res.json(err);
        res.json(data);
    });
};

exports.crear = (req,res)=>{
    const { id_Gimnasio, id_clientes, id_paquete, fecha_entrada, tipo_Pago } = req.body;

    db.query(
        "INSERT INTO entradas (id_Gimnasio,id_clientes,id_paquete,fecha_entrada,tipo_Pago) VALUES (?,?,?,?,?)",
        [id_Gimnasio,id_clientes,id_paquete,fecha_entrada,tipo_Pago],
        ()=> res.send("creado")
    );
};

exports.actualizar = (req,res)=>{
    const { id } = req.params;
    const { id_Gimnasio, id_clientes, id_paquete, fecha_entrada, tipo_Pago } = req.body;

    db.query(
        "UPDATE entradas SET id_Gimnasio=?,id_clientes=?,id_paquete=?,fecha_entrada=?,tipo_Pago=? WHERE id_entrada=?",
        [id_Gimnasio,id_clientes,id_paquete,fecha_entrada,tipo_Pago,id],
        ()=> res.send("actualizado")
    );
};

exports.eliminar = (req,res)=>{
    db.query(
        "DELETE FROM entradas WHERE id_entrada=?",
        [req.params.id],
        ()=> res.send("eliminado")
    );
};