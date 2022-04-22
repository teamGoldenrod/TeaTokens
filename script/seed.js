"use strict";

const {
  db,
  models: { User, Product, Order, OrderProduct },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users

  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      passwordConfirm: "123",
      email: "lalalala@lala.com",
    }),
    User.create({
      username: "murphy",
      password: "123",
      passwordConfirm: "123",
      email: "yoyo@yahoo.com",
    }),
    // User.create({
    //   username: "zack",
    //   password: "123",
    //   passwordConfirm: "123",
    //   email: "zack@yahoo.com",
    // }),
    // User.create({
    //   username: "moseby",
    //   password: "123",
    //   passwordConfirm: "123",
    //   email: "moseby@yahoo.com",
    // }),
    // User.create({
    //   username: "ashley",
    //   password: "123",
    //   passwordConfirm: "123",
    //   email: "ashley@yahoo.com",
    // }),
    // User.create({
    //   username: "cool",
    //   password: "123",
    //   passwordConfirm: "123",
    //   email: "coolstuff@yahoo.com",
    // }),
    // User.create({
    //   username: "awesome",
    //   password: "123",
    //   passwordConfirm: "123",
    //   email: "awesome@yahoo.com",
    // }),
    // User.create({
    //   username: "peter",
    //   password: "123",
    //   passwordConfirm: "123",
    //   email: "peter@yahoo.com",
    // }),
    // User.create({
    //   username: "parker",
    //   password: "123",
    //   passwordConfirm: "123",
    //   email: "parker@yahoo.com",
    // }),
    // User.create({
    //   username: "eddie",
    //   password: "123",
    //   passwordConfirm: "123",
    //   email: "brock@yahoo.com",
    // }),
    // User.create({
    //   username: "bla bla",
    //   password: "123",
    //   passwordConfirm: "123",
    //   email: "blabla@yahoo.com",
    // }),
    // User.create({
    //   username: "hi bla",
    //   password: "123",
    //   passwordConfirm: "123",
    //   email: "hibla@yahoo.com",
    // }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Green Tea",
      price: 1.99,
    }),
    Product.create({
      name: "Peppermint Tea",
      price: 2.99,
    }),
    Product.create({
      name: "Oolong Tea",
      price: 1.99,
    }),
    Product.create({
      name: "Black Tea",
      price: 2.99,
    }),
    Product.create({
      name: "Chamomile Tea",
      price: 2.99,
    }),
    Product.create({
      name: "White Tea",
      price: 1.99,
    }),
    Product.create({
      name: "Fermented Tea",
      price: 2.99,
    }),
    Product.create({
      name: "Fringe Tea",
      price: 1.99,
    }),
    Product.create({
      name: "Herbal Tea",
      price: 2.99,
    }),
    Product.create({
      name: "Pu-erh Tea",
      price: 2.99,
    }),
    Product.create({
      name: "Matcha Tea",
      price: 1.99,
    }),
    Product.create({
      name: "Artichoke Tea",
      price: 2.99,
    }),
    Product.create({
      name: "Barley Tea",
      price: 1.99,
    }),
    Product.create({
      name: "Moringa Tea",
      price: 2.99,
    }),
    Product.create({
      name: "Brown Rice Tea",
      price: 2.99,
    }),
    Product.create({
      name: "Chaga Tea",
      price: 1.99,
    }),
    Product.create({
      name: "Chai Tea",
      price: 2.99,
    }),
    Product.create({
      name: "Dandelion Tea",
      price: 1.99,
    }),
    Product.create({
      name: "Essiac Tea",
      price: 2.99,
    }),
    Product.create({
      name: "Hibiscus Tea",
      price: 2.99,
    }),
  ]);
  /*
  const orders = await Promise.all([
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: false }),
    Order.create({ isCart: false }),
    Order.create({ isCart: false }),
    Order.create({ isCart: false }),
    Order.create({ isCart: false }),
    Order.create({ isCart: false }),
  ]);
  */
  // generate random products
  // const giveMeRandomProducts = () => {
  //   const randomNum = () => Math.floor(Math.random() * (products.length - 10));
  //   let counter = 0;
  //   let idxAdded = {};
  //   while (counter < randomNum() + 1) {
  //     const randIdx = randomNum();
  //     if (idxAdded[randIdx]) continue;
  //     idxAdded[randIdx] = products[randIdx];
  //     counter++;
  //   }
  //   return Object.values(idxAdded);
  // };

  // for (let i = 0; i < orders.length; i++) {
  //   const randProducts = giveMeRandomProducts();
  //   for (let j = 0; j < randProducts.length; j++) {
  //     await orders[i].addProduct(randProducts[j], {
  //       through: { numItems: 1, totalPrice: randProducts[j].price },
  //     });
  //     const orderProduct = await OrderProduct.findOne({
  //       where: { orderId: orders[i].id, productId: randProducts[j].id },
  //     });
  //     await users[i].addOrder_product(orderProduct);
  //   }
  // }
  console.log(OrderProduct);
  // console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
