const {Router} = require("express");
const {
  addProduct,
  getAllProductsInCart
} = require("../controllers/productsInCart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/cart/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: add products to cart
 *     tags: [Cart]
 *     requestBody:
 *       description: Required fields for add a product to the cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/add"
 *     responses:
 *       200:
 *         description: added product to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: added product
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
 * /api/v1/cart/{id}/productsInCart:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns a list of all products in cart
 *     tags: [Products]
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
 *         description: A list of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:
 *                     "username": "Michell"
 *                     "carts":
 *                     "total_price": 0
 *                     "products_in_cart":
 *                     "product_id": 2
 *                     "quantity": 3
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

router.post("/add", authMiddleware, addProduct);
router.get("/:id/products", authMiddleware, getAllProductsInCart);

module.exports = router;