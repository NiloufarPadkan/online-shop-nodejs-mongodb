const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/online-shop", {})
  .then(() => {
    console.log("DB coonnection sucessfull!");
  })
  .catch((err) => {
    console.log(err);
  });
