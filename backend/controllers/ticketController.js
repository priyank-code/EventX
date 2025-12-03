const Ticket = require("../models/ticket.model.js");
const Event = require("../models/event.model.js");
const { generateQR } = require("../utils/generateQR");
const { uploadBuffer } = require("../utils/cloudinary");

// Buy ticket
exports.buyTicket = async (req, res) => {
  try {
    const { eventId, ticketType, quantity } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    const t = event.tickets.find(t => t.type === ticketType);
    if (!t) return res.status(400).json({ msg: "Invalid ticket type" });

    if (t.remainingSeats < quantity)
      return res.status(400).json({ msg: "Not enough seats available" });

    t.remainingSeats -= quantity;
    await event.save();

    // Generate QR for this ticket (you can generate multiple if needed)
    const qrText = `${req.user.id}-${eventId}-${Date.now()}`;
    const qrBuffer = await generateQR(qrText);
    const qrUrl = await uploadBuffer(qrBuffer, "qrcodes");

    const ticket = await Ticket.create({
      userId: req.user.id,
      eventId,
      ticketType,
      quantity,
      amountPaid: t.price * quantity,
      qrCodeUrl: qrUrl,
      qrText
    });

    res.json({ msg: "Ticket purchased", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// Verify ticket via QR
exports.verifyTicket = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: "QR text required" });

    const parts = text.split("-");
    if (parts.length < 2) return res.status(400).json({ msg: "Invalid QR format" });

    const userId = parts[0];
    const eventId = parts[1];

    const ticket = await Ticket.findOne({ userId, eventId });
    if (!ticket) return res.json({ msg: "Invalid ticket" });
    if (ticket.isUsed) return res.json({ msg: "Already scanned" });

    ticket.isUsed = true;
    await ticket.save();

    res.json({ msg: "Valid ticket", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all tickets for a user
exports.getTickets = async (req, res) => {
  try {
    const userId = req.user.id; // middleware se authenticated user

    const tickets = await Ticket.find({ userId }).populate("eventId");

    if (!tickets || tickets.length === 0)
      return res.json({ msg: "No tickets found", tickets: [] });

    res.json({ msg: "Tickets fetched", tickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
