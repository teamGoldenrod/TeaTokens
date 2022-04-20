const router = require("express").Router();
const {
  models: { Product, Order },
} = require("../db");
module.exports = router;

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:productid
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Order });

    if (!product) {
      err.status(404).send("Product does not exist");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products
router.post("/", async (req, res, next) => {
  try {
    const addProduct = await Product.create(req.body);
    res.json(addProduct);
  } catch (err) {
    next(err);
  }
});
