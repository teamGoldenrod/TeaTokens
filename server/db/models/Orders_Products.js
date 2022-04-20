const Sequelize = require("sequelize");
const db = require("../db");

const Orders_Products = db.define("orders_products", {
  numItems: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
});

module.exports = Orders_Products;
