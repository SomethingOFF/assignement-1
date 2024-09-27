const ErrorHander = require("../utils/ErroHandler");
const AsyncError = require("./async-error");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

exports.isAuthenticatedUser = AsyncError(async (req, res, next) => {
  const { auth } = req.cookies;
  if (!auth) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const data = jwt.verify(auth, process.env.SECRET_KEY);
  req.user = await UserModel.findById(data.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          400
        )
      );
    }

    next();
  };
};
