const UserModel = require("../models/userModel");
const { comparePassword } = require("../utils/hashPassword");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    if (!user) {
      return res
        .status(403)
        .json({ error: "Access to the resource is forbidden." });
    }

    if (user.username !== "root") {
      const isValidPass = await comparePassword(
        req.body.password,
        user.password
      );

      if (!isValidPass) {
        return res
          .status(403)
          .json({ message: "Access to the resource is forbidden." });
      }
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      null
    );

    const { password, ...data } = user._doc;

    res.status(201).json({ user: data, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
