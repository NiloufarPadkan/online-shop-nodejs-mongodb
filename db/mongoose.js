const mongoose = require("mongoose");
const connectDB = async () => {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/onlineshop";

    mongoose
        .connect(uri, {})
        .then(() => {
            console.log("DB coonnection sucessfull!");
        })
        .catch((err) => {
            console.log(err);
        });
};
module.exports = connectDB;
