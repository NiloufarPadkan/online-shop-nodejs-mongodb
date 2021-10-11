const express = require("express");
require("./db/mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");
const app = express();

dotenv.config();
app.use(express.json());
app.use(authRoute);
app.use(userRoute);

app.listen(process.env.port || 3000, () => {
  console.log("server is running");
});
