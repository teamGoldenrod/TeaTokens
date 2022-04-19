//this is the access point for all things database related!

const db = require("./db");
const Product = require("./models/Product");
const Order = require("./models/Order");
const User = require("./models/User");

//associations could go here!
User.hasMany(Order, { as: "order", foreignKey: "userId" });
User.hasOne(Order, { as: "cart", foreignKey: "userId" });
Order.belongsTo(User);

Order.hasMany(Product, { as: "product" });

Product.belongsTo(Order, { as: "cart" });
Product.belongsTo(Order, { as: "order" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
  },
};
