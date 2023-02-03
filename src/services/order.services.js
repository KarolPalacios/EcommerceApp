const models = require("../models");

const {order, cart, products, products_in_cart, products_in_order} = models;

class OrderServices {
  static async createOrder(id) {
    try{
      const cartUser = await cart.findOne({
        where: {user_id: id}
      });
      const newOrder = { user_id: id, total_price: cartUser.total_price };
      const result = await order.create(newOrder);

      const cartArray = await products_in_cart.findAll({
        where: {
          cart_id: cartUser.id
        }
      });

      cartArray.forEach(async productArray => {
        const {product_id, quantity} = productArray;

        const product = await products.findOne({
          where: {
            id: productArray.product_id
          }
        });

        await products_in_order.create({ product_id, quantity, order_id: result.id, price: products.price });

        await products.update({
          avaliable_qty: product.avaliable_qty - productArray.quantity
        }, {
          where: {id: productArray.product_id}
        });

        await products_in_cart.destroy({
          where: {cart_id: cartUser.id}
        });
      });

      await cart.update({total_price: 0}, {where: {user_id: id}});

      return result;
    } catch {
      throw(error);
    }
  }

  static async allOrders(id) {
    try {
      const result = await users.findOne({
        where: {id},
        attributes: ["username"],
        include: {
          model: order,
          as: "orders"
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderServices;