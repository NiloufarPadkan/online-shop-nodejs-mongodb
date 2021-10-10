const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routers/auth");
require("./db/mongoose");
dotenv.config();
app.use(express.json());
app.use(authRoute);
app.listen(process.env.port || 3000, () => {
  console.log("server is running");
});
