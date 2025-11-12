const express = require('express')//Llamamos a express

const router = express.Router()//Enrutador

const clienteController = require('../controllers/clienteController')

router.get('/', clienteController.getAllClientes)

// router.get('/:doc_identidad', prestamoController.getPrestamosByDocument)
// router.post('/', prestamoController.createPrestamo)
// router.put('/:id', prestamoController.updatePrestamo)

module.exports = router