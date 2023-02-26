require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const authRouters = require("./routes/auth");

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(`DB error: ${err}`));

const app = express();

app.use(express.json({ limit: "4mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", authRouters);

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
