import express from 'express';
import { orderController } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Order already exists
 */
router.post('/', orderController.createOrder);

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Retorna a lista de todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: List all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/list', orderController.listOrders);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Busca um pedido pelo número
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O número do pedido
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.get('/:id', orderController.getOrderById);

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Atualiza um pedido existente
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O número do pedido para atualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated
 *       404:
 *         description: Order not found
 */
router.put('/:id', orderController.updateOrder);

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Remove um pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O número do pedido para deletar
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete('/:id', orderController.deleteOrder);

export default router;