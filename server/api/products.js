const router = require("express").Router();
const {
  models: { Product, Order },
} = require("../db");
const isAdminHelper = require("./isAdminHelper");
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

// GET /api/products/:productId
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).send("Product does not exist");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products
router.post("/", isAdminHelper, async (req, res, next) => {
  try {
    const addProduct = await Product.create(req.body);
    res.json(addProduct);
  } catch (err) {
    next(err);
  }
});

//PUT /api/products/:productId
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(await product.update(req.body));
  } catch (err) {
    next(err);
  }
});

//DELETE /api/products/:productId
// this returns 1 in postman, and deletes off database
router.delete("/:id", isAdminHelper, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
      // include: { model: Order },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
