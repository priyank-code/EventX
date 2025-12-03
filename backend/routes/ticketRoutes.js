const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { buyTicket, verifyTicket, getTickets } = require("../controllers/ticketController");

// Buy ticket (user)
router.post("/buy", auth(["user"]), buyTicket);

// Verify ticket (admin/organizer)
router.post("/verify", auth(["admin", "organizer"]), verifyTicket);

// Get all tickets for logged in user
router.get("/my", auth(["user"]), getTickets);

module.exports = router;
