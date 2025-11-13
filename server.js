const express = require('express')

//Despliegue del frontend
const cors = require('cors') //Permisos sobre el contenido a desplegar
const path = require('path') //Express servir el frontend

const fs = require('fs').promises //Actualizado para la gestión de archivos

//Obtenemos los routers
const prestamoRouter = require('./routes/prestamoRouter')
const clienteRouter = require('./routes/clienteRouter')
const pagosRouter = require('./routes/pagosRouter')

const app = express()
const PORT = process.env.PORT || 3000 //Puerto de la App

/* Permisos cors */
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))


//Definimos la comunicacion en JSON
app.use(express.json())

//Servir los documentos HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')))
//Gestión de archivos
app.get(express.urlencoded({extended: true}))

//Ruteos > FRONT END
//http://localhost:3000 -> public>index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views/index.html'))//root
})
//Módulos del sistema (archivos HTML en public)
app.get('/clientes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views/cliente/clientes.html'))
})

app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'productos.html'))
})

app.get('/tiendas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tiendas.html'))
})

//Rutas para las API's
app.use('/api/prestamos', prestamoRouter)
app.use('/api/clientes', clienteRouter)
app.use('/api/pagos', pagosRouter)

//Iniciamos la aplicacion
app.listen(PORT, ()=>{
    console.log(`Server iniciado en http://localhost:${PORT}`)
})