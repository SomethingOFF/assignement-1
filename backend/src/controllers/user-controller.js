const ErrorHandler = require("../utils/ErroHandler");
const AsyncError = require("../middlewares/async-error");
const UserModel = require("../models/user-model");
const userModel = require("../models/user-model");
const sendToken = require("../utils/sendToken.js");

exports.registerUser = AsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    return next(new ErrorHandler(400, "checkout your fields"));
  }
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler(400, "user is already existed"));
  }
  const user = await userModel.create({ name, email, password });
  sendToken(user, 201, res);
});

exports.loginUser = AsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(new ErrorHandler(400, "checkout your fields"));
  }
  const existingUser = await UserModel.findOne({ email }).select("+password");
  if (!existingUser) {
    return next(new ErrorHandler(400, "user does not exist"));
  }
  console.log(existingUser);
  const isChecked = await existingUser.comparePassword(password);
  if (!isChecked) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(existingUser, 200, res, "user logged in succesfully");
});

exports.MyDetails = AsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).populate({
    path: "files",
    select: "filename public_id url filetype uploadedAt",
  });
  res.status(200).json({ success: true, user });
});
