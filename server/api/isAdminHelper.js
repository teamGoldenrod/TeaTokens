const isAdminHelper = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    const err = new Error("Access denied - you are not an admin");
    error.status = 404;
    next(error);
  }
};

module.exports = isAdminHelper;
