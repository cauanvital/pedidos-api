import express from 'express';
import { authController } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     security: []  # <--- Indica que esta rota é PÚBLICA
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos (falta user ou pass)
 *       409:
 *         description: Usuário já existe
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login e retorna o Token JWT
 *     tags: [Auth]
 *     security: []  # <--- Indica que esta rota é PÚBLICA
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para usar nas rotas protegidas
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas (usuário ou senha incorretos)
 */
router.post('/login', authController.login);

export default router;