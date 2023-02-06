const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return products_in_cart.init(sequelize, DataTypes);
}

/**
 * @openapi
 * components:
 *   schemas:
 *     add:
 *       type: object
 *       properties:
 *         cart_id:
 *           type: int
 *           example: 3
 *         product_id:
 *           type: int
 *           example: 4
 *         quantity:
 *           type: int
 *           example: 2
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

class products_in_cart extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cart',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'products_in_cart',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_in_cart_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
