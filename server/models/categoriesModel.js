const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      unique: true,
      lowerCase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", categoriesSchema);
