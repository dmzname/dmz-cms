const UserModel = require("../models/userModel");
const { hashPassword } = require("../utils/hashPassword");

exports.resetPw = async (req, res) => {
  try {
    const doc = await UserModel.findOne({
      email: req.body.email,
      resetCode: req.body.code,
    });

    if (!doc) {
      return res.status(403).json({ error: "Reset code is not valid!" });
    }

    doc.password = await hashPassword(req.body.password);
    doc.resetCode = "";

    doc.save();

    res.status(201).json({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Server error" });
  }
};
