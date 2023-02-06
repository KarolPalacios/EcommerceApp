const {Router} = require("express");
const {createOrder, getAllOrders} = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/order/{id}/new:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: create a new order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: int
 *           minimum: 1
 *       description: user id
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: order created
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error
 * /api/v1/order/{id}/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns all orders created by user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: int
 *           minimum: 1
 *       description: user id
 *     responses:
 *       200:
 *         description: A list of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:
 *                     "username": "Michell"
 *                     "orders":
 *                     "total_price": 2000
 *                     "user_id": 2
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: something wrong
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.post("/:id/new", authMiddleware, createOrder);
router.get("/:id/all", authMiddleware, getAllOrders);

module.exports = router;