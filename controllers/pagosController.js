const db = require("../config/db");

exports.getAllPagos = async (req, res)=>{
    const sql = "SELECT * FROM pagos ORDER BY id DESC"

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
exports.createPrestamo = async (req, res)=>{
    const {id_prestamo, monto_amortizado, fecha_pago, saldo_pendiente, metodo_pago, comprobante_pago} = req.body

    const sql = "INSERT INTO pagos(id_prestamo, monto_amortizado, fecha_pago, saldo_pendiente, metodo_pago, comprobante_pago) VALUES(?, ?, ?, ?, ?, ?)" 
    //Calculamos la deuda inicial del prestamo
    //const deuda = parseInt(monto) + parseInt(monto) * parseFloat(interes)
    //Validando el tipo de dato del monto y de los intereses

    try {
        //Validaciones
        if(!id_prestamo || !monto_amortizado || !fecha_pago || !saldo_pendiente || !metodo_pago || !comprobante_pago){
            return res.status(404).json({error: 'No se aceptan valores vacios'})
        }
       
        const [result] = await db.query(sql, [cliente, monto, plazo, interes, fecha_inicio, letra_cambio, deuda])
        
        if(!result || result.length == 0){
            return res.status(402).json({mensaje: 'No se logro insertar el pago registros'})
        }

        //En caso de exito Enviar mensaje de confirmación
        return res.status(200).json({
            mensaje: 'Pago Registrado satisfcatoriamente',
            id: result.insertId
        })

    } catch (e) {
        console.error(e)
    }
}

exports.updatePago = async(req, res)=>{
    const {id} = req.params
    const {id_prestamo, monto_amortizado, fecha_pago, saldo_pendiente, metodo_pago, comprobante_pago} = req.body

     //Validación => ES OBLIGATORIO QUE AL MENOS UNO TENGA DATOS
    if ( !id_prestamo && !monto_amortizado && !fecha_pago && !saldo_pendiente && !metodo_pago && !comprobante_pago) {
        return res.status(400).json({
            mensaje:"Para actualizar debe de ingresar el campo con el valor a actualizar",
        });
    }

    //Algoritmo eficiente de actualización
    //NO SE HARÁ => UPDATE productos SET descripcion = ?, garantia = ?, precio = ? WHERE id = ?
    //SE DESARROLLARÁ => UPDATE productos SET precio = ? WHERE id = ?
    let sqlVars = {id_prestamo, monto_amortizado, fecha_pago, saldo_pendiente, metodo_pago, comprobante_pago}; //campos que sufrirán actualización
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

    const sql = `UPDATE pagos SET ${sqlParts.join(", ")} WHERE id = ?`;
    try {
        const [result] = await db.query(sql, values);

        /* Mensajes de errores */
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: `No encontramos el pago con el ID ${id}` });
        }
        res.status(200).json({ mensaje: "Actualizado correctamente" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ mensaje: "Error interno en el servidor" });
    } 
}

/* exports.updatePagoBy = async(req, res)=>{
    const {doc_identidad} = req.params

    //const sql = `UPDATE prestamos p JOIN clientes c ON p.cliente = c.id SET p.estado = 'pagado' WHERE c.doc_identidad = ?;`
    try {
        
    } catch (e) {
        return res.status(500).json({error: e})
    }

} */