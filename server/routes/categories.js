const express = require("express");
const { isAuth } = require("../utils/isAuth");
const router = express.Router();
const { isAdmin } = require("../utils/isAdmin");
const { createCategory } = require("../controllers/categories/createCategory");

router.post("/category", isAuth, isAdmin, createCategory);

module.exports = router;
