const router = require('express').Router();
const e = require('../Controladores/entradasController');

router.get('/', e.listar);
router.post('/', e.crear);
router.put('/:id', e.actualizar);
router.delete('/:id', e.eliminar);

module.exports = router;