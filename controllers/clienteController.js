const db = require('../config/db');

exports.getAllClientes = async (req, res)=>{
    const sql = "SELECT * FROM clientes ORDER BY id DESC"
    try {
        const [result] = await db.query(sql)

        if(!result || result == 0){
            return res.status(402).json({mensaje: 'No se enontraron registros'})
        }   
        return res.status(200).json(result)
    } catch (e) {
        console.error(e)
        return res.status(500).json({error: e})
    }   
}

exports.getClienteByDoc = async (req, res)=>{
    const {doc} = req.params
    const SQL = 'SELECT * FROM clientes WHERE doc_identidad LIKE ?'
    try {
        const [clientes] = await db.query(SQL, [`${doc}%`])
        if(!clientes || clientes.length === 0){
            return res.status(404).json({mensaje: "No se encontraron clientes"})
        }

        return res.status(290).json(clientes)
    } catch (e) {
        return res.status(500).json({error: e})
    }
}

exports.createCliente = async (req, res)=>{
    const {tipo_documento, doc_identidad, nombres, apellidos, direccion, genero, telefono} = req.body   
    const sql = "INSERT INTO clientes(tipo_documento, doc_identidad, nombres, apellidos, direccion, genero, telefono) VALUES(?, ?, ?, ?, ?, ?, ?)"

    try {
        //Validaciones
        if(!tipo_documento || !doc_identidad || !nombres || !apellidos || !direccion || !genero || !telefono){
            return res.status(404).json({error: 'No se aceptan valores vacios'})
        } 
        // Ejecutamos la consulta      
        const [result] = await db.query(sql, [tipo_documento, doc_identidad, nombres, apellidos, direccion, genero, telefono])
        if(!result || result.length == 0){
            return res.status(402).json({mensaje: 'No se encontraron registros'})
        }
        //En caso de exito Enviar mensaje de confirmación
        return res.status(200).json({
            mensaje: 'Cliente creado satisfcatoriamente',
            id: result.insertId
        })
    } catch (e) {
        return res.status(500).json({
            error: 'Error interno del servidor',
            e: e
        })
    }
    
}

exports.updateCliente = async (req, res)=>{ 
    const {id} = req.params
    const {tipo_documento, doc_identidad, nombres, apellidos, direccion, genero, telefono} = req.body

    //Validación => ES OBLIGATORIO QUE AL MENOS UNO TENGA DATOS
    if ( !tipo_documento && !doc_identidad && !nombres && !apellidos && !direccion && !genero && !telefono) {
        return res.status(400).json({
            mensaje:"Para actualizar debe de ingresar el campo con el valor a actualizar",
        });
    }

    //Algoritmo eficiente de actualización
    //NO SE HARÁ => UPDATE productos SET descripcion = ?, garantia = ?, precio = ? WHERE id = ?
    //SE DESARROLLARÁ => UPDATE productos SET precio = ? WHERE id = ?
    let sqlVars = {tipo_documento, doc_identidad, nombres, apellidos, direccion, genero, telefono}; //campos que sufrirán actualización
    let sqlParts = [];
    let values = []; //valores para los campos

    //Obtenemos las valores que se encuentran en el body
    Object.keys(sqlVars).map((key) => {
        if (!sqlVars[key]) {
            return;
        }
        sqlParts.push(`${key} = ?`); //Agregamos la clave a la consulta
        values.push(sqlVars[key]); //Agregamos el valor al query
        console.log(key);
        console.log(sqlVars[key]);
    });
    
    // En caso de que no haya campos para actualizar
    if (sqlParts.length == 0) {
      return res.status(400).json({ mensaje: "No hay datos por actualizar" });
    }

    // Construimos la consulta de manera dinámica
    values.push(id); // Agregamoe el ID al final de los valores

    const sql = `UPDATE clientes SET ${sqlParts.join(", ")} WHERE id = ?`;
    try {
        const [result] = await db.query(sql, values);

        /* Mensajes de errores */
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: `No encontramos el cliente con el ID ${id}` });
        }
        res.status(200).json({ mensaje: "Actualizado correctamente" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ mensaje: "Error interno en el servidor" });
    } 
}