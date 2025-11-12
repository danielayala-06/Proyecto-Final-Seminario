const express = require('express')//Llamamos a express

const router = express.Router()//Enrutador

const prestamoController = require('../controllers/prestamosController')

router.get('/', prestamoController.getAllPrestamos)
router.get('/:doc_identidad', prestamoController.getPrestamosByDocument)
router.post('/', prestamoController.createPrestamo)
router.put('/:id', prestamoController.updatePrestamo)

module.exports = router