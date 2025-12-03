const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    eventId: { type: mongoose.Types.ObjectId, ref: "Event" },
    ticketType: String,
    quantity: { type: Number, default: 1 },
    amountPaid: Number,
    qrCodeUrl: String,
    isUsed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
