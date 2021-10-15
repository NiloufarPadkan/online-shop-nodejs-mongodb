const express = require("express");
require("./db/mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");
const categoryRoute = require("./routers/category");
const tagRoute = require("./routers/tag");
const productRoute = require("./routers/product");
const rateLimit = require("express-rate-limit");

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 4,
  message:
    "Too many accounts created from this IP, please try again after 15 minutes",
});

// only apply to requests that begin with /api/
app.use("/login", apiLimiter);
dotenv.config();
app.use(express.json());
app.use(authRoute);
app.use(userRoute);
app.use("/category", categoryRoute);
app.use("/tag", tagRoute);
app.use("/product", productRoute);

app.listen(process.env.port || 3000, () => {
  console.log("server is running");
});
