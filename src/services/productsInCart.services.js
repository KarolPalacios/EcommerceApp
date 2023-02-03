const models = require("../models");

const {products_in_cart, cart, products, users} = models;

class ProductsInCartServices {

  static async addProduct(productInCart){
    try {
      const result = await products_in_cart.create(productInCart);
      const product = await products.findOne({
        where: {
          id: productInCart.products_id
        }
      });
      await cart.update({ total_pricee: product.price * productInCart.quantity }, {
        where: {
          id: productInCart.cart_id
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async allProductsInCart(id) {
    try {
      const result = await users.findOne({
        where: {id},
        attributes: ["username"],
        include: {
          model: cart,
          as: "carts",
          attributes: ["total_price"],
          include: {
            model: products_in_cart,
            as: "products_in_carts",
            attributes: {exclude: ["id", "cart_id"]}
          }
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = ProductsInCartServices;