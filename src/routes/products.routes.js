const {Router} = require("express");
const {
  getAllProducts,
  createProducts
} = require("../controllers/products.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/products/new:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: create a new product
 *     tags: [Products]
 *     requestBody:
 *       description: Required fields for create a new product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/newProduct"
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
 *                   example: product created
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: validation error
 * /api/v1/products/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns a list of products
 *     tags: [Products]
 *     description: List of all products
 *     responses:
 *       200:
 *         description: A list of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:
 *                     "id": 1
 *                     "name": "MackBook"
 *                     "price": 356
 *                     "available_qty": 30
 *                     "url_img": "www.img.com"
 *                     "username": "Michell"
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

router.get("/all", authMiddleware, getAllProducts);
router.post("/new", authMiddleware, createProducts);

module.exports = router;