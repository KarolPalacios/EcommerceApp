const models = require("../models");
const {Op} = require("sequelize");

const {products, users} = models;

class ProductServices {
  static async getAll() {
    try {
      const result = await products.findAll({
        where: {
          available_qty: {[Op.gt]: 0}
        },
        attributes: {
          exclude: ["user_id"]
        },
        include: {
          model: users,
          as: "user",
          attributes: ["username"]
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(product) {
    try {
      const result = await products.create(product);
      return result;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = ProductServices;