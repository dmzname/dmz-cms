const express = require("express");
const router = express.Router();

// Controllers
const { signup } = require("../controllers/auth");

// SendGreed
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGREED_KEY);

// Routers
router.get("/", async (req, res) => {
  return res.json({ data: "Hello World!" });
});

router.post("/signup", signup);

router.post("/signin", async (req, res) => {
  console.log(req.body);
  res.json({ message: "success" });
});

module.exports = router;
