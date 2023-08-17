const express = require('express');
const ConcesionarioControllers = require('../controllers/ConcesionarioControllers');

const router = express.Router();

router.get('/concesionarios', ConcesionarioControllers.obtener_concesionarios);
router.get('/concesionario/:id', ConcesionarioControllers.obtener_concesionario_id);
router.post('/concesionarios', ConcesionarioControllers.crear_concesionario);
router.delete('/concesionario/:id', ConcesionarioControllers.eliminar_concesionario);
router.put('concesionario/:id', ConcesionarioControllers.actualizar_concesionario);

module.exports = router;