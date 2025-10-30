
const express = require('express')//Llamamos a express

const router = express.Router()//Enrutador

const prestamoController = require('../controllers/prestamosController')

router.get('/', prestamoController.getAllPrestamos)

module.exports = router