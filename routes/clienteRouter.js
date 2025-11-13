const express = require('express')//Llamamos a express

const router = express.Router()//Enrutador

const clienteController = require('../controllers/clienteController')

router.get('/', clienteController.getAllClientes)
router.get('/:doc_identidad', clienteController.getClienteByDocumento)
router.post('/', clienteController.createCliente)
//router.put('/', clienteController.updateCliente)

module.exports = router