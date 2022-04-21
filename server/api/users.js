const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
const isAdminHelper = require("./isAdminHelper");

module.exports = router;

// GET /api/users
// all users (admin only)
router.get("/", isAdminHelper, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId
router.get("/:id", isAdminHelper, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Order });
    if (!user) {
      err.status(404).send("User does not exist");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId/cart
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

// POST /api/users
router.post("/"),
  async (req, res, next) => {
    try {
      const addUser = await User.create(req.body);
      res.json(addUser);
    } catch (err) {
      next(err);
    }
  };

// PUT /api/users/:userId
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/:userId
router.delete(":/id", isAdminHelper, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
      include: { model: Order },
    });
  } catch (err) {
    next(err);
  }
});
