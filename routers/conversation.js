const Conversation = require("../models/Conversation");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const ShortUniqueId = require("short-unique-id");

const { verifyToken, verifyTokenAndAdmin } = require("../middleware/verify");

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
//list of my tickets
router.get("/tickets/me", verifyToken, async (req, res) => {
    try {
        const tickets = await Ticket.find({ userId: req.user.id }).sort({
            timestamp: -1,
        });
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
//get one of my ticket
router.get("/tickets/me/:id", verifyToken, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate(
            "converastions"
        );
        console.log(ticket.userId.toString());
        console.log(ticket.userId == req.user.id);
        if (!(ticket.userId == req.user.id)) {
            return res.status(500).send("frobidden");
        }
        res.send(ticket);
    } catch (e) {
        console.log(e);
    }
});

//start new conersation and new ticket
router.post("/start", verifyToken, async (req, res, next) => {
    try {
        const uid = new ShortUniqueId({ length: 10 });
        let id = uid();
        const ticket = new Ticket({
            userId: req.user.id,
            ticketId: id,
        });
        const savedTicket = await ticket.save();
        const userName = await User.findById(req.user.id);
        const conversation = new Conversation({
            userId: req.user.id,
            sender: userName.username,
            message: req.body.message,
            adminReceiptStatus: false,
            userReceiptStatus: true,
            conversationId: savedTicket.id,
        });
        try {
            const savedConversation = await conversation.save();
            res.status(200).send(savedConversation);
        } catch (e) {
            console.log(e);
        }
    } catch (e) {
        res.status(400).send(e);
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
router.post("/:id/send", verifyToken, async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    console.log(ticket);
    if (!(ticket.userId == req.user.id)) {
        return res.status(500).send("frobidden");
    }
    const userName = await User.findById(req.user.id);
    try {
        const conversation = new Conversation({
            userId: req.user.id,
            sender: userName.username,
            message: req.body.message,
            adminReceiptStatus: false,
            userReceiptStatus: true,
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
