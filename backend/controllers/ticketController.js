const Ticket = require("../models/ticket.model.js");
const Event = require("../models/event.model.js");
const { generateQR } = require("../utils/generateQR");
const { uploadBuffer } = require("../utils/cloudinary");

// BUY TICKET (MULTIPLE UNIQUE QRS)
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

    // UNIQUE QR code text
    const qrText = `${req.user.id}_${eventId}_${ticketType}_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}`;

    const qrBuffer = await generateQR(qrText);
    const qrUrl = await uploadBuffer(qrBuffer, "qrcodes");

    const ticket = await Ticket.create({
      userId: req.user.id,
      eventId,
      ticketType,
      quantity,
      amountPaid: t.price * quantity,
      qrCodeUrl: qrUrl,
      qrText,
    });

    res.json({ msg: "Ticket purchased", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// VERIFY TICKET (NOW BASED ON QR TEXT ONLY)
exports.verifyTicket = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: "QR text required" });

    const ticket = await Ticket.findOne({ qrText: text });

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

// GET ALL TICKETS OF USER
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id }).populate("eventId");

    res.json({ msg: "Tickets fetched", tickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
