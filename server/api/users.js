const router = require("express").Router();
const {
  models: { User, Order, Product },
} = require("../db");
const { isAdminHelper, getUserHelper } = require("./utils");

module.exports = router;

// GET /api/users
// all users (admin only)
router.use(getUserHelper, isAdminHelper);
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/userId
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Order });
    if (!user) {
      res.status(404).send("User does not exist");
    }
    res.json(user);
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
router.delete(":/id", async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    next(err);
  }
});
