const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return products.init(sequelize, DataTypes);
}

/**
 * @openapi
 * components:
 *   schemas:
 *     newProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: MackBook
 *         price:
 *           trype: int
 *           example: 356
 *         avaliable_qty:
 *           type: int
 *           example: 30
 *         url_img:
 *           type: string
 *           example: www.img.com
 *         user_id:
 *           type: int
 *           example: 3
 */

class products extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    avaliable_qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url_img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
