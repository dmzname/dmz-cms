const UserModel = require("../models/userModel");
const { nanoid } = require("nanoid");
const sgMail = require("@sendgrid/mail");

exports.forgotPw = async (req, res) => {
  try {
    const doc = await UserModel.findOne({ email: req.body.email });

    if (!doc) {
      return res.status(403).json({ error: "User not found." });
    }

    const resetCode = nanoid(5).toUpperCase();
    doc.resetCode = resetCode;
    const user = await doc.save();
    const { password, ...userData } = user._doc;

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: userData.email,
      subject: "Password reset code",
      html: `<h1>Your password reset code is: ${resetCode}</h1>`,
    };

    // Send email
    try {
      await sgMail.send(emailData);
      res.status(201).json(userData);
    } catch (err) {
      console.log(err);
      res.status(403).json({ error: "Server error" });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: "Server error" });
  }
};
