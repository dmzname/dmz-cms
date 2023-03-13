const { signin } = require("./signin");
const { signup } = require("./signup");
const { forgotPw } = require("./forgotPw");
const { resetPw } = require("./resetPw");

module.exports = {
  forgotPw,
  signin,
  signup,
  resetPw,
};
