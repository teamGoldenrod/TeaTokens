const isAdminHelper = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    const err = new Error("Access denied - you are not an admin");
    err.status = 404;
    next(err);
  }
};

module.exports = isAdminHelper;
