const express = require('express')//Llamamos a express

const router = express.Router()//Enrutador

const pagosController = require('../controllers/pagosController')

router.get('/', pagosController.getAllPagos)
//router.get('/:doc_identidad', prestamoController.getPrestamosByDocument)
//router.post('/', prestamoController.createPrestamo)
//router.put('/:id', prestamoController.updatePrestamo)

module.exports = router