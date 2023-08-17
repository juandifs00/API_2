const express = require('express');
const VehiculoControllers = require('../controllers/VehiculoControllers');

const router = express.Router();

router.get('/vehiculos', VehiculoControllers.obtener_vehiculos);
router.get('/vehiculo/:id', VehiculoControllers.obtener_vehiculos_id);
router.post('/vehiculos', VehiculoControllers.crear_vehiculo);
router.delete('/vehiculo/:id', VehiculoControllers.eliminar_vehiculo);
router.put('/vehiculo/:id', VehiculoControllers.actualizar_vehiculo);

module.exports = router;