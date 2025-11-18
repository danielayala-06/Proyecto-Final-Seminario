const db = require("../config/db");

exports.getAllPrestamos = async (req, res) => {
  const sql = "SELECT * FROM prestamos ORDER BY id DESC";

  try {
    const [result] = await db.query(sql);

    if (!result || result == 0) {
      return res.status(402).json({ mensaje: "No se enontraron registros" });
    }
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
};

exports.getPrestamosByDocument = async (req, res) => {
  const { doc_identidad } = req.params;

  const sql = `SELECT p.*, c.tipo_documento 
    FROM clientes c 
    LEFT JOIN prestamos p
    ON c.id = p.cliente WHERE doc_identidad = ?;`;

  try {
    if (!doc_identidad) {
      return res.status(400).json({
        mensaje: "Inserte el Documento de identificacion del usuario",
      });
    }

    const [result] = await db.query(sql, [doc_identidad]);

    if (!result || result == 0) {
      return res.status(402).json({ mensaje: "No se enontraron registros" });
    }

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
};

exports.createPrestamo = async (req, res) => {
  const { cliente, monto, plazo, interes, fecha_inicio } = req.body;
  const letra_cambio = "uploads/documento/cambio.pdf";

  //Calculamos la deuda inicial del prestamo
  const deuda = parseInt(monto) + parseInt(monto) * parseFloat(interes);

  //Validando el tipo de dato del monto y de los intereses
  if (typeof monto != "number" || typeof interes != "number") {
    return res.status(400).json({
      mensaje: "El monto y el interes ingresado debe ser una cantidad numerica",
    });
  }

  //Consulta SQL
  const sql =
    "INSERT INTO prestamos(cliente, monto, plazo, interes, fecha_inicio, letra_cambio, deuda) VALUES(?, ?, ?, ?, ?, ?, ?)";

  try {
    //Validaciones
    if (
      !cliente ||
      !monto ||
      !plazo ||
      !interes ||
      !fecha_inicio ||
      !letra_cambio ||
      !deuda
    ) {
      return res.status(404).json({ error: "No se aceptan valores vacios" });
    }

    if (deuda <= 0) {
      return res
        .status(400)
        .json({ mensaje: "La deuda no puede ser menor a 0" });
    }

    const [result] = await db.query(sql, [
      cliente,
      monto,
      plazo,
      interes,
      fecha_inicio,
      letra_cambio,
      deuda,
    ]);

    if (!result || result.length == 0) {
      return res.status(402).json({ mensaje: "No se encontraron registros" });
    }

    //En caso de exito Enviar mensaje de confirmación
    return res.status(200).json({
      mensaje: "Prestamos creado satisfcatoriamente",
      id: result.insertId,
    });
  } catch (e) {
    console.error(e);
  }
};

exports.updatePrestamo = async (req, res) => {
  const { id } = req.params;

  const {cliente,monto,intereses,plazo,fecha_inicio,letra_cambio,estado} = req.body;

  //En caso de que no haya datos para actualizar
  if (!cliente &&!monto &&!intereses &&!plazo &&!fecha_inicio &&!letra_cambio &&!estado) {
    return res.status(400).json({mensaje:"Para actualizar debe de ingresar el campo con el valor a actualizar",});
  }

  //Algoritmo eficiente de actualización
  let sqlVars = {cliente,monto,intereses,plazo,fecha_inicio,letra_cambio,estado}; //campos que sufrirán actualización
  let sqlParts = [];
  let values = []; //valores para los campos

  //Obtenemos las claves que se encuentra en el objeto values
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
  if (sqlParts.length === 0) {
    return res.status(400).json({ mensaje: "No hay datos por actualizar" });
  }

  values.push(id);//Agregamos el id del cliente

  // Construimos la consulta de manera dinámica
  const sql = `UPDATE prestamos SET ${sqlParts.join(", ")} WHERE id = ?`;

  try {
      const [result] = await db.query(sql, values);

      /* No haya registros afectados */
      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: `No encontramos el prestamo con el ID ${id}` });
      }
      /* Mensaje de exito */
      res.status(200).json({ mensaje: "Actualizado correctamente" });
      
    } catch (e) {
      console.error(e);
      res.status(500).json({ mensaje: "Error interno en el servidor" });
  } 
  
};

/* exports.updatePrestamoByDocument = async (req, res) => {
  const { doc_identidad } = req.params;

  const sql = `UPDATE prestamos p JOIN clientes c ON p.cliente = c.id SET p.estado = 'pagado' WHERE c.doc_identidad = ?;`;
  try {
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
 */