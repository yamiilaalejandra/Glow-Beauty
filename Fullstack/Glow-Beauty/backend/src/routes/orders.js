const { Router } = require('express');
const ctrl = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = Router();

router.post('/', authMiddleware, ctrl.create);
router.get('/', adminMiddleware, ctrl.getAll);
router.delete('/:id', adminMiddleware, ctrl.remove);
router.patch('/:id/status', adminMiddleware, ctrl.updateStatus);

module.exports = router;
