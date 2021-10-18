const express = require("express");
const connectDb = require("./db/mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");
const categoryRoute = require("./routers/category");
const tagRoute = require("./routers/tag");
const productRoute = require("./routers/product");
const orerRoute = require("./routers/order");
const commentRoute = require("./routers/comment");
const bodyparser = require("body-parser");
const rateLimit = require("express-rate-limit");
//const multer=require("multer")
dotenv.config();

const app = express();
app.use(bodyparser.json({}));
//newupload=multer()
app.use(bodyparser.urlencoded({ extended: true }));
//app.use(newupload.array())

// app.use(require("express-body"));
//app.use(bodyparser.json());
connectDb();
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 4,
    message:
        "Too many accounts created from this IP, please try again after 15 minutes",
});

app.use("/login", apiLimiter);
app.use(authRoute);
app.use(userRoute);
app.use("/category", categoryRoute);
app.use("/tag", tagRoute);
app.use("/product", productRoute);
app.use("/order", orerRoute);
app.use("/comment", commentRoute);

app.listen(process.env.port || 3000, () => {
    console.log("server is running");
});
