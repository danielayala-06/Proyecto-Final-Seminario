
const express = require('express')

const router = express.Router()

const prestamoController = require('../controllers/prestamosController')

router.get('/', prestamoController.getAllPrestamos)

module.exports = router