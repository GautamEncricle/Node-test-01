const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(`Bearer`)
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return res.status(401).json({
      success: false,
      message: "Token does not exist!",
    });
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decode.id).select("-password");
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User does not exist!",
    });
  }

  req.user = user;
  next();
};
