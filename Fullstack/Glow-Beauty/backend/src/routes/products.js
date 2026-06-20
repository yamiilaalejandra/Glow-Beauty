const { Router } = require('express');
const ctrl = require('../controllers/productController');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = Router();

router.get('/search', ctrl.search);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', adminMiddleware, ctrl.create);
router.put('/:id', adminMiddleware, ctrl.update);
router.delete('/:id', adminMiddleware, ctrl.remove);

module.exports = router;
