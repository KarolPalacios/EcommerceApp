const Sequelize = require('sequelize');
const bcrypt = requie("bcrypt");
module.exports = (sequelize, DataTypes) => {
  return users.init(sequelize, DataTypes);
}

/**
 * @openapi
 * components:
 *   schemas:
 *     register:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: Michell
 *         email:
 *           type: string
 *           example: michell@gmail.com
 *         password:
 *           type: string
 *           example: 87553
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: michell@gmail.com
 *         password:
 *           type: string
 *           example: 87553
 *     loginResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 3
 *         username:
 *           type: string
 *           example: Michell
 *         email:
 *           type: string
 *           example: michell@gmail.com
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg
 */

class users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "users_email_key"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        const {password} = user;
        const hash = bcrypt.hashSync(password, 10);
        user.password = hash;
      }
    }
  },
  {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
