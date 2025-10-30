
const db = require("../config/db");

exports.getAllPrestamos = async (req, res)=>{
    const sql = 'SELECT * FROM prestamos;'

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