const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("order_product", {
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

module.exports = OrderProduct;
