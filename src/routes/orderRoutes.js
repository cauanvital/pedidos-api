import express from 'express';
import { orderController } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/list', orderController.listOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export default router;