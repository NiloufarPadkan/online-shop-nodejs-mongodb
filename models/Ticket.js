const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const ticketsSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ticketId: {
            type: String,
        },
    },
    { timestamps: true }
);
ticketsSchema.virtual("converastions", {
    ref: "Conversation",
    localField: "_id",
    foreignField: "conversationId",
});
ticketsSchema.set("toObject", { virtuals: true });
ticketsSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Ticket", ticketsSchema);
