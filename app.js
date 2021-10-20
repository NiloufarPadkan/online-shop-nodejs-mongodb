const express = require("express");
const connectDb = require("./db/mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routers/auth");
const userAvatarRoute = require("./routers/user/avatar");

const adminCategoryRoute = require("./routers/admin/category");
const userCategoryRoute = require("./routers/user/category");

const adminTagRoute = require("./routers/admin/tag");
const userTagRoute = require("./routers/user/tag");

const adminProductRoute = require("./routers/admin/product");
const userProductRoute = require("./routers/user/product");

const AdminOrerRoute = require("./routers/admin/order");
const userOrerRoute = require("./routers/user/order");

const adminCommentRoute = require("./routers/admin/comment");
const userCommentRoute = require("./routers/user/comment");

const adminConversationRoute = require("./routers/admin/conversation");
const userConversationRoute = require("./routers/user/conversation");

const searchRoute = require("./routers/user/search");
const bodyparser = require("body-parser");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();
app.use(bodyparser.json({}));
app.use(bodyparser.urlencoded({ extended: true }));
connectDb();
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 4,
    message:
        "Too many accounts created from this IP, please try again after 15 minutes",
});

app.use("/login", apiLimiter);
app.use(authRoute);
app.use(userAvatarRoute);

app.use(searchRoute);

app.use("/category", adminCategoryRoute);
app.use("/category", userCategoryRoute);

app.use("/tag", adminTagRoute);
app.use("/tag", userTagRoute);

app.use("/product", adminProductRoute);
app.use("/product", userProductRoute);

app.use("/order", AdminOrerRoute);
app.use("/order", userOrerRoute);

app.use("/comment", adminCommentRoute);
app.use("/comment", userCommentRoute);

app.use("/conversation", userConversationRoute);
app.use("/conversation", adminConversationRoute);

app.listen(process.env.port || 3000, () => {
    console.log("server is running");
});
