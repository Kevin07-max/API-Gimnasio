const router = require('express').Router();
const p = require('../Controladores/paquetesController');

router.get('/', p.listar);
router.post('/', p.crear);
router.put('/:id', p.actualizar);
router.delete('/:id', p.eliminar);

module.exports = router;