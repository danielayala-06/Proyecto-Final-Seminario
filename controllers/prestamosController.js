
const db = require("../config/db");

exports.getAllPrestamos = async (req, res)=>{
    const sql = "SELECT * FROM prestamos"

    try {
        const [result] = await db.query(sql)
        
        if(!result){
            return res.status(402).json({mensaje: 'No se enontraron registros'})
        }
        return res.status(200).json(result)

    } catch (e) {
        console.error(e)
        return res.status(500).json({error: e})
    }
}

exports.getPrestamosByDNI = async (req, res)=>{
    const {dni} = req.params;

    const sql = "SELECT * FROM prestamos WHERE dni_cliente = ? "

    try {
        if(!dni){
            return res.status(400).json({mensaje:'Inserte el DNI del usuario'})
        }

        const [result] = await db.query(sql)
        
        if(!result){
            return res.status(402).json({mensaje: 'No se enontraron registros'})
        }

        return res.status(200).json(result)
    } catch (e) {
        console.error(e)
        return res.status(500).json({error: e})
    }
}

exports.createPrestamo = async (req, res)=>{
    const {dni_cliente, monto, plazo, interes, fecha_inicio, estado} = req.body
    const letra_cambio = 'uploads/file/cambio.pdf'

    try {
        
    } catch (e) {
        console.error(e)
    }
}