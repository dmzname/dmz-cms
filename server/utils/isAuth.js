const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

exports.isAuth = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const { _id } = jwt.verify(token, process.env.JWT_SECRET, null, null);
      req.user = await UserModel.findById({ _id });
      next();
    } catch (err) {
      return res.status(403).json({
        message: "No access",
      });
    }
  } else {
    return res.status(403).json({
      message: "No access",
    });
  }
};
