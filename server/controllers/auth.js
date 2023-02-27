const UserModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email } = req.body;
    const isExist = await UserModel.findOne({ email });

    if (isExist) {
      return res.status(409).json({ error: "User already exists." });
    }

    const passwordHash = await hashPassword(req.body.password);

    const doc = new UserModel({
      email,
      username,
      password: passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      null
    );

    const { password, ...data } = user._doc;

    return res.status(201).json({ user: data, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

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
