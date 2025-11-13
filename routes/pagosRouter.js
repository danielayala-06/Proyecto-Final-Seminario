const express = require('express')//Llamamos a express

const router = express.Router()//Enrutador

const pagosController = require('../controllers/pagosController')

router.get('/', pagosController.getAllPagos)
router.post('/', pagosController.createPrestamo)
router.put('/:id', pagosController.updatePago)
//router.post('/', prestamoController.createPrestamo)

module.exports = router