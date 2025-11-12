const express = require('express')

//Obtenemos los routers
const prestamoRouter = require('./routes/prestamoRouter')
const clienteRouter = require('./routes/clienteRouter')
const pagosRouter = require('./routes/pagosRouter')

const app = express()
const PORT = process.env.PORT || 3000 //Puerto de la App

//Definimos la comunicacion en JSON
app.use(express.json())
//Rutas para las API's
app.use('/api/prestamos', prestamoRouter)
app.use('/api/clientes', clienteRouter)
app.use('/api/pagos', pagosRouter)

//Iniciamos la aplicacion
app.listen(PORT, ()=>{
    console.log(`Server iniciado en http://localhost:${PORT}`)
})