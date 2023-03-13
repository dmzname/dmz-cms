const express = require("express");
const router = express.Router();

const UserModel = require("../models/userModel");

// Controllers
const { signup, signin, forgotPw, resetPw } = require("../controllers/auth");

// SendGreed
const sgMail = require("@sendgrid/mail");
const { hashPassword } = require("../utils/hashPassword");
sgMail.setApiKey(process.env.SENDGREED_KEY);

// Routers
router.get("/", async (req, res) => {
  return res.json({ data: "Hello World!" });
});

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPw);
router.patch("/reset-password", resetPw);

module.exports = router;
