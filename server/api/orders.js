const router = require("express").Router();
const {
  models: { Order, Product, OrderProduct, User },
} = require("../db");
const { getUserHelper } = require("./utils");

// GET / api / users / userId / cart;
router.get("/:id/cart", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Order, where: { isCart: true }, include: { model: Product } },
      ],
    });
    if (!user) res.status(404).send("User does not exist");
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.use(getUserHelper);
/**
  req.body
  {
    prodId
  }
*/
router.post("/", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.body.prodId);
    const newOrder = await Order.create({ isCart: true, userId: req.user.id });
    await OrderProduct.update(
      { totalPrice: product.price, numItems: 1 },
      { where: { orderId: newOrder.id } }
    );
    await newOrder.addProduct(product);
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{ model: Product }],
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body, {
      include: {
        model: OrdeProduct,
      },
    });
    res.status(201).send(newOrder);
  } catch (err) {
    next(err);
  }
});

router.post("/checkout/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    order.update({
      complete: true,
      total: req.body.total,
    });
    const newOrder = await Order.create({
      userId: order.userId,
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
