const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userdata: {
      name: "",
      surname: "",
      middlename: "",
    },
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
      max: 16,
    },
    role: {
      type: String,
      default: "Subscriber",
    },
    avatar: "",
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
