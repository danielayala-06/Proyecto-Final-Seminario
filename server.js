const express = require('express')

//Obtenemos Las rutas
const prestamoRouter = require('./routes/prestamoRouter')

const app = express()
const PORT = process.env.PORT || 3000 //Puerto de la App

//Definimos la comunicacion en JSON
app.use(express.json())
//Rutas para las API's
app.use('/api/prestamos', prestamoRouter)

//Iniciamos la aplicacion
app.listen(PORT, ()=>{
    console.log(`Server iniciado en http://localhost:${PORT}`)
})