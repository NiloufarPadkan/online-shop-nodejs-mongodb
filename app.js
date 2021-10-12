const express = require("express");
require("./db/mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");
const categoryRoute = require("./routers/category");
const tagRoute = require("./routers/tag");
const productRoute = require("./routers/product");

const app = express();

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
