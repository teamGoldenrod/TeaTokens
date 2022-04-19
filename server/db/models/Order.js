const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  isOrdered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
