const UserModel = require("../models/userModel");
const { hashPassword } = require("../utils/hashPassword");
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
    return res.status(500).json({ message: err.message });
  }
};
