const sendToken = (user, statuscode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    maxAge: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  };
  res.status(statuscode).cookie("auth", token, options).json({
    success: true,
    message,
    user,
    token,
  });
};

module.exports = sendToken;
