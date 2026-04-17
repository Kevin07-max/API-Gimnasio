let modulo = "clientes";
let dataGlobal = [];

function cambiar(tipo){
    modulo = tipo;
    generarFormulario();
    listar();
}

function generarFormulario(){

    const f = document.getElementById("formulario");

    if(modulo === "clientes"){
        f.innerHTML = `
        <input type="hidden" id="id">
        <input id="Cedula" placeholder="Cédula">
        <input id="Nombre_Usuario" placeholder="Nombre">
        <input id="Telefono" placeholder="Teléfono">
        <input id="Correo" placeholder="Correo">`;
    }

    if(modulo === "gimnasios"){
        f.innerHTML = `
        <input type="hidden" id="id">
        <input id="Nombre" placeholder="Nombre">
        <input id="Direccion" placeholder="Dirección">
        <input id="Telefono" placeholder="Teléfono">
        <input id="capacidad" placeholder="Capacidad">`;
    }

    if(modulo === "paquetes"){
        f.innerHTML = `
        <input type="hidden" id="id">
        <input id="nombre" placeholder="Nombre">
        <input id="descripcion" placeholder="Descripción">
        <input id="precio" placeholder="Precio">
        <input id="duracion_dias" placeholder="Duración">`;
    }

    if(modulo === "entradas"){
        f.innerHTML = `
        <input type="hidden" id="id_entrada">

        <label>Cliente</label>
        <select id="id_clientes"></select>

        <label>Gimnasio</label>
        <select id="id_Gimnasio"></select>

        <label>Paquete</label>
        <select id="id_paquete"></select>

        <label>Fecha</label>
        <input id="fecha_entrada" type="date">

        <label>Tipo Pago</label>
        <input id="tipo_Pago" placeholder="Pago">`;

        cargarClientes();
        cargarGimnasios();
        cargarPaquetes();
    }
}

function listar(){

    fetch("http://localhost:3000/" + modulo)
    .then(r=>r.json())
    .then(data=>{

        dataGlobal = data;

        let thead = document.getElementById("thead");
        let tabla = document.getElementById("tabla");

        thead.innerHTML="";
        tabla.innerHTML="";

        if(!data || data.length === 0){
            tabla.innerHTML = "<tr><td colspan='5'>Sin datos</td></tr>";
            return;
        }

        let headers = Object.keys(data[0]);

        thead.innerHTML = `
        <tr>
            ${headers.map(h=>`<th>${h}</th>`).join("")}
            <th>Acciones</th>
        </tr>`;

        data.forEach(row=>{
            tabla.innerHTML += `
            <tr>
                ${headers.map(h => {

                    let valor = row[h];


                    if(h === "fecha_entrada" && valor){
                        valor = valor.split("T")[0];
                    }

                    return `<td>${valor}</td>`;

                }).join("")}
                <td>
                    <button onclick="editar(${row[headers[0]]})">✏️</button>
                    <button class="eliminar" onclick="eliminar(${row[headers[0]]})">❌</button>
                </td>
            </tr>`;
        });

    });

}

function crear(){

    let inputs = document.querySelectorAll("#formulario input, #formulario select");
    let data = {};

    inputs.forEach(i=>{

        if(i.id !== "id" && i.id !== "id_entrada"){

            if(i.id === "fecha_entrada"){
                data[i.id] = i.value; // ✅ corregido
            }else{
                data[i.id] = i.value;
            }

        }

    });

    fetch("http://localhost:3000/" + modulo,{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(data)
    })
    .then(()=>{

        limpiar();
        listar();

    });

}

function editar(id){

    let registro = dataGlobal.find(r => r[Object.keys(r)[0]] == id);

    if(modulo === "entradas"){
        document.getElementById("id_entrada").value = id;
    }else{
        document.getElementById("id").value = id;
    }

    for(let key in registro){

        let campo = document.getElementById(key);

        if(campo){
            campo.value = registro[key];
        }

    }

}

function actualizar(){

    let id;

    if(modulo === "entradas"){
        id = document.getElementById("id_entrada").value;
    }else{
        id = document.getElementById("id").value;
    }

    let inputs = document.querySelectorAll("#formulario input, #formulario select");
    let data = {};

    inputs.forEach(i=>{

        if(i.id !== "id" && i.id !== "id_entrada"){

            if(i.id === "fecha_entrada"){
                data[i.id] = i.value; // ✅ corregido
            }else{
                data[i.id] = i.value;
            }

        }

    });

    fetch("http://localhost:3000/" + modulo + "/" + id,{
        method:"PUT",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(data)
    })
    .then(()=>{

        limpiar();
        listar();

    });

}

function eliminar(id){

    if(confirm("¿Eliminar registro?")){

        fetch("http://localhost:3000/" + modulo + "/" + id,{
            method:"DELETE"
        })
        .then(()=>listar());

    }

}

function limpiar(){

    document.querySelectorAll("#formulario input").forEach(i => i.value="");
    document.querySelectorAll("#formulario select").forEach(i => i.selectedIndex=0);

}

async function cargarClientes(){

    const r = await fetch("http://localhost:3000/clientes");
    const data = await r.json();

    let select = document.getElementById("id_clientes");

    select.innerHTML = `<option value="">Seleccione...</option>`;

    data.forEach(c=>{
        select.innerHTML += `
        <option value="${c.id_clientes}">
        ${c.Nombre_Usuario}
        </option>`;
    });

}

async function cargarGimnasios(){

    const r = await fetch("http://localhost:3000/gimnasios");
    const data = await r.json();

    let select = document.getElementById("id_Gimnasio");

    select.innerHTML = `<option value="">Seleccione...</option>`;

    data.forEach(g=>{
        select.innerHTML += `
        <option value="${g.id_Gimnasio}">
        ${g.Nombre}
        </option>`;
    });

}

async function cargarPaquetes(){

    const r = await fetch("http://localhost:3000/paquetes");
    const data = await r.json();

    let select = document.getElementById("id_paquete");

    select.innerHTML = `<option value="">Seleccione...</option>`;

    data.forEach(p=>{
        select.innerHTML += `
        <option value="${p.id_paquete}">
        ${p.nombre}
        </option>`;
    });

}

window.onload = ()=>{
    generarFormulario();
    listar();
};