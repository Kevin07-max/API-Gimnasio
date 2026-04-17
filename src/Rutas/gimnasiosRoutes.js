const router = require('express').Router();
const g = require('../Controladores/gimnasiosController');

router.get('/', g.listar);
router.post('/', g.crear);
router.put('/:id', g.actualizar);
router.delete('/:id', g.eliminar);

module.exports = router;