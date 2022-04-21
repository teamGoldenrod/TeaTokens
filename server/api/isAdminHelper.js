const {
  models: { User },
} = require("../db");

const isAdminHelper = async (req, res, next) => {
  const user = await User.findByToken(req.headers.authorization);
  if (!user) next(new Error("No user found."));
  if (user && user.role === "admin") {
    next();
  } else {
    const err = new Error("Access denied - you are not an admin");
    err.status = 404;
    next(err);
  }
};

module.exports = isAdminHelper;
