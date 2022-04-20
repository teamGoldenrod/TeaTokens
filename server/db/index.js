//this is the access point for all things database related!

const db = require("./db");
const Product = require("./models/Product");
const Order = require("./models/Order");
const User = require("./models/User");
const Orders_Products = require("./models/Orders_Products");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: Orders_Products });
Product.belongsToMany(Order, { through: Orders_Products });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Orders_Products,
  },
};
