const Conversation = require("../../models/Conversation");
const Ticket = require("../../models/Ticket");
const User = require("../../models/User");
const ShortUniqueId = require("short-unique-id");

const { verifyToken, verifyTokenAndAdmin } = require("../../middleware/verify");

const router = require("express").Router();
//list of all tickets for admin
router.get("/tickets/list", verifyTokenAndAdmin, async (req, res) => {
    try {
        const tickets = await Ticket.find({}).sort({ timestamp: -1 });
        res.send(tickets);
    } catch (e) {
        console.log(e);
    }
});

//get one ticket by admin
router.get("/tickets/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate(
            "converastions"
        );
        // const tickets = await Ticket.find({}).sort({ timestamp: -1 });
        res.send(ticket);
    } catch (e) {
        console.log(e);
    }
});

//reply message in exsisting conversation by admin
router.post("/:id/reply", verifyTokenAndAdmin, async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    console.log(ticket);
    try {
        const conversation = new Conversation({
            userId: ticket.userId,
            sender: "admin",
            message: req.body.message,
            adminReceiptStatus: true,
            userReceiptStatus: false,
            conversationId: ticket.id,
        });
        try {
            const savedConversation = await conversation.save();
            res.status(200).send(savedConversation);
        } catch (e) {
            console.log(e);
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
