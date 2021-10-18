const User = require("../models/User");
const Comment = require("../models/Comment");

exports.create = async (req, res) => {
    console.log(req.body);
    console.log("hi");
    if (req.path === "/me/avatar") {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                avatar: req.file.buffer,
            },
            { new: true }
        );
        res.send(updatedUser);
    } else {
        res.send("commenting");
    }
};

exports.delete = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
            avatar: [],
        },
        { new: true }
    );

    res.send(updatedUser);
};
