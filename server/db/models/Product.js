const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  description: { type: Sequelize.TEXT },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 50,
    validate: {
      isInt: true,
    },
  },
});

module.exports = Product;
